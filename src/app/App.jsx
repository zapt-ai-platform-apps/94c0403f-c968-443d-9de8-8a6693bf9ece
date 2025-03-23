import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar, Footer, ZaptBadge } from '@/modules/layout/api';
import { DashboardProvider } from '@/modules/dashboard/api';
import DashboardPage from './pages/DashboardPage';
import DumperLeaderboard from './pages/DumperLeaderboard';
import BonderLeaderboard from './pages/BonderLeaderboard';
import PumperLeaderboard from './pages/PumperLeaderboard';
import DeveloperDetailPage from './pages/DeveloperDetailPage';

export default function App() {
  return (
    <DashboardProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/dumpers" element={<DumperLeaderboard />} />
              <Route path="/bonders" element={<BonderLeaderboard />} />
              <Route path="/pumpers" element={<PumperLeaderboard />} />
              <Route path="/developer/:id" element={<DeveloperDetailPage />} />
            </Routes>
          </main>
          <Footer />
          <ZaptBadge />
        </div>
      </Router>
    </DashboardProvider>
  );
}