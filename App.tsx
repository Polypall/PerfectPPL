
import React, { useState, useEffect } from 'react';
import { UserProfile, CallHistory } from './types';
import AuthView from './views/AuthView';
import OnboardingView from './views/OnboardingView';
import HomeView from './views/HomeView';
import VideoView from './views/VideoView';
import HistoryView from './views/HistoryView';
import Layout from './components/Layout';
import HeartButton from './components/HeartButton';

const App: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isAuth, setIsAuth] = useState(false);
  const [view, setView] = useState<string>(window.location.hash || '#/');
  const [activeCall, setActiveCall] = useState<UserProfile | null>(null);
  const [history, setHistory] = useState<CallHistory[]>([]);

  useEffect(() => {
    const handleHashChange = () => setView(window.location.hash || '#/');
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleLogin = (email: string) => {
    setIsAuth(true);
  };

  const handleOnboarding = (profile: UserProfile) => {
    setUser(profile);
  };

  const handleStartCall = (partner: UserProfile) => {
    setActiveCall(partner);
    const newRecord: CallHistory = {
      id: Math.random().toString(36).substr(2, 9),
      partnerId: partner.id,
      partnerName: partner.name,
      partnerPic: `https://picsum.photos/seed/${partner.id}/100/100`,
      timestamp: Date.now(),
      status: 'none'
    };
    setHistory([newRecord, ...history]);
  };

  const updateHistoryStatus = (id: string, status: 'liked' | 'blocked') => {
    setHistory(prev => prev.map(item => item.id === id ? { ...item, status } : item));
    if (status === 'blocked') {
      alert("User has been reported and blocked from your feed.");
    }
  };

  if (!isAuth) return <AuthView onLogin={handleLogin} />;
  if (!user) return <OnboardingView email="user@example.com" onComplete={handleOnboarding} />;
  if (activeCall) return <VideoView partner={activeCall} onEnd={() => setActiveCall(null)} />;

  const renderView = () => {
    switch (view) {
      case '#/history':
        return <HistoryView history={history} onUpdate={updateHistoryStatus} />;
      case '#/settings':
        return (
          <Layout>
            <div className="p-6 max-w-xl mx-auto space-y-6">
              <h2 className="fancy-title text-4xl text-pink-600 text-outline mb-8">Settings</h2>
              <div className="bg-white p-6 rounded-3xl shadow-lg border-2 border-pink-50 space-y-4">
                <button className="w-full text-left p-4 hover:bg-pink-50 rounded-2xl font-bold transition-all">
                  Change Password
                </button>
                <button className="w-full text-left p-4 hover:bg-pink-50 rounded-2xl font-bold transition-all text-red-500" onClick={() => {
                  if(confirm("Are you sure you want to delete your account? This cannot be undone.")) {
                    window.location.reload();
                  }
                }}>
                  Delete Account
                </button>
              </div>
              <div className="flex justify-center pt-8">
                <HeartButton variant="secondary" onClick={() => window.location.hash = '#/'}>
                  Back
                </HeartButton>
              </div>
            </div>
          </Layout>
        );
      default:
        return <HomeView user={user} onCall={handleStartCall} />;
    }
  };

  return renderView();
};

export default App;
