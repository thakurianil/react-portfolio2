import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import ProfileEditModal from './components/ProfileEditModal';
import Chat from './components/Chat';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Contact from './pages/Contact';
import { ClientPortal, BusinessPortal } from './pages/Dashboards';

// Simple guard
const ProtectedRoute = ({ children, allowedRole }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user || !user.token) return <Navigate to="/login" />;
  if (allowedRole && user.role !== allowedRole) return <Navigate to="/" />;
  return children;
};

function App() {
  return (
    <Router>
      <Toaster position="top-right" toastOptions={{ duration: 4000, style: { background: '#333', color: '#fff' } }} />
      <ProfileEditModal />
      <Chat />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/client" element={<ProtectedRoute allowedRole="client"><ClientPortal /></ProtectedRoute>} />
        <Route path="/business" element={<ProtectedRoute allowedRole="business"><BusinessPortal /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
