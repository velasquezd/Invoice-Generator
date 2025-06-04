import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import Invoice from './pages/Invoice.jsx';
import PurchaseOrder from './pages/PurchaseOrder.jsx';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/invoice" element={<Invoice />} />
        <Route path="/purchase-order" element={<PurchaseOrder />} />
      </Routes>
    </>
  );
}

export default App;
