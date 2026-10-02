import React, { useState } from 'react';
import { BookOpen, Sparkles, Send, Copy, Check } from 'lucide-react';
import { apiService } from '../services/api';
import { LoadingSpinner, ErrorAlert } from '../components/LoadingSpinner';

export default function ExplainerPage() {
  const [topic, setTopic] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  const sampleTopics = [
    "Pythagoras Theorem",
    "Quantum Computing",
    "Binary Search Algorithm",
    "Photosynthesis",
    "Black Holes & Spacetime"
  ];

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!topic.trim()) return;

    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const result = await apiService.explainTopic(topic.trim());
      setResponse(result);
    } catch (err) {
      setError(err.message || 'Failed to generate explanation.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (response?.explanation) {
      navigator.clipboard.writeText(response.explanation);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="page-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div className="card">
        <div className="card-title">
          <BookOpen size={22} color="#8b5cf6" />
          <span>Concept Explainer</span>
        </div>
        <p className="card-subtitle">
          Understand complex concepts through simplified explanations tailored for school students & self-learners (POST /explain).
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="topicInput">
              <span>Topic or Subject to Explain</span>
              <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Required</span>
            </label>
            <input
              id="topicInput"
              type="text"
              className="input-field"
              placeholder="e.g. Pythagoras Theorem, Quantum Computing..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              disabled={loading}
              required
            />
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {sampleTopics.map((t, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setTopic(t)}
                  style={{
                    background: '#f5f3ff',
                    border: '1px solid #ddd6fe',
                    borderRadius: '0.5rem',
                    padding: '0.35rem 0.75rem',
                    fontSize: '0.78rem',
                    color: '#8b5cf6',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  + {t}
                </button>
              ))}
            </div>

            <button type="submit" className="btn btn-primary" disabled={loading || !topic.trim()}>
              {loading ? <LoadingSpinner text="" /> : <>Explain Topic <Send size={16} /></>}
            </button>
          </div>
        </form>

        <ErrorAlert message={error} onRetry={handleSubmit} />
      </div>

      {loading && (
        <div className="card" style={{ textAlign: 'center' }}>
          <LoadingSpinner text="EduGenie is breaking down this concept with simplified AI logic..." />
        </div>
      )}

      {response && !loading && (
        <div className="output-box">
          <div className="output-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Sparkles size={18} color="#8b5cf6" />
              <strong style={{ color: '#0f172a', fontSize: '1.05rem' }}>Explanation: {response.topic}</strong>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span className="output-badge" style={{ background: '#f5f3ff', color: '#8b5cf6' }}>POST /explain</span>
              <button
                onClick={handleCopy}
                className="btn btn-secondary"
                style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem' }}
              >
                {copied ? <><Check size={14} color="#10b981" /> Copied!</> : <><Copy size={14} /> Copy</>}
              </button>
            </div>
          </div>

          <div className="output-content">
            {response.explanation}
          </div>
        </div>
      )}
    </div>
  );
}
