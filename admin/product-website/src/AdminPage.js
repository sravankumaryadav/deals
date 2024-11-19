
import React, { useState, useEffect } from 'react';
import './AdminPage.css';

function AdminPage({ setProducts }) {
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    buyLink: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [products, setLocalProducts] = useState([]);

  // Fetch products when the component loads
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/products`)
      .then((response) => response.json())
      .then((data) => setLocalProducts(data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageUrl = newProduct.image;

    if (imageFile) {
      const formData = new FormData();
      formData.append('image', imageFile);

      try {
        const uploadResponse = await fetch(`${process.env.REACT_APP_API_URL}/upload`, {
          method: 'POST',
          body: formData,
        });
        const uploadData = await uploadResponse.json();
        imageUrl = `${process.env.REACT_APP_API_URL}${uploadData.imageUrl}`;
      } catch (error) {
        console.error('Error uploading image:', error);
        return;
      }
    }

    const productData = { ...newProduct, image: imageUrl };

    fetch(`${process.env.REACT_APP_API_URL}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData),
    })
      .then((response) => response.json())
      .then((data) => {
        setLocalProducts((prevProducts) => [...prevProducts, data]);
        setNewProduct({ name: '', description: '', price: '', image: '', buyLink: '' });
        setImageFile(null);
      })
      .catch((error) => console.error('Error adding product:', error));
  };

  const handleDelete = (id) => {
    fetch(`${process.env.REACT_APP_API_URL}/products/${id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then(() => {
        setLocalProducts((prevProducts) => prevProducts.filter((product) => product._id !== id));
      })
      .catch((error) => console.error('Error deleting product:', error));
  };

  return (
    <div className="admin-container">
      <h2 className="admin-heading">Add New Product</h2>
      <form className="admin-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={newProduct.name}
          onChange={handleInputChange}
          placeholder="Product Name"
          required
        />
        <textarea
          name="description"
          value={newProduct.description}
          onChange={handleInputChange}
          placeholder="Product Description"
          rows="3"
          required
        />
        <input
          type="number"
          name="price"
          value={newProduct.price}
          onChange={handleInputChange}
          placeholder="Price"
          required
        />
        <input
          type="text"
          name="image"
          value={newProduct.image}
          onChange={handleInputChange}
          placeholder="Image URL (optional)"
        />
        <input type="file" onChange={handleFileChange} />
        <input
          type="url"
          name="buyLink"
          value={newProduct.buyLink}
          onChange={handleInputChange}
          placeholder="Buy Link"
          required
        />
        <button type="submit" className="add-button">
          Add Product
        </button>
      </form>

      <h2 className="admin-heading">Current Products</h2>
      <div className="product-list">
        {products.map((product) => (
          <div key={product._id} className="product-item">
            <img src={product.image} alt={product.name} className="product-image" />
            <h3 className="product-name">{product.name}</h3>
            <p className="product-description">{product.description}</p>
            <p className="product-price">Price: ${product.price}</p>
            <a
              href={product.buyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="buy-link"
            >
              Buy Now
            </a>
            <button onClick={() => handleDelete(product._id)} className="delete-button">
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminPage;
