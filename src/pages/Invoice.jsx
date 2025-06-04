import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

function Invoice() {
  const defaultCompanyAddress = `123 Your Company St.
City, State ZIP
Phone: (123) 456-7890
Email: info@yourcompany.com`;

  const [companyAddress, setCompanyAddress] = useState(defaultCompanyAddress);
  const [clientName, setClientName] = useState('');
  const [clientAddress, setClientAddress] = useState('');
  const [terms, setTerms] = useState('Net 30');
  const [items, setItems] = useState([{ name: '', quantity: '', price: '' }]);

  const invoiceRef = useRef();

  const handleCompanyAddressFocus = () => {
    if (companyAddress === defaultCompanyAddress) setCompanyAddress('');
  };

  const handleCompanyAddressBlur = () => {
    if (companyAddress.trim() === '') setCompanyAddress(defaultCompanyAddress);
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setItems(updatedItems);
  };

  const addItem = () => {
    setItems([...items, { name: '', quantity: '', price: '' }]);
  };

  const getItemTotal = (item) => {
    const quantity = parseFloat(item.quantity);
    const price = parseFloat(item.price);
    if (isNaN(quantity) || isNaN(price)) return 0;
    return quantity * price;
  };

  const getInvoiceTotal = () =>
    items.reduce((total, item) => total + getItemTotal(item), 0);

  const downloadAsPDF = () => {
    if (!invoiceRef.current) return;

    html2canvas(invoiceRef.current, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: 'a4',
      });
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('invoice.pdf');
    });
  };

  return (
    <div className="container" style={{ maxWidth: '900px', margin: '2rem auto', padding: '0 1rem' }}>
      <h2>Invoice Generator</h2>

      <div style={{ marginBottom: '1rem' }}>
        <label><strong>Your Company Address</strong></label>
        <textarea
          rows={4}
          value={companyAddress}
          onFocus={handleCompanyAddressFocus}
          onBlur={handleCompanyAddressBlur}
          onChange={(e) => setCompanyAddress(e.target.value)}
          style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem', resize: 'vertical' }}
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label><strong>Client Name</strong></label>
        <input
          placeholder="Client Name"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label><strong>Client Address</strong></label>
        <textarea
          rows={3}
          placeholder="Client Address"
          value={clientAddress}
          onChange={(e) => setClientAddress(e.target.value)}
          style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem', resize: 'vertical' }}
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label><strong>Terms</strong></label>
        <input
          placeholder="e.g. Net 30, Due on receipt"
          value={terms}
          onChange={(e) => setTerms(e.target.value)}
          style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
        />
      </div>

      {items.map((item, index) => (
        <div
          key={index}
          style={{
            marginBottom: '1.5rem',
            borderBottom: '1px solid #ccc',
            paddingBottom: '1rem',
          }}
        >
          <div>
            <label>Item Name</label>
            <input
              placeholder="e.g. Web Hosting"
              value={item.name}
              onChange={(e) => handleItemChange(index, 'name', e.target.value)}
              style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
            />
          </div>
          <div>
            <label>Quantity</label>
            <input
              type="number"
              min="0"
              placeholder="Quantity"
              value={item.quantity}
              onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
              style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
            />
          </div>
          <div>
            <label>Price (per item)</label>
            <input
              type="number"
              min="0"
              placeholder="Price"
              value={item.price}
              onChange={(e) => handleItemChange(index, 'price', e.target.value)}
              style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
            />
          </div>
          <p><strong>Item Total:</strong> ${getItemTotal(item).toFixed(2)}</p>
        </div>
      ))}

      <button
        onClick={addItem}
        style={{
          padding: '0.5rem 1rem',
          marginBottom: '1rem',
          cursor: 'pointer',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
        }}
      >
        + Add Item
      </button>

      <div
        ref={invoiceRef}
        className="preview"
        style={{
          padding: '2rem 3rem',
          backgroundColor: 'white',
          maxWidth: '900px',
          margin: '2rem auto',
          boxShadow: '0 0 15px rgba(0,0,0,0.1)',
          borderRadius: '8px',
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          color: '#333',
          border: '1px solid #ddd',
          whiteSpace: 'pre-line',
        }}
      >
        <h3
          style={{
            borderBottom: '2px solid #007bff',
            paddingBottom: '0.5rem',
            marginBottom: '1.5rem',
          }}
        >
          Invoice Preview
        </h3>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: '2rem',
            flexWrap: 'wrap',
          }}
        >
          {/* Company & Client Info */}
          <div
            style={{
              flex: '1 1 40%',
              borderRight: '1px solid #ddd',
              paddingRight: '1rem',
              minWidth: '250px',
            }}
          >
            <p style={{ marginTop: 0, fontWeight: '700' }}>From:</p>
            <p style={{ fontSize: '0.9rem', marginTop: 0 }}>{companyAddress}</p>

            <p style={{ marginTop: '1rem', fontWeight: '700' }}>Bill To:</p>
            <p style={{ fontSize: '0.9rem', marginTop: 0 }}>
              {clientName || '—'}
              <br />
              {clientAddress || '—'}
            </p>

            <p style={{ marginTop: '1rem', fontWeight: '700' }}>Terms:</p>
            <p style={{ fontSize: '0.9rem', marginTop: 0 }}>{terms || '—'}</p>
          </div>

          {/* Items table */}
          <div style={{ flex: '1 1 55%', overflowX: 'auto', minWidth: '300px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #007bff' }}>
                  <th style={{ textAlign: 'left', padding: '8px' }}>Item</th>
                  <th style={{ textAlign: 'right', padding: '8px' }}>Quantity</th>
                  <th style={{ textAlign: 'right', padding: '8px' }}>Price</th>
                  <th style={{ textAlign: 'right', padding: '8px' }}>Total</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={index} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '8px' }}>{item.name || '—'}</td>
                    <td style={{ textAlign: 'right', padding: '8px' }}>{item.quantity || '0'}</td>
                    <td style={{ textAlign: 'right', padding: '8px' }}>
                      ${item.price ? parseFloat(item.price).toFixed(2) : '0.00'}
                    </td>
                    <td style={{ textAlign: 'right', padding: '8px' }}>
                      ${getItemTotal(item).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={3} style={{ textAlign: 'right', padding: '8px', fontWeight: '700' }}>
                    Grand Total:
                  </td>
                  <td style={{ textAlign: 'right', padding: '8px', fontWeight: '700' }}>
                    ${getInvoiceTotal().toFixed(2)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>

      <button
        onClick={downloadAsPDF}
        style={{
          padding: '0.75rem 1.5rem',
          marginTop: '1.5rem',
          cursor: 'pointer',
          backgroundColor: '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          fontWeight: '600',
          fontSize: '1rem',
        }}
      >
        Download PDF
      </button>
    </div>
  );
}

export default Invoice;
