import React, { useState } from 'react';
import { Compass, Sparkles, Send, Copy, Check, MapPin, Layers } from 'lucide-react';
import { apiService } from '../services/api';
import { LoadingSpinner, ErrorAlert } from '../components/LoadingSpinner';

export default function LearningPathPage() {
  const [topic, setTopic] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  const sampleSubjects = [
    "SQL Database Development",
    "Python Programming for Beginners",
    "Full-Stack Web Development",
    "Data Science & Machine Learning",
    "Cybersecurity Fundamentals"
  ];

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!topic.trim()) return;

    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const result = await apiService.getLearningPath(topic.trim());
      setResponse(result);
    } catch (err) {
      setError(err.message || 'Failed to generate learning recommendations.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (response?.recommendation) {
      navigator.clipboard.writeText(response.recommendation);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="page-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div className="card">
        <div className="card-title">
          <Compass size={22} color="#f59e0b" />
          <span>Personalized Learning Paths</span>
        </div>
        <p className="card-subtitle">
          Request a structured study plan from Beginner to Advanced with timelines, key topics, and curated resources (POST /learn/recommendations).
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="learningTopicInput">
              <span>Subject or Skill to Master</span>
              <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Required</span>
            </label>
            <input
              id="learningTopicInput"
              type="text"
              className="input-field"
              placeholder="e.g. SQL, Python, Machine Learning..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              disabled={loading}
              required
            />
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {sampleSubjects.map((s, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setTopic(s)}
                  style={{
                    background: '#fffbeb',
                    border: '1px solid #fde68a',
                    borderRadius: '0.5rem',
                    padding: '0.35rem 0.75rem',
                    fontSize: '0.78rem',
                    color: '#d97706',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  + {s}
                </button>
              ))}
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' }}
              disabled={loading || !topic.trim()}
            >
              {loading ? <LoadingSpinner text="" /> : <>Generate Roadmap <Send size={16} /></>}
            </button>
          </div>
        </form>

        <ErrorAlert message={error} onRetry={handleSubmit} />
      </div>

      {loading && (
        <div className="card" style={{ textAlign: 'center' }}>
          <LoadingSpinner text="EduGenie is mapping out your step-by-step learning progression..." />
        </div>
      )}

      {response && !loading && (
        <div className="output-box">
          <div className="output-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Layers size={18} color="#f59e0b" />
              <strong style={{ color: '#0f172a', fontSize: '1.05rem' }}>Learning Path: {response.topic}</strong>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span className="output-badge" style={{ background: '#fffbeb', color: '#d97706' }}>
                POST /learn/recommendations
              </span>
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
            {response.recommendation}
          </div>
        </div>
      )}
    </div>
  );
}
