import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

function PurchaseOrder() {
  const [vendor, setVendor] = useState('');
  const [terms, setTerms] = useState('Net 30');
  const [items, setItems] = useState([{ name: '', quantity: '', price: '' }]);
  const poRef = useRef();

  const handleItemChange = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };

  const addItem = () => {
    setItems([...items, { name: '', quantity: '', price: '' }]);
  };

  const getItemTotal = (item) => {
    const q = parseFloat(item.quantity);
    const p = parseFloat(item.price);
    if (isNaN(q) || isNaN(p)) return 0;
    return q * p;
  };

  const getTotal = () => items.reduce((sum, item) => sum + getItemTotal(item), 0);

  const downloadPDF = () => {
    if (!poRef.current) return;

    html2canvas(poRef.current, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({ unit: 'pt', format: 'a4' });
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('purchase_order.pdf');
    });
  };

  return (
    <div style={{ maxWidth: 900, margin: '2rem auto', padding: '0 1rem', fontFamily: 'Arial, sans-serif' }}>
      <h2>Purchase Order Generator</h2>

      <div style={{ marginBottom: '1rem' }}>
        <label><strong>Vendor Name</strong></label><br />
        <input
          placeholder="Vendor Name"
          value={vendor}
          onChange={e => setVendor(e.target.value)}
          style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label><strong>Terms</strong></label><br />
        <input
          placeholder="Payment Terms (e.g. Net 30)"
          value={terms}
          onChange={e => setTerms(e.target.value)}
          style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
        />
      </div>

      {items.map((item, i) => (
        <div
          key={i}
          style={{
            marginBottom: '1rem',
            borderBottom: '1px solid #ccc',
            paddingBottom: '1rem',
          }}
        >
          <label><strong>Item Name</strong></label><br />
          <input
            placeholder="Item Name"
            value={item.name}
            onChange={e => handleItemChange(i, 'name', e.target.value)}
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
          />
          <br />
          <label><strong>Quantity</strong></label><br />
          <input
            type="number"
            min="0"
            placeholder="Quantity"
            value={item.quantity}
            onChange={e => handleItemChange(i, 'quantity', e.target.value)}
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
          />
          <br />
          <label><strong>Price (each)</strong></label><br />
          <input
            type="number"
            min="0"
            placeholder="Price"
            value={item.price}
            onChange={e => handleItemChange(i, 'price', e.target.value)}
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
          />
          <p style={{ marginTop: '0.5rem' }}><strong>Item Total:</strong> ${getItemTotal(item).toFixed(2)}</p>
        </div>
      ))}

      <button
        onClick={addItem}
        style={{
          padding: '0.5rem 1rem',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginBottom: '1rem',
        }}
      >
        + Add Item
      </button>

      <div
        ref={poRef}
        style={{
          backgroundColor: 'white',
          padding: '2rem',
          boxShadow: '0 0 15px rgba(0,0,0,0.1)',
          borderRadius: '8px',
          border: '1px solid #ddd',
          maxWidth: '900px',
          margin: 'auto',
          color: '#333',
          fontSize: '14px',
        }}
      >
        <h3 style={{ borderBottom: '2px solid #007bff', paddingBottom: '0.5rem' }}>Purchase Order Preview</h3>

        <p><strong>Vendor:</strong> {vendor || '—'}</p>
        <p><strong>Terms:</strong> {terms || '—'}</p>

        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #007bff' }}>
              <th style={{ textAlign: 'left', padding: '8px' }}>Item</th>
              <th style={{ textAlign: 'right', padding: '8px' }}>Quantity</th>
              <th style={{ textAlign: 'right', padding: '8px' }}>Price</th>
              <th style={{ textAlign: 'right', padding: '8px' }}>Total</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '8px' }}>{item.name || '—'}</td>
                <td style={{ padding: '8px', textAlign: 'right' }}>{item.quantity || '0'}</td>
                <td style={{ padding: '8px', textAlign: 'right' }}>
                  ${item.price ? parseFloat(item.price).toFixed(2) : '0.00'}
                </td>
                <td style={{ padding: '8px', textAlign: 'right' }}>
                  ${getItemTotal(item).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="3" style={{ textAlign: 'right', padding: '8px', fontWeight: '700' }}>Grand Total:</td>
              <td style={{ textAlign: 'right', padding: '8px', fontWeight: '700' }}>${getTotal().toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>
      </div>

      <button
        onClick={downloadPDF}
        style={{
          marginTop: '1.5rem',
          padding: '0.75rem 1.5rem',
          backgroundColor: '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          fontWeight: '600',
          cursor: 'pointer',
        }}
      >
        Download PDF
      </button>
    </div>
  );
}

export default PurchaseOrder;
