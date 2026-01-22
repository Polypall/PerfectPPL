
import React, { useState } from 'react';
import { RULES, TOS } from '../constants';
import HeartButton from '../components/HeartButton';

interface AuthViewProps {
  onLogin: (email: string) => void;
}

const AuthView: React.FC<AuthViewProps> = ({ onLogin }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [acceptedTOS, setAcceptedTOS] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isRegistering && !acceptedTOS) {
      alert("Please accept the Terms of Service");
      return;
    }
    // Simulation
    onLogin(email);
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center" 
      style={{ backgroundImage: 'url(https://i.postimg.cc/63fB6rTH/ppbg.png)' }}
    >
      <div className="bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-2xl max-w-md w-full border-4 border-pink-200">
        <h2 className="fancy-title text-4xl text-center text-pink-600 mb-6 text-outline">
          {isRegistering ? 'Join Us' : 'Welcome Back'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-pink-600 font-bold mb-1">Email</label>
            <input 
              type="email" 
              required
              className="w-full p-3 rounded-xl border-2 border-pink-200 focus:border-pink-500 outline-none transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-pink-600 font-bold mb-1">Password</label>
            <input 
              type="password" 
              required
              className="w-full p-3 rounded-xl border-2 border-pink-200 focus:border-pink-500 outline-none transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {isRegistering && (
            <div className="max-h-32 overflow-y-auto p-3 bg-pink-50 rounded-xl text-xs border border-pink-100">
              <h4 className="font-bold mb-2">Community Rules</h4>
              <ul className="list-disc pl-4 mb-3">
                {RULES.map(r => <li key={r}>{r}</li>)}
              </ul>
              <h4 className="font-bold mb-2">Terms of Service</h4>
              <p>{TOS}</p>
              <label className="flex items-center mt-3 gap-2 cursor-pointer font-bold text-pink-700">
                <input 
                  type="checkbox" 
                  checked={acceptedTOS} 
                  onChange={(e) => setAcceptedTOS(e.target.checked)} 
                />
                I agree to the Terms
              </label>
            </div>
          )}

          <div className="flex justify-center pt-4">
            <HeartButton type="submit">
              {isRegistering ? 'Sign Up' : 'Log In'}
            </HeartButton>
          </div>
        </form>

        <div className="mt-8 text-center space-y-2">
          <button 
            onClick={() => setIsRegistering(!isRegistering)}
            className="text-pink-600 hover:text-pink-800 underline font-bold"
          >
            {isRegistering ? 'Already have an account? Log in' : 'New here? Join the family'}
          </button>
          <br />
          <button className="text-gray-500 text-sm hover:underline">
            Forgot Password?
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthView;
