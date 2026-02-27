import React, { useState } from 'react';
import axios from 'axios';

function BookingForm({ flight, onClose, user }) {
    const [bookingData, setBookingData] = useState({
        name: user?.username || '',
        email: user?.email || '',
        mobile: '',
        seatClass: 'Business' // Defaulting to Business class for John's scenario
    });

    const [selectedSeats, setSelectedSeats] = useState([]);
    
    // We mock a few pre-booked seats so the plane doesn't look completely empty
    const bookedSeats = ['1B', '2C', '4A', '4B', '5F']; 

    const handleSeatClick = (seatId) => {
        if (bookedSeats.includes(seatId)) return; // Prevent selecting booked seats
        
        if (selectedSeats.includes(seatId)) {
            // Deselect seat if already clicked
            setSelectedSeats(selectedSeats.filter(s => s !== seatId));
        } else {
            // Select new seat (limit to 5)
            if (selectedSeats.length >= 5) {
                alert("You can only book up to 5 seats at once.");
                return;
            }
            setSelectedSeats([...selectedSeats, seatId]);
        }
    };

    const handleChange = (e) => {
        setBookingData({ ...bookingData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (selectedSeats.length === 0) {
            alert("⚠️ Please select at least one seat from the map on the right.");
            return;
        }

        const payload = {
            flight: flight._id,
            flightName: flight.flightName,
            flightId: flight.flightId,
            departure: flight.origin,
            destination: flight.destination,
            email: bookingData.email,
            mobile: bookingData.mobile,
            seats: selectedSeats.join(', '), // Sends data as "1A, 1C"
            seatClass: bookingData.seatClass,
            totalPrice: flight.basePrice * selectedSeats.length,
            passengers: [{ name: bookingData.name, age: 30 }] 
        };

        try {
            await axios.post('http://localhost:5000/api/book', payload);
            // This alert acts as our "Payment Gateway" simulation for John's scenario
            alert(`✅ Payment Processed Securely!\n\nBooking Confirmed for Seats: ${selectedSeats.join(', ')}`);
            onClose(); 
        } catch (error) {
            console.error("Booking Error:", error);
            alert("❌ Booking Failed: " + (error.response?.data?.error || error.message));
        }
    };

    // Airplane Layout Data
    const rows = [1, 2, 3, 4, 5];
    const colsLeft = ['A', 'B', 'C'];
    const colsRight = ['D', 'E', 'F'];

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                
                <div style={styles.header}>
                    <h2 style={{margin: 0, color: '#1a508b'}}>✈️ Checkout</h2>
                    <p style={{margin: '5px 0 0 0', color: '#666'}}>{flight.origin} ➝ {flight.destination}</p>
                </div>
                
                <div style={styles.splitLayout}>
                    {/* LEFT SIDE: Passenger Form */}
                    <form onSubmit={handleSubmit} style={styles.form}>
                        <label style={styles.label}>Passenger Name:</label>
                        <input name="name" value={bookingData.name} onChange={handleChange} style={styles.input} required />

                        <label style={styles.label}>Email:</label>
                        <input name="email" type="email" value={bookingData.email} readOnly style={{...styles.input, backgroundColor: '#e9ecef'}} />

                        <label style={styles.label}>Mobile:</label>
                        <input name="mobile" onChange={handleChange} style={styles.input} required />

                        <label style={styles.label}>Cabin Class:</label>
                        <select name="seatClass" value={bookingData.seatClass} onChange={handleChange} style={styles.input}>
                            <option value="Business">Business</option>
                            <option value="Economy">Economy</option>
                        </select>

                        <div style={styles.priceBox}>
                            <p style={{margin: 0, fontSize: '0.9rem'}}>Total Price:</p>
                            <h3 style={{margin: 0, color: '#28a745'}}>${flight.basePrice * (selectedSeats.length || 1)}</h3>
                        </div>

                        <div style={styles.buttons}>
                            <button type="button" onClick={onClose} style={styles.cancelBtn}>Cancel</button>
                            <button type="submit" style={styles.submitBtn}>Pay Securely</button>
                        </div>
                    </form>

                    {/* RIGHT SIDE: Visual Seat Map */}
                    <div style={styles.seatMapContainer}>
                        <h4 style={{textAlign: 'center', margin: '0 0 15px 0', color: '#333'}}>Select Your Seat</h4>
                        
                        <div style={styles.planeBody}>
                            {rows.map(row => (
                                <div key={row} style={styles.seatRow}>
                                    {/* Left Window/Aisle Seats */}
                                    <div style={styles.seatGroup}>
                                        {colsLeft.map(col => {
                                            const seatId = `${row}${col}`;
                                            const isBooked = bookedSeats.includes(seatId);
                                            const isSelected = selectedSeats.includes(seatId);
                                            return (
                                                <div 
                                                    key={seatId} 
                                                    onClick={() => handleSeatClick(seatId)}
                                                    style={{
                                                        ...styles.seat,
                                                        backgroundColor: isBooked ? '#ccc' : isSelected ? '#0d6efd' : '#e3f2fd',
                                                        cursor: isBooked ? 'not-allowed' : 'pointer',
                                                        color: isSelected ? 'white' : '#333',
                                                        border: isSelected ? '2px solid #0a58ca' : '1px solid #b6d4fe'
                                                    }}
                                                >
                                                    {seatId}
                                                </div>
                                            )
                                        })}
                                    </div>
                                    
                                    <div style={styles.aisle}>{row}</div>
                                    
                                    {/* Right Window/Aisle Seats */}
                                    <div style={styles.seatGroup}>
                                        {colsRight.map(col => {
                                            const seatId = `${row}${col}`;
                                            const isBooked = bookedSeats.includes(seatId);
                                            const isSelected = selectedSeats.includes(seatId);
                                            return (
                                                <div 
                                                    key={seatId} 
                                                    onClick={() => handleSeatClick(seatId)}
                                                    style={{
                                                        ...styles.seat,
                                                        backgroundColor: isBooked ? '#ccc' : isSelected ? '#0d6efd' : '#e3f2fd',
                                                        cursor: isBooked ? 'not-allowed' : 'pointer',
                                                        color: isSelected ? 'white' : '#333',
                                                        border: isSelected ? '2px solid #0a58ca' : '1px solid #b6d4fe'
                                                    }}
                                                >
                                                    {seatId}
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div style={styles.legend}>
                            <div style={styles.legendItem}><div style={{...styles.legendBox, backgroundColor: '#e3f2fd'}}></div> Available</div>
                            <div style={styles.legendItem}><div style={{...styles.legendBox, backgroundColor: '#0d6efd'}}></div> Selected</div>
                            <div style={styles.legendItem}><div style={{...styles.legendBox, backgroundColor: '#ccc'}}></div> Booked</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const styles = {
    overlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 },
    modal: { backgroundColor: 'white', padding: '30px', borderRadius: '12px', width: '750px', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' },
    header: { borderBottom: '1px solid #eee', paddingBottom: '15px', marginBottom: '20px' },
    splitLayout: { display: 'flex', gap: '40px' },
    form: { flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' },
    label: { fontSize: '0.85rem', color: '#666', fontWeight: 'bold' },
    input: { padding: '10px', border: '1px solid #ccc', borderRadius: '5px', fontSize: '0.95rem' },
    priceBox: { backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '8px', border: '1px solid #e9ecef', marginTop: '10px', textAlign: 'center' },
    buttons: { display: 'flex', justifyContent: 'space-between', marginTop: '15px' },
    cancelBtn: { padding: '10px 15px', background: '#ccc', border: 'none', cursor: 'pointer', borderRadius: '5px', fontWeight: 'bold' },
    submitBtn: { padding: '10px 15px', background: '#28a745', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '5px', fontWeight: 'bold', flex: 1, marginLeft: '10px' },
    
    seatMapContainer: { flex: 1, backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px', border: '1px solid #e9ecef', display: 'flex', flexDirection: 'column', alignItems: 'center' },
    planeBody: { display: 'flex', flexDirection: 'column', gap: '10px', backgroundColor: 'white', padding: '20px', borderRadius: '40px 40px 10px 10px', border: '2px solid #ddd' },
    seatRow: { display: 'flex', alignItems: 'center', gap: '15px' },
    seatGroup: { display: 'flex', gap: '5px' },
    seat: { width: '35px', height: '35px', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '5px 5px 2px 2px', fontSize: '0.75rem', fontWeight: 'bold', userSelect: 'none', transition: 'all 0.2s' },
    aisle: { width: '20px', textAlign: 'center', color: '#aaa', fontSize: '0.8rem' },
    legend: { display: 'flex', gap: '15px', marginTop: '20px', fontSize: '0.8rem', color: '#666' },
    legendItem: { display: 'flex', alignItems: 'center', gap: '5px' },
    legendBox: { width: '15px', height: '15px', borderRadius: '3px' }
};

export default BookingForm;     