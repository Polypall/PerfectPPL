
import React from 'react';
import Layout from '../components/Layout';
import { CallHistory } from '../types';

const HistoryView: React.FC<{ history: CallHistory[], onUpdate: (id: string, status: 'liked' | 'blocked') => void }> = ({ history, onUpdate }) => {
  return (
    <Layout>
      <div className="p-6 max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <span className="text-4xl">⏰</span>
          <h2 className="fancy-title text-4xl text-pink-600 text-outline">Call History</h2>
        </div>

        <div className="space-y-4">
          {history.length === 0 ? (
            <div className="bg-white p-12 rounded-3xl text-center shadow-md">
              <p className="text-gray-400 font-bold">No calls yet. Go meet someone amazing!</p>
            </div>
          ) : (
            history.map((call) => (
              <div key={call.id} className="bg-white p-4 rounded-3xl shadow-lg border-2 border-pink-50 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-pink-400">
                    <img src={call.partnerPic || `https://picsum.photos/seed/${call.partnerId}/100/100`} alt="" />
                  </div>
                  <div>
                    <h3 className="font-bold text-pink-700">{call.partnerName}</h3>
                    <p className="text-xs text-gray-400">{new Date(call.timestamp).toLocaleString()}</p>
                    {call.status !== 'none' && (
                      <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${call.status === 'liked' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                        {call.status}
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <button 
                    onClick={() => onUpdate(call.id, 'liked')}
                    className="p-3 bg-pink-50 hover:bg-pink-100 rounded-2xl transition-all"
                    title="Like/Follow"
                  >
                    💖
                  </button>
                  <button 
                    onClick={() => onUpdate(call.id, 'blocked')}
                    className="p-3 bg-gray-50 hover:bg-gray-100 rounded-2xl transition-all"
                    title="Report/Block"
                  >
                    🚫
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        
        <button 
          onClick={() => window.location.hash = '#/'}
          className="mt-8 w-full py-4 bg-pink-500 text-white rounded-3xl font-black shadow-lg hover:bg-pink-600 transition-all"
        >
          Back to Home
        </button>
      </div>
    </Layout>
  );
};

export default HistoryView;
