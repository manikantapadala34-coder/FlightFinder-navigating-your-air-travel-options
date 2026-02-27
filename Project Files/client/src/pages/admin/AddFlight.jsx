import React, { useState } from 'react';
import axios from 'axios';

function AddFlight() {
    const [formData, setFormData] = useState({
        flightName: '',
        flightId: '',
        origin: '',
        destination: '',
        departureTime: '',
        arrivalTime: '',
        basePrice: '',
        totalSeats: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/add', formData);
            alert('✅ Flight Added Successfully!');
            // Reset form
            setFormData({ 
                flightName: '', flightId: '', origin: '', destination: '', 
                departureTime: '', arrivalTime: '', basePrice: '', totalSeats: '' 
            });
        } catch (error) {
            console.error("Error adding flight:", error);
            alert('❌ Error adding flight: ' + (error.response?.data?.error || "Server Error"));
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.formCard}>
                <h3 style={styles.panelTitle}>✈️ Founder Panel: Add Flight</h3>
                <form onSubmit={handleSubmit} style={styles.formGrid}>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Flight Name</label>
                        <input name="flightName" placeholder="e.g. Indigo" value={formData.flightName} onChange={handleChange} style={styles.input} required />
                    </div>
                    
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Flight ID</label>
                        <input name="flightId" placeholder="e.g. 6E-204" value={formData.flightId} onChange={handleChange} style={styles.input} required />
                    </div>

                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Origin</label>
                        <input name="origin" placeholder="e.g. Chennai" value={formData.origin} onChange={handleChange} style={styles.input} required />
                    </div>

                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Destination</label>
                        <input name="destination" placeholder="e.g. Bangalore" value={formData.destination} onChange={handleChange} style={styles.input} required />
                    </div>

                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Departure Time</label>
                        <input name="departureTime" type="time" value={formData.departureTime} onChange={handleChange} style={styles.input} required />
                    </div>

                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Arrival Time</label>
                        <input name="arrivalTime" type="time" value={formData.arrivalTime} onChange={handleChange} style={styles.input} required />
                    </div>

                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Price ($)</label>
                        <input name="basePrice" type="number" placeholder="Price" value={formData.basePrice} onChange={handleChange} style={styles.input} required />
                    </div>

                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Total Seats</label>
                        <input name="totalSeats" type="number" placeholder="Seats" value={formData.totalSeats} onChange={handleChange} style={styles.input} required />
                    </div>

                    <div style={styles.buttonWrapper}>
                        <button type="submit" style={styles.addButton}>Add Flight</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

const styles = {
    container: { padding: '40px 10%', display: 'flex', justifyContent: 'center' },
    formCard: {
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '12px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '800px'
    },
    panelTitle: { color: '#2b5784', marginBottom: '25px', fontWeight: 'normal', fontSize: '1.5rem' },
    formGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' },
    inputGroup: { display: 'flex', flexDirection: 'column', gap: '5px' },
    label: { fontSize: '0.85rem', color: '#666', fontWeight: 'bold' },
    input: { padding: '10px', border: '1px solid #ddd', borderRadius: '5px', fontSize: '1rem' },
    buttonWrapper: { gridColumn: 'span 2', marginTop: '10px' },
    addButton: {
        backgroundColor: '#28a745',
        color: 'white',
        border: 'none',
        padding: '12px',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '1rem',
        fontWeight: 'bold',
        width: '100%',
        transition: 'background 0.3s'
    }
};

export default AddFlight;