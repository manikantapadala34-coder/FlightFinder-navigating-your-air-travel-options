import React, { useState, useEffect } from 'react';
import axios from 'axios';
import bgImage from '../assets/bg.jpg'; 

function Home({ onSearch, onLoginClick }) { 
    const [searchParams, setSearchParams] = useState({
        origin: '',
        destination: '',
        date: '',
        returnJourney: false
    });

    // New states to hold the dynamic lists of cities
    const [origins, setOrigins] = useState([]);
    const [destinations, setDestinations] = useState([]);

    // Fetch flights on load to populate the dropdowns
    useEffect(() => {
        const fetchCities = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/flights');
                const flights = response.data;
                
                // Extract unique cities using Set
                const uniqueOrigins = [...new Set(flights.map(f => f.origin))];
                const uniqueDestinations = [...new Set(flights.map(f => f.destination))];
                
                setOrigins(uniqueOrigins);
                setDestinations(uniqueDestinations);
            } catch (error) {
                console.error("Error fetching cities for dropdowns:", error);
            }
        };
        fetchCities();
    }, []);

    const handleSearch = () => {
        onSearch(searchParams);
    };

    return (
        <div style={{...styles.heroContainer, backgroundImage: `url(${bgImage})`}}>
            <nav style={styles.navbar}>
                <h2 style={{ color: 'white', margin: 0 }}>SB Flights</h2>
                <div style={styles.navLinks}>
                    <a href="#" style={styles.link}>Home</a>
                    <span onClick={onLoginClick} style={{...styles.link, cursor: 'pointer'}}>Login</span>
                </div>
            </nav>

            <div style={styles.content}>
                <h1 style={styles.title}>Embark on an <br/>Extraordinary Flight <br/>Booking Adventure!</h1>
                <p style={styles.subtitle}>
                    Unleash your travel desires and book extraordinary Flight journeys that will transport you to unforgettable destinations...
                </p>

                <div style={styles.searchBox}>
                    <div style={styles.toggleContainer}>
                        <label style={styles.toggleLabel}>
                            <input 
                                type="checkbox" 
                                onChange={(e) => setSearchParams({...searchParams, returnJourney: e.target.checked})} 
                            />
                            <span style={{marginLeft: '8px', color: 'white'}}>Return journey</span>
                        </label>
                    </div>

                    <div style={styles.inputGroup}>
                        <div style={styles.inputWrapper}>
                            <label style={styles.inputLabel}>Departure City</label>
                            <select 
                                style={styles.input} 
                                onChange={(e) => setSearchParams({...searchParams, origin: e.target.value})}
                            >
                                <option value="">Select Origin</option>
                                {/* Map dynamic origins */}
                                {origins.map((city, index) => (
                                    <option key={index} value={city}>{city}</option>
                                ))}
                            </select>
                        </div>

                        <div style={styles.inputWrapper}>
                            <label style={styles.inputLabel}>Destination City</label>
                            <select 
                                style={styles.input} 
                                onChange={(e) => setSearchParams({...searchParams, destination: e.target.value})}
                            >
                                <option value="">Select Destination</option>
                                {/* Map dynamic destinations */}
                                {destinations.map((city, index) => (
                                    <option key={index} value={city}>{city}</option>
                                ))}
                            </select>
                        </div>

                        <div style={styles.inputWrapper}>
                            <label style={styles.inputLabel}>Journey date</label>
                            <input 
                                type="date" 
                                style={styles.input} 
                                onChange={(e) => setSearchParams({...searchParams, date: e.target.value})}
                            />
                        </div>

                        <button style={styles.searchButton} onClick={handleSearch}>
                            Search
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Ensure your styles object remains exactly the same at the bottom of the file
const styles = {
    heroContainer: { backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh', display: 'flex', flexDirection: 'column' },
    navbar: { display: 'flex', justifyContent: 'space-between', padding: '20px 50px', backgroundColor: 'rgba(25, 60, 100, 0.8)' },
    navLinks: { display: 'flex', gap: '30px', alignItems: 'center' },
    link: { color: 'white', textDecoration: 'none', fontSize: '16px' },
    content: { padding: '0 10%', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', flex: 1 },
    title: { fontSize: '3.5rem', marginBottom: '10px', fontWeight: 'bold', lineHeight: '1.2' },
    subtitle: { fontSize: '1rem', maxWidth: '650px', marginBottom: '40px', lineHeight: '1.5', color: '#e0e0e0' },
    searchBox: { backgroundColor: 'rgba(255, 255, 255, 0.25)', backdropFilter: 'blur(10px)', padding: '20px 25px', borderRadius: '15px', display: 'inline-block', maxWidth: '850px', boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.2)' },
    toggleContainer: { marginBottom: '15px', display: 'flex', alignItems: 'center' },
    toggleLabel: { display: 'flex', alignItems: 'center', fontSize: '0.9rem', cursor: 'pointer' },
    inputGroup: { display: 'flex', gap: '15px', alignItems: 'center', flexWrap: 'wrap' },
    inputWrapper: { display: 'flex', flexDirection: 'column', backgroundColor: 'white', padding: '10px 15px', borderRadius: '8px', flex: 1, minWidth: '180px' },
    inputLabel: { fontSize: '0.75rem', color: '#666', marginBottom: '4px' },
    input: { border: 'none', outline: 'none', fontSize: '0.95rem', color: '#333', backgroundColor: 'transparent', width: '100%', cursor: 'pointer' },
    searchButton: { backgroundColor: '#0d6efd', color: 'white', border: 'none', padding: '0 30px', borderRadius: '8px', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer', height: '55px', transition: 'background-color 0.2s' }
};

export default Home;