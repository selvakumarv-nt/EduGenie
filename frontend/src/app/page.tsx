import Link from "next/link";
import { ArrowRight, MessageSquare, BookOpen, CheckSquare, FileText, Map, Sparkles } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-indigo-100">
      {/* Navbar */}
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between border-b border-slate-200/50 bg-white/50 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
            <Sparkles className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">EduGenie</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <Link href="#features" className="hover:text-indigo-600 transition-colors">Features</Link>
          <Link href="#how-it-works" className="hover:text-indigo-600 transition-colors">How it Works</Link>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all flex items-center gap-2"
          >
            Start Learning <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <div className="relative pt-24 pb-32 sm:pt-32 sm:pb-40 overflow-hidden">
          <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
            <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
          </div>
          
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="mx-auto max-w-4xl font-bold tracking-tight text-slate-900 text-5xl sm:text-7xl">
              Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">AI-powered</span> learning companion
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Understand difficult concepts, ask questions, generate quizzes, summarize study material, and build personalized learning paths with AI.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/dashboard"
                className="rounded-full bg-indigo-600 px-8 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all flex items-center gap-2"
              >
                Start Learning <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="#features" className="text-sm font-semibold leading-6 text-slate-900 hover:text-indigo-600 transition-colors">
                Explore Features <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          {/* Hero Mock Dashboard Visual */}
          <div className="mx-auto mt-16 max-w-5xl px-4 sm:mt-24 sm:px-6 lg:px-8">
            <div className="rounded-xl bg-white/40 p-2 ring-1 ring-inset ring-slate-200/50 lg:rounded-2xl lg:p-4 backdrop-blur-sm shadow-2xl">
              <div className="rounded-lg bg-white shadow-sm ring-1 ring-slate-200 overflow-hidden">
                <div className="flex h-12 items-center gap-2 border-b border-slate-100 bg-slate-50/50 px-4">
                  <div className="flex gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-slate-200" />
                    <div className="h-3 w-3 rounded-full bg-slate-200" />
                    <div className="h-3 w-3 rounded-full bg-slate-200" />
                  </div>
                </div>
                <div className="p-8 pb-12">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center">
                      <Sparkles className="h-6 w-6 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">EduGenie is thinking...</h3>
                      <p className="text-sm text-slate-500">Generating a simplified explanation for &quot;Photosynthesis&quot;</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="h-4 w-3/4 rounded bg-slate-100 animate-pulse" />
                    <div className="h-4 w-1/2 rounded bg-slate-100 animate-pulse" />
                    <div className="h-4 w-5/6 rounded bg-slate-100 animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div id="features" className="bg-white py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 className="text-base font-semibold leading-7 text-indigo-600">AI-powered learning, simplified</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Everything you need to master any subject
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
              <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                {[
                  {
                    name: 'Ask Anything',
                    description: 'Get precise, detailed answers to any academic question in seconds.',
                    icon: MessageSquare,
                  },
                  {
                    name: 'Explain Concepts',
                    description: 'Turn difficult topics into simple, understandable explanations at your level.',
                    icon: BookOpen,
                  },
                  {
                    name: 'Generate Quizzes',
                    description: 'Test your understanding with AI-generated multiple choice questions.',
                    icon: CheckSquare,
                  },
                  {
                    name: 'Smart Summaries',
                    description: 'Convert lengthy study material into clear, concise revision notes.',
                    icon: FileText,
                  },
                  {
                    name: 'Learning Paths',
                    description: 'Go from beginner to advanced with a structured AI-generated roadmap.',
                    icon: Map,
                  },
                ].map((feature) => (
                  <div key={feature.name} className="flex flex-col rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all hover:shadow-md">
                    <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-slate-900">
                      <feature.icon className="h-6 w-6 flex-none text-indigo-600" aria-hidden="true" />
                      {feature.name}
                    </dt>
                    <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-slate-600">
                      <p className="flex-auto">{feature.description}</p>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-indigo-50 relative isolate overflow-hidden">
          <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8 text-center">
            <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Ready to learn smarter?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-slate-600">
              Join students using EduGenie to understand faster, study better, and achieve more.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/dashboard"
                className="rounded-full bg-indigo-600 px-8 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition-colors"
              >
                Open EduGenie
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white py-12 border-t border-slate-200">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-indigo-600" />
            <span className="text-lg font-bold text-slate-900">EduGenie</span>
          </div>
          <p className="text-sm text-slate-500">© 2026 EduGenie AI Learning Assistant. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
