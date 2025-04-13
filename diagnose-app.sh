#!/bin/bash

echo "=== System Resources ==="
free -h
df -h
sudo du -sh /* | sort -h | tail -n 5
top -b -n 1 | head -n 15

echo "=== Running Processes ==="
ps aux | grep node
netstat -tuln | grep 300
lsof -i :3001
lsof -i :3002
lsof -i :3003

echo "=== Service Logs ==="
ls -la ~/phone-accessories-app-2/auth-service
ls -la ~/phone-accessories-app-2/product-service
ls -la ~/phone-accessories-app-2/order-service
ls -la ~/phone-accessories-app-2/frontend
find ~/phone-accessories-app-2 -name "*.log" -exec tail -n 10 {} \;
grep -i "error" ~/phone-accessories-app-2/*/service.log

echo "=== Service Connectivity ==="
curl -s http://localhost:3001 || echo "Auth service (3001) failed"
curl -s http://localhost:3002 || echo "Product service (3002) failed"
curl -s http://localhost:3003 || echo "Order service (3003) failed"
curl -s http://localhost:3000 || echo "Frontend (3000) failed"

echo "=== Environment Configuration ==="
cat ~/phone-accessories-app-2/auth-service/.env
cat ~/phone-accessories-app-2/product-service/.env
cat ~/phone-accessories-app-2/order-service/.env
cat ~/phone-accessories-app-2/frontend/.env

echo "=== MongoDB Status ==="
docker ps
docker logs auth-mongo | tail -n 10
docker logs product-mongo | tail -n 10
docker logs order-mongo | tail -n 10
mongosh --host localhost --port 27017 --eval "db.getMongo()" || echo "Auth MongoDB failed"
mongosh --host localhost --port 27018 --eval "db.getMongo()" || echo "Product MongoDB failed"
mongosh --host localhost --port 27019 --eval "db.getMongo()" || echo "Order MongoDB failed"

echo "=== Code Inspection ==="
cat ~/phone-accessories-app-2/auth-service/src/index.js
cat ~/phone-accessories-app-2/product-service/src/index.js
cat ~/phone-accessories-app-2/order-service/src/index.js
grep -r "mongoose.connect" ~/phone-accessories-app-2/*/src
cat ~/phone-accessories-app-2/auth-service/package.json
cat ~/phone-accessories-app-2/product-service/package.json
cat ~/phone-accessories-app-2/order-service/package.json

echo "=== Next Steps ==="
echo "Review output for errors (e.g., EADDRINUSE, MongoServerError, Connection refused)."
echo "Check service logs in ~/phone-accessories-app-2/*/service.log."
echo "Verify .env files and MongoDB URIs."
echo "Restart services with: npm start > service.log 2>&1 &"
