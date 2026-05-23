import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import toast from 'react-hot-toast';
import { Shield } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/auth/login', { email, password });
      localStorage.setItem('user', JSON.stringify(data));
      toast.success('Logged in successfully!');
      navigate(data.role === 'business' ? '/business' : '/client');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    }
  };

  const handleOAuth = async (provider) => {
    try {
      // Mocked OAuth process returning dummy details 
      const mockPayload = { email: `mock@${provider}.com`, name: 'Mock User', mockToken: 'xyz' };
      const { data } = await api.post(`/auth/oauth/${provider}`, mockPayload);
      localStorage.setItem('user', JSON.stringify(data));
      toast.success(`Mock ${provider} login success!`);
      navigate('/client');
    } catch (err) {
      toast.error('OAuth failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Shield size={48} className="mx-auto text-brand-600 mb-6" />
        <h2 className="text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="auth-card">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email address</label>
              <div className="mt-1">
                <input type="email" required className="input-field" value={email} onChange={e => setEmail(e.target.value)} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <div className="mt-1">
                <input type="password" required className="input-field" value={password} onChange={e => setPassword(e.target.value)} />
              </div>
            </div>

            <button type="submit" className="btn-primary">Sign in</button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-300" /></div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">Or continue with Mock</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              {['google', 'facebook', 'apple'].map(provider => (
                <div key={provider}>
                  <button onClick={() => handleOAuth(provider)} className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 capitalize">
                    {provider}
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-6 text-center text-sm">
            Don't have an account? <Link to="/signup" className="font-semibold text-brand-600 hover:text-brand-500">Sign up</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
