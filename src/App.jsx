// src/app.jsx
import { Routes, Route } from 'react-router-dom';
import Layout from './layouts/layout';
import Home from './pages/home';
import ReportView from './pages/reportview';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="report/:id" element={<ReportView />} />
      </Route>
    </Routes>
  );
}

export default App;