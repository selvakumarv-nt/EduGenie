import os
from dotenv import load_dotenv

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")
HOST = os.getenv("HOST", "0.0.0.0")
PORT = int(os.getenv("PORT", 8000))
GEMINI_MODEL = os.getenv("GEMINI_MODEL", "gemini-1.5-flash")

def get_gemini_models():
    """Returns deduplicated list of Gemini models starting with configured primary model."""
    primary = os.getenv("GEMINI_MODEL", "gemini-1.5-flash")
    candidates = [primary, "gemini-1.5-flash", "gemini-1.5-pro", "gemini-2.0-flash", "gemini-2.5-flash"]
    seen = set()
    result = []
    for m in candidates:
        if m and m not in seen:
            seen.add(m)
            result.append(m)
    return result

