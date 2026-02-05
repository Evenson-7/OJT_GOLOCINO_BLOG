import { useParams, Link } from 'react-router-dom';
import { weeklyReports } from '../data/reports';

const ReportView = () => {
  const { id } = useParams();
  // Find the specific week's data
  const report = weeklyReports.find(r => r.id === parseInt(id));

  if (!report) return <div className="p-10">Report not found!</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Link to="/" className="text-blue-500 hover:underline">← Back to Dashboard</Link>
      
      <header className="mt-6 mb-10">
        <h1 className="text-4xl font-bold text-gray-800">{report.week}: {report.title}</h1>
        <p className="text-gray-500 mt-2">{report.date}</p>
      </header>

      <section className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Summary</h2>
          <p className="text-gray-700">{report.summary}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           {/* Loop through images for "Documentation Pictures" requirement */}
           {report.images.map((img, index) => (
             <img key={index} src={img} alt="Evidence" className="rounded-lg border border-gray-200" />
           ))}
        </div>

        <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-500">
          <h3 className="text-red-700 font-bold">Blockers & Challenges</h3>
          <p className="text-red-600">{report.challenges}</p>
        </div>
        
        <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
           <h3 className="text-green-700 font-bold">Solution</h3>
           <p className="text-green-600">{report.solution}</p>
        </div>
      </section>
    </div>
  );
};

export default ReportView;