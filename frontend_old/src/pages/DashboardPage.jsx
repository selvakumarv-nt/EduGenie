import React from 'react';
import { 
  HelpCircle, 
  BookOpen, 
  BrainCircuit, 
  FileText, 
  Compass, 
  ArrowRight, 
  Sparkles, 
  TrendingUp, 
  Award, 
  Clock, 
  Zap 
} from 'lucide-react';

export default function DashboardPage({ setCurrentPage }) {
  const quickActions = [
    {
      id: 'qa',
      title: 'Ask AI Question',
      desc: 'Instant answers for geography, math, science, and history.',
      icon: HelpCircle,
      color: '#6366f1',
      badge: 'QnA Endpoint'
    },
    {
      id: 'explain',
      title: 'Explain a Concept',
      desc: 'Simplify complex theories like Pythagoras Theorem or Quantum Mechanics.',
      icon: BookOpen,
      color: '#8b5cf6',
      badge: 'Explain Endpoint'
    },
    {
      id: 'quiz',
      title: 'Generate Quiz',
      desc: 'Create 3 MCQs with 4 options and automatic scoring.',
      icon: BrainCircuit,
      color: '#ec4899',
      badge: 'Quiz Endpoint'
    },
    {
      id: 'summarize',
      title: 'Summarize Text',
      desc: 'Condense long paragraphs into key bullet points.',
      icon: FileText,
      color: '#10b981',
      badge: 'Summarize Endpoint'
    },
    {
      id: 'learn',
      title: 'Learning Path',
      desc: 'Build structured roadmaps for topics like SQL, Python, or AI.',
      icon: Compass,
      color: '#f59e0b',
      badge: 'Roadmap Endpoint'
    }
  ];

  const sampleScenarios = [
    {
      title: 'Scenario 1: Geography & Oceans',
      prompt: 'Ask: "Which is the largest ocean?"',
      targetPage: 'qa',
      param: 'Which is the largest ocean?'
    },
    {
      title: 'Scenario 2: Geometry Understanding',
      prompt: 'Quiz: "Pythagoras Theorem"',
      targetPage: 'quiz',
      param: 'Pythagoras Theorem'
    },
    {
      title: 'Scenario 3: SQL Mastery Roadmap',
      prompt: 'Path: "SQL Database Development"',
      targetPage: 'learn',
      param: 'SQL'
    }
  ];

  return (
    <div className="page-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Welcome Header */}
      <div style={{
        background: 'linear-gradient(135deg, #ffffff 0%, #f1edfe 100%)',
        borderRadius: '1.25rem',
        padding: '2rem',
        border: '1px solid #ddd6fe',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1.5rem',
        boxShadow: 'var(--shadow-md)'
      }}>
        <div>
          <div className="badge badge-indigo" style={{ marginBottom: '0.5rem' }}>
            <Sparkles size={12} /> Student Learning Hub
          </div>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: '#0f172a' }}>
            Welcome back to EduGenie 🧠✨
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.975rem', marginTop: '0.2rem' }}>
            Select an AI module below to start your study session or test your knowledge.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <div style={{
            background: '#ffffff',
            padding: '0.85rem 1.25rem',
            borderRadius: '0.75rem',
            border: '1px solid #ddd6fe',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#6366f1' }}>5 AI Tools</div>
            <div style={{ fontSize: '0.75rem', color: '#64748b' }}>FastAPI Backend</div>
          </div>
          <div style={{
            background: '#ffffff',
            padding: '0.85rem 1.25rem',
            borderRadius: '0.75rem',
            border: '1px solid #ddd6fe',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#10b981' }}>Active</div>
            <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Real Time Engine</div>
          </div>
        </div>
      </div>

      {/* Quick Launch Action Cards */}
      <div>
        <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#0f172a', marginBottom: '1.25rem' }}>
          Quick Learning Actions
        </h2>

        <div className="grid-3">
          {quickActions.map((act) => {
            const Icon = act.icon;
            return (
              <div 
                key={act.id} 
                className="card"
                onClick={() => setCurrentPage(act.id)}
                style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '1rem' }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <div style={{
                      width: 44,
                      height: 44,
                      borderRadius: '0.75rem',
                      background: `${act.color}15`,
                      color: act.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Icon size={22} />
                    </div>
                    <span className="badge badge-indigo">{act.badge}</span>
                  </div>

                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.4rem' }}>
                    {act.title}
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: 1.5 }}>
                    {act.desc}
                  </p>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  color: act.color,
                  marginTop: '0.5rem'
                }}>
                  Launch Tool <ArrowRight size={15} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recommended Project Scenarios */}
      <div style={{
        background: '#ffffff',
        borderRadius: '1.25rem',
        padding: '1.75rem',
        border: '1px solid #ddd6fe',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.4rem' }}>
          Try Project Document Scenarios
        </h2>
        <p style={{ color: '#64748b', fontSize: '0.88rem', marginBottom: '1.25rem' }}>
          Click any scenario below to test the exact workflows specified in the EduGenie technical guide.
        </p>

        <div className="grid-3">
          {sampleScenarios.map((scen, idx) => (
            <div 
              key={idx}
              style={{
                background: '#f8f9fe',
                padding: '1.25rem',
                borderRadius: '0.85rem',
                border: '1px solid #e2e8f0',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '0.75rem'
              }}
            >
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#6366f1', textTransform: 'uppercase' }}>
                  {scen.title}
                </span>
                <p style={{ fontSize: '0.925rem', fontWeight: 600, color: '#0f172a', marginTop: '0.3rem' }}>
                  {scen.prompt}
                </p>
              </div>

              <button 
                onClick={() => setCurrentPage(scen.targetPage)}
                className="btn btn-secondary"
                style={{ padding: '0.5rem 1rem', fontSize: '0.825rem', width: '100%' }}
              >
                Execute Scenario <ArrowRight size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
