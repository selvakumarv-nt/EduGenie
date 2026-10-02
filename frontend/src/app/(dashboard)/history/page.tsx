"use client";

import { Clock, Search, Filter } from "lucide-react";

export default function HistoryPage() {
  const historyItems = [
    { type: "Question", topic: "What is the difference between TCP and UDP?", date: "Today", preview: "TCP is connection-oriented..." },
    { type: "Explanation", topic: "Photosynthesis", date: "Yesterday", preview: "Photosynthesis is the process..." },
    { type: "Quiz", topic: "Python Basics", date: "3 days ago", preview: "Score: 3/3" },
    { type: "Summary", topic: "World War II - European Theater", date: "Last week", preview: "A detailed summary of..." },
    { type: "Learning Path", topic: "Machine Learning", date: "Last week", preview: "Beginner to Advanced Roadmap" },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
            <Clock className="h-6 w-6 text-indigo-600" /> Activity History
          </h1>
          <p className="mt-1 text-sm text-gray-500">Review your past questions, explanations, and learning paths.</p>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search history..."
              className="pl-9 pr-4 py-2 rounded-xl border-gray-300 shadow-sm focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm"
            />
          </div>
          <button className="p-2 border border-gray-300 rounded-xl hover:bg-gray-50 text-gray-600 transition-colors">
            <Filter className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="bg-white shadow-sm border border-gray-200 rounded-2xl overflow-hidden">
        <ul role="list" className="divide-y divide-gray-100">
          {historyItems.map((item, index) => (
            <li key={index} className="flex items-center justify-between gap-x-6 p-5 hover:bg-gray-50 transition-colors">
              <div className="min-w-0">
                <div className="flex items-start gap-x-3">
                  <p className="text-sm font-semibold leading-6 text-gray-900">{item.topic}</p>
                  <p className="rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset text-indigo-700 bg-indigo-50 ring-indigo-600/20">
                    {item.type}
                  </p>
                </div>
                <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                  <p className="truncate">{item.preview}</p>
                  <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current">
                    <circle cx={1} cy={1} r={1} />
                  </svg>
                  <p className="whitespace-nowrap">{item.date}</p>
                </div>
              </div>
              <div className="flex flex-none items-center gap-x-4">
                <button className="hidden sm:block rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                  Open<span className="sr-only">, {item.topic}</span>
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
