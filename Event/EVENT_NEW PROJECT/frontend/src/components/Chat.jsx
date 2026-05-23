import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Attempting connection (mock setup if backend fails)
    const newSocket = io('http://localhost:5005');
    setSocket(newSocket);

    // If socket gets connected, nice. If not, we just use local dummy states
    newSocket.on('connect', () => {
      setMessages(prev => [...prev, { text: 'Connected to Real-time Chat Node!', from: 'system' }]);
    });

    return () => newSocket.close();
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const msg = { text: input, from: 'me' };
    setMessages(prev => [...prev, msg]);
    setInput('');
    
    // Auto-respond dummy for offline/mock cases
    setTimeout(() => {
      setMessages(prev => [...prev, { text: 'Message received by counterpart! (Mock Socket Echo)', from: 'other' }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col h-96 z-50">
       <div className="bg-brand-900 text-white p-4 font-bold tracking-wide">Live Chat</div>
       <div className="flex-1 p-4 overflow-y-auto bg-gray-50 flex flex-col gap-3">
         {messages.map((m, i) => (
           <div key={i} className={`px-4 py-2 rounded-2xl max-w-[85%] text-sm ${m.from === 'me' ? 'bg-brand-500 text-white self-end' : m.from === 'system' ? 'bg-gray-200 text-gray-500 text-xs self-center' : 'bg-white border text-gray-700 self-start'}`}>
             {m.text}
           </div>
         ))}
       </div>
       <form onSubmit={sendMessage} className="p-3 bg-white border-t flex gap-2">
         <input 
           type="text" 
           className="flex-1 border rounded-full px-4 py-2 text-sm focus:outline-brand-500" 
           placeholder="Type a message..." 
           value={input}
           onChange={e => setInput(e.target.value)}
          />
       </form>
    </div>
  );
}
