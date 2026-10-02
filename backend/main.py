import os
from fastapi import FastAPI, Request, Query, HTTPException
from fastapi.responses import JSONResponse, FileResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional

from qna import answer_question_with_gemini
from explanation_module import explain_topic
from quiz_module import generate_quiz
from summary_module import summarize_text
from learning_path import get_learning_recommendations

app = FastAPI(
    title="EduGenie AI Assistant API",
    description="Backend API for EduGenie - Powered by Google Gemini & LaMini-Flan-T5",
    version="2.0.0"
)

# Enable CORS for React Frontend (support localhost:5173, 3000, 8000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic Request Schemas
class QnARequest(BaseModel):
    question: str

class ExplainRequest(BaseModel):
    topic: str

class QuizRequest(BaseModel):
    text: Optional[str] = None
    topic: Optional[str] = None

class SummarizeRequest(BaseModel):
    text: str

class RecommendationRequest(BaseModel):
    topic: str


# ----------------------------------------------------
# API ENDPOINTS
# ----------------------------------------------------

@app.get("/health")
async def health():
    api_key_set = bool(os.environ.get("GEMINI_API_KEY"))
    return {
        "status": "healthy",
        "service": "EduGenie AI Backend",
        "gemini_api_configured": api_key_set
    }

# 1. Question Answering Endpoints
@app.get("/qa")
async def answer_question_get(question: str = Query(..., description="The question to ask EduGenie")):
    answer = answer_question_with_gemini(question)
    return {"question": question, "answer": answer}

@app.post("/qa")
async def answer_question_post(req: Request):
    try:
        data = await req.json()
        question = data.get("question")
    except Exception:
        question = None

    if not question:
        raise HTTPException(status_code=400, detail="Please provide a valid 'question' in request body.")

    answer = answer_question_with_gemini(question)
    return {"question": question, "answer": answer}


# 2. Concept Explanation Endpoints
@app.get("/explain")
async def explain_api_get(topic: str = Query(...)):
    explanation = explain_topic(topic)
    return {"topic": topic, "explanation": explanation}

@app.post("/explain")
async def explain_api_post(req: Request):
    try:
        data = await req.json()
        topic = data.get("topic")
    except Exception:
        topic = None

    if not topic:
        return JSONResponse(status_code=400, content={"error": "Please provide a topic."})

    explanation = explain_topic(topic)
    return {"topic": topic, "explanation": explanation}


# 3. Quiz Generation Endpoints
@app.get("/quiz")
async def quiz_api_get(text: str = Query(..., description="Passage or topic for quiz generation")):
    quiz = generate_quiz(text)
    return {"text": text, "quiz": quiz}

@app.post("/quiz")
async def quiz_api_post(req: Request):
    try:
        data = await req.json()
        text = data.get("text") or data.get("topic")
    except Exception:
        text = None

    if not text:
        return JSONResponse(status_code=400, content={"error": "Please provide text for quiz."})

    quiz = generate_quiz(text)
    return JSONResponse(content={"text": text, "quiz": quiz})


# 4. Summarization Endpoints
@app.get("/summarize")
async def summarize_api_get(text: str = Query(...)):
    summary = summarize_text(text)
    return {"text": text, "summary": summary}

@app.post("/summarize")
async def summarize_api_post(req: Request):
    try:
        data = await req.json()
        text = data.get("text")
    except Exception:
        text = None

    if not text:
        return JSONResponse(status_code=400, content={"error": "Please provide text to summarize."})

    summary = summarize_text(text)
    return {"text": text, "summary": summary}


# 5. Learning Path Recommendations Endpoints
@app.get("/learn/recommendations")
async def learning_recommendation_get(topic: str = Query(...)):
    recommendation = get_learning_recommendations(topic)
    return {"topic": topic, "recommendation": recommendation}

@app.post("/learn/recommendations")
async def learning_recommendation_post(req: Request):
    try:
        data = await req.json()
        topic = data.get("topic")
    except Exception:
        topic = None

    if not topic:
        return JSONResponse(status_code=400, content={"error": "Please provide a topic."})

    recommendation = get_learning_recommendations(topic)
    return {"topic": topic, "recommendation": recommendation}


# Static React build hosting (if dist directory exists)
dist_path = os.path.join(os.path.dirname(__file__), "dist")
if os.path.exists(dist_path):
    assets_path = os.path.join(dist_path, "assets")
    if os.path.exists(assets_path):
        app.mount("/assets", StaticFiles(directory=assets_path), name="assets")

    @app.get("/{full_path:path}")
    async def serve_spa(full_path: str):
        target = os.path.join(dist_path, full_path)
        if os.path.exists(target) and os.path.isfile(target):
            return FileResponse(target)
        return FileResponse(os.path.join(dist_path, "index.html"))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
