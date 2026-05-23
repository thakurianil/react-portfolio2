import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import toast from 'react-hot-toast';
import { Shield } from 'lucide-react';

export default function Signup() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'client' });
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/signup', formData);
      await api.post('/auth/otp/send', { email: formData.email });
      toast.success('Signup successful. OTP sent to email.');
      setShowOtp(true);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Signup failed');
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/auth/otp/verify', { email: formData.email, code: otp });
      localStorage.setItem('user', JSON.stringify({ ...formData, token: data.token }));
      toast.success('Account verified!');
      navigate(formData.role === 'business' ? '/business' : '/client');
    } catch (err) {
      toast.error(err.response?.data?.message || 'OTP verification failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Shield size={48} className="mx-auto text-brand-600 mb-6" />
        <h2 className="text-center text-3xl font-extrabold text-gray-900">Create your account</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="auth-card">
          {!showOtp ? (
            <form className="space-y-6" onSubmit={handleSignupSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <div className="mt-1"><input type="text" required className="input-field" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} /></div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email address</label>
                <div className="mt-1"><input type="email" required className="input-field" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} /></div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <div className="mt-1"><input type="password" required className="input-field" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} /></div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Role</label>
                <div className="mt-1">
                  <select className="input-field" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})}>
                    <option value="client">Client</option>
                    <option value="business">Business</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="btn-primary">Sign up</button>
            </form>
          ) : (
            <form className="space-y-6" onSubmit={handleOtpSubmit}>
               <h3 className="text-xl font-bold text-center">Verify Email (OTP)</h3>
               <p className="text-sm text-gray-500 text-center">Enter the Mock OTP (123456) before the 5 minute expiration timer expires.</p>
               <div>
                <label className="block text-sm font-medium text-gray-700 text-center mb-2">OTP Code</label>
                <div className="mt-1 flex justify-center">
                  <input type="text" maxLength={6} required className="input-field text-center text-2xl tracking-widest font-mono" value={otp} onChange={e => setOtp(e.target.value)} />
                </div>
              </div>
              <button type="submit" className="btn-primary">Verify & Login</button>
            </form>
          )}

          <div className="mt-6 text-center text-sm">
            Already have an account? <Link to="/login" className="font-semibold text-brand-600 hover:text-brand-500">Log in</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
