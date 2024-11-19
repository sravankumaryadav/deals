// ProductCard.js
import React from 'react';
import './ProductCard.css';

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />
      <h3 className="product-name">{product.name}</h3>
      <p className="product-description">{product.description}</p>
      <p className="product-price">Price: ₹{product.price}</p>
      <a href={product.buyLink} target="_blank" rel="noopener noreferrer">
        <button className="buy-button">Buy Now</button>
      </a>
    </div>
  );
}

export default ProductCard;
