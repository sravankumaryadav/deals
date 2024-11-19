// SearchBar.js
import React from 'react';
import './SearchBar.css'

function SearchBar({ searchQuery, setSearchQuery }) {
  return (
    <input
      type="text"
      placeholder="Search by product title..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="search-bar"
    />
  );
}

export default SearchBar;
