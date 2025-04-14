const mongoose = require('mongoose');

const products = [
  { id: 1, name: "Silicone Case Samsung Galaxy S23", price: 15.00, description: "Durable silicone case, drop-resistant, fits Samsung Galaxy S23, black/blue.", image: "samsung_s23_case.jpg", stock: 60 },
  { id: 2, name: "USB-C Charger 20W", price: 25.00, description: "20W fast charger, 1.5m cable, for iPhone, Samsung, Xiaomi.", image: "usbc_charger.jpg", stock: 40 },
  { id: 3, name: "Tempered Glass iPhone 14", price: 10.00, description: "Anti-scratch tempered glass, crystal-clear, fits iPhone 14.", image: "iphone14_glass.jpg", stock: 80 },
  { id: 4, name: "Wireless Bluetooth Earphones", price: 50.00, description: "Bluetooth 5.0 earphones, 15h battery, noise reduction.", image: "bluetooth_earphones.jpg", stock: 30 },
  { id: 5, name: "Power Bank 10000mAh", price: 40.00, description: "Portable power bank, dual USB output, LED indicator.", image: "power_bank.jpg", stock: 50 },
  { id: 6, name: "Leather Case iPhone 15", price: 20.00, description: "Premium leather case, slim fit, for iPhone 15, brown.", image: "iphone15_leather.jpg", stock: 45 },
  { id: 7, name: "Car Charger USB-C 30W", price: 18.00, description: "30W fast car charger, dual port, for all smartphones.", image: "car_charger.jpg", stock: 35 },
  { id: 8, name: "Screen Protector Samsung A54", price: 12.00, description: "HD tempered glass, anti-fingerprint, for Samsung A54.", image: "samsung_a54_glass.jpg", stock: 70 },
  { id: 9, name: "TWS Earbuds Pro", price: 60.00, description: "True wireless earbuds, 20h playtime, touch control.", image: "tws_earbuds.jpg", stock: 25 },
  { id: 10, name: "Phone Holder Desk", price: 8.00, description: "Adjustable desk stand, universal, non-slip base.", image: "phone_holder.jpg", stock: 90 },
  { id: 11, name: "USB-C to Lightning Cable 1m", price: 15.00, description: "Durable braided cable, fast charging, for iPhone.", image: "usbc_lightning.jpg", stock: 55 },
  { id: 12, name: "Armband for Sports", price: 10.00, description: "Water-resistant armband, fits phones up to 6.7in.", image: "sports_armband.jpg", stock: 65 },
  { id: 13, name: "Wireless Charger 15W", price: 30.00, description: "Qi-certified wireless charger, sleek design.", image: "wireless_charger.jpg", stock: 40 },
  { id: 14, name: "Rugged Case Xiaomi 13", price: 18.00, description: "Shockproof case, military-grade, for Xiaomi 13.", image: "xiaomi13_case.jpg", stock: 50 },
  { id: 15, name: "Selfie Stick Bluetooth", price: 12.00, description: "Extendable selfie stick, remote shutter, foldable.", image: "selfie_stick.jpg", stock: 75 },
  { id: 16, name: "Micro-USB Cable 2m", price: 8.00, description: "Long braided cable, fast charging, for older phones.", image: "micro_usb.jpg", stock: 60 },
  { id: 17, name: "Clear Case Oppo Reno 8", price: 10.00, description: "Transparent TPU case, slim fit, for Oppo Reno 8.", image: "oppo_reno8_case.jpg", stock: 55 },
  { id: 18, name: "Neckband Earphones", price: 25.00, description: "Bluetooth neckband, 12h battery, sweat-resistant.", image: "neckband_earphones.jpg", stock: 35 },
  { id: 19, name: "Power Bank 20000mAh", price: 65.00, description: "High-capacity power bank, triple output, fast charge.", image: "power_bank_20k.jpg", stock: 20 },
  { id: 20, name: "Car Phone Mount", price: 15.00, description: "Suction cup mount, 360° rotation, universal.", image: "car_mount.jpg", stock: 70 },
  { id: 21, name: "USB-C Hub Adapter", price: 35.00, description: "Multi-port hub, USB-C to HDMI/USB, for phones.", image: "usbc_hub.jpg", stock: 30 },
  { id: 22, name: "Privacy Glass iPhone 13", price: 15.00, description: "Privacy tempered glass, anti-spy, for iPhone 13.", image: "iphone13_privacy.jpg", stock: 60 },
  { id: 23, name: "Wallet Case Samsung S22", price: 22.00, description: "PU leather wallet case, card slots, for Samsung S22.", image: "samsung_s22_wallet.jpg", stock: 40 },
  { id: 24, name: "Fast Charger 65W", price: 45.00, description: "65W GaN charger, compact, for phones/laptops.", image: "65w_charger.jpg", stock: 25 },
  { id: 25, name: "Gaming Earphones", price: 30.00, description: "Wired earphones, low latency, mic, for gaming.", image: "gaming_earphones.jpg", stock: 50 },
  { id: 26, name: "Ring Holder Case Huawei P50", price: 12.00, description: "TPU case with kickstand ring, for Huawei P50.", image: "huawei_p50_ring.jpg", stock: 65 },
  { id: 27, name: "Bike Phone Mount", price: 18.00, description: "Secure bike mount, shock-absorbing, universal.", image: "bike_mount.jpg", stock: 55 },
  { id: 28, name: "Type-C Earphones", price: 20.00, description: "USB-C wired earphones, hi-fi sound, inline mic.", image: "typec_earphones.jpg", stock: 45 },
  { id: 29, name: "Magnetic Case iPhone 14 Pro", price: 25.00, description: "MagSafe-compatible case, slim, for iPhone 14 Pro.", image: "iphone14pro_magnetic.jpg", stock: 35 },
  { id: 30, name: "Portable Speaker Bluetooth", price: 40.00, description: "Compact Bluetooth speaker, 10h battery, IPX5.", image: "portable_speaker.jpg", stock: 30 },
  { id: 31, name: "USB-C to 3.5mm Adapter", price: 8.00, description: "USB-C audio adapter, high-quality DAC.", image: "usbc_3.5mm.jpg", stock: 80 },
  { id: 32, name: "Anti-Slip Phone Grip", price: 5.00, description: "Adhesive phone grip, ergonomic, universal.", image: "phone_grip.jpg", stock: 100 },
  { id: 33, name: "Matte Glass Xiaomi 12", price: 12.00, description: "Matte-finish tempered glass, for Xiaomi 12.", image: "xiaomi12_matte.jpg", stock: 60 },
  { id: 34, name: "Wireless Neck Fan", price: 20.00, description: "Portable fan, USB-C charging, hands-free.", image: "neck_fan.jpg", stock: 40 },
  { id: 35, name: "Pop Socket Universal", price: 6.00, description: "Collapsible pop socket, stylish, universal.", image: "pop_socket.jpg", stock: 90 }
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
