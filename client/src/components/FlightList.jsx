import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import BookingForm from './BookingForm';  

function FlightList({ refreshTrigger, user }) {
    const [flights, setFlights] = useState([]);
    const [filteredFlights, setFilteredFlights] = useState([]);
    const [selectedFlight, setSelectedFlight] = useState(null);  
    
    // Catch search data if they came from the public landing page
    const location = useLocation();
    
    // Create local state for the on-page search bar
    const [searchParams, setSearchParams] = useState({
        origin: location.state?.origin || '',
        destination: location.state?.destination || '',
        date: location.state?.date || ''
    });

    useEffect(() => {
        const fetchFlights = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/flights');
                setFlights(response.data);
                applyFilters(response.data, searchParams); // Apply initial filters if they came from Home
            } catch (error) {
                console.error("Error fetching flights:", error);
            }
        };
        fetchFlights();
    }, [refreshTrigger]);

    // Function to filter the list based on the search bar
    const applyFilters = (allFlights, currentSearch) => {
        let result = allFlights;
        if (currentSearch.origin) {
            result = result.filter(f => f.origin.toLowerCase() === currentSearch.origin.toLowerCase());
        }
        if (currentSearch.destination) {
            result = result.filter(f => f.destination.toLowerCase() === currentSearch.destination.toLowerCase());
        }
        setFilteredFlights(result);
    };

    // Triggered when the user clicks the "Search" button on this page
    // ... your existing code above ...

    const handleLocalSearch = () => {
        applyFilters(flights, searchParams);
    };

    // --- NEW: Extract unique cities from the fetched flights ---
    const uniqueOrigins = [...new Set(flights.map(f => f.origin))];
    const uniqueDestinations = [...new Set(flights.map(f => f.destination))];

    return (
        <div>
            <div style={styles.searchBar}>
                <div style={styles.inputGroup}>
                    <label style={styles.label}>From</label>
                    <select 
                        style={styles.input} 
                        value={searchParams.origin}
                        onChange={(e) => setSearchParams({...searchParams, origin: e.target.value})}
                    >
                        <option value="">Any Origin</option>
                        {/* --- NEW: Map unique origins dynamically --- */}
                        {uniqueOrigins.map((city, index) => (
                            <option key={index} value={city}>{city}</option>
                        ))}
                    </select>
                </div>

                <div style={styles.inputGroup}>
                    <label style={styles.label}>To</label>
                    <select 
                        style={styles.input} 
                        value={searchParams.destination}
                        onChange={(e) => setSearchParams({...searchParams, destination: e.target.value})}
                    >
                        <option value="">Any Destination</option>
                        {/* --- NEW: Map unique destinations dynamically --- */}
                        {uniqueDestinations.map((city, index) => (
                            <option key={index} value={city}>{city}</option>
                        ))}
                    </select>
                </div>

                <div style={styles.inputGroup}>
                    <label style={styles.label}>Date</label>
                    <input 
                        type="date" 
                        style={styles.input} 
                        value={searchParams.date}
                        onChange={(e) => setSearchParams({...searchParams, date: e.target.value})}
                    />
                </div>

                <button onClick={handleLocalSearch} style={styles.searchBtn}>Search Flights</button>
            </div>

            <h2 style={{color: '#1a508b', marginTop: '30px'}}>🛫 Available Flights</h2>
            
            {filteredFlights.length === 0 ? (
                <p style={{ color: '#666', marginTop: '20px', padding: '20px', backgroundColor: 'white', borderRadius: '8px' }}>
                    No flights found for this route. Try changing your search parameters!
                </p>
            ) : (
                <div style={{ display: 'grid', gap: '15px' }}>
                    {filteredFlights.map((flight) => (
                        <div key={flight._id} style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', backgroundColor: 'white' }}>
                            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                <h3 style={{ margin: '0 0 10px 0', color: '#1a508b' }}>
                                    {flight.flightName} <span style={{fontSize:'0.8em', color:'#666'}}>({flight.flightId})</span>
                                </h3>
                                <h3 style={{margin: 0, color: '#28a745'}}>${flight.basePrice}</h3>
                            </div>
                            
                            <p style={{margin: '5px 0'}}><strong>Route:</strong> {flight.origin} ➝ {flight.destination}</p>
                            <p style={{margin: '5px 0'}}><strong>Time:</strong> {flight.departureTime} - {flight.arrivalTime}</p>
                            
                            <button 
                                onClick={() => setSelectedFlight(flight)}
                                style={{ background: '#0d6efd', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', marginTop: '15px', fontWeight: 'bold' }}
                            >
                                Select Seat & Book
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {selectedFlight && (
                <BookingForm 
                    flight={selectedFlight} 
                    user={user} 
                    onClose={() => setSelectedFlight(null)}
                />
            )}
        </div>
    );
}

const styles = {
    searchBar: {
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        display: 'flex',
        gap: '20px',
        alignItems: 'flex-end',
        flexWrap: 'wrap',
        border: '1px solid #e9ecef'
    },
    inputGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '5px',
        flex: 1,
        minWidth: '200px'
    },
    label: {
        fontSize: '0.85rem',
        color: '#495057',
        fontWeight: 'bold'
    },
    input: {
        padding: '10px',
        border: '1px solid #ced4da',
        borderRadius: '5px',
        fontSize: '1rem',
        outline: 'none'
    },
    searchBtn: {
        backgroundColor: '#1a508b',
        color: 'white',
        border: 'none',
        padding: '12px 30px',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '1rem',
        fontWeight: 'bold',
        height: '43px' // Aligns it perfectly with the inputs
    }
};

export default FlightList;