import React from 'react';
import { useIdentity } from './context/IdentityContext';

function App() {
  const { user } = useIdentity();

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans">
      {/* Header */}
      <nav className="border-b border-slate-800 p-4 bg-slate-900/50 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-400 font-mono tracking-tighter">
            &lt;DevConfession /&gt;
          </h1>
          <div className="flex items-center gap-4">
            <div className="bg-slate-800 px-4 py-2 rounded-full border border-slate-700">
              <span className="text-sm text-slate-400 mr-2">Định danh:</span>
              <span className="text-sm font-semibold text-teal-400">{user?.alias || '...'}</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto p-6">
        {/* Banner */}
        <div className="text-center py-12">
          <h2 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
            Nơi những dòng code biết nói...
          </h2>
          <p className="text-slate-400 text-lg">Chia sẻ tâm tư, lỗi lầm và những khoảnh khắc "Eureka" một cách ẩn danh.</p>
        </div>

        {/* Skeleton List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {[1, 2].map((i) => (
            <div key={i} className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-xl animate-pulse">
              <div className="h-4 w-32 bg-slate-700 rounded mb-4"></div>
              <div className="h-20 bg-slate-700/50 rounded mb-4"></div>
              <div className="h-8 w-24 bg-slate-700 rounded-full"></div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center text-slate-500">
          <p>Project đang được xây dựng bởi **Nhóm 11**</p>
          <p className="text-xs mt-2 uppercase tracking-widest font-bold text-slate-600">Skeleton Ready for Git Flow</p>
        </div>
      </main>
    </div>
  );
}

export default App;
