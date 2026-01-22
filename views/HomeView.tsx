
import React, { useState, useEffect } from 'react';
import { UserProfile } from '../types';
import { geminiService } from '../services/geminiService';
import HeartButton from '../components/HeartButton';
import Layout from '../components/Layout';

const MOCK_CANDIDATES: UserProfile[] = [
  { id: '2', name: 'Sarah', email: 's@x.com', bio: 'I love painting and reading.', disabilities: ['Mobility Impairment'], hobbies: ['Art', 'Reading'], favoriteMedia: ['Harry Potter'], location: 'local', matchPreference: 'same' },
  { id: '3', name: 'James', email: 'j@x.com', bio: 'Tech enthusiast and gamer.', disabilities: ['Neurodiversity'], hobbies: ['Gaming', 'Coding'], favoriteMedia: ['Matrix'], location: 'global', matchPreference: 'different' },
  { id: '4', name: 'Emily', email: 'e@x.com', bio: 'Music is my soul.', disabilities: ['Hearing Impairment'], hobbies: ['Music', 'Travel'], favoriteMedia: ['Sound of Metal'], location: 'local', matchPreference: 'both' },
];

const HomeView: React.FC<{ user: UserProfile; onCall: (partner: UserProfile) => void }> = ({ user, onCall }) => {
  const [matches, setMatches] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [aiInsight, setAiInsight] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchMatches = async () => {
      setLoading(true);
      const filtered = MOCK_CANDIDATES.filter(c => {
        if (user.location === 'local' && c.location !== 'local') return false;
        return true;
      });

      const bestMatches = await geminiService.findMatches(user, filtered);
      setMatches(bestMatches);
      
      const insights: Record<string, string> = {};
      for (const m of bestMatches) {
        insights[m.id] = await geminiService.getMatchReason(user, m);
      }
      setAiInsight(insights);
      setLoading(false);
    };
    fetchMatches();
  }, [user]);

  return (
    <Layout>
      <div className="p-6 max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h2 className="fancy-title text-4xl text-pink-600 text-outline mb-2">Find Your Perfect Match</h2>
          <p className="text-gray-600 font-bold">Based on your shared interests and unique journey.</p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="animate-bounce text-6xl">💖</div>
            <p className="text-pink-500 font-black animate-pulse">AI is finding your special someone...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {matches.map((candidate) => (
              <div key={candidate.id} className="bg-white rounded-3xl p-6 shadow-xl border-4 border-pink-100 hover:border-pink-300 transition-all flex flex-col items-center text-center">
                <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-pink-500 shadow-md">
                  <img src={`https://picsum.photos/seed/${candidate.id}/200/200`} alt={candidate.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-2xl font-bold text-pink-700">{candidate.name}</h3>
                <p className="text-pink-400 text-sm font-bold mb-3">{candidate.disabilities.join(' • ')}</p>
                
                <div className="bg-pink-50 p-4 rounded-2xl mb-6 w-full">
                  <p className="italic text-pink-700 text-sm">"{aiInsight[candidate.id] || "You'd be perfect together!"}"</p>
                </div>

                <div className="flex flex-wrap gap-2 justify-center mb-6">
                  {candidate.hobbies.map(h => (
                    <span key={h} className="bg-white border-2 border-pink-200 text-pink-600 px-3 py-1 rounded-full text-xs font-bold">
                      {h}
                    </span>
                  ))}
                </div>

                <HeartButton size="md" onClick={() => onCall(candidate)}>
                  Video Chat
                </HeartButton>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default HomeView;
