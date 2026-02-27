import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AllUsers() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/users');
                setUsers(response.data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
        fetchUsers();
    }, []);

    // Split the users into two groups based on their usertype
    const customers = users.filter(u => u.usertype === 'customer');
    const operators = users.filter(u => u.usertype === 'operator' || u.usertype === 'admin');

    return (
        <div style={styles.container}>
            <h2 style={styles.pageTitle}>All Users</h2>
            
            <div style={styles.listSection}>
                {customers.map(user => (
                    <div key={user._id} style={styles.userPill}>
                        <span style={styles.pillText}><strong>UserId</strong> {user._id}</span>
                        <span style={styles.pillText}><strong>Username</strong> {user.username}</span>
                        <span style={styles.pillText}><strong>Email</strong> {user.email}</span>
                    </div>
                ))}
            </div>

            <h2 style={styles.pageTitle}>Flight Operators</h2>
            
            <div style={styles.listSection}>
                {operators.map(operator => (
                    <div key={operator._id} style={styles.userPill}>
                        <span style={styles.pillText}><strong>Id</strong> {operator._id}</span>
                        <span style={styles.pillText}><strong>Username</strong> {operator.username}</span>
                        <span style={styles.pillText}><strong>Email</strong> {operator.email}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

const styles = {
    container: {
        padding: '30px 10%',
        fontFamily: 'Arial, sans-serif'
    },
    pageTitle: {
        color: '#495057',
        fontSize: '1.5rem',
        fontWeight: 'normal',
        marginBottom: '20px',
        marginTop: '30px'
    },
    listSection: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px'
    },
    userPill: {
        backgroundColor: '#f8f9fa',
        padding: '15px 25px',
        borderRadius: '50px', // Creates the rounded pill look from the screenshot
        display: 'flex',
        gap: '40px',
        alignItems: 'center',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
    },
    pillText: {
        color: '#495057',
        fontSize: '0.9rem'
    }
};

export default AllUsers;