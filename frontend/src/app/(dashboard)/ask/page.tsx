"use client";

import { useState } from "react";
import { MessageSquare, Send, Bot, User, Copy, RotateCw, ThumbsUp, ThumbsDown } from "lucide-react";
import { fetchAPI } from "@/lib/api";
import ReactMarkdown from "react-markdown";

type Message = {
  role: "user" | "ai";
  content: string;
};

export default function AskPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setInput("");
    setLoading(true);

    try {
      const data = await fetchAPI("/qa", { question: userMsg });
      setMessages((prev) => [...prev, { role: "ai", content: data.answer }]);
    } catch {
      setMessages((prev) => [...prev, { role: "ai", content: "⚠️ Something went wrong. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
          <MessageSquare className="h-6 w-6 text-indigo-600" /> Ask EduGenie
        </h1>
        <p className="mt-1 text-sm text-gray-500">Get clear and concise answers to your academic questions.</p>
      </div>

      <div className="flex-1 overflow-y-auto bg-white border border-gray-200 rounded-t-2xl p-4 sm:p-6 shadow-sm space-y-6">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center max-w-lg mx-auto">
            <div className="h-16 w-16 rounded-full bg-indigo-50 flex items-center justify-center mb-4">
              <Bot className="h-8 w-8 text-indigo-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">How can I help you today?</h3>
            <p className="text-gray-500 text-sm mb-6">Ask me anything about your studies, from science and math to history and literature.</p>
            <div className="grid gap-2 w-full">
              {["Explain photosynthesis in simple terms.", "What is the difference between TCP and UDP?", "Why does the Pythagorean theorem work?"].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => setInput(suggestion)}
                  className="text-left px-4 py-3 rounded-xl border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 transition-colors text-sm text-gray-700"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((msg, index) => (
            <div key={index} className={`flex gap-4 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              {msg.role === "ai" && (
                <div className="h-8 w-8 shrink-0 rounded-full bg-indigo-100 flex items-center justify-center mt-1">
                  <Bot className="h-5 w-5 text-indigo-600" />
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-2xl px-5 py-4 ${
                  msg.role === "user"
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-50 text-gray-900 border border-gray-100"
                }`}
              >
                {msg.role === "ai" ? (
                  <div className="prose prose-sm prose-indigo max-w-none">
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                ) : (
                  <p className="whitespace-pre-wrap text-sm">{msg.content}</p>
                )}
                {msg.role === "ai" && (
                  <div className="mt-4 flex items-center gap-2 border-t border-gray-200/60 pt-3">
                    <button className="text-gray-400 hover:text-gray-600 transition-colors" title="Copy">
                      <Copy className="h-4 w-4" />
                    </button>
                    <button className="text-gray-400 hover:text-gray-600 transition-colors" title="Regenerate">
                      <RotateCw className="h-4 w-4" />
                    </button>
                    <div className="flex-1" />
                    <button className="text-gray-400 hover:text-green-600 transition-colors">
                      <ThumbsUp className="h-4 w-4" />
                    </button>
                    <button className="text-gray-400 hover:text-red-600 transition-colors">
                      <ThumbsDown className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
              {msg.role === "user" && (
                <div className="h-8 w-8 shrink-0 rounded-full bg-gray-200 flex items-center justify-center mt-1">
                  <User className="h-5 w-5 text-gray-600" />
                </div>
              )}
            </div>
          ))
        )}
        {loading && (
          <div className="flex gap-4">
            <div className="h-8 w-8 shrink-0 rounded-full bg-indigo-100 flex items-center justify-center mt-1">
              <Bot className="h-5 w-5 text-indigo-600" />
            </div>
            <div className="bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 flex items-center gap-2">
              <div className="h-2 w-2 bg-indigo-400 rounded-full animate-bounce" />
              <div className="h-2 w-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
              <div className="h-2 w-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }} />
              <span className="ml-2 text-sm text-gray-500 font-medium">EduGenie is thinking...</span>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white border border-t-0 border-gray-200 rounded-b-2xl p-4 shadow-sm">
        <form onSubmit={handleSubmit} className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
            className="w-full rounded-xl border-0 py-3 pl-4 pr-12 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:bg-gray-50"
            placeholder="Ask your question..."
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="absolute right-2 rounded-lg bg-indigo-600 p-1.5 text-white hover:bg-indigo-500 disabled:bg-gray-300 transition-colors"
          >
            <Send className="h-5 w-5" />
          </button>
        </form>
        {messages.length > 0 && (
          <div className="mt-3 flex justify-center">
            <button
              type="button"
              onClick={() => setMessages([])}
              className="text-xs text-gray-500 hover:text-gray-700 font-medium"
            >
              Clear conversation
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
