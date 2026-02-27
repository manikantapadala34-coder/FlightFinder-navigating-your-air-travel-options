import React, { useState } from 'react';
import axios from 'axios';

function Register({ onSwitchToLogin }) {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        adminKey: '' // Added the new field here
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (formData.password !== formData.confirmPassword) {
            alert("❌ Passwords do not match!");
            return;
        }

        // --- THE SECRET KEY LOGIC ---
        const SECRET_ADMIN_KEY = "MANI_ADMIN_2026"; 
        const role = formData.adminKey === SECRET_ADMIN_KEY ? 'admin' : 'customer';

        const payload = {
            username: formData.username,
            email: formData.email,
            password: formData.password,
            usertype: role 
        };

        try {
            await axios.post('http://localhost:5000/api/register', payload);
            alert(`✅ Registration Successful! You registered as a: ${role.toUpperCase()}`);
            onSwitchToLogin(); 
        } catch (error) {
            alert("❌ Registration Failed: " + (error.response?.data?.error || error.message));
        }
    };

    return (
        <div>
            <div style={{ backgroundColor: '#1a508b', padding: '15px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ color: 'white', margin: 0 }}>SB Flights</h2>
                <span onClick={onSwitchToLogin} style={{ color: 'white', cursor: 'pointer' }}>Login</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
                <div style={{ width: '400px', padding: '30px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', borderRadius: '8px', textAlign: 'center' }}>
                    <h2 style={{ color: '#0056b3', marginBottom: '20px' }}>Register</h2>
                    
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        <input name="username" placeholder="Full Name" onChange={handleChange} style={styles.input} required />
                        <input name="email" type="email" placeholder="Email Address" onChange={handleChange} style={styles.input} required />
                        <input name="password" type="password" placeholder="Password" onChange={handleChange} style={styles.input} required />
                        <input name="confirmPassword" type="password" placeholder="Confirm Password" onChange={handleChange} style={styles.input} required />
                        
                        {/* --- NEW ADMIN KEY INPUT --- */}
                        <input name="adminKey" placeholder="Secret Admin Key (Optional)" onChange={handleChange} style={styles.input} />
                        
                        <button type="submit" style={styles.button}>Sign Up</button>
                    </form>

                    <p style={{ marginTop: '20px', fontSize: '14px', color: '#666' }}>
                        Already have an account? <span onClick={onSwitchToLogin} style={{ color: '#0056b3', cursor: 'pointer', fontWeight: 'bold' }}>Login</span>
                    </p>
                </div>
            </div>
        </div>
    );
}

const styles = {
    input: { padding: '12px', border: '1px solid #ccc', borderRadius: '4px' },
    button: { backgroundColor: '#0056b3', color: 'white', padding: '12px', border: 'none', borderRadius: '4px', fontSize: '16px', cursor: 'pointer', marginTop: '10px' }
};

export default Register;