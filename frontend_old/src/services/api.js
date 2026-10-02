// EduGenie Reusable API Service Layer

const API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
  ? 'http://127.0.0.1:8000' 
  : '';

/**
 * Generic fetch wrapper with timeout, header handling, and error parsing
 */
async function fetchAPI(endpoint, options = {}) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 25000);

  const defaultHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers
      },
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      let errorMsg = `HTTP Error ${response.status}`;
      try {
        const errorData = await response.json();
        errorMsg = errorData.error || errorData.detail || errorMsg;
      } catch (e) {
        // ignore json parse error
      }
      throw new Error(errorMsg);
    }

    return await response.json();
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      throw new Error('Request timed out. Please check your network or try again.');
    }
    throw error;
  }
}

export const apiService = {
  // Check backend health status
  checkHealth: async () => {
    try {
      return await fetchAPI('/health');
    } catch (e) {
      return { status: 'offline', gemini_api_configured: false, error: e.message };
    }
  },

  // 1. Ask AI Question
  askQuestion: async (question) => {
    if (!question || !question.trim()) {
      throw new Error('Please enter a question to ask EduGenie.');
    }
    return await fetchAPI('/qa', {
      method: 'POST',
      body: JSON.stringify({ question: question.trim() })
    });
  },

  // 2. Concept Explainer
  explainTopic: async (topic) => {
    if (!topic || !topic.trim()) {
      throw new Error('Please provide a topic to explain.');
    }
    return await fetchAPI('/explain', {
      method: 'POST',
      body: JSON.stringify({ topic: topic.trim() })
    });
  },

  // 3. Quiz Generator
  generateQuiz: async (text) => {
    if (!text || !text.trim()) {
      throw new Error('Please enter text or a topic to generate a quiz.');
    }
    return await fetchAPI('/quiz', {
      method: 'POST',
      body: JSON.stringify({ text: text.trim() })
    });
  },

  // 4. Text Summarizer
  summarizeText: async (text) => {
    if (!text || !text.trim()) {
      throw new Error('Please provide text to summarize.');
    }
    if (text.trim().length < 15) {
      throw new Error('Passage is too short. Please provide at least 15 characters.');
    }
    return await fetchAPI('/summarize', {
      method: 'POST',
      body: JSON.stringify({ text: text.trim() })
    });
  },

  // 5. Learning Path Recommendations
  getLearningPath: async (topic) => {
    if (!topic || !topic.trim()) {
      throw new Error('Please specify a topic for your learning path.');
    }
    return await fetchAPI('/learn/recommendations', {
      method: 'POST',
      body: JSON.stringify({ topic: topic.trim() })
    });
  }
};
