import React from 'react';
import { useNavigate } from 'react-router-dom';

export function ProtectedNavbar({ onLogout }) {
    const navigate = useNavigate();
    return (
        <div style={styles.navContainer}>
            <h2 style={styles.logo}>SB Flights</h2>
            <div style={styles.links}>
                <span onClick={() => navigate('/flights')} style={styles.link}>Home</span>
                <span onClick={() => navigate('/bookings')} style={styles.link}>Bookings</span>
                <span onClick={onLogout} style={styles.link}>Logout</span>
            </div>
        </div>
    );
}

export function AdminNavbar({ onLogout }) {
    const navigate = useNavigate();
    return (
        <div style={styles.navContainer}>
            <h2 style={styles.logo}>SB Flights (Admin)</h2>
            <div style={styles.links}>
                <span onClick={() => navigate('/admin')} style={styles.link}>Home</span>
                <span onClick={() => navigate('/admin/users')} style={styles.link}>Users</span>
                <span onClick={() => navigate('/admin/bookings')} style={styles.link}>Bookings</span>
                <span onClick={() => navigate('/admin/flights')} style={styles.link}>Flights</span>
                <span onClick={onLogout} style={styles.link}>Logout</span>
            </div>
        </div>
    );
}

const styles = {
    navContainer: {
        backgroundColor: '#1a508b',
        padding: '15px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    logo: {
        color: 'white',
        margin: 0,
        fontSize: '1.5rem',
        fontWeight: 'normal'
    },
    links: {
        display: 'flex',
        gap: '20px',
        fontSize: '0.9rem'
    },
    link: {
        color: 'white',
        cursor: 'pointer'
    }
};