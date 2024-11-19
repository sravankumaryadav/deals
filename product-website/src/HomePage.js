
import React, { useState } from 'react';
import ProductCard from './ProductCard';
import SearchBar from './SearchBar';
import './HomePage.css';

function HomePage({ products }) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div className="product-list">
        {filteredProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
