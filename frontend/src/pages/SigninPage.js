import React from 'react';
import { Link } from 'react-router-dom';

const SigninPage = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <form style={{ display: 'flex', flexDirection: 'column', width: 300, padding: 20, border: '1px solid #ccc', borderRadius: 8 }}>
          <h2 style={{ marginBottom: 20, color: '#333', textAlign: 'center' }}>Sign In</h2>
          <div style={{ marginBottom: 20 }}>
            <label htmlFor="username" style={{ color: '#333' }}>Username</label>
            <input 
              type="text" 
              id="username" 
              name="username" 
              required 
              style={{ width: '100%', padding: 10, boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: 4 }} 
            />
          </div>
          <div style={{ marginBottom: 20 }}>
            <label htmlFor="password" style={{ color: '#333' }}>Password</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              required 
              style={{ width: '100%', padding: 10, boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: 4 }} 
            />
          </div>
          <button 
            type="submit" 
            style={{ padding: 10, backgroundColor: '#ff5a60', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', alignSelf: 'center' }}>
            Sign In
          </button>
          <p style={{ marginTop: 15, textAlign: 'center' }}>
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SigninPage;
