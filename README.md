# EduGenie: Google Gemini Powered AI Educational Learning Assistant 🧠✨

EduGenie is a full-stack, responsive AI-powered educational web application designed for students, self-learners, and educators. Built with a modern **React + Vite** frontend and a modular **FastAPI** Python backend, EduGenie simplifies learning through Google Gemini generative AI and local model support.

---

## 🌟 Core Features & Modules

| Module | Endpoint | Description |
| :--- | :--- | :--- |
| **Q&A Assistant** | `POST /qa` | Ask academic queries and receive smart, structured answers with markdown formatting. |
| **Concept Explainer** | `POST /explain` | Simplifies complex topics (e.g. *Pythagoras Theorem*, *Quantum Computing*) into clear definitions, bullet points, and real-world analogies. Integrates local **LaMini-Flan-T5** model with **Gemini 1.5** fallback. |
| **Quiz Generator** | `POST /quiz` | Generates 3 multiple-choice questions (MCQs) with 4 options each, interactive selection feedback (`✔ Correct` / `❌ Incorrect`), and end-of-quiz score calculation. |
| **Text Summarizer** | `POST /summarize` | Condenses long educational passages and articles into executive summaries and bullet points. |
| **Learning Paths** | `POST /learn/recommendations` | Creates multi-level structured roadmaps (Beginner -> Intermediate -> Advanced) with estimated timelines and curated resources. |

---

## 🎨 UI/UX Design System

- **Color Palette**: Clean white & light-lavender background (`#f8f9fe` / `#f1edfe`), indigo/violet primary accents (`#6366f1` / `#8b5cf6`), dark charcoal readable typography (`#0f172a`).
- **Cards & Controls**: Rounded cards (`border-radius: 1rem`), glassmorphism header, subtle elevation shadows, smooth input focus states.
- **Navigation**: Desktop collapsible sidebar and responsive mobile drawer navigation.

---

## 🏗️ Project Architecture & File Structure

```text
edugenie/
├── config.py                 # Environment configuration & settings
├── qna.py                    # Question Answering AI module (Gemini 1.5)
├── explanation_module.py     # Concept explanation module (LaMini-Flan-T5 + Gemini)
├── quiz_module.py            # Quiz generator module (3 MCQs, 4 options each)
├── summary_module.py         # Text summarization module (Gemini)
├── learning_path.py          # Learning path recommendations module (Gemini)
├── main.py                   # FastAPI REST API endpoints & static SPA host
├── requirements.txt          # Python backend dependencies
├── .env                      # Environment variables (GEMINI_API_KEY)
├── .env.example              # Environment variables template
├── package.json              # Root manifest & execution scripts
├── dist/                     # Standalone production frontend build
│   └── index.html
└── frontend/                 # React + Vite source codebase
    ├── package.json
    ├── vite.config.js
    ├── index.html
    └── src/
        ├── main.jsx
        ├── App.jsx
        ├── index.css
        ├── services/
        │   └── api.js        # Reusable API service layer
        ├── components/
        │   ├── Sidebar.jsx
        │   ├── Navbar.jsx
        │   └── LoadingSpinner.jsx
        └── pages/
            ├── LandingPage.jsx
            ├── DashboardPage.jsx
            ├── QnAPage.jsx
            ├── ExplainerPage.jsx
            ├── QuizPage.jsx
            ├── SummarizerPage.jsx
            ├── LearningPathPage.jsx
            └── SettingsPage.jsx
```

---

## 🚀 Setup & Execution Guide

### Prerequisites
- **Python 3.10+** (Python 3.13 tested)
- **Google Gemini API Key** (Get key from [Google AI Studio](https://aistudio.google.com/))

### 1. Environment Configuration
Copy `.env.example` to `.env` and enter your Gemini API key:
```bash
GEMINI_API_KEY=your_actual_google_gemini_api_key
HOST=0.0.0.0
PORT=8000
```

### 2. Install Python Dependencies
```bash
pip install -r requirements.txt
```

### 3. Run FastAPI Application (Backend + Frontend Served Together)
```bash
python main.py
```
* Or using Uvicorn directly:
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```
Navigate your browser to: **`http://127.0.0.1:8000`**

### 4. Optional: Run React Vite Dev Server (Standalone Frontend)
```bash
cd frontend
npm install
npm run dev
```
Navigate to: **`http://localhost:5173`**

---

## 🧪 Testing Performed

All 5 core AI modules and health check endpoints were empirically verified with clean HTTP 200 responses:
- `GET /health` -> `200 OK`
- `POST /qa` -> `200 OK` (Tested with ocean question scenario)
- `POST /explain` -> `200 OK` (Tested with Pythagoras Theorem scenario)
- `POST /quiz` -> `200 OK` (Tested 3 MCQs x 4 options generation)
- `POST /summarize` -> `200 OK` (Tested passage summarization)
- `POST /learn/recommendations` -> `200 OK` (Tested SQL roadmap scenario)

---

## 📜 License
MIT License - Created for EduGenie Project.
