"use client";

import { useState } from "react";
import { BookOpen, Sparkles, AlertCircle } from "lucide-react";
import { fetchAPI } from "@/lib/api";
import ReactMarkdown from "react-markdown";

export default function ExplainPage() {
  const [topic, setTopic] = useState("");
  const [context, setContext] = useState("");
  const [level, setLevel] = useState("School Student");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleExplain = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setLoading(true);
    setResult(null);
    setError(null);

    try {
      // The backend expects {"topic": string}. We append the context and level.
      const enrichedTopic = `${topic}. Context: ${context}. Explain at level: ${level}`;
      const data = await fetchAPI("/explain", { topic: enrichedTopic });
      setResult(data.explanation);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-indigo-600" /> Explain a Concept
        </h1>
        <p className="mt-1 text-sm text-gray-500">Turn difficult topics into simple, understandable explanations.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-4 space-y-6">
          <form onSubmit={handleExplain} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-5">
            <div>
              <label htmlFor="topic" className="block text-sm font-medium leading-6 text-gray-900">
                Topic
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="topic"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                  placeholder="e.g. Photosynthesis, Quantum Physics"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="context" className="block text-sm font-medium leading-6 text-gray-900">
                Optional Context
              </label>
              <div className="mt-2">
                <textarea
                  id="context"
                  rows={2}
                  value={context}
                  onChange={(e) => setContext(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                  placeholder="Where did you encounter this?"
                />
              </div>
            </div>

            <div>
              <label htmlFor="level" className="block text-sm font-medium leading-6 text-gray-900">
                Learning Level
              </label>
              <select
                id="level"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
                <option>Beginner</option>
                <option>School Student</option>
                <option>College Student</option>
                <option>Advanced</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading || !topic.trim()}
              className="w-full flex items-center justify-center gap-2 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Sparkles className="h-4 w-4" /> Explain with AI
            </button>
          </form>
        </div>

        <div className="md:col-span-8">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm min-h-[400px] p-6 sm:p-8">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-20">
                <div className="relative mb-4">
                  <div className="h-16 w-16 bg-indigo-100 rounded-full flex items-center justify-center animate-pulse">
                    <Sparkles className="h-8 w-8 text-indigo-600" />
                  </div>
                  <div className="absolute top-0 right-0 h-4 w-4 bg-indigo-400 rounded-full animate-ping" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">EduGenie is thinking...</h3>
                <p className="text-sm text-gray-500 mt-2">Breaking down the complexity of {topic || "your topic"}</p>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-20 text-red-600">
                <AlertCircle className="h-12 w-12 mb-4" />
                <h3 className="text-lg font-medium text-gray-900">{error}</h3>
                <button onClick={handleExplain} className="mt-4 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                  Try Again
                </button>
              </div>
            ) : result ? (
              <div className="prose prose-indigo max-w-none prose-headings:font-bold prose-h3:text-indigo-900 prose-p:text-gray-700 prose-li:text-gray-700">
                <ReactMarkdown>{result}</ReactMarkdown>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center py-20">
                <div className="h-16 w-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                  <BookOpen className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">Ready to learn?</h3>
                <p className="text-sm text-gray-500 mt-2 max-w-sm">
                  Enter a topic on the left, and EduGenie will break it down into a simple, easy-to-understand explanation.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
