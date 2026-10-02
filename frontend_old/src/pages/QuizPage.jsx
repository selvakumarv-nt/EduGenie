import React, { useState } from 'react';
import { BrainCircuit, Sparkles, CheckCircle2, XCircle, RefreshCw, Award, Send } from 'lucide-react';
import { apiService } from '../services/api';
import { LoadingSpinner, ErrorAlert } from '../components/LoadingSpinner';

export default function QuizPage() {
  const [inputText, setInputText] = useState('');
  const [quizQuestions, setQuizQuestions] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [checkedStatus, setCheckedStatus] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const samplePassages = [
    "Pythagoras Theorem",
    "The Solar System and Planetary Orbits",
    "Artificial Intelligence and Machine Learning",
    "Photosynthesis in Green Plants"
  ];

  const handleGenerate = async (e) => {
    e?.preventDefault();
    if (!inputText.trim()) return;

    setLoading(true);
    setError(null);
    setQuizQuestions(null);
    setUserAnswers({});
    setCheckedStatus({});

    try {
      const result = await apiService.generateQuiz(inputText.trim());
      if (result && Array.isArray(result.quiz)) {
        setQuizQuestions(result.quiz);
      } else if (Array.isArray(result)) {
        setQuizQuestions(result);
      } else {
        throw new Error('Received invalid quiz structure from server.');
      }
    } catch (err) {
      setError(err.message || 'Failed to generate quiz questions.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectOption = (qIdx, option) => {
    if (checkedStatus[qIdx]) return; // locked once checked
    setUserAnswers(prev => ({ ...prev, [qIdx]: option }));
  };

  const handleCheckQuestion = (qIdx) => {
    if (!userAnswers[qIdx]) return;
    setCheckedStatus(prev => ({ ...prev, [qIdx]: true }));
  };

  const calculateScore = () => {
    if (!quizQuestions) return 0;
    let score = 0;
    quizQuestions.forEach((q, idx) => {
      if (userAnswers[idx] === q.answer) score += 1;
    });
    return score;
  };

  const isAllAnswered = quizQuestions && Object.keys(checkedStatus).length === quizQuestions.length;

  return (
    <div className="page-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div className="card">
        <div className="card-title">
          <BrainCircuit size={22} color="#ec4899" />
          <span>Interactive Quiz Generator</span>
        </div>
        <p className="card-subtitle">
          Generate 3 multiple-choice questions (MCQs) with 4 options each from any passage or topic (POST /quiz).
        </p>

        <form onSubmit={handleGenerate}>
          <div className="form-group">
            <label className="form-label" htmlFor="quizTextInput">
              <span>Passage or Topic for Quiz</span>
              <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Required</span>
            </label>
            <input
              id="quizTextInput"
              type="text"
              className="input-field"
              placeholder="e.g. Pythagoras Theorem, Solar System..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              disabled={loading}
              required
            />
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {samplePassages.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setInputText(p)}
                  style={{
                    background: '#fdf2f8',
                    border: '1px solid #fbcfe8',
                    borderRadius: '0.5rem',
                    padding: '0.35rem 0.75rem',
                    fontSize: '0.78rem',
                    color: '#db2777',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  + {p}
                </button>
              ))}
            </div>

            <button type="submit" className="btn btn-primary" style={{ background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)' }} disabled={loading || !inputText.trim()}>
              {loading ? <LoadingSpinner text="" /> : <>Generate Quiz <Sparkles size={16} /></>}
            </button>
          </div>
        </form>

        <ErrorAlert message={error} onRetry={handleGenerate} />
      </div>

      {loading && (
        <div className="card" style={{ textAlign: 'center' }}>
          <LoadingSpinner text="EduGenie is generating 3 custom MCQs with 4 options each..." />
        </div>
      )}

      {/* Quiz Questions Display */}
      {quizQuestions && quizQuestions.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '1rem',
            padding: '1.25rem 1.5rem',
            border: '1px solid #ddd6fe',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div>
              <strong style={{ fontSize: '1.1rem', color: '#0f172a' }}>Quiz: 3 Multiple Choice Questions</strong>
              <div style={{ fontSize: '0.85rem', color: '#64748b' }}>Select an option for each question and click "Check Answer"</div>
            </div>
            <span className="output-badge" style={{ background: '#fdf2f8', color: '#db2777' }}>
              POST /quiz
            </span>
          </div>

          {quizQuestions.map((q, qIdx) => {
            const isChecked = checkedStatus[qIdx];
            const selectedOpt = userAnswers[qIdx];
            const isCorrect = selectedOpt === q.answer;

            return (
              <div key={qIdx} className="quiz-question-card">
                <div className="quiz-question-title">
                  Q{qIdx + 1}: {q.question}
                </div>

                <div className="quiz-options-list">
                  {q.options.map((opt, oIdx) => {
                    let optClass = 'quiz-option-btn';
                    const isSelected = selectedOpt === opt;

                    if (isChecked) {
                      if (opt === q.answer) {
                        optClass += ' correct';
                      } else if (isSelected && !isCorrect) {
                        optClass += ' incorrect';
                      }
                    } else if (isSelected) {
                      optClass += ' selected';
                    }

                    return (
                      <button
                        key={oIdx}
                        type="button"
                        className={optClass}
                        onClick={() => handleSelectOption(qIdx, opt)}
                        disabled={isChecked}
                      >
                        <span>{opt}</span>
                        {isChecked && opt === q.answer && <CheckCircle2 size={18} color="#10b981" />}
                        {isChecked && isSelected && !isCorrect && <XCircle size={18} color="#ef4444" />}
                      </button>
                    );
                  })}
                </div>

                <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  {!isChecked && (
                    <button
                      type="button"
                      className="btn btn-primary"
                      style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }}
                      onClick={() => handleCheckQuestion(qIdx)}
                      disabled={!selectedOpt}
                    >
                      Check Answer
                    </button>
                  )}

                  {isChecked && isCorrect && (
                    <div style={{ color: '#10b981', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.925rem' }}>
                      <CheckCircle2 size={18} /> Correct! Excellent job.
                    </div>
                  )}

                  {isChecked && !isCorrect && (
                    <div style={{ color: '#ef4444', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.925rem' }}>
                      <XCircle size={18} /> Incorrect. Correct answer: <span style={{ color: '#0f172a', textDecoration: 'underline' }}>{q.answer}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Final Quiz Score Metric */}
          {isAllAnswered && (
            <div className="card" style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #fdf2f8 100%)',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1rem'
            }}>
              <Award size={48} color="#ec4899" />
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a' }}>Quiz Completed!</h3>
              <p style={{ fontSize: '1.25rem', fontWeight: 700, color: '#db2777' }}>
                Your Score: {calculateScore()} / {quizQuestions.length} ({Math.round((calculateScore() / quizQuestions.length) * 100)}%)
              </p>
              <button onClick={handleGenerate} className="btn btn-secondary">
                <RefreshCw size={16} /> Try Another Quiz
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
