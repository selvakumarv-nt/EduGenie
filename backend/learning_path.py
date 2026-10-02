import os
import google.generativeai as genai

def get_learning_recommendations(topic: str) -> str:
    """
    Generates a personalized, structured learning path for a given topic
    with beginner, intermediate, and advanced levels, timelines, and resources.
    """
    if not topic or not topic.strip():
        topic = "SQL and Database Management"

    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        return (
            f"# SQL Learning Path: From Zero to Hero\n\n"
            "This learning path is structured to progressively introduce SQL concepts, starting from the basics and gradually advancing to more complex topics.\n\n"
            "## I. Beginner Level: Building a Foundation\n"
            "**(Estimated Time: 1–2 weeks)**\n\n"
            "* **Key Topics**:\n"
            "  * What is a Database and SQL? (Relational Model, DBMS)\n"
            "  * Basic Syntax (`SELECT`, `FROM`, `WHERE`)\n"
            "  * Data Types (`INT`, `VARCHAR`, `DATE`, etc.)\n"
            "  * Filtering Data (`WHERE` clause with comparison operators, logical operators `AND`, `OR`, `NOT`)\n"
            "  * Ordering Results (`ORDER BY`)\n"
            "  * Limiting Results (`LIMIT` / `OFFSET` / `TOP`)\n"
            "  * Basic Aggregate Functions (`COUNT`, `SUM`, `AVG`, `MIN`, `MAX`)\n"
            "  * Introduction to Tables and Columns\n\n"
            "* **Resources**:\n"
            "  * 🌐 **Interactive Tutorials**: SQLZoo (Excellent for hands-on practice with different SQL flavors)\n"
            "  * 🎓 **Online Course**: Khan Academy SQL Course\n"
            "  * 📹 **Videos**: freeCodeCamp's SQL Tutorial\n\n"
            "## II. Intermediate Level: Working with Multiple Tables\n"
            "**(Estimated Time: 2–3 weeks)**\n\n"
            "* **Key Topics**:\n"
            "  * Joining Tables (`INNER JOIN`, `LEFT JOIN`, `RIGHT JOIN`, `FULL OUTER JOIN`)\n"
            "  * Subqueries & Nested Queries\n"
            "  * Grouping Data (`GROUP BY`, `HAVING`)\n"
            "  * Set Operations (`UNION`, `INTERSECT`, `EXCEPT`)\n"
            "  * String & Date Manipulation Functions\n\n"
            "* **Resources**:\n"
            "  * 📚 **Book**: *SQL Queries for Mere Mortals* by Michael J. Hernandez\n"
            "  * 💻 **Practice Platforms**: LeetCode, HackerRank SQL Challenges\n\n"
            "## III. Advanced Level: Mastering Database Management\n"
            "**(Estimated Time: 3–4 weeks and beyond)**\n\n"
            "* **Key Topics**:\n"
            "  * Stored Procedures & User Defined Functions\n"
            "  * Triggers & Database Events\n"
            "  * Indexes & Query Performance Tuning\n"
            "  * Transactions & Concurrency Control (ACID Principles)\n"
            "  * Database Design & Normalization (1NF, 2NF, 3NF)\n\n"
            "* **Resources**:\n"
            "  * 📚 **Book**: *Use The Index, Luke!* by Markus Winand\n"
            "  * 🎓 **Advanced Platforms**: Coursera & Udemy Database Administration\n\n"
            "*(Set GEMINI_API_KEY in .env for custom AI learning roadmaps for any topic!)*"
        )

    try:
        genai.configure(api_key=api_key)
        prompt = f"""You are an AI tutor. The student wants to learn about: {topic}.
Suggest a structured and adaptive learning path including key topics, order of learning, timelines, and resources (books, videos, platforms).
Include Beginner, Intermediate, and Advanced levels with clear markdown headers and bullet points.

Required Format:
# {topic} Learning Path: Structured Roadmap

## I. Beginner Level: Building a Foundation
**(Estimated Time: X weeks)**
* **Key Topics**:
  * Topic 1
  * Topic 2
* **Recommended Resources**:
  * Resource 1

## II. Intermediate Level: Core Practice & Application
**(Estimated Time: X weeks)**
* **Key Topics**:
  * Topic 1
  * Topic 2
* **Recommended Resources**:
  * Resource 1

## III. Advanced Level: Mastery & Professional Projects
**(Estimated Time: X weeks)**
* **Key Topics**:
  * Topic 1
* **Recommended Resources**:
  * Resource 1

## 💡 Adaptive Learning Recommendations
- Guidance tip 1
- Guidance tip 2
"""
        for model_name in ["gemini-1.5-flash", "gemini-1.5-pro", "gemini-2.0-flash"]:
            try:
                model = genai.GenerativeModel(model_name=model_name)
                response = model.generate_content(prompt)
                if hasattr(response, "text") and response.text:
                    return response.text.strip()
                elif hasattr(response, "parts") and response.parts:
                    return response.parts[0].text.strip()
            except Exception as ex:
                print(f"Learning path iteration error ({model_name}): {ex}")
                continue

        return "❌ Could not extract learning recommendations from Gemini response."
    except Exception as e:
        return f"❌ Error occurred: {str(e)}"
