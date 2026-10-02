import React, { useState, useEffect } from 'react';
import { Settings, Shield, Server, RefreshCw, Key, CheckCircle2, AlertCircle, Trash2 } from 'lucide-react';
import { apiService } from '../services/api';

export default function SettingsPage() {
  const [healthStatus, setHealthStatus] = useState(null);
  const [checking, setChecking] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [savedMsg, setSavedMsg] = useState('');

  const checkConnection = async () => {
    setChecking(true);
    try {
      const res = await apiService.checkHealth();
      setHealthStatus(res);
    } catch (e) {
      setHealthStatus({ status: 'offline', gemini_api_configured: false, error: e.message });
    } finally {
      setChecking(false);
    }
  };

  useEffect(() => {
    checkConnection();
  }, []);

  const handleClearCache = () => {
    localStorage.clear();
    setSavedMsg('Local cache cleared successfully.');
    setTimeout(() => setSavedMsg(''), 3000);
  };

  return (
    <div className="page-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div className="card">
        <div className="card-title">
          <Settings size={22} color="#6366f1" />
          <span>Platform Settings & System Status</span>
        </div>
        <p className="card-subtitle">
          Configure backend API connections, inspect environment status, and clear local state.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '1.5rem' }}>
          {/* Connection Status Section */}
          <div style={{
            background: '#f8f9fe',
            borderRadius: '0.85rem',
            padding: '1.25rem',
            border: '1px solid #ddd6fe',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <Server size={24} color="#6366f1" />
              <div>
                <strong style={{ fontSize: '1.05rem', color: '#0f172a' }}>FastAPI Backend Health</strong>
                <div style={{ fontSize: '0.85rem', color: '#64748b' }}>
                  {healthStatus?.status === 'healthy' || healthStatus?.status === 'online'
                    ? 'Connected to http://127.0.0.1:8000'
                    : 'Disconnected / Reconnecting'}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              {healthStatus?.gemini_api_configured ? (
                <span className="badge badge-green">
                  <CheckCircle2 size={12} /> GEMINI_API_KEY Configured in .env
                </span>
              ) : (
                <span className="badge" style={{ background: '#fffbeb', color: '#d97706' }}>
                  <AlertCircle size={12} /> Key Missing (Demo Fallback Active)
                </span>
              )}

              <button 
                onClick={checkConnection} 
                className="btn btn-secondary"
                disabled={checking}
                style={{ padding: '0.4rem 0.85rem', fontSize: '0.825rem' }}
              >
                <RefreshCw size={14} className={checking ? 'spinner' : ''} /> Ping Server
              </button>
            </div>
          </div>

          {/* Environment Variable Setup Instructions */}
          <div style={{
            background: '#ffffff',
            borderRadius: '0.85rem',
            padding: '1.5rem',
            border: '1px solid #e2e8f0'
          }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Key size={18} color="#6366f1" /> Google Gemini API Setup Instructions
            </h3>
            <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: 1.6, marginBottom: '1rem' }}>
              EduGenie uses your Gemini API key strictly through the FastAPI backend server. Secrets are never exposed to the frontend.
            </p>

            <div style={{
              background: '#0f172a',
              color: '#38bdf8',
              padding: '1rem',
              borderRadius: '0.5rem',
              fontFamily: 'monospace',
              fontSize: '0.85rem',
              lineHeight: 1.6
            }}>
              # Step 1: Open the backend .env file at:<br />
              C:\Users\WELCOME\.gemini\antigravity\scratch\edugenie\.env<br /><br />
              # Step 2: Set your Google Gemini API Key:<br />
              GEMINI_API_KEY=AIzaSyYourActualKeyHere<br /><br />
              # Step 3: Restart FastAPI server (python main.py)
            </div>
          </div>

          {/* Storage & Reset */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '1rem',
            borderTop: '1px solid #e2e8f0'
          }}>
            <div>
              <strong style={{ fontSize: '0.95rem', color: '#0f172a' }}>Local Workspace Cache</strong>
              <p style={{ fontSize: '0.85rem', color: '#64748b' }}>Reset cached UI session states and history.</p>
            </div>

            <button onClick={handleClearCache} className="btn btn-secondary" style={{ color: '#ef4444' }}>
              <Trash2 size={16} /> Clear Local Cache
            </button>
          </div>

          {savedMsg && (
            <div style={{ color: '#10b981', fontWeight: 600, fontSize: '0.9rem' }}>
              ✔ {savedMsg}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
