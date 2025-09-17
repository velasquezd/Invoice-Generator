// Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{ padding: '1rem', background: '#eee' }}>
      <Link to="/" style={{ marginRight: '1rem' }}>Home</Link>
      <Link to="/invoice" style={{ marginRight: '1rem' }}>Invoice</Link>
      <Link to="/purchase-order" style={{ marginRight: '1rem' }}>Purchase Order</Link>
    </nav>
  );
}

export default Navbar;
