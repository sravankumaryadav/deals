// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch(error => console.error("Error connecting to MongoDB:", error));

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  image: String,
  buyLink: String,
});

const Product = mongoose.model('Product', productSchema);

app.post('/upload', upload.single('image'), (req, res) => {
  const imageUrl = `/uploads/${req.file.filename}`;
  res.json({ imageUrl });
});

app.post('/products', async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.json(savedProduct);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add product' });
  }
});

app.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve products' });
  }
});

// server.js
// ...
// Route to delete a product by ID
app.delete('/products/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    await Product.findByIdAndDelete(productId);
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
});
// ...


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
