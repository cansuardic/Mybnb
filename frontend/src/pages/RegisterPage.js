import React from 'react';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic, e.g., sending data to backend
    console.log('Form submitted!');
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <form style={{ display: 'flex', flexDirection: 'column', width: 300, padding: 20, border: '1px solid #ccc', borderRadius: 8 }}>
        <h2 style={{ marginBottom: 20, color: '#333', textAlign: 'center' }}>Register</h2>
        <div style={{ marginBottom: 20 }}>
          <label htmlFor="name" style={{ color: '#333' }}>Name</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            required 
            style={{ width: '100%', padding: 10, boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: 4 }} 
          />
        </div>
        <div style={{ marginBottom: 20 }}>
          <label htmlFor="surname" style={{ color: '#333' }}>Surname</label>
          <input 
            type="text" 
            id="surname" 
            name="surname" 
            required 
            style={{ width: '100%', padding: 10, boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: 4 }} 
          />
        </div>
        <div style={{ marginBottom: 20 }}>
          <label htmlFor="phone" style={{ color: '#333' }}>Phone Number</label>
          <input 
            type="tel" 
            id="phone" 
            name="phone" 
            required 
            style={{ width: '100%', padding: 10, boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: 4 }} 
          />
        </div>
        <div style={{ marginBottom: 20 }}>
          <label htmlFor="email" style={{ color: '#333' }}>Email</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            required 
            style={{ width: '100%', padding: 10, boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: 4 }} 
          />
        </div>
        <div style={{ marginBottom: 20 }}>
          <label htmlFor="dob" style={{ color: '#333' }}>Date of Birth</label>
          <input 
            type="date" 
            id="dob" 
            name="dob" 
            required 
            style={{ width: '100%', padding: 10, boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: 4 }} 
          />
        </div>
        <button 
          type="submit" 
          onClick={handleSubmit}
          style={{ padding: 10, backgroundColor: '#ff5a60', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', alignSelf: 'center' }}>
          Register
        </button>
        <p style={{ marginTop: 15, textAlign: 'center' }}>
          Already have an account? <Link to="/signin">Sign In</Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
