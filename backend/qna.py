import os
import google.generativeai as genai
from config import get_gemini_models

def answer_question_with_gemini(question: str) -> str:
    """
    Answers a student's question using Google Gemini.
    Provides clear, structured responses with markdown formatting.
    """
    if not question or not question.strip():
        return "Please provide a valid question."
        
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        if "ocean" in question.lower():
            return (
                "**Answer**:\n"
                "The **Pacific Ocean** is the largest and deepest ocean on Earth. "
                "It covers over 60 million square miles (155 million square km), extending from the Arctic Ocean in the north to the Southern Ocean in the south.\n\n"
                "*(Note: Set GEMINI_API_KEY in .env for dynamic AI generation)*"
            )
        return (
            f"**EduGenie AI Answer** for *'{question}'*:\n\n"
            "EduGenie uses Google Gemini to provide precise, step-by-step academic answers.\n\n"
            "To enable live AI generation, add your API key to `.env`:\n"
            "```\nGEMINI_API_KEY=your_google_gemini_api_key\n```"
        )

    try:
        genai.configure(api_key=api_key)
        for model_name in get_gemini_models():
            try:
                model = genai.GenerativeModel(model_name=model_name)
                prompt = (
                    "You are EduGenie, an expert AI tutor. Answer the student's question clearly, "
                    "accurately, and concisely. Use bold text for key terms and bullet points for lists where helpful:\n\n"
                    f"Question: {question}"
                )
                response = model.generate_content(prompt)
                if response and hasattr(response, "text") and response.text:
                    return response.text.strip()
            except Exception:
                continue
        return "⚠️ Unable to generate response with available Gemini models."
    except Exception as e:
        return f"⚠️ Error in QnA: {str(e)}"

