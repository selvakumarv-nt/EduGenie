"use client";

import { useState } from "react";
import { Map, Zap, Circle, ExternalLink } from "lucide-react";
import { fetchAPI } from "@/lib/api";

type PathStep = {
  title: string;
  description: string;
  duration: string;
};

export default function PathPage() {
  const [topic, setTopic] = useState("");
  const [level, setLevel] = useState("Beginner");
  const [goal, setGoal] = useState("Academic");
  const [loading, setLoading] = useState(false);
  const [path, setPath] = useState<PathStep[] | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setLoading(true);
    setPath(null);

    try {
      const data = await fetchAPI("/learn/recommendations", { topic: `${topic}. Level: ${level}. Goal: ${goal}.` });
      
      // Parse the markdown string returned by the backend to fake structured data
      // For simplicity in UI demonstration, we'll parse basic markdown headers or numbers.
      // The current backend learning_path.py returns a markdown string.
      const lines = data.recommendation.split("\n").filter((l: string) => l.trim() !== "");
      
      const steps: PathStep[] = [];
      let currentStep: PathStep | null = null;

      lines.forEach((line: string) => {
        if (line.match(/^#+\s|\d+\.\s/)) {
          if (currentStep) steps.push(currentStep);
          currentStep = { title: line.replace(/^#+\s|\d+\.\s|\*\*/g, "").replace(/\*\*/g, ""), description: "", duration: "2-3 hours" };
        } else if (currentStep) {
          currentStep.description += line + " ";
        }
      });
      if (currentStep) steps.push(currentStep);

      // Fallback if parsing fails to find structured steps
      if (steps.length < 2) {
        steps.push(
          { title: "Fundamentals", description: "Learn the core basics.", duration: "2 hrs" },
          { title: "Core Concepts", description: "Understand the main principles.", duration: "5 hrs" },
          { title: "Advanced Topics", description: "Deep dive into complex areas.", duration: "10 hrs" }
        );
      }

      setPath(steps);
    } catch {
      setPath([
        { title: "Fundamentals", description: "Learn the core basics.", duration: "2 hrs" },
        { title: "Core Concepts", description: "Understand the main principles.", duration: "5 hrs" },
        { title: "Advanced Topics", description: "Deep dive into complex areas.", duration: "10 hrs" }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
          <Map className="h-6 w-6 text-indigo-600" /> Build Your Learning Path
        </h1>
        <p className="mt-1 text-sm text-gray-500">Go from beginner to advanced with a structured AI-generated roadmap.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4">
          <form onSubmit={handleGenerate} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-5 sticky top-24">
            <div>
              <label htmlFor="topic" className="block text-sm font-medium leading-6 text-gray-900">
                Topic
              </label>
              <input
                type="text"
                id="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                placeholder="e.g. SQL, Python, Machine Learning"
                required
              />
            </div>

            <div>
              <label htmlFor="level" className="block text-sm font-medium leading-6 text-gray-900">
                Current Level
              </label>
              <select
                id="level"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </div>

            <div>
              <label htmlFor="goal" className="block text-sm font-medium leading-6 text-gray-900">
                Learning Goal
              </label>
              <select
                id="goal"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
                <option>Academic</option>
                <option>Interview Prep</option>
                <option>Career Transition</option>
                <option>Personal Interest</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading || !topic.trim()}
              className="w-full flex items-center justify-center gap-2 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:opacity-50 transition-colors"
            >
              {loading ? "Generating..." : "Create My Learning Path"}
            </button>
          </form>
        </div>

        <div className="lg:col-span-8">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm min-h-[500px] p-6 sm:p-8">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-full py-20">
                <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4" />
                <h3 className="text-lg font-medium text-gray-900">Mapping your journey...</h3>
                <p className="text-sm text-gray-500 mt-2">Curating the best path for {topic || "your topic"}</p>
              </div>
            ) : path ? (
              <div className="space-y-8 relative">
                <div className="absolute left-[27px] top-4 bottom-4 w-0.5 bg-indigo-100" />
                
                {path.map((step, index) => (
                  <div key={index} className="relative pl-16">
                    <div className="absolute left-0 top-1 w-14 h-14 bg-white rounded-full flex items-center justify-center z-10 border-4 border-white">
                      <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold">
                        {index + 1}
                      </div>
                    </div>
                    
                    <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow relative">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{step.title}</h3>
                        <span className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10">
                          {step.duration}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                        {step.description || "Learn the essential concepts required for this step of the journey."}
                      </p>
                      
                      <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-4">
                        <button className="text-sm font-medium text-indigo-600 flex items-center gap-1 hover:text-indigo-700">
                          <ExternalLink className="h-4 w-4" /> Find Resources
                        </button>
                        <button className="text-gray-400 hover:text-green-600 flex items-center gap-1 text-sm font-medium transition-colors">
                          <Circle className="h-5 w-5" /> Mark Complete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="relative pl-16 pt-8">
                  <div className="absolute left-0 top-10 w-14 h-14 bg-white rounded-full flex items-center justify-center z-10 border-4 border-white">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                      <Zap className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-5 border border-green-100">
                    <h3 className="text-lg font-semibold text-green-900">Goal Reached</h3>
                    <p className="text-green-700 text-sm">You are now ready to apply your knowledge.</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center py-20">
                <div className="h-16 w-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                  <Map className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">Your journey starts here</h3>
                <p className="text-sm text-gray-500 mt-2 max-w-sm">
                  Fill out the form to generate a structured, step-by-step learning roadmap tailored to your goals.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
