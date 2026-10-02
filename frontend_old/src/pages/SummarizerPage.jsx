import React, { useState } from 'react';
import { FileText, Sparkles, Send, Copy, Check } from 'lucide-react';
import { apiService } from '../services/api';
import { LoadingSpinner, ErrorAlert } from '../components/LoadingSpinner';

export default function SummarizerPage() {
  const [text, setText] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  const samplePassage = "The Industrial Revolution, which began in the late 18th century, marked a major turning point in history. It shifted manufacturing from hand-production methods to machine-driven processes, powered by steam engines and water wheels. While it dramatically boosted economic output, led to mass production of goods, and accelerated urbanization, it also created severe social challenges including harsh factory working conditions, widespread child labor, environmental pollution, and overcrowded city slums. The Industrial Revolution ultimately reshaped global trade, transportation networks, and modern labor structures.";

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!text.trim()) return;

    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const result = await apiService.summarizeText(text.trim());
      setResponse(result);
    } catch (err) {
      setError(err.message || 'Failed to summarize text.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (response?.summary) {
      navigator.clipboard.writeText(response.summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="page-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div className="card">
        <div className="card-title">
          <FileText size={22} color="#10b981" />
          <span>Smart Text Summarizer</span>
        </div>
        <p className="card-subtitle">
          Condense lengthy educational passages, notes, or articles into concise summaries with bullet points (POST /summarize).
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <div className="form-label">
              <label htmlFor="summaryTextArea">Educational Passage / Article</label>
              <span style={{ fontSize: '0.78rem', color: '#64748b' }}>
                {text.length} characters
              </span>
            </div>
            <textarea
              id="summaryTextArea"
              className="textarea-field"
              placeholder="Paste your long text passage here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              disabled={loading}
              required
            />
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
            <button
              type="button"
              onClick={() => setText(samplePassage)}
              style={{
                background: '#ecfdf5',
                border: '1px solid #a7f3d0',
                borderRadius: '0.5rem',
                padding: '0.35rem 0.75rem',
                fontSize: '0.78rem',
                color: '#059669',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              + Load Sample History Passage
            </button>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}
              disabled={loading || text.trim().length < 15}
            >
              {loading ? <LoadingSpinner text="" /> : <>Summarize Content <Send size={16} /></>}
            </button>
          </div>
        </form>

        <ErrorAlert message={error} onRetry={handleSubmit} />
      </div>

      {loading && (
        <div className="card" style={{ textAlign: 'center' }}>
          <LoadingSpinner text="EduGenie is extracting core concepts and condensing your passage..." />
        </div>
      )}

      {response && !loading && (
        <div className="output-box">
          <div className="output-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Sparkles size={18} color="#10b981" />
              <strong style={{ color: '#0f172a', fontSize: '1.05rem' }}>Passage Summary</strong>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span className="output-badge" style={{ background: '#ecfdf5', color: '#10b981' }}>POST /summarize</span>
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
            {response.summary}
          </div>
        </div>
      )}
    </div>
  );
}
