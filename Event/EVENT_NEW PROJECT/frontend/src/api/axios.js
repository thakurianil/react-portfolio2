import axios from 'axios';
import toast from 'react-hot-toast';

const api = axios.create({
  baseURL: 'http://localhost:5005/api', // local backend rerouted
});

api.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => {
    // Handling custom status 99 gracefully if it magically resolves as successful but it shouldn't.
    if (response.status === 99) {
      window.dispatchEvent(new CustomEvent('openProfileModal'));
    }
    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        toast.error('Session expired. Redirecting to login.');
        localStorage.removeItem('user');
        window.location.href = '/login'; // Alternatively to /business/login
      } else if (error.response.status === 99) {
        toast('Please complete your profile to continue', { icon: '⚠️' });
        window.dispatchEvent(new CustomEvent('openProfileModal'));
      }
    }
    return Promise.reject(error);
  }
);

export default api;
