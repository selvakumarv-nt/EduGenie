import os
import google.generativeai as genai

def summarize_text(text: str) -> str:
    """
    Summarizes long educational passages into clear, easy-to-understand key points.
    """
    if not text or not text.strip():
        return "Please provide valid text to summarize."

    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        return (
            "### Passage Summary\n\n"
            f"**Executive Summary**: {text[:150]}...\n\n"
            "**Key Highlights**:\n"
            "• Main concept introduced in original text passage.\n"
            "• Core supporting mechanisms and functional details.\n"
            "• Conclusion and practical takeaway points.\n\n"
            "*(Set GEMINI_API_KEY in .env for dynamic AI summarization!)*"
        )

    try:
        genai.configure(api_key=api_key)
        for model_name in ["gemini-1.5-flash", "gemini-1.5-pro", "gemini-2.0-flash"]:
            try:
                model = genai.GenerativeModel(model_name=model_name)
                prompt = (
                    "You are EduGenie, an expert educational content summarizer. "
                    "Summarize the following passage into concise, easy-to-read language.\n\n"
                    "Structure your response with:\n"
                    "1. **Executive Summary** (1-2 sentences)\n"
                    "2. **Key Takeaways** (3-5 bullet points with bold terms)\n"
                    "3. **Bottom Line** (1 concluding sentence)\n\n"
                    f"Text:\n{text}"
                )
                response = model.generate_content(prompt)
                if response and hasattr(response, "text") and response.text:
                    return response.text.strip()
            except Exception:
                continue
        return f"Summary: {text[:250]}..."
    except Exception as e:
        return f"⚠️ Error in Summary: {str(e)}"
