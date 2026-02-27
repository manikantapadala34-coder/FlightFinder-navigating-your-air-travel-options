import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

// --- COMPONENTS ---
import { ProtectedNavbar, AdminNavbar } from './components/Navbars';

// --- PAGES ---
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import MyBookings from './pages/user/MyBookings';
import AdminDashboard from './pages/admin/AdminDashboard';
import AllUsers from './pages/admin/AllUsers';
import AddFlight from './pages/admin/AddFlight';
import AllBookings from './pages/admin/AllBookings';
import FlightList from './components/FlightList';

function AppContent() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleLogin = (userData) => {
    setUser(userData);
    // Route them based on their usertype!
    if (userData.usertype === 'admin' || userData.usertype === 'operator') {
      navigate('/admin');
    } else {
      navigate('/flights'); 
    }
  };

  const handleLogout = () => {
    setUser(null);
    navigate('/'); 
  };

  return (
    <div style={{ backgroundColor: '#f4f7f6', minHeight: '100vh' }}>
      <Routes>
        {/* PUBLIC ROUTES */}
        {/* PUBLIC ROUTES */}
        <Route path="/" element={
          <Home 
            // We pass the searchParams through the router's 'state' property
            onSearch={(searchParams) => navigate('/flights', { state: searchParams })} 
            onLoginClick={() => navigate('/login')} 
          />
        } />
        <Route path="/login" element={
          <Login onLogin={handleLogin} onHome={() => navigate('/')} onSwitchToRegister={() => navigate('/register')} />
        } />
        
        <Route path="/register" element={<Register onSwitchToLogin={() => navigate('/login')} />} />

        {/* CUSTOMER PROTECTED ROUTES */}
        <Route path="/flights" element={
          <>
            <ProtectedNavbar onLogout={handleLogout} />
            <div style={{ padding: '20px 5%' }}>
              {user && <p style={{textAlign: 'right', color: '#666'}}>Welcome, <strong>{user.username}</strong></p>}
              <FlightList user={user} />
            </div>
          </>
        } />

        <Route path="/bookings" element={
          <>
            <ProtectedNavbar onLogout={handleLogout} />
            <MyBookings user={user} /> {/* Pass the user prop here! */}
          </>
        } />

        {/* ADMIN PROTECTED ROUTES */}
        <Route path="/admin" element={
          <>
            <AdminNavbar onLogout={handleLogout} />
            <AdminDashboard />
          </>
        } />

        <Route path="/admin/users" element={
          <>
            <AdminNavbar onLogout={handleLogout} />
            <AllUsers />
          </>
        } />

        <Route path="/admin/bookings" element={
          <>
            <AdminNavbar onLogout={handleLogout} />
            <AllBookings />
          </>
        } />

        <Route path="/admin/flights" element={
          <>
            <AdminNavbar onLogout={handleLogout} />
            <AddFlight />
          </>
        } />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}