
import React from 'react';

const Layout: React.FC<{ children: React.ReactNode; showHeader?: boolean }> = ({ children, showHeader = true }) => {
  return (
    <div className="min-h-screen bg-pink-50 flex flex-col">
      {showHeader && (
        <header className="bg-white border-b border-pink-100 p-4 sticky top-0 z-50 flex justify-between items-center shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-pink-500 text-2xl">💖</span>
            <h1 className="fancy-title text-pink-600 text-2xl font-bold">Perfect People</h1>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => window.location.hash = '#/history'} className="p-2 hover:bg-pink-50 rounded-full transition-colors">
              <span className="text-2xl">⏰</span>
            </button>
            <button onClick={() => window.location.hash = '#/settings'} className="p-2 hover:bg-pink-50 rounded-full transition-colors">
              <span className="text-2xl">⚙️</span>
            </button>
          </div>
        </header>
      )}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
};

export default Layout;
