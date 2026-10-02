"use client";

import { useState } from "react";
import { CheckSquare, Play, AlertCircle, RefreshCw, CheckCircle2, XCircle } from "lucide-react";
import { fetchAPI } from "@/lib/api";

type QuizQuestion = {
  question: string;
  options: string[];
  correct_answer: string;
  explanation: string;
};

export default function QuizPage() {
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("Medium");
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setLoading(true);
    setQuestions([]);
    setError(null);
    setCurrentIndex(0);
    setSelectedOption(null);
    setShowResult(false);
    setScore(0);

    try {
      const data = await fetchAPI("/quiz", { text: `${topic} (Difficulty: ${difficulty})` });
      if (Array.isArray(data.quiz) && data.quiz.length > 0) {
        setQuestions(data.quiz);
      } else {
        throw new Error("Invalid quiz format");
      }
    } catch {
      setError("Failed to generate quiz. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectOption = (option: string) => {
    if (selectedOption) return; // Prevent changing answer
    setSelectedOption(option);
    if (option === questions[currentIndex].correct_answer) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
      setSelectedOption(null);
    } else {
      setShowResult(true);
    }
  };

  if (showResult) {
    return (
      <div className="max-w-2xl mx-auto mt-10">
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 text-center">
          <div className="mx-auto w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center mb-6">
            <span className="text-3xl font-bold text-indigo-600">{score}/{questions.length}</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Quiz Complete!</h2>
          <p className="text-gray-500 mb-8">
            {score === questions.length ? "Perfect score! Outstanding work." : "Good effort. Keep practicing!"}
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => {
                setCurrentIndex(0);
                setSelectedOption(null);
                setShowResult(false);
                setScore(0);
              }}
              className="px-6 py-2.5 rounded-full border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              Try Again
            </button>
            <button
              onClick={() => {
                setQuestions([]);
                setTopic("");
                setShowResult(false);
              }}
              className="px-6 py-2.5 rounded-full bg-indigo-600 text-white font-medium hover:bg-indigo-500 transition-colors flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" /> New Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
          <CheckSquare className="h-6 w-6 text-indigo-600" /> AI Quiz Generator
        </h1>
        <p className="mt-1 text-sm text-gray-500">Test your understanding with AI-generated questions.</p>
      </div>

      {questions.length === 0 ? (
        <form onSubmit={handleGenerate} className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm max-w-2xl mx-auto space-y-6">
          <div>
            <label htmlFor="topic" className="block text-sm font-medium leading-6 text-gray-900 mb-2">
              What do you want to be tested on?
            </label>
            <textarea
              id="topic"
              rows={4}
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="block w-full rounded-xl border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-4"
              placeholder="Paste a passage of text or type a specific topic..."
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="difficulty" className="block text-sm font-medium leading-6 text-gray-900 mb-2">
                Difficulty
              </label>
              <select
                id="difficulty"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="block w-full rounded-xl border-0 py-3 pl-4 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">
                Questions
              </label>
              <input
                type="text"
                disabled
                value="3 Questions"
                className="block w-full rounded-xl border-0 py-3 px-4 text-gray-500 bg-gray-50 ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertCircle className="h-5 w-5 text-red-400" aria-hidden="true" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">{error}</h3>
                </div>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !topic.trim()}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:opacity-50 transition-colors"
          >
            {loading ? (
              <>
                <RefreshCw className="h-5 w-5 animate-spin" /> Generating...
              </>
            ) : (
              <>
                <Play className="h-5 w-5" /> Start Quiz
              </>
            )}
          </button>
        </form>
      ) : (
        <div className="max-w-3xl mx-auto">
          <div className="mb-6 flex items-center justify-between">
            <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">
              Question {currentIndex + 1} of {questions.length}
            </span>
            <div className="flex gap-1">
              {questions.map((_, i) => (
                <div
                  key={i}
                  className={`h-2 w-8 rounded-full ${
                    i === currentIndex ? "bg-indigo-600" : i < currentIndex ? "bg-indigo-200" : "bg-gray-200"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-6 sm:p-8 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900 leading-relaxed">
                {questions[currentIndex].question}
              </h2>
            </div>
            <div className="p-6 sm:p-8 bg-gray-50/50">
              <div className="space-y-3">
                {questions[currentIndex].options.map((option, index) => {
                  const isSelected = selectedOption === option;
                  const isCorrect = option === questions[currentIndex].correct_answer;
                  const showCorrect = selectedOption && isCorrect;
                  const showWrong = isSelected && !isCorrect;

                  return (
                    <button
                      key={index}
                      onClick={() => handleSelectOption(option)}
                      disabled={!!selectedOption}
                      className={`w-full text-left p-4 rounded-xl border flex items-center justify-between transition-all ${
                        showCorrect
                          ? "bg-green-50 border-green-300 text-green-900"
                          : showWrong
                          ? "bg-red-50 border-red-300 text-red-900"
                          : isSelected
                          ? "bg-indigo-50 border-indigo-300 text-indigo-900"
                          : "bg-white border-gray-200 text-gray-700 hover:border-indigo-300 hover:bg-indigo-50"
                      } ${!selectedOption && "cursor-pointer"}`}
                    >
                      <span className="flex items-center gap-3">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full border border-gray-300 text-xs font-medium text-gray-500 bg-white">
                          {String.fromCharCode(65 + index)}
                        </span>
                        {option}
                      </span>
                      {showCorrect && <CheckCircle2 className="h-5 w-5 text-green-600" />}
                      {showWrong && <XCircle className="h-5 w-5 text-red-600" />}
                    </button>
                  );
                })}
              </div>

              {selectedOption && (
                <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
                  <div className={`p-4 rounded-xl mb-6 ${selectedOption === questions[currentIndex].correct_answer ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                    <p className="font-semibold mb-1">
                      {selectedOption === questions[currentIndex].correct_answer ? "Correct!" : "Incorrect."}
                    </p>
                    <p className="text-sm">{questions[currentIndex].explanation}</p>
                  </div>
                  <button
                    onClick={handleNext}
                    className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                  >
                    {currentIndex < questions.length - 1 ? "Next Question" : "See Results"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
