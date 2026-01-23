import React, { useState, useEffect } from 'react';
import { getApiUrl } from '../config';
import { useGoogleLogin } from '@react-oauth/google'; // 👈 1. ADD THIS IMPORT

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'signup';
  onLoginSuccess: (user: any) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialMode = 'login', onLoginSuccess }) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  // --- 🔵 2. ADD THE GOOGLE LOGIN LOGIC HERE ---
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setLoading(true);
      try {
        // This sends the Google token to your Python /google-login endpoint
        const res = await fetch(`${getApiUrl()}/google-login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: tokenResponse.access_token }),
        });

        const data = await res.json();
        
        if (res.ok) {
          onLoginSuccess(data); // This sets the user as DJboziah (Admin) or a regular user
          onClose();
        } else {
          alert("Google Auth Failed on Server: " + data.detail);
        }
      } catch (err) {
        console.error("Connection Error:", err);
        alert("Could not connect to backend server.");
      } finally {
        setLoading(false);
      }
    },
    onError: () => alert('Google Login Failed to open'),
  });

  const handleAuth = async () => {
    setLoading(true);
    const endpoint = mode === 'login' ? '/login' : '/signup';
    
    try {
      const response = await fetch(`${getApiUrl()}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ full_name: fullName, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        if (mode === 'login') {
            onLoginSuccess(data);
            onClose();
        } else {
            alert("Account created! Please log in.");
            setMode('login'); 
        }
      } else {
        alert(`Error: ${data.detail || "Something went wrong"}`);
      }
    } catch (error) {
      console.error("Connection Error:", error);
      alert("Could not connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>

      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden z-10">
        <div className="flex border-b border-slate-800">
          <button onClick={() => setMode('login')} className={`flex-1 py-4 text-sm font-bold uppercase tracking-wider transition-colors ${mode === 'login' ? 'bg-slate-800 text-amber-500' : 'text-slate-500 hover:text-white'}`}>Log In</button>
          <button onClick={() => setMode('signup')} className={`flex-1 py-4 text-sm font-bold uppercase tracking-wider transition-colors ${mode === 'signup' ? 'bg-slate-800 text-amber-500' : 'text-slate-500 hover:text-white'}`}>Sign Up</button>
        </div>

        <div className="p-8">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-black text-white mb-2">{mode === 'login' ? 'Welcome Back' : 'Create Account'}</h3>
            <p className="text-slate-400 text-sm">Access the premium fleet.</p>
          </div>

          {/* 🔥 3. CONNECT THE BUTTON TO THE LOGIC */}
          <button 
            type="button" 
            onClick={() => googleLogin()} 
            disabled={loading}
            className="w-full bg-white text-slate-900 font-bold py-3 rounded-xl flex items-center justify-center gap-3 hover:bg-slate-200 transition-colors mb-6 disabled:opacity-50"
          >
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
            {loading ? 'Verifying...' : 'Continue with Google'}
          </button>

          <div className="relative mb-6">
             <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-800"></div></div>
             <div className="relative flex justify-center text-xs uppercase"><span className="bg-slate-900 px-2 text-slate-500">Or continue with email</span></div>
          </div>

          <div className="space-y-4">
            {mode === 'signup' && (
              <input type="text" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500" />
            )}
            <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500" />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500" />

            <button onClick={handleAuth} disabled={loading} className="w-full bg-amber-500 text-slate-950 py-3 rounded-xl font-bold hover:bg-amber-400 transition-colors disabled:opacity-50">
              {loading ? 'Processing...' : (mode === 'login' ? 'Log In' : 'Sign Up')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;