import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AllBookings() {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const fetchAllBookings = async () => {
            try {
                // This fetches every booking in the database for the admin to see
                const response = await axios.get('http://localhost:5000/api/bookings');
                setBookings(response.data);
            } catch (error) {
                console.error("Error fetching all bookings:", error);
            }
        };
        fetchAllBookings();
    }, []);

    const handleCancelTicket = async (bookingId) => {
        const confirmCancel = window.confirm("Are you sure you want to cancel this user's ticket?");
        if (!confirmCancel) return;

        try {
            await axios.put(`http://localhost:5000/api/bookings/${bookingId}`, {
                bookingStatus: 'cancelled' 
            });

            setBookings(prevBookings => 
                prevBookings.map(booking => 
                    booking._id === bookingId 
                        ? { ...booking, bookingStatus: 'cancelled' } 
                        : booking
                )
            );
            alert("Ticket successfully cancelled.");
        } catch (error) {
            console.error("Error cancelling booking:", error);
            alert("Failed to cancel the ticket.");
        }
    };

    if (bookings.length === 0) {
        return <div style={{ padding: '40px', textAlign: 'center' }}>No bookings found in the system.</div>;
    }

    return (
        <div style={styles.container}>
            <h1 style={styles.pageTitle}>Bookings</h1>
            
            <div style={styles.gridContainer}>
                {bookings.map((b) => (
                    <div key={b._id} style={styles.card}>
                        
                        <div style={styles.row}>
                            <span style={styles.label}>Booking ID:</span> {b._id}
                        </div>
                        
                        <div style={styles.twoColumnRow}>
                            <div><span style={styles.label}>Mobile:</span> {b.mobile || 'N/A'}</div>
                            <div><span style={styles.label}>Email:</span> {b.email || 'N/A'}</div>
                        </div>

                        <div style={styles.twoColumnRow}>
                            <div><span style={styles.label}>Flight Id:</span> {b.flightId || 'N/A'}</div>
                            <div><span style={styles.label}>Flight name:</span> {b.flightName || 'N/A'}</div>
                        </div>

                        <div style={styles.twoColumnRow}>
                            <div><span style={styles.label}>On-boarding:</span> {b.departure || 'N/A'}</div>
                            <div><span style={styles.label}>Destination:</span> {b.destination || 'N/A'}</div>
                        </div>

                        <div style={styles.twoColumnRow}>
                            <div>
                                <span style={styles.label}>Passengers:</span>
                                <div style={styles.passengerList}>
                                    {b.passengers && b.passengers.length > 0 ? (
                                        b.passengers.map((p, index) => (
                                            <div key={index} style={styles.passengerItem}>
                                                {index + 1}. Name: {p.name}, Age: {p.age}
                                            </div>
                                        ))
                                    ) : (
                                        'N/A'
                                    )}
                                </div>
                            </div>
                            <div>
                                <span style={styles.label}>Seats:</span> {Array.isArray(b.seats) ? b.seats.join(', ') : (b.seats || 'N/A')}
                            </div>
                        </div>

                        <div style={styles.twoColumnRow}>
                            <div><span style={styles.label}>Booking date:</span> {b.bookingDate || 'N/A'}</div>
                            <div><span style={styles.label}>Journey date:</span> {b.journeyDate || 'N/A'}</div>
                        </div>

                        <div style={styles.twoColumnRow}>
                            <div><span style={styles.label}>Journey Time:</span> {b.journeyTime || 'N/A'}</div>
                            <div><span style={styles.label}>Total price:</span> {b.totalPrice || 'N/A'}</div>
                        </div>

                        <div style={styles.statusRow}>
                            <span style={styles.label}>Booking status: </span>
                            <span style={{ 
                                color: b.bookingStatus === 'cancelled' ? '#dc3545' : '#495057',
                                fontWeight: 'bold',
                                marginLeft: '5px'
                            }}>
                                {b.bookingStatus || 'confirmed'}
                            </span>
                        </div>

                        {b.bookingStatus !== 'cancelled' && (
                            <button 
                                style={styles.cancelButton} 
                                onClick={() => handleCancelTicket(b._id)}
                            >
                                Cancel Ticket
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

// These styles are identical to the user bookings page to maintain consistency
const styles = {
    container: { padding: '30px 10%', fontFamily: 'Arial, sans-serif', color: '#333' },
    pageTitle: { color: '#2b5784', fontSize: '2rem', marginBottom: '30px', fontWeight: 'normal' },
    gridContainer: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '30px' },
    card: { backgroundColor: '#ffffff', borderRadius: '12px', padding: '25px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', border: '1px solid #f0f0f0', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem', color: '#495057' },
    row: { marginBottom: '4px' },
    twoColumnRow: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '4px' },
    label: { color: '#2b5784', fontWeight: 'bold', marginRight: '5px' },
    passengerList: { marginLeft: '15px', marginTop: '4px', fontSize: '0.85rem' },
    passengerItem: { marginBottom: '2px' },
    statusRow: { marginTop: '10px', marginBottom: '15px' },
    cancelButton: { backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '5px', padding: '8px 16px', fontSize: '0.9rem', cursor: 'pointer', alignSelf: 'flex-start', marginTop: '5px' }
};

export default AllBookings;