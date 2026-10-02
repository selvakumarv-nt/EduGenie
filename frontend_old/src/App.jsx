import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import QnAPage from './pages/QnAPage';
import ExplainerPage from './pages/ExplainerPage';
import QuizPage from './pages/QuizPage';
import SummarizerPage from './pages/SummarizerPage';
import LearningPathPage from './pages/LearningPathPage';
import SettingsPage from './pages/SettingsPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [mobileOpen, setMobileOpen] = useState(false);

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage setCurrentPage={setCurrentPage} />;
      case 'dashboard':
        return <DashboardPage setCurrentPage={setCurrentPage} />;
      case 'qa':
        return <QnAPage />;
      case 'explain':
        return <ExplainerPage />;
      case 'quiz':
        return <QuizPage />;
      case 'summarize':
        return <SummarizerPage />;
      case 'learn':
        return <LearningPathPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <LandingPage setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="app-container">
      <Sidebar 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        mobileOpen={mobileOpen} 
        setMobileOpen={setMobileOpen} 
      />

      <div className="main-content">
        <Navbar setMobileOpen={setMobileOpen} currentPage={currentPage} />
        <main style={{ flex: 1 }}>
          {renderPage()}
        </main>

        <footer style={{
          padding: '1.5rem 2rem',
          textAlign: 'center',
          fontSize: '0.85rem',
          color: '#64748b',
          borderTop: '1px solid #ddd6fe',
          background: '#ffffff',
          marginTop: 'auto'
        }}>
          EduGenie &copy; {new Date().getFullYear()} &bull; AI Educational Learning Companion &bull; Powered by Google Gemini
        </footer>
      </div>
    </div>
  );
}
