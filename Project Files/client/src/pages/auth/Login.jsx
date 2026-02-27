import React, { useState } from 'react';
import axios from 'axios';

function Login({ onLogin, onSwitchToRegister, onHome }) {
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/login', formData);
            alert(response.data.message);
            onLogin(response.data.user);
        } catch (error) {
            alert('❌ Login Failed: ' + (error.response?.data?.error || "Unknown Error"));
        }
    };

    return (
        <div>
            {/* Blue Header matching the screenshot */}
            <div style={{ backgroundColor: '#1a508b', padding: '15px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ color: 'white', margin: 0 }}>SB Flights</h2>
                <div style={{ display: 'flex', gap: '20px' }}>
                    <span onClick={onHome} style={{ color: 'white', cursor: 'pointer' }}>Home</span>
                    <span style={{ color: '#ccc', cursor: 'default' }}>Login</span>
                </div>
            </div>

            {/* Login Card */}
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '80px' }}>
                <div style={{ width: '400px', padding: '30px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', borderRadius: '8px', textAlign: 'center' }}>
                    <h2 style={{ color: '#0056b3', marginBottom: '30px' }}>Login</h2>
                    
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <input 
                            type="email" 
                            placeholder="Email address" 
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            style={{ padding: '12px', border: '1px solid #ccc', borderRadius: '4px' }}
                            required
                        />
                        <input 
                            type="password" 
                            placeholder="Password" 
                            value={formData.password}
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                            style={{ padding: '12px', border: '1px solid #ccc', borderRadius: '4px' }}
                            required
                        />
                        
                        <button type="submit" style={{ backgroundColor: '#0056b3', color: 'white', padding: '12px', border: 'none', borderRadius: '4px', fontSize: '16px', cursor: 'pointer' }}>
                            Sign in
                        </button>
                    </form>

                    <p style={{ marginTop: '20px', fontSize: '14px', color: '#666' }}>
                        Not registered? <span onClick={onSwitchToRegister} style={{ color: '#0056b3', cursor: 'pointer', fontWeight: 'bold' }}>Register</span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;