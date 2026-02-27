import React, { useEffect, useState } from 'react';
import axios from 'axios';

function MyBookings({user}) {
    const [bookings, setBookings] = useState([]);
    const [ticketToShow, setTicketToShow] = useState(null);

    const fetchBookings = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/bookings');
            const myTickets = response.data.filter(b => b.email === user?.email);
            
            setBookings(myTickets);
        } catch (error) {
            console.error("Error fetching bookings:", error);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    const handleCancelTicket = async (bookingId) => {
        const confirmCancel = window.confirm("Are you sure you want to cancel this ticket?");
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
        } catch (error) {
            console.error("Error cancelling booking:", error);
            alert("Failed to cancel the ticket. Please try again.");
        }
    };

    // Helper to format dates to match the "YYYY-MM-DD" look in the picture
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const d = new Date(dateString);
        return d.toISOString().split('T')[0];
    };

    if (bookings.length === 0) {
        return <div style={{ padding: '40px', textAlign: 'center' }}>No bookings found.</div>;
    }

    return (
        <div style={styles.container}>
            <h1 style={styles.pageTitle}>Bookings</h1>
            
            <div style={styles.gridContainer}>
                {bookings.map((b) => (
                    <div key={b._id} style={styles.card}>
                        
                        <div style={styles.textRow}>
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
                            <div><span style={styles.label}>Passengers:</span></div>
                            <div><span style={styles.label}>Seats:</span> {Array.isArray(b.seats) ? b.seats.join(', ') : (b.seats || 'N/A')}</div>
                        </div>

                        <div style={styles.passengerList}>
                            {b.passengers && b.passengers.length > 0 ? (
                                b.passengers.map((p, index) => (
                                    <div key={index} style={{ marginBottom: '3px' }}>
                                        {index + 1}. Name: {p.name}, Age: {p.age}
                                    </div>
                                ))
                            ) : (
                                <div>N/A</div>
                            )}
                        </div>

                        <div style={styles.twoColumnRow}>
                            <div><span style={styles.label}>Booking date:</span> {formatDate(b.bookingDate)}</div>
                            <div><span style={styles.label}>Journey date:</span> {formatDate(b.journeyDate)}</div>
                        </div>

                        <div style={styles.twoColumnRow}>
                            <div><span style={styles.label}>Journey Time:</span> {b.journeyTime || 'N/A'}</div>
                            <div><span style={styles.label}>Total price:</span> {b.totalPrice || 'N/A'}</div>
                        </div>

                        <div style={styles.textRow}>
                            <span style={styles.label}>Booking status: </span>
                            <span style={{ color: b.bookingStatus === 'cancelled' ? '#dc3545' : '#495057' }}>
                                {b.bookingStatus || 'confirmed'}
                            </span>
                        </div>

                        <div style={styles.buttonGroup}>
                            {b.bookingStatus !== 'cancelled' && (
                                <>
                                    <button 
                                        style={styles.cancelButton} 
                                        onClick={() => handleCancelTicket(b._id)}
                                    >
                                        Cancel Ticket
                                    </button>
                                    
                                    {/* The added E-Ticket button, styled to match the layout cleanly */}
                                    <button 
                                        style={styles.eticketButton} 
                                        onClick={() => setTicketToShow(b)}
                                    >
                                        View E-Ticket
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* --- E-TICKET MODAL --- */}
            {ticketToShow && (
                <div style={styles.overlay} onClick={() => setTicketToShow(null)}>
                    <div style={styles.ticketModal} onClick={e => e.stopPropagation()}>
                        <div style={styles.ticketHeader}>
                            <h2 style={{margin: 0}}>BOARDING PASS</h2>
                            <span style={{fontSize: '1.2rem'}}>✈️ {ticketToShow.flightName}</span>
                        </div>
                        <div style={styles.ticketBody}>
                            <div style={styles.ticketRow}>
                                <div>
                                    <p style={styles.ticketLabel}>PASSENGER NAME</p>
                                    <h3 style={styles.ticketValue}>{ticketToShow.passengers[0]?.name || 'N/A'}</h3>
                                </div>
                                <div>
                                    <p style={styles.ticketLabel}>CLASS</p>
                                    <h3 style={styles.ticketValue}>{ticketToShow.seatClass || 'Business'}</h3>
                                </div>
                            </div>
                            <div style={styles.ticketRow}>
                                <div>
                                    <p style={styles.ticketLabel}>FROM</p>
                                    <h2 style={styles.ticketCity}>{ticketToShow.departure}</h2>
                                </div>
                                <div><span style={{fontSize: '2rem', color: '#ccc'}}>✈️</span></div>
                                <div style={{textAlign: 'right'}}>
                                    <p style={styles.ticketLabel}>TO</p>
                                    <h2 style={styles.ticketCity}>{ticketToShow.destination}</h2>
                                </div>
                            </div>
                            <div style={styles.ticketRow}>
                                <div>
                                    <p style={styles.ticketLabel}>FLIGHT ID</p>
                                    <h3 style={styles.ticketValue}>{ticketToShow.flightId}</h3>
                                </div>
                                <div>
                                    <p style={styles.ticketLabel}>SEAT(S)</p>
                                    <h3 style={{...styles.ticketValue, color: '#d9534f', fontSize: '1.5rem'}}>{ticketToShow.seats}</h3>
                                </div>
                            </div>
                        </div>
                        <div style={styles.ticketFooter}>
                            <div style={styles.barcode}>||| |||| | || ||||| || | ||| |||| || | || ||||</div>
                            <p style={{margin: '5px 0 0 0', fontSize: '0.7rem', color: '#999'}}>BOOKING REF: {ticketToShow._id.substring(0, 8).toUpperCase()}</p>
                        </div>
                        <button style={styles.closeModalBtn} onClick={() => setTicketToShow(null)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}

const styles = {
    container: { padding: '20px 5%', fontFamily: 'Arial, sans-serif', color: '#495057' },
    pageTitle: { color: '#2b5784', fontSize: '2rem', marginBottom: '25px', fontWeight: 'normal' },
    gridContainer: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '30px' },
    card: { 
        backgroundColor: '#ffffff', 
        borderRadius: '8px', 
        padding: '25px 30px', 
        boxShadow: '0 2px 10px rgba(0,0,0,0.06)', 
        border: '1px solid #f0f0f0', 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '8px', 
        fontSize: '14px' // Matched font size to the picture
    },
    textRow: { marginBottom: '2px' },
    twoColumnRow: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '2px' },
    label: { color: '#3b6982', fontWeight: 'bold', marginRight: '5px' }, // The specific teal-blue from the screenshot
    passengerList: { marginLeft: '20px', marginTop: '0px', marginBottom: '6px' }, // Indented exactly like the picture
    buttonGroup: { display: 'flex', gap: '15px', marginTop: '15px' },
    
    // Matched the solid red button from the picture exactly
    cancelButton: { 
        backgroundColor: '#e34051', 
        color: 'white', 
        border: 'none', 
        borderRadius: '4px', 
        padding: '8px 18px', 
        fontSize: '14px', 
        cursor: 'pointer' 
    },
    // The E-Ticket button sits cleanly next to it
    eticketButton: { 
        backgroundColor: '#0d6efd', 
        color: 'white', 
        border: 'none', 
        borderRadius: '4px', 
        padding: '8px 18px', 
        fontSize: '14px', 
        cursor: 'pointer' 
    },
    
    // Modal Styles
    overlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 },
    ticketModal: { backgroundColor: '#fff', borderRadius: '15px', width: '500px', overflow: 'hidden', boxShadow: '0 15px 35px rgba(0,0,0,0.2)', position: 'relative' },
    ticketHeader: { backgroundColor: '#1a508b', color: 'white', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    ticketBody: { padding: '30px 20px', display: 'flex', flexDirection: 'column', gap: '25px', backgroundColor: '#f8f9fa' },
    ticketRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    ticketLabel: { margin: '0 0 5px 0', fontSize: '0.75rem', color: '#6c757d', fontWeight: 'bold', letterSpacing: '1px' },
    ticketValue: { margin: 0, fontSize: '1.2rem', color: '#212529' },
    ticketCity: { margin: 0, fontSize: '2.2rem', color: '#1a508b', fontWeight: '900' },
    ticketFooter: { backgroundColor: '#fff', padding: '20px', textAlign: 'center', borderTop: '2px dashed #ddd' },
    barcode: { fontSize: '2rem', letterSpacing: '2px', color: '#333', fontFamily: 'monospace' },
    closeModalBtn: { width: '100%', padding: '15px', backgroundColor: '#f1f3f5', border: 'none', color: '#495057', fontSize: '1rem', cursor: 'pointer', fontWeight: 'bold' }
};

export default MyBookings;