import { Link } from 'react-router-dom';

const WeekCard = ({ report }) => {
  return (
    <Link 
      to={`/report/${report.id}`} 
      className="group relative flex flex-col h-full bg-white/70 backdrop-blur-md rounded-2xl p-6 border border-white/50 shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
    >
      {/* Decorative Gradient Border at Top */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-purple-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>

      <div className="flex justify-between items-start mb-4">
        <span className="font-mono text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-full border border-slate-200 group-hover:bg-blue-50 group-hover:text-blue-600 group-hover:border-blue-100 transition-colors">
          {report.week}
        </span>
        <span className="text-xs text-slate-400 font-medium font-mono">{report.date}</span>
      </div>

      <h3 className="text-xl font-bold text-slate-800 mb-3 leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all">
        {report.title}
      </h3>

      <div className="flex flex-wrap gap-2 mb-5">
        {report.tags.map((tag, index) => (
          <span key={index} className="text-[10px] uppercase tracking-wider font-bold text-slate-500 bg-white border border-slate-200 px-2 py-1 rounded-md shadow-sm">
            {tag}
          </span>
        ))}
      </div>

      <p className="text-sm text-slate-500 line-clamp-3 leading-relaxed mb-6 flex-grow">
        {report.summary}
      </p>

      <div className="flex items-center text-sm font-bold text-slate-900 mt-auto">
        <span className="group-hover:mr-2 transition-all">Read Entry</span>
        <svg className="w-4 h-4 ml-2 text-blue-500 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </div>
    </Link>
  );
};

export default WeekCard;