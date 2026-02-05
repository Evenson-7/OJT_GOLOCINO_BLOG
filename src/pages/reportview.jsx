// src/pages/reportview.jsx
import { useParams, Link } from 'react-router-dom';
import { weeklyReports } from '../data/reports';

const ReportView = () => {
  const { id } = useParams();
  const report = weeklyReports.find(r => r.id === parseInt(id));

  if (!report) return <div className="text-center py-20 text-slate-400">Log entry not found.</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 pt-10">
      
      {/* --- NAVIGATION --- */}
      <Link 
        to="/" 
        className="group inline-flex items-center text-sm font-medium text-slate-500 hover:text-blue-600 mb-8 transition-colors"
      >
        <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center mr-3 shadow-sm group-hover:shadow-md group-hover:border-blue-200 transition-all">
          <svg className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </div>
        Back to Dashboard
      </Link>
      
      {/* --- MAIN CONTENT CARD --- */}
      {/* This uses the "Glass" effect to match your homepage */}
      <article className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
        
        {/* Decorative Gradient Top Bar */}
        <div className="h-2 w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

        <div className="p-8 md:p-12">
          
          {/* Header Section */}
          <header className="mb-10 border-b border-slate-100 pb-10">
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider border border-blue-100">
                {report.week}
              </span>
              <span className="text-slate-400 font-mono text-sm">
                {report.date}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
              {report.title}
            </h1>

            {/* Tags Row */}
            <div className="flex flex-wrap gap-2">
              {report.tags.map((tag, index) => (
                <span key={index} className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                  #{tag}
                </span>
              ))}
            </div>
          </header>

          {/* Body Content - The "Brief Summary" you requested */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Left Column: Text Narrative */}
            <div className="lg:col-span-2">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">
                Executive Summary
              </h3>
              <div className="prose prose-lg text-slate-600 leading-relaxed">
                <p className="text-lg">
                  {report.summary}
                </p>
                {/* We combine the old "Challenges" and "Solutions" text 
                   into a smooth narrative paragraph if they exist, 
                   instead of red/green boxes.
                */}
                {(report.challenges || report.solution) && (
                  <p className="mt-6 p-6 bg-slate-50 rounded-xl border-l-4 border-blue-400 italic text-slate-700">
                    "<span className="font-semibold not-italic text-slate-900">Note:</span> {report.challenges} To resolve this, I {report.solution.toLowerCase()}."
                  </p>
                )}
              </div>
            </div>

            {/* Right Column: Visual Evidence Gallery */}
            <div className="lg:col-span-1 space-y-6">
               <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">
                Visual Documentation
              </h3>
              
              {report.images.map((img, index) => (
                <div key={index} className="group relative rounded-2xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-xl transition-all duration-300">
                  {/* Image with subtle zoom effect */}
                  <img 
                    src={img} 
                    alt="Evidence" 
                    className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Overlay Caption */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <span className="text-white text-xs font-mono font-medium">
                      Fig {index + 1}. System Snapshot
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
        
        {/* Footer of the Card */}
        <div className="bg-slate-50 px-8 py-4 border-t border-slate-100 flex justify-between items-center">
            <span className="text-xs text-slate-400 font-mono">ID: {report.id} • Signed by Engineer</span>
            
            {/* Optional: "Next Report" button logic could go here */}
            <div className="flex gap-2">
               <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
               <span className="text-xs font-bold text-slate-500 uppercase">Logged</span>
            </div>
        </div>

      </article>
    </div>
  );
};

export default ReportView;