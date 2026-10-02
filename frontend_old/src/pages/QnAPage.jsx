import React, { useState } from 'react';
import { HelpCircle, Send, Sparkles, Copy, Check, RefreshCw } from 'lucide-react';
import { apiService } from '../services/api';
import { LoadingSpinner, ErrorAlert } from '../components/LoadingSpinner';

export default function QnAPage() {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  const sampleQuestions = [
    "Which is the largest ocean?",
    "What is Photosynthesis and why is it important?",
    "How does gravity work on Mars compared to Earth?",
    "Explain the difference between compiled and interpreted languages."
  ];

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!question.trim()) return;

    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const result = await apiService.askQuestion(question.trim());
      setResponse(result);
    } catch (err) {
      setError(err.message || 'Failed to fetch answer from EduGenie AI.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (response?.answer) {
      navigator.clipboard.writeText(response.answer);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="page-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div className="card">
        <div className="card-title">
          <HelpCircle size={22} color="#6366f1" />
          <span>Ask EduGenie a Question</span>
        </div>
        <p className="card-subtitle">
          Type any academic question or general knowledge query to get a smart, concise AI answer (POST /qa).
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="questionInput">
              <span>Your Question</span>
              <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Required</span>
            </label>
            <input
              id="questionInput"
              type="text"
              className="input-field"
              placeholder="e.g. Which is the largest ocean?"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              disabled={loading}
              required
            />
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {sampleQuestions.map((q, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setQuestion(q)}
                  style={{
                    background: '#f1edfe',
                    border: '1px solid #ddd6fe',
                    borderRadius: '0.5rem',
                    padding: '0.35rem 0.75rem',
                    fontSize: '0.78rem',
                    color: '#6366f1',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  + {q}
                </button>
              ))}
            </div>

            <button type="submit" className="btn btn-primary" disabled={loading || !question.trim()}>
              {loading ? <LoadingSpinner text="" /> : <>Get Answer <Send size={16} /></>}
            </button>
          </div>
        </form>

        <ErrorAlert message={error} onRetry={handleSubmit} />
      </div>

      {/* Answer Result Output */}
      {loading && (
        <div className="card" style={{ textAlign: 'center' }}>
          <LoadingSpinner text="EduGenie is consulting Google Gemini 1.5 for your answer..." />
        </div>
      )}

      {response && !loading && (
        <div className="output-box">
          <div className="output-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Sparkles size={18} color="#6366f1" />
              <strong style={{ color: '#0f172a', fontSize: '1.05rem' }}>Answer</strong>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span className="output-badge">POST /qa</span>
              <button
                onClick={handleCopy}
                className="btn btn-secondary"
                style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem' }}
                title="Copy Answer"
              >
                {copied ? <><Check size={14} color="#10b981" /> Copied!</> : <><Copy size={14} /> Copy</>}
              </button>
            </div>
          </div>

          <div style={{ padding: '0.5rem 0', fontWeight: 600, color: '#475569', marginBottom: '0.5rem' }}>
            Q: {response.question}
          </div>

          <div className="output-content">
            {response.answer}
          </div>
        </div>
      )}
    </div>
  );
}
