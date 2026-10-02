"use client";

import { useState } from "react";
import { FileText, Copy, Download, RotateCw } from "lucide-react";
import { fetchAPI } from "@/lib/api";
import ReactMarkdown from "react-markdown";

export default function SummarizePage() {
  const [text, setText] = useState("");
  const [length, setLength] = useState("Short");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleSummarize = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    setLoading(true);
    setResult(null);

    try {
      const data = await fetchAPI("/summarize", { text: `${text}\n\nFormat as a ${length.toLowerCase()} summary.` });
      setResult(data.summary);
    } catch {
      setResult("⚠️ Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
          <FileText className="h-6 w-6 text-indigo-600" /> Smart Summarizer
        </h1>
        <p className="mt-1 text-sm text-gray-500">Turn lengthy study material into clear revision notes.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-14rem)] min-h-[500px]">
        {/* Input Column */}
        <div className="flex flex-col">
          <form onSubmit={handleSummarize} className="flex-1 flex flex-col bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <span className="text-sm font-medium text-gray-700">Source Material</span>
              <div className="flex items-center gap-2">
                <label className="text-xs text-gray-500">Length:</label>
                <select
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                  className="block rounded-md border-0 py-1 pl-3 pr-8 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 text-xs"
                >
                  <option>Short</option>
                  <option>Medium</option>
                  <option>Detailed</option>
                </select>
              </div>
            </div>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="flex-1 w-full resize-none border-0 p-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
              placeholder="Paste your notes, article, textbook content, or study material here..."
            />
            <div className="p-4 border-t border-gray-100 bg-gray-50">
              <button
                type="submit"
                disabled={loading || !text.trim()}
                className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-colors"
              >
                {loading ? "Summarizing..." : "Summarize"}
              </button>
            </div>
          </form>
        </div>

        {/* Output Column */}
        <div className="flex flex-col bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden relative">
          <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <span className="text-sm font-medium text-gray-700">Summary Result</span>
            {result && (
              <div className="flex items-center gap-2">
                <button className="p-1.5 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100 transition-colors" title="Copy">
                  <Copy className="h-4 w-4" />
                </button>
                <button className="p-1.5 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100 transition-colors" title="Download">
                  <Download className="h-4 w-4" />
                </button>
                <button className="p-1.5 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100 transition-colors" title="Regenerate" onClick={handleSummarize}>
                  <RotateCw className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
          <div className="flex-1 p-6 overflow-y-auto">
            {loading ? (
              <div className="h-full flex flex-col justify-center items-center text-gray-400 space-y-4">
                <RotateCw className="h-8 w-8 animate-spin text-indigo-500" />
                <p className="text-sm">Condensing your text...</p>
              </div>
            ) : result ? (
              <div className="prose prose-sm prose-indigo max-w-none">
                <ReactMarkdown>{result}</ReactMarkdown>
              </div>
            ) : (
              <div className="h-full flex flex-col justify-center items-center text-gray-400 text-center px-4">
                <FileText className="h-12 w-12 mb-4 opacity-20" />
                <p className="text-sm">Your intelligent summary will appear here.<br/>Paste content on the left to begin.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
