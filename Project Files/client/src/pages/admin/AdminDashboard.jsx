import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AdminDashboard() {
    const navigate = useNavigate();
    const [counts, setCounts] = useState({ users: 0, bookings: 0, flights: 0 });

    useEffect(() => {
        const fetchCounts = async () => {
            try {
                // Fetch arrays to get their lengths for the summary cards
                const [usersRes, bookingsRes, flightsRes] = await Promise.all([
                    axios.get('http://localhost:5000/api/users').catch(() => ({ data: [] })), 
                    axios.get('http://localhost:5000/api/bookings').catch(() => ({ data: [] })),
                    axios.get('http://localhost:5000/api/flights').catch(() => ({ data: [] }))
                ]);
                
                setCounts({
                    users: usersRes.data.length,
                    bookings: bookingsRes.data.length,
                    flights: flightsRes.data.length
                });
            } catch (error) {
                console.error("Error fetching admin stats:", error);
            }
        };
        fetchCounts();
    }, []);

    return (
        <div style={styles.container}>
            <div style={styles.cardRow}>
                <div style={styles.card}>
                    <h3 style={styles.cardTitle}>Users</h3>
                    <p style={styles.cardCount}>{counts.users}</p>
                    <button style={styles.viewBtn} onClick={() => navigate('/admin/users')}>View all</button>
                </div>

                <div style={styles.card}>
                    <h3 style={styles.cardTitle}>Bookings</h3>
                    <p style={styles.cardCount}>{counts.bookings}</p>
                    <button style={styles.viewBtn} onClick={() => navigate('/admin/bookings')}>View all</button>
                </div>

                <div style={styles.card}>
                    <h3 style={styles.cardTitle}>Flights</h3>
                    <p style={styles.cardCount}>{counts.flights}</p>
                    <button style={styles.viewBtn} onClick={() => navigate('/admin/flights')}>View all</button>
                </div>
            </div>

            <div style={styles.operatorPanel}>
                <h3 style={styles.panelTitle}>New Operator Applications</h3>
                <p style={styles.emptyText}>No new requests..</p>
            </div>
        </div>
    );
}

const styles = {
    container: { padding: '40px 10%', fontFamily: 'Arial, sans-serif' },
    cardRow: { display: 'flex', justifyContent: 'center', gap: '30px', marginBottom: '40px' },
    card: { backgroundColor: 'white', padding: '25px', borderRadius: '8px', boxShadow: '0 2px 12px rgba(0,0,0,0.08)', textAlign: 'center', width: '220px', border: '1px solid #f0f0f0' },
    cardTitle: { margin: '0 0 10px 0', color: '#333', fontSize: '1.2rem', fontWeight: 'normal' },
    cardCount: { fontSize: '1.5rem', color: '#666', margin: '0 0 20px 0' },
    viewBtn: { backgroundColor: '#0d6efd', color: 'white', border: 'none', padding: '10px 0', width: '100%', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' },
    operatorPanel: { backgroundColor: 'white', padding: '30px', borderRadius: '8px', boxShadow: '0 2px 12px rgba(0,0,0,0.08)', border: '1px solid #f0f0f0', minHeight: '200px' },
    panelTitle: { color: '#2b5784', marginTop: 0, fontSize: '1.4rem', fontWeight: 'normal' },
    emptyText: { color: '#666', fontSize: '0.9rem', marginTop: '20px' }
};

export default AdminDashboard;