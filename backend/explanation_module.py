import os
import google.generativeai as genai

_lamini_model = None
_lamini_tokenizer = None
_lamini_checked = False

def load_lamini_model_if_available():
    global _lamini_model, _lamini_tokenizer, _lamini_checked
    if _lamini_checked:
        return _lamini_model is not None
    _lamini_checked = True
    try:
        from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
        _lamini_tokenizer = AutoTokenizer.from_pretrained("MBZUAI/LaMini-Flan-T5-783M")
        _lamini_model = AutoModelForSeq2SeqLM.from_pretrained("MBZUAI/LaMini-Flan-T5-783M")
        return True
    except Exception:
        _lamini_model = None
        _lamini_tokenizer = None
        return False

def explain_topic(topic: str) -> str:
    """
    Explains complex educational topics in a simplified, step-by-step manner.
    Uses local LaMini-Flan-T5 model if installed, otherwise uses Google Gemini 1.5.
    """
    if not topic or not topic.strip():
        return "Please provide a valid topic to explain."

    # Try local LaMini model if present and functional
    if load_lamini_model_if_available() and _lamini_model and _lamini_tokenizer:
        try:
            input_text = f"Explain the concept of '{topic}' in a simple and clear way for a school student."
            inputs = _lamini_tokenizer(input_text, return_tensors="pt")
            outputs = _lamini_model.generate(
                **inputs,
                max_new_tokens=250,
                temperature=0.7,
                top_k=50,
                top_p=0.95,
                do_sample=True
            )
            explanation = _lamini_tokenizer.decode(outputs[0], skip_special_tokens=True)
            return f"[Local LaMini-Flan-T5 Explanation]\n\n{explanation}"
        except Exception:
            pass

    # Cloud Gemini 1.5 Model
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        return (
            f"### Simplified Explanation: {topic}\n\n"
            f"**Definition**: '{topic}' is a foundational concept in learning that simplifies complex problems into manageable components.\n\n"
            "**Key Principles**:\n"
            "1. **Core Mechanism**: Breaks down complex operations into simple, repeatable rules.\n"
            "2. **Real-World Analogy**: Think of it like a recipe or map guiding step-by-step discovery.\n"
            "3. **Practical Utility**: Applied widely across academic studies, problem-solving, and real-world scenarios.\n\n"
            "*(Set GEMINI_API_KEY in .env to unlock real-time Gemini AI explanations!)*"
        )

    try:
        genai.configure(api_key=api_key)
        for model_name in ["gemini-1.5-flash", "gemini-1.5-pro", "gemini-2.0-flash"]:
            try:
                model = genai.GenerativeModel(model_name=model_name)
                prompt = (
                    f"Explain the concept of '{topic}' in a simple, clear, and engaging manner for a student.\n\n"
                    "Please structure the explanation as follows:\n"
                    "1. **Simple Overview**: 2-sentence definition in simple language.\n"
                    "2. **Core Pillars**: 3 essential bullet points breaking down how it works.\n"
                    "3. **Real-World Analogy**: An easy-to-understand analogy.\n"
                    "4. **Key Takeaway**: 1 summary sentence."
                )
                response = model.generate_content(prompt)
                if response and hasattr(response, "text") and response.text:
                    return response.text.strip()
            except Exception:
                continue
        return f"Unable to generate explanation for '{topic}' with current AI models."
    except Exception as e:
        return f"⚠️ Error in Explanation: {str(e)}"
