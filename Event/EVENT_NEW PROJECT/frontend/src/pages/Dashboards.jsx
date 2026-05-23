import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import toast from 'react-hot-toast';
import { Briefcase, List, Plus, CheckCircle, Clock } from 'lucide-react';

function Layout({ children, title, role }) {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('user');
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="w-64 bg-brand-900 text-white p-6 flex flex-col shadow-xl z-10">
        <h2 className="text-2xl font-black text-brand-100 mb-10 tracking-tight">{title}</h2>
        <div className="space-y-4 flex-1">
          <p className="text-sm font-medium text-brand-500 uppercase tracking-widest">Dashboard Area</p>
          <div className="bg-brand-800 p-4 rounded-xl text-sm font-medium border border-brand-700">Ready to manage your workflow</div>
        </div>
        <div className="space-y-2 mt-auto">
          <button onClick={logout} className="w-full bg-brand-800 hover:bg-brand-700 p-3 rounded-lg font-medium transition-colors">Log Out</button>
        </div>
      </aside>
      <main className="flex-1 p-10 flex flex-col gap-8 h-screen overflow-y-auto">
         {children}
      </main>
    </div>
  );
}

export function ClientPortal() {
  const [jobs, setJobs] = useState([]);
  
  useEffect(() => {
    api.get('/jobs').then(res => setJobs(res.data)).catch(() => toast.error('Failed to load jobs'));
  }, []);

  return (
    <Layout title="Client CRM" role="client">
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
           <div className="p-4 bg-brand-100 text-brand-600 rounded-xl"><Briefcase size={32} /></div>
           <div><p className="text-sm text-gray-500 font-medium">Total Requests</p><h3 className="text-3xl font-bold">{jobs.length}</h3></div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
           <div className="p-4 bg-orange-100 text-orange-600 rounded-xl"><Clock size={32} /></div>
           <div><p className="text-sm text-gray-500 font-medium">Pending Jobs</p><h3 className="text-3xl font-bold">{jobs.filter(j => j.status === 'pending').length}</h3></div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex-1 overflow-hidden flex flex-col">
         <div className="p-6 border-b"><h3 className="text-xl font-bold">Your Job Tracker</h3></div>
         <div className="p-6 flex-1 overflow-y-auto space-y-4">
            {jobs.length === 0 ? <p className="text-gray-500 text-center py-10">No jobs requested yet. Go to Home to request a service!</p> : jobs.map(job => (
              <div key={job._id} className="p-5 border rounded-xl flex justify-between items-center hover:shadow-md transition">
                <div>
                   <h4 className="font-bold text-lg">{job.service?.title || 'Deleted Service'}</h4>
                   <p className="text-sm text-gray-500">Provider: {job.businessProvider?.name}</p>
                   <p className="text-sm text-gray-500 mt-1">Date: {new Date(job.date).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                   <div className="inline-block px-3 py-1 rounded-full text-sm font-semibold mb-2 capitalize bg-gray-100">{job.status}</div>
                   <p className="font-bold text-brand-600">${job.service?.price || 0}</p>
                </div>
              </div>
            ))}
         </div>
      </div>
    </Layout>
  );
}

export function BusinessPortal() {
  const [services, setServices] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [tab, setTab] = useState('jobs'); // 'jobs' or 'services'
  const [isCreating, setIsCreating] = useState(false);
  const [newSvc, setNewSvc] = useState({ title: '', description: '', category: 'General', price: '' });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [{ data: sData }, { data: jData }] = await Promise.all([api.get('/services/me'), api.get('/jobs')]);
      setServices(sData);
      setJobs(jData);
    } catch(err) { toast.error("Failed loading CRM data"); }
  };

  const handleStatus = async (id, status) => {
    try {
      await api.put(`/jobs/${id}/status`, { status });
      toast.success(`Job marked as ${status}`);
      loadData();
    } catch(err) { toast.error("Update failed"); }
  };

  const createService = async (e) => {
    e.preventDefault();
    try {
      await api.post('/services', { ...newSvc, price: Number(newSvc.price) });
      toast.success('Service Listed!');
      setIsCreating(false);
      loadData();
    } catch(err) { toast.error('Error creating service'); }
  };

  return (
    <Layout title="Business CRM" role="business">
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-brand-100 flex items-center gap-4">
           <div className="p-4 bg-blue-100 text-blue-600 rounded-xl"><List size={32} /></div>
           <div><p className="text-sm text-gray-500 font-medium">Active Services</p><h3 className="text-3xl font-bold">{services.length}</h3></div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-brand-100 flex items-center gap-4">
           <div className="p-4 bg-brand-100 text-brand-600 rounded-xl"><Briefcase size={32} /></div>
           <div><p className="text-sm text-gray-500 font-medium">Total Orders</p><h3 className="text-3xl font-bold">{jobs.length}</h3></div>
        </div>
      </div>

      <div className="flex gap-4">
        <button onClick={() => setTab('jobs')} className={`px-6 py-2 rounded-full font-bold ${tab === 'jobs' ? 'bg-brand-600 text-white' : 'bg-white text-gray-500 shadow-sm border'}`}>Incoming Jobs</button>
        <button onClick={() => setTab('services')} className={`px-6 py-2 rounded-full font-bold ${tab === 'services' ? 'bg-brand-600 text-white' : 'bg-white text-gray-500 shadow-sm border'}`}>Service Manager</button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex-1 overflow-hidden flex flex-col">
         {tab === 'jobs' ? (
           <div className="flex-1 flex flex-col">
             <div className="p-6 border-b"><h3 className="text-xl font-bold">Job Inbox</h3></div>
             <div className="p-6 flex-1 overflow-y-auto space-y-4">
               {jobs.map(job => (
                 <div key={job._id} className="p-5 border rounded-xl flex justify-between items-center bg-gray-50">
                    <div>
                      <h4 className="font-bold text-lg">{job.service?.title} <span className="text-brand-600">${job.service?.price}</span></h4>
                      <p className="text-sm text-gray-600">Client: {job.client?.name} | {new Date(job.date).toLocaleDateString()}</p>
                      <p className="text-xs text-gray-500 mt-1 italic w-64 truncate">{job.details}</p>
                    </div>
                    <div className="flex flex-col gap-2 items-end">
                      <span className="text-sm font-semibold capitalize text-gray-500">Status: {job.status}</span>
                      {job.status === 'pending' && (
                        <button onClick={() => handleStatus(job._id, 'accepted')} className="text-brand-600 text-sm font-bold border border-brand-200 px-3 py-1 rounded bg-brand-50 hover:bg-brand-100 transition">Accept Job</button>
                      )}
                      {job.status === 'accepted' && (
                        <button onClick={() => handleStatus(job._id, 'completed')} className="text-green-600 text-sm font-bold border border-green-200 px-3 py-1 rounded bg-green-50 hover:bg-green-100 transition"><CheckCircle size={16} className="inline mr-1"/> Finish</button>
                      )}
                    </div>
                 </div>
               ))}
               {jobs.length === 0 && <p className="text-gray-400 text-center py-6">No incoming requests yet.</p>}
             </div>
           </div>
         ) : (
           <div className="flex-1 flex flex-col relative">
             <div className="p-6 border-b flex justify-between items-center">
               <h3 className="text-xl font-bold">Your Services</h3>
               <button onClick={() => setIsCreating(!isCreating)} className="flex items-center gap-2 bg-brand-900 text-white px-4 py-2 rounded-lg hover:bg-brand-800 transition shadow"><Plus size={18}/> New Service</button>
             </div>
             {isCreating && (
               <div className="p-6 bg-gray-50 border-b">
                 <form onSubmit={createService} className="grid grid-cols-2 gap-4">
                   <input required type="text" placeholder="Service Title" className="input-field" value={newSvc.title} onChange={e=>setNewSvc({...newSvc, title: e.target.value})} />
                   <input required type="number" placeholder="Price ($)" className="input-field" value={newSvc.price} onChange={e=>setNewSvc({...newSvc, price: e.target.value})} />
                   <div className="col-span-2"><textarea placeholder="Description" required className="input-field" value={newSvc.description} onChange={e=>setNewSvc({...newSvc, description: e.target.value})} /></div>
                   <button type="submit" className="col-span-2 btn-primary">Publish to Marketplace</button>
                 </form>
               </div>
             )}
             <div className="p-6 flex-1 overflow-y-auto grid grid-cols-2 gap-6">
                {services.map(svc => (
                  <div key={svc._id} className="p-6 border border-gray-200 shadow-sm rounded-xl hover:border-brand-300 transition">
                     <span className="text-xs font-bold uppercase tracking-widest text-brand-500">{svc.category}</span>
                     <h4 className="text-xl font-bold mt-1 mb-2">{svc.title}</h4>
                     <p className="text-gray-500 text-sm mb-4 line-clamp-2">{svc.description}</p>
                     <div className="flex justify-between items-center"><span className="font-extrabold text-xl text-brand-900">${svc.price}</span></div>
                  </div>
                ))}
             </div>
           </div>
         )}
      </div>
    </Layout>
  );
}
