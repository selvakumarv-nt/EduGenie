import React from 'react';
import { 
  Sparkles, 
  HelpCircle, 
  BookOpen, 
  BrainCircuit, 
  FileText, 
  Compass, 
  ArrowRight, 
  CheckCircle2, 
  Zap, 
  ShieldCheck, 
  GraduationCap 
} from 'lucide-react';

export default function LandingPage({ setCurrentPage }) {
  const features = [
    {
      icon: HelpCircle,
      title: 'AI Question Answering',
      desc: 'Ask complex queries across any subject and get clear, instant, structured answers powered by Gemini 1.5.'
    },
    {
      icon: BookOpen,
      title: 'Concept Explainer',
      desc: 'Break down complicated topics into simple, digestible definitions, analogies, and key principles.'
    },
    {
      icon: BrainCircuit,
      title: 'Interactive Quiz Generator',
      desc: 'Generate 3 custom MCQs with 4 plausible options, immediate validation feedback, and final score metrics.'
    },
    {
      icon: FileText,
      title: 'Smart Text Summarizer',
      desc: 'Paste lengthy textbooks, articles, or notes to extract executive summaries and bullet points.'
    },
    {
      icon: Compass,
      title: 'Personalized Learning Paths',
      desc: 'Receive tailored, multi-level roadmaps (Beginner to Advanced) with estimated timelines and resources.'
    }
  ];

  const steps = [
    {
      number: '01',
      title: 'Select Learning Tool',
      desc: 'Choose Q&A, Concept Explainer, Quiz Generator, Summarizer, or Learning Paths from the dashboard.'
    },
    {
      number: '02',
      title: 'Enter Topic or Text',
      desc: 'Input your academic question, passage, or subject of interest into the intelligent input box.'
    },
    {
      number: '03',
      title: 'Receive Instant AI Insights',
      desc: 'Get structured answers, real-time quizzes, simplified breakdowns, or structured study roadmaps.'
    }
  ];

  return (
    <div className="page-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #ffffff 0%, #f1edfe 100%)',
        borderRadius: '1.5rem',
        padding: '3.5rem 2.5rem',
        border: '1px solid #ddd6fe',
        boxShadow: '0 10px 30px rgba(99, 102, 241, 0.08)',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1.5rem'
      }}>
        <div className="badge badge-indigo" style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }}>
          <Sparkles size={14} /> Powered by Google Gemini & LaMini-Flan-T5
        </div>

        <h1 style={{
          fontSize: '2.75rem',
          fontWeight: 800,
          color: '#0f172a',
          lineHeight: 1.25,
          maxWidth: '850px',
          letterSpacing: '-0.02em'
        }}>
          Simplify Your Learning Journey with <span style={{
            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>EduGenie</span> AI
        </h1>

        <p style={{
          fontSize: '1.15rem',
          color: '#475569',
          maxWidth: '680px',
          lineHeight: 1.6
        }}>
          Your personal AI study companion. Get instant answers, simplified concept breakdowns, self-assessing quizzes, concise passage summaries, and structured learning roadmaps.
        </p>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', marginTop: '0.5rem' }}>
          <button 
            onClick={() => setCurrentPage('dashboard')} 
            className="btn btn-primary" 
            style={{ padding: '0.95rem 2rem', fontSize: '1.05rem' }}
          >
            Start Learning Now <ArrowRight size={18} />
          </button>
          <button 
            onClick={() => setCurrentPage('qa')} 
            className="btn btn-secondary" 
            style={{ padding: '0.95rem 2rem', fontSize: '1.05rem' }}
          >
            Ask a Question
          </button>
        </div>

        {/* Highlight Stats */}
        <div style={{
          display: 'flex',
          gap: '2.5rem',
          flexWrap: 'wrap',
          justifyContent: 'center',
          marginTop: '1.5rem',
          paddingTop: '1.5rem',
          borderTop: '1px solid #e2e8f0',
          width: '100%',
          maxWidth: '700px'
        }}>
          <div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#6366f1' }}>5 Core Modules</div>
            <div style={{ fontSize: '0.85rem', color: '#64748b' }}>Q&A, Explain, Quiz, Summary, Path</div>
          </div>
          <div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#8b5cf6' }}>100% Real AI</div>
            <div style={{ fontSize: '0.85rem', color: '#64748b' }}>Gemini 1.5 Pro & LaMini</div>
          </div>
          <div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#10b981' }}>FastAPI Powered</div>
            <div style={{ fontSize: '0.85rem', color: '#64748b' }}>Modular Python Backend</div>
          </div>
        </div>
      </section>

      {/* Feature Showcase Grid */}
      <section>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '1.85rem', fontWeight: 800, color: '#0f172a' }}>
            Powerful Educational Capabilities
          </h2>
          <p style={{ color: '#64748b', fontSize: '1rem', marginTop: '0.4rem' }}>
            Designed for students, self-learners, and educators at all levels.
          </p>
        </div>

        <div className="grid-3">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div key={i} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{
                  width: 44,
                  height: 44,
                  borderRadius: '0.75rem',
                  background: 'var(--primary-light)',
                  color: 'var(--primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Icon size={22} />
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f172a' }}>{f.title}</h3>
                <p style={{ fontSize: '0.925rem', color: '#64748b', lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* How It Works Section */}
      <section style={{
        background: '#ffffff',
        borderRadius: '1.5rem',
        padding: '3rem 2rem',
        border: '1px solid #ddd6fe',
        boxShadow: 'var(--shadow-md)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '1.85rem', fontWeight: 800, color: '#0f172a' }}>
            How EduGenie Works
          </h2>
          <p style={{ color: '#64748b', fontSize: '1rem', marginTop: '0.4rem' }}>
            Three simple steps to supercharge your study sessions
          </p>
        </div>

        <div className="grid-3">
          {steps.map((step, i) => (
            <div key={i} style={{
              background: '#f8f9fe',
              padding: '1.75rem',
              borderRadius: '1rem',
              border: '1px solid #e2e8f0',
              position: 'relative'
            }}>
              <span style={{
                fontSize: '2rem',
                fontWeight: 800,
                color: '#ddd6fe',
                display: 'block',
                marginBottom: '0.5rem'
              }}>
                {step.number}
              </span>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>
                {step.title}
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#64748b' }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA Banner */}
      <section style={{
        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
        borderRadius: '1.5rem',
        padding: '3rem 2rem',
        color: '#ffffff',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1.25rem',
        boxShadow: '0 12px 30px rgba(99, 102, 241, 0.3)'
      }}>
        <GraduationCap size={48} />
        <h2 style={{ fontSize: '2rem', fontWeight: 800 }}>Ready to Master Any Concept?</h2>
        <p style={{ maxWidth: '600px', fontSize: '1.05rem', opacity: 0.9 }}>
          Access AI Q&A, quiz generation, topic simplification, and roadmaps in one dashboard.
        </p>
        <button 
          onClick={() => setCurrentPage('dashboard')}
          className="btn"
          style={{
            background: '#ffffff',
            color: '#4f46e5',
            fontWeight: 700,
            padding: '0.95rem 2.25rem',
            fontSize: '1.05rem'
          }}
        >
          Launch Student Dashboard <ArrowRight size={18} />
        </button>
      </section>
    </div>
  );
}
