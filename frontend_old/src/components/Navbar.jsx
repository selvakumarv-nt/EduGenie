import React, { useState, useEffect } from 'react';
import { Menu, Sparkles, Activity, CheckCircle2, AlertCircle } from 'lucide-react';
import { apiService } from '../services/api';

export default function Navbar({ setMobileOpen, currentPage }) {
  const [health, setHealth] = useState({ status: 'checking', gemini_api_configured: false });

  useEffect(() => {
    let isMounted = true;
    apiService.checkHealth().then(res => {
      if (isMounted) setHealth(res);
    });
    return () => { isMounted = false; };
  }, [currentPage]);

  const pageTitles = {
    landing: 'Welcome to EduGenie',
    dashboard: 'Student Dashboard',
    qa: 'AI Question Answering',
    explain: 'Concept Explainer',
    quiz: 'Interactive Quiz Generator',
    summarize: 'Text Summarizer',
    learn: 'Personalized Learning Paths',
    settings: 'Platform Settings'
  };

  return (
    <header className="header-bar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button 
          className="mobile-toggle"
          onClick={() => setMobileOpen(true)}
          aria-label="Open Navigation Menu"
        >
          <Menu size={20} />
        </button>
        <div>
          <h1 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f172a' }}>
            {pageTitles[currentPage] || 'EduGenie'}
          </h1>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {health.status === 'healthy' || health.status === 'online' ? (
          <div className="badge badge-green" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <CheckCircle2 size={13} />
            <span>Backend Online {health.gemini_api_configured ? '(Gemini Active)' : '(Demo Mode)'}</span>
          </div>
        ) : (
          <div className="badge" style={{ background: '#fef2f2', color: '#ef4444', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <AlertCircle size={13} />
            <span>Connecting...</span>
          </div>
        )}

        <div style={{
          width: 36,
          height: 36,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 700,
          fontSize: '0.85rem'
        }}>
          EG
        </div>
      </div>
    </header>
  );
}
