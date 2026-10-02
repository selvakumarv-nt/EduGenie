import React from 'react';
import { 
  Sparkles, 
  LayoutDashboard, 
  HelpCircle, 
  BookOpen, 
  BrainCircuit, 
  FileText, 
  Compass, 
  Settings, 
  Home,
  X
} from 'lucide-react';

export default function Sidebar({ currentPage, setCurrentPage, mobileOpen, setMobileOpen }) {
  const navItems = [
    { id: 'landing', label: 'Home / Landing', icon: Home },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'qa', label: 'AI Q&A Assistant', icon: HelpCircle },
    { id: 'explain', label: 'Concept Explainer', icon: BookOpen },
    { id: 'quiz', label: 'Quiz Generator', icon: BrainCircuit },
    { id: 'summarize', label: 'Text Summarizer', icon: FileText },
    { id: 'learn', label: 'Learning Paths', icon: Compass },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleNav = (id) => {
    setCurrentPage(id);
    setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile backdrop overlay */}
      {mobileOpen && (
        <div 
          onClick={() => setMobileOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.4)',
            backdropFilter: 'blur(4px)',
            zIndex: 35
          }}
        />
      )}

      <aside className={`sidebar ${mobileOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-brand">
          <div className="brand-icon">
            <Sparkles size={22} />
          </div>
          <div>
            <div className="brand-title">EduGenie</div>
            <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 600 }}>AI Learning Companion</span>
          </div>
          {mobileOpen && (
            <button 
              onClick={() => setMobileOpen(false)}
              style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
            >
              <X size={20} />
            </button>
          )}
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`nav-link ${isActive ? 'active' : ''}`}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div style={{ padding: '1rem', borderTop: '1px solid #ddd6fe', margin: '0.5rem' }}>
          <div style={{
            background: 'linear-gradient(135deg, #f1edfe 0%, #eef2ff 100%)',
            borderRadius: '0.75rem',
            padding: '0.85rem',
            textAlign: 'center'
          }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#6366f1', display: 'block', marginBottom: '0.2rem' }}>
              GEMINI 1.5 PRO READY
            </span>
            <span style={{ fontSize: '0.72rem', color: '#64748b' }}>
              FastAPI AI Engine Active
            </span>
          </div>
        </div>
      </aside>
    </>
  );
}
