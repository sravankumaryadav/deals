// AdminPage.js
import React, { useState } from 'react';
import './AdminPage.css';

function AdminPage({ setProducts }) {
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    buyLink: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`${process.env.REACT_APP_API_URL}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct),
    })
    .then(response => response.json())
    .then(data => {
      console.log("Product added:", data);
      setProducts((prevProducts) => [...prevProducts, data]);
      setNewProduct({ name: '', description: '', price: '', image: '', buyLink: '' });
    })
    .catch(error => console.error("Error adding product:", error));
  };

  return (
    <div className="admin-container">
      <h2>Add New Product</h2>
      <form className="admin-form" onSubmit={handleSubmit}>
        <input type="text" name="name" value={newProduct.name} onChange={handleInputChange} placeholder="Product Name" required />
        <input type="text" name="description" value={newProduct.description} onChange={handleInputChange} placeholder="Product Description" required />
        <input type="text" name="price" value={newProduct.price} onChange={handleInputChange} placeholder="Price" required />
        <input type="text" name="image" value={newProduct.image} onChange={handleInputChange} placeholder="Image URL" required />
        <input type="text" name="buyLink" value={newProduct.buyLink} onChange={handleInputChange} placeholder="Buy Link" required />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default AdminPage;

