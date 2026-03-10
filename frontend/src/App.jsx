import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Search from './pages/Search';
import Collaborators from './pages/Collaborators';
import Trends from './pages/Trends';

function App() {
  return (
    <Router>
      <div className="flex bg-slate-50 min-h-screen font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900">
        <Sidebar />
        <div className="ml-64 flex-1">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/search" element={<Search />} />
            <Route path="/collaborators" element={<Collaborators />} />
            <Route path="/trends" element={<Trends />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
