import React from 'react';

export function LoadingSpinner({ text = 'EduGenie is thinking...' }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2.5rem 1.5rem',
      gap: '1rem',
      color: '#6366f1',
      textAlign: 'center'
    }}>
      <div className="spinner" style={{ borderColor: '#ddd6fe', borderTopColor: '#6366f1', width: 32, height: 32 }}></div>
      <span style={{ fontSize: '0.95rem', fontWeight: 600, color: '#475569' }}>{text}</span>
    </div>
  );
}

export function ErrorAlert({ message, onRetry }) {
  if (!message) return null;
  return (
    <div style={{
      background: '#fef2f2',
      border: '1px solid #fecaca',
      borderRadius: '0.75rem',
      padding: '1rem 1.25rem',
      color: '#991b1b',
      marginTop: '1rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '1rem',
      fontSize: '0.9rem'
    }}>
      <div>
        <strong>Error: </strong> {message}
      </div>
      {onRetry && (
        <button 
          onClick={onRetry}
          className="btn btn-secondary"
          style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
        >
          Try Again
        </button>
      )}
    </div>
  );
}
