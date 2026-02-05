import { Outlet } from 'react-router-dom';
import Navbar from '../components/navbar';

const Layout = () => {
  return (
    // 1. Removed 'bg-gray-50'. Now it's transparent so it shows the body color (which is dark).
    // 2. Added 'min-h-screen' to ensure full height coverage.
    <div className="min-h-screen flex flex-col transition-colors duration-300">
      
      {/* Navbar stays at the top */}
      <Navbar />

      {/* CRITICAL FIX: 
         - Removed 'max-w-7xl', 'mx-auto', 'px-4', 'py-8'. 
         - Changed to 'w-full'.
         - This allows the Home page to decide its own width (Full Screen).
      */}
      <main className="flex-grow w-full">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 mt-auto transition-colors duration-300">
        <div className="w-full max-w-7xl mx-auto py-6 px-4 text-center text-slate-500 dark:text-slate-400 text-sm">
          &copy; {new Date().getFullYear()} OJT BLog. Built with React & Tailwind.
        </div>
      </footer>
    </div>
  );
};

export default Layout;