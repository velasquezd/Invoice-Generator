import React from 'react';

function Home() {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.heading}>Welcome to the Business Document Generator</h1>
        <p style={styles.message}>
         Thank you for checking out my project!
I'm currently focused on building out the core functionality of the site and adding customizable features. Once that's in place, I'll start working on improving the overall design. This is still an ongoing project, and I’m excited to continue developing it!
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '900px',
    margin: '2rem auto',
    padding: '0 1rem',
    fontFamily: 'Arial, sans-serif',
  },
  card: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)',
    border: '1px solid #ddd',
  },
  heading: {
    fontSize: '1.8rem',
    marginBottom: '1rem',
    color: '#007bff',
  },
  message: {
    fontSize: '1rem',
    lineHeight: '1.6',
    color: '#333',
  },
};

export default Home;
