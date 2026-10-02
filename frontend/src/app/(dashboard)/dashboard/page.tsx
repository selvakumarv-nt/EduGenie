import Link from "next/link";
import { MessageSquare, BookOpen, CheckSquare, FileText, Map, ArrowRight } from "lucide-react";

export default function Dashboard() {
  const quickActions = [
    { name: "Ask AI", href: "/ask", icon: MessageSquare, color: "bg-blue-50 text-blue-700", border: "border-blue-200" },
    { name: "Explain", href: "/explain", icon: BookOpen, color: "bg-indigo-50 text-indigo-700", border: "border-indigo-200" },
    { name: "Quiz", href: "/quiz", icon: CheckSquare, color: "bg-emerald-50 text-emerald-700", border: "border-emerald-200" },
    { name: "Summarize", href: "/summarize", icon: FileText, color: "bg-amber-50 text-amber-700", border: "border-amber-200" },
    { name: "Learning Path", href: "/path", icon: Map, color: "bg-purple-50 text-purple-700", border: "border-purple-200" },
  ];

  const stats = [
    { name: "Questions Asked", value: "12" },
    { name: "Quizzes Completed", value: "8" },
    { name: "Learning Progress", value: "68%" },
    { name: "Study Streak", value: "5 days" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Good morning 👋</h1>
        <p className="mt-2 text-lg text-gray-600">Ready to learn something new?</p>
      </div>

      <div className="rounded-2xl border border-indigo-100 bg-white p-8 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">What do you want to learn today?</h2>
        <div className="relative flex items-center">
          <input
            type="text"
            className="w-full rounded-xl border-0 py-4 pl-4 pr-14 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6"
            placeholder="Ask anything, explain a topic, or paste your study material..."
          />
          <button className="absolute right-2 rounded-lg bg-indigo-600 p-2 text-white hover:bg-indigo-500 transition-colors">
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-8">
          <h3 className="text-sm font-medium text-gray-500 mb-4 uppercase tracking-wider">Quick Actions</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {quickActions.map((action) => (
              <Link
                key={action.name}
                href={action.href}
                className={`flex flex-col items-center justify-center p-4 rounded-xl border ${action.border} ${action.color} transition-all hover:shadow-md hover:scale-[1.02]`}
              >
                <action.icon className="h-8 w-8 mb-3" />
                <span className="font-semibold text-sm">{action.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Progress</h2>
        <dl className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <div
              key={item.name}
              className="relative overflow-hidden rounded-xl bg-white px-4 pb-12 pt-5 shadow-sm border border-gray-100 sm:px-6 sm:pt-6"
            >
              <dt className="truncate text-sm font-medium text-gray-500">{item.name}</dt>
              <dd className="flex items-baseline pb-6 sm:pb-7">
                <p className="text-2xl font-semibold text-gray-900">{item.value}</p>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
