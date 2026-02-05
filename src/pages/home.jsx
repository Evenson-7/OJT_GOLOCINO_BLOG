import { useState, useEffect, useRef } from 'react';
import { weeklyReports } from '../data/reports';
import station from '../assets/images/station.jpg';

const Home = () => {
  const [viewMode, setViewMode] = useState('landing'); 
  const [activeReportId, setActiveReportId] = useState(weeklyReports[weeklyReports.length - 1].id);
  const [imageIndex, setImageIndex] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  
  // --- LIGHTBOX STATE (Updated to be generic) ---
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxType, setLightboxType] = useState('report'); // 'report' or 'station'
  
  const scrollRef = useRef(null);

  // --- DATA: HOURS LOG ---
  const hoursData = [
    { month: 'August', hours: 40 },
    { month: 'September', hours: 144 },
    { month: 'October', hours: 116 },
    { month: 'November', hours: 113 },
    { month: 'December', hours: 97 },
  ];
  const totalHours = 510;
  const requiredHours = 486;
  const progressPercentage = Math.min((totalHours / requiredHours) * 100, 100);

  const sortedReports = [...weeklyReports].sort((a, b) => b.id - a.id);
  const currentIndex = sortedReports.findIndex(r => r.id === activeReportId);
  const activeReport = sortedReports[currentIndex];
  const newerReport = sortedReports[currentIndex - 1];
  const olderReport = sortedReports[currentIndex + 1];

  useEffect(() => {
    if (viewMode !== 'landing' || isPaused) return;
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollRef.current.scrollBy({ left: 400, behavior: 'smooth' });
        }
      }
    }, 3000); 
    return () => clearInterval(interval);
  }, [viewMode, isPaused]);

  // NAVIGATION HANDLER
  const handleImageNav = (e, direction) => {
    e.stopPropagation(); 
    if (direction === 'next') {
      setImageIndex((prev) => (prev + 1) % activeReport.images.length);
    } else {
      setImageIndex((prev) => (prev - 1 + activeReport.images.length) % activeReport.images.length);
    }
  };

  const switchReport = (id) => {
    setActiveReportId(id);
    setImageIndex(0);
    document.getElementById('main-content')?.scrollTo(0,0);
  };

  const scrollToLogs = () => {
    document.getElementById('weekly-carousel')?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const scrollToWorkplace = () => {
    document.getElementById('workplace-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Helper to open specific lightbox type
  const openLightbox = (type) => {
    setLightboxType(type);
    setIsLightboxOpen(true);
  };

  // --- VIEW 1: LANDING PAGE ---
  if (viewMode === 'landing') {
    return (
      <div className="min-h-screen bg-[#f8fafc] dark:bg-slate-950 overflow-y-auto transition-colors duration-300">
        
        {/* Background Blobs */}
        <div className="fixed inset-0 pointer-events-none">
           <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-blue-300 dark:bg-blue-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-20 animate-blob"></div>
           <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-300 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        </div>

        {/* --- SECTION 1: HEADER & STATS --- */}
        <section className="relative w-full min-h-[80vh] flex items-center justify-center px-6 md:px-12 pt-20 pb-10">
          <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left: Functional Controls */}
            <div className="flex flex-col justify-center items-start space-y-8 z-10">
              <div className="flex items-center gap-3">
                 <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-500/30">
                   JS
                 </div>
                 <div>
                   <h2 className="text-xl font-bold text-slate-900 dark:text-white">Evenson R. Golocino Jr</h2>
                   <p className="text-sm text-slate-500 dark:text-slate-400 font-mono">BSIT Intern • Batch 2026</p>
                 </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 w-full">
                <button 
                  onClick={scrollToLogs}
                  className="px-8 py-5 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-lg hover:scale-105 transition-all shadow-xl flex items-center justify-center gap-3"
                >
                  <span>View Weekly Logs</span>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
                </button>
                <button 
                  onClick={scrollToWorkplace}
                  className="px-8 py-5 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-white font-bold text-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <span>The Workplace</span>
                </button>
              </div>

              <p className="text-sm text-slate-400 dark:text-slate-500 max-w-md italic">
                "Systematically documenting the engineering process, challenges, and resolutions encountered during the 486-hour OJT tenure."
              </p>
            </div>

            {/* Right: HOURS TRACKER */}
            <div className="relative z-10">
              <div className="absolute inset-0 transform translate-x-4 translate-y-4 rounded-[2.5rem] bg-gradient-to-tr from-blue-200 to-purple-200 dark:from-blue-900 dark:to-purple-900 opacity-50 blur-lg"></div>
              <div className="relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/50 dark:border-slate-700 p-8 rounded-[2.5rem] shadow-2xl">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Total Rendered Hours</h3>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-5xl font-black text-slate-900 dark:text-white">{totalHours}</span>
                      <span className="text-lg font-medium text-slate-400">/ {requiredHours} hrs</span>
                    </div>
                  </div>
                  <div className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-3 py-1 rounded-full text-xs font-bold border border-green-200 dark:border-green-800">COMPLETED</div>
                </div>

                <div className="mb-8">
                  <div className="flex justify-between text-xs font-bold text-slate-500 mb-2">
                    <span>Progress</span>
                    <span>{(totalHours / requiredHours * 100).toFixed(0)}%</span>
                  </div>
                  <div className="w-full h-4 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden border border-slate-200 dark:border-slate-700">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-green-400 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
                  </div>
                  <p className="text-xs text-slate-400 mt-2 text-right">+{totalHours - requiredHours} hours overtime</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {hoursData.map((data, idx) => (
                    <div key={idx} className="bg-slate-50 dark:bg-slate-800 p-3 rounded-xl border border-slate-100 dark:border-slate-700">
                      <p className="text-[10px] font-bold text-slate-400 uppercase">{data.month}</p>
                      <p className="text-lg font-bold text-slate-800 dark:text-white">{data.hours}h</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- SECTION 2: THE WORKPLACE (Interactive) --- */}
        <section id="workplace-section" className="w-full py-24 relative z-10">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
                The Workplace
              </h2>
              <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
                The place where I learned the value of teamwork, communication, and real-world application of my skills.
              </p>
            </div>
            
            {/* ADDED: cursor-zoom-in + onClick handler 
                ADDED: 'group' class to handle hover state of text
            */}
            <div 
              className="relative rounded-[3rem] overflow-hidden shadow-2xl group border border-slate-200 dark:border-slate-800 cursor-zoom-in"
              onClick={() => openLightbox('station')}
            >
              <img 
                src={station}
                alt="OJT Workplace" 
                className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent"></div>
              
              {/* GLASS CARD OVERLAY 
                  ADDED: transition-all duration-500 group-hover:opacity-0 group-hover:translate-y-10
                  This hides the text when you hover the image 
              */}
              <div className="absolute inset-0 flex items-end p-6 md:p-10 transition-all duration-500 group-hover:opacity-0 group-hover:translate-y-10">
                <div className="w-full max-w-4xl bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
                  
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-blue-600 text-white rounded-lg text-xs font-bold uppercase tracking-wider shadow-lg shadow-blue-500/20">
                      CABID-AN
                    </span>
                    <span className="flex items-center gap-1 text-slate-300 text-xs font-mono bg-white/5 px-2 py-1 rounded-md border border-white/5">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      Main Headquarters
                    </span>
                  </div>

                  <div className="flex flex-col md:flex-row gap-8 items-start">
                    <div className="flex-1">
                      <h3 className="text-3xl md:text-4xl font-black text-white mb-2 tracking-tight">
                        Sorsogon City Police Station
                      </h3>
                      <p className="text-blue-200 font-medium">Operations & Intelligence Division</p>
                    </div>
                    <div className="flex-1">
                      <p className="text-slate-300 leading-relaxed text-sm md:text-base border-l-2 border-blue-500 pl-4">
                        "A hub of discipline and public service. Here, I immersed myself in the daily rhythm of law enforcement operations—streamlining documentation workflows and assisting desk officers. This environment taught me that technology isn't just about code; it's about serving the community efficiently."
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Optional: "View Full Image" hint that appears on hover */}


            </div>
          </div>
        </section>

        {/* --- SECTION 3: CAROUSEL --- */}
        <section id="weekly-carousel" className="w-full py-24 bg-slate-50/50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-800">
          <div className="text-center mb-12 px-4">
             <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
               Weekly Highlights
             </h2>
             <p className="text-slate-500 dark:text-slate-400">
               A breakdown of technical contributions.
             </p>
          </div>

          <div className="relative w-full">
            <div className="absolute -top-16 right-10 z-20 hidden md:block">
               <button onClick={() => setIsPaused(!isPaused)} className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 rounded-full shadow-lg border border-slate-200 dark:border-slate-700 hover:scale-105 transition-transform">
                 {isPaused ? <><span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span><span className="text-xs font-bold text-slate-700 dark:text-slate-200 uppercase">Resume</span></> : <><span className="w-2 h-2 rounded-full bg-red-500"></span><span className="text-xs font-bold text-slate-700 dark:text-slate-200 uppercase">Stop</span></>}
               </button>
            </div>

            <div 
              ref={scrollRef}
              className="w-full overflow-x-auto pb-12 pt-4 flex gap-6 snap-x snap-mandatory custom-scrollbar px-6 md:px-12"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {sortedReports.map((report) => (
                <div 
                  key={report.id}
                  onClick={() => { switchReport(report.id); setViewMode('detail'); setIsSidebarOpen(false); }}
                  className="snap-center shrink-0 w-[340px] md:w-[380px] h-[480px] bg-white dark:bg-slate-900 rounded-[1.5rem] shadow-xl border border-slate-100 dark:border-slate-800 relative overflow-hidden group cursor-pointer hover:-translate-y-2 transition-transform duration-300"
                >
                  <div className="h-3/5 w-full overflow-hidden">
                    <img src={report.images[0]} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent"></div>
                  </div>
                  <div className="absolute bottom-0 left-0 w-full p-6 text-white">
                    <div className="flex justify-between items-end mb-2">
                       <span className="text-xs font-mono bg-white/20 backdrop-blur-md px-2 py-1 rounded text-white border border-white/10">{report.date.split('-')[0]}</span>
                    </div>
                    <h2 className="text-4xl font-black leading-tight mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-100 to-white">
                      {report.week}
                    </h2>
                    <div className="mt-3 flex items-center text-xs font-bold uppercase tracking-wider text-blue-300">
                      Read Entry <span className="ml-2">→</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>
    );
  }

  // --- VIEW 2: READER MODE ---
  return (
    <div className="flex h-screen overflow-hidden bg-[#f8fafc] dark:bg-slate-950 transition-colors duration-300">
      
      {/* SIDEBAR */}
      <aside 
        className={`bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col z-20 shadow-2xl transition-all duration-500 ease-in-out ${
          isSidebarOpen ? 'w-[320px] translate-x-0 opacity-100' : 'w-0 -translate-x-full opacity-0 overflow-hidden'
        }`}
      >
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 min-w-[320px]">
          <h1 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">Report List</h1>
          <p className="text-xs text-slate-400 font-mono mt-1">Jump to week</p>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-2 custom-scrollbar min-w-[320px]">
          {sortedReports.map((report) => (
            <button
              key={report.id}
              onClick={() => switchReport(report.id)}
              className={`w-full text-left p-4 rounded-xl transition-all duration-200 border-l-4 ${
                activeReportId === report.id 
                  ? 'bg-slate-50 dark:bg-slate-800 border-blue-500 shadow-sm' 
                  : 'bg-white dark:bg-transparent border-transparent hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <h3 className={`text-sm font-bold leading-snug ${activeReportId === report.id ? 'text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400'}`}>
                {report.week}
              </h3>
              <span className="text-[10px] text-slate-400 block mt-1">
                {report.date}
              </span>
            </button>
          ))}
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 relative flex flex-col h-screen overflow-hidden bg-slate-50/50 dark:bg-slate-950/50">
        
        {/* TOOLBAR */}
        <div className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md flex items-center justify-between px-6 z-30 shrink-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-blue-600 transition-colors"
            >
              {isSidebarOpen ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" /></svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
              )}
            </button>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest hidden md:block">
              {isSidebarOpen ? "List View" : "Focus Mode"}
            </span>
          </div>

          <button 
            onClick={() => setViewMode('landing')}
            className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-800 flex items-center gap-2"
          >
            Exit to Home
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
          </button>
        </div>

        {/* CONTENT AREA */}
        <div id="main-content" className="flex-1 overflow-y-auto p-6 md:p-10 scroll-smooth">
          <div key={activeReportId} className="w-full max-w-[1600px] mx-auto animate-fadeIn pb-20">
            
            <div className="flex flex-col xl:flex-row gap-10 items-start mb-16">
              
              {/* TEXT CONTENT */}
              <div className="xl:w-1/2 space-y-6 pt-2">
                 <header>
                   <span className="text-slate-400 text-sm font-mono block mb-2">{activeReport.date}</span>
                   <h2 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white leading-tight">
                     {activeReport.week}
                   </h2>
                 </header>

                 <div className="prose prose-lg text-slate-600 dark:text-slate-300 max-w-none">
                   <p className="leading-relaxed text-lg">{activeReport.summary}</p>
                 </div>
              </div>

              {/* IMAGE CAROUSEL - WITH CLICKABLE LIGHTBOX */}
              <div className="xl:w-1/2 w-full sticky top-6">
                <div 
                  className="relative group rounded-3xl overflow-hidden shadow-2xl border border-white/50 dark:border-slate-700/50 bg-white dark:bg-slate-800 aspect-video cursor-zoom-in"
                  onClick={() => openLightbox('report')}
                >
                  <img 
                    src={activeReport.images[imageIndex]} 
                    alt="Evidence" 
                    className="w-full h-full object-cover transition-all duration-500"
                  />
                  
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center pointer-events-none">
                     <span className="opacity-0 group-hover:opacity-100 text-white font-bold bg-black/40 px-4 py-2 rounded-full backdrop-blur-md transition-all transform scale-90 group-hover:scale-100">
                        View Full Image
                     </span>
                  </div>

                  {activeReport.images.length > 1 && (
                    <>
                      <button onClick={(e) => handleImageNav(e, 'prev')} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/20 backdrop-blur-md rounded-full text-white hover:bg-black/40 flex items-center justify-center transition-all z-10">←</button>
                      <button onClick={(e) => handleImageNav(e, 'next')} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/20 backdrop-blur-md rounded-full text-white hover:bg-black/40 flex items-center justify-center transition-all z-10">→</button>
                    </>
                  )}
                </div>
                <p className="text-center text-xs font-mono text-slate-400 mt-3">Evidence {imageIndex + 1} of {activeReport.images.length}</p>
              </div>
            </div>

            {/* BOTTOM NAV */}
            <div className="border-t border-slate-200 dark:border-slate-800 pt-8 grid grid-cols-2 gap-6">
              <div>
                {olderReport && (
                  <button 
                    onClick={() => switchReport(olderReport.id)}
                    className="group text-left p-5 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700 hover:bg-blue-50 dark:hover:bg-slate-900 transition-all w-full"
                  >
                    <span className="text-xs text-slate-400 font-bold uppercase tracking-wider group-hover:text-blue-500">← Previous Entry</span>
                    <h4 className="text-lg font-bold text-slate-700 dark:text-slate-300 mt-1 truncate">{olderReport.week}</h4>
                  </button>
                )}
              </div>
              <div className="text-right">
                {newerReport && (
                  <button 
                    onClick={() => switchReport(newerReport.id)}
                    className="group text-right p-5 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700 hover:bg-blue-50 dark:hover:bg-slate-900 transition-all w-full"
                  >
                     <span className="text-xs text-slate-400 font-bold uppercase tracking-wider group-hover:text-blue-500">Next Entry →</span>
                     <h4 className="text-lg font-bold text-slate-700 dark:text-slate-300 mt-1 truncate">{newerReport.week}</h4>
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* --- LIGHTBOX MODAL (UPDATED FOR DUAL USE) --- */}
      {isLightboxOpen && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setIsLightboxOpen(false)}
        >
          {/* Close Button */}
          <button className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all z-[120]">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>

          {/* Nav Buttons (Only show if we are in 'report' mode AND have multiple images) */}
          {lightboxType === 'report' && activeReport.images.length > 1 && (
            <>
              <button 
                onClick={(e) => handleImageNav(e, 'prev')} 
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-full text-white transition-all z-[110]"
              >
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button 
                onClick={(e) => handleImageNav(e, 'next')} 
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-full text-white transition-all z-[110]"
              >
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>
            </>
          )}

          {/* Full Image */}
          <img 
            // CONDITIONAL SOURCE: If lightboxType is 'station', show station.jpg. Else show current report image.
            src={lightboxType === 'station' ? station : activeReport.images[imageIndex]} 
            alt="Full View" 
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()} 
          />
          
          <p className="absolute bottom-6 text-slate-400 font-mono text-sm">
            {lightboxType === 'station' ? 'Workplace Overview' : `Evidence ${imageIndex + 1} / ${activeReport.images.length}`}
          </p>
        </div>
      )}

    </div>
  );
};

export default Home;