import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Shield, Zap } from 'lucide-react';

export default function Home() {
  const dummyServices = [
    { title: 'Plumbing Repair', price: '$50/hr', category: 'Home Delivery' },
    { title: 'Web Development', price: '$80/hr', category: 'Tech' },
    { title: 'Legal Consultation', price: '$150/hr', category: 'Consulting' },
  ];

  return (
    <div className="min-h-screen bg-brand-50 text-brand-dark overflow-hidden">
      {/* Navbar Stub */}
      <nav className="border-b bg-white/75 backdrop-blur shadow-sm sticky top-0 z-10 px-8 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-black text-brand-900 tracking-tight">Marketplace.</h1>
        <div className="space-x-6 hidden sm:block font-medium">
          <Link to="/contact" className="hover:text-brand-500 transition-colors">Contact</Link>
          <Link to="/login" className="hover:text-brand-500 transition-colors">Log In</Link>
          <Link to="/signup" className="px-5 py-2.5 bg-brand-600 text-white rounded-lg shadow hover:-translate-y-0.5 hover:shadow-lg hover:bg-brand-500 transition-all">Sign Up</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-8 py-20 lg:py-32 max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 space-y-8">
          <h2 className="text-5xl lg:text-7xl font-extrabold tracking-tight leading-tight">
            The Smart Way to <br/> <span className="text-brand-500">Hire Pros.</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-md">Find authenticated service providers for all your needs. Fully secure, seamless payments, and real-time chat.</p>
          <div className="flex gap-4">
            <Link to="/signup" className="flex items-center gap-2 px-8 py-3.5 bg-brand-900 hover:bg-brand-800 text-white rounded-xl shadow-lg transition-transform hover:-translate-y-1 text-lg font-semibold">
              Get Started <ArrowRight size={20}/>
            </Link>
          </div>
        </div>
        <div className="flex-1">
          <div className="bg-gradient-to-tr from-brand-500 to-green-300 w-full h-[400px] rounded-3xl shadow-2xl skew-y-3 skew-x-3 overflow-hidden relative">
             <div className="absolute inset-0 bg-white/20 backdrop-blur-[2px] flex items-center justify-center">
                <span className="text-white text-5xl opacity-80 font-bold -skew-y-3 -skew-x-3">PREMIUM</span>
             </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="bg-white py-24">
        <div className="max-w-6xl mx-auto px-8">
          <h3 className="text-3xl font-bold mb-12">Featured Services</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {dummyServices.map((service, idx) => (
              <div key={idx} className="group p-6 rounded-2xl border bg-gray-50 hover:bg-white hover:border-brand-500 hover:shadow-2xl hover:-translate-y-2 transition-all cursor-pointer">
                <div className="w-12 h-12 rounded-lg bg-brand-100 flex items-center justify-center text-brand-600 mb-6 group-hover:scale-110 transition-transform"><CheckCircle/></div>
                <p className="text-sm font-semibold text-brand-500 mb-2 uppercase tracking-wide">{service.category}</p>
                <h4 className="text-2xl font-bold mb-4">{service.title}</h4>
                <div className="flex justify-between items-center mt-6 pt-6 border-t border-gray-100">
                  <span className="text-lg font-semibold">{service.price}</span>
                  <button className="text-brand-600 font-medium hover:underline">Book Now</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="bg-brand-900 text-white py-24 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-8 relative z-10">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-extrabold mb-4">How it Works</h3>
            <p className="text-brand-100/70">Our automated flow makes connecting simple.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-12 text-center">
             <div>
               <div className="mx-auto w-16 h-16 rounded-full bg-brand-500/20 flex items-center justify-center mb-6"><Shield size={32} className="text-brand-100" /></div>
               <h4 className="text-xl font-bold mb-3">1. Secure Authentication</h4>
               <p className="text-brand-100/60 leading-relaxed">Sign up with Mock OAuth or OTP. We keep your data protected and locked down with robust JWTs.</p>
             </div>
             <div>
               <div className="mx-auto w-16 h-16 rounded-full bg-brand-500/20 flex items-center justify-center mb-6"><Zap size={32} className="text-brand-100" /></div>
               <h4 className="text-xl font-bold mb-3">2. Request Jobs</h4>
               <p className="text-brand-100/60 leading-relaxed">Browse the dynamic marketplace. Our intercepts handle 401s silently to keep your experience uninterrupted.</p>
             </div>
             <div>
               <div className="mx-auto w-16 h-16 rounded-full bg-brand-500/20 flex items-center justify-center mb-6"><CheckCircle size={32} className="text-brand-100" /></div>
               <h4 className="text-xl font-bold mb-3">3. Finalize & Chat</h4>
               <p className="text-brand-100/60 leading-relaxed">Instantly reach providers via our real-time socket layer. Settle payments confidently with Mock Stripe.</p>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}
