import { useState } from 'react';
import api from '../api/axios';
import toast from 'react-hot-toast';
import { Mail, CheckCircle } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/contact', formData);
      toast.success('Message sent! Mock SMTP received it.');
      setSubmitted(true);
    } catch (err) {
      toast.error('Failed to send message.');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto py-24 px-8 flex flex-col md:flex-row gap-16">
        <div className="flex-1">
          <h2 className="text-5xl font-black mb-6">Get in Touch</h2>
          <p className="text-gray-600 mb-8 text-lg">Have a question or need support with the marketplace? Fill out the form and our mock backend will log it directly to our simulated SMTP service.</p>
          <div className="space-y-4 text-gray-600">
             <div className="flex items-center gap-3"><Mail className="text-brand-500" /> support@marketplace.mock</div>
          </div>
        </div>
        
        <div className="flex-1 bg-gray-50 p-8 rounded-3xl shadow-sm border border-gray-100">
          {submitted ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
               <CheckCircle size={64} className="text-brand-500" />
               <h3 className="text-2xl font-bold text-gray-900">Message Received!</h3>
               <p className="text-gray-600">We'll get back to you shortly.</p>
               <button onClick={() => setSubmitted(false)} className="mt-8 text-brand-600 font-semibold hover:underline">Send another</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input type="text" required className="mt-1 input-field" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}/>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" required className="mt-1 input-field" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}/>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Message</label>
                <textarea required rows={4} className="mt-1 input-field resize-none" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}></textarea>
              </div>
              <button type="submit" className="btn-primary flex items-center justify-center gap-2 relative overflow-hidden group">
                <span className="relative z-10">Send Message</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
