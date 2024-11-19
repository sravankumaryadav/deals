// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import HomePage from './HomePage';
import AdminPage from './AdminPage';
import './App.css';

// Import the logo image
import logo from './logo.jpeg';

function App() {
  const isOwner = process.env.REACT_APP_IS_OWNER === 'true';
  const [products, setProducts] = useState([]);

  // Fetch products from the backend when the component mounts
  React.useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/products`)
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error("Error fetching products:", error));
  }, []);

  return (
    <Router>
      <header className="header">
        {/* Display the logo */}
        <img src={logo} alt="Brand Logo" className="brand-logo" />
        <h1>sk_deals_trusted</h1>
        <nav>
          <Link to="/">Home</Link>
          {isOwner && <Link to="/admin">Add Product</Link>}
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<HomePage products={products} />} />
          <Route path="/admin" element={isOwner ? <AdminPage setProducts={setProducts} /> : <Navigate to="/" />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;

