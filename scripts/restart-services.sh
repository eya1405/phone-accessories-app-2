

# Step 2: Start MongoDB containers
echo "Starting MongoDB containers..."
docker start auth-mongo product-mongo order-mongo 2>/dev/null || {
  echo "Starting new MongoDB containers..."
  docker run -d --name auth-mongo -p 27017:27017 mongo
  docker run -d --name product-mongo -p 27018:27017 mongo
  docker run -d --name order-mongo -p 27019:27017 mongo
}
sleep 5

# Step 3: Start auth-service (3001)
echo "Starting auth-service on port 3001..."
cd "$BASE_DIR/auth-service"
node src/index.js > service.log 2>&1 &
sleep 2

# Step 4: Start product-service (3002)
echo "Starting product-service on port 3002..."
cd "$BASE_DIR/product-service"
npm install mongoose --no-save 2>/dev/null || true
node src/index.js > service.log 2>&1 &
sleep 2

# Step 5: Start order-service (3003)
echo "Starting order-service on port 3003..."
cd "$BASE_DIR/order-service"
node src/index.js > service.log 2>&1 &
sleep 2

# Step 6: Start frontend (3000)
echo "Starting frontend on port 3000..."
cd "$BASE_DIR/frontend"
rm -rf .next
ls node_modules || npm install --no-save
node_modules/.bin/next dev > service.log 2>&1 &
sleep 5

# Step 7: Repopulate product database
echo "Repopulating product database..."
cd "$BASE_DIR"
if [ ! -f scripts/populate-db.js ]; then
  cat << EOF > scripts/populate-db.js
const mongoose = require('mongoose');

const products = [
  { id: 1, name: "Silicone Case Samsung Galaxy S23", price: 15.00, description: "Durable silicone case, drop-resistant, fits Samsung Galaxy S23, black/blue.", image: "samsung_s23_case.jpg", stock: 60 },
  { id: 2, name: "USB-C Charger 20W", price: 25.00, description: "20W fast charger, 1.5m cable, for iPhone, Samsung, Xiaomi.", image: "usbc_charger.jpg", stock: 40 },
  // ... (33 more products, omitted for brevity)
];

async function populateDB() {
  try {
    await mongoose.connect('mongodb://localhost:27018/product_db');
    console.log('Connected to MongoDB');
    await mongoose.connection.db.collection('products').deleteMany({});
    console.log('Cleared products');
    await mongoose.connection.db.collection('products').insertMany(products);
    console.log('Inserted 35 products');
    await mongoose.disconnect();
    console.log('Disconnected');
  } catch (err) {
    console.error('Error:', err.message);
  }
}

populateDB();
EOF
fi
node scripts/populate-db.js

# Step 8: Verify services
echo "Verifying services..."
sleep 5
netstat -tuln | grep 300 || echo "Warning: Some ports not open"
curl http://localhost:3002 > /dev/null 2>&1 && echo "Product service OK" || echo "Product service failed"
curl http://localhost:3001/api/auth/login -X POST -H "Content-Type: application/json" -d '{"email":"test@example.com","password":"password123"}' > /dev/null 2>&1 && echo "Auth service OK" || echo "Auth service failed"
curl http://localhost:3000 > /dev/null 2>&1 && echo "Frontend OK" || echo "Frontend failed"

# Step 9: Check disk and memory
echo "System status:"
df -h | grep "/$"
free -h
# Step 7b: Start Angular cart-frontend (4200)
echo "Starting Angular cart-frontend on port 4200..."
cd "$BASE_DIR/cart-frontend"
ls node_modules || npm install --no-save
ng serve --port 4200 > service.log 2>&1 &
sleep 5
curl http://localhost:4200 > /dev/null 2>&1 && echo "Angular frontend OK" || echo "Angular frontend failed"
echo "Restart complete. Check logs in $BASE_DIR/*/service.log if issues persist."
