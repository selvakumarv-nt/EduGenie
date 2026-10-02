"use client";

import { Settings, User, Shield, Paintbrush } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
          <Settings className="h-6 w-6 text-indigo-600" /> Settings
        </h1>
        <p className="mt-1 text-sm text-gray-500">Manage your profile, preferences, and account settings.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 divide-y divide-gray-100 overflow-hidden">
        
        {/* Profile Section */}
        <div className="p-6 sm:p-8 flex flex-col sm:flex-row gap-8">
          <div className="sm:w-1/3">
            <h2 className="text-base font-semibold leading-7 text-gray-900 flex items-center gap-2">
              <User className="h-4 w-4 text-gray-500" /> Profile
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-500">Update your personal information.</p>
          </div>
          <div className="sm:w-2/3 space-y-4">
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">Name</label>
              <input type="text" defaultValue="Student User" className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3" />
            </div>
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">Email</label>
              <input type="email" defaultValue="student@example.com" className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3" />
            </div>
          </div>
        </div>

        {/* Preferences Section */}
        <div className="p-6 sm:p-8 flex flex-col sm:flex-row gap-8">
          <div className="sm:w-1/3">
            <h2 className="text-base font-semibold leading-7 text-gray-900 flex items-center gap-2">
              <Paintbrush className="h-4 w-4 text-gray-500" /> Preferences
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-500">Customize your learning experience.</p>
          </div>
          <div className="sm:w-2/3 space-y-4">
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">Default Learning Level</label>
              <select className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                <option>Beginner</option>
                <option>School Student</option>
                <option>College Student</option>
                <option>Advanced</option>
              </select>
            </div>
            <div className="flex items-center justify-between mt-4">
              <span className="flex flex-grow flex-col">
                <span className="text-sm font-medium leading-6 text-gray-900" id="availability-label">Dark Mode</span>
                <span className="text-sm text-gray-500" id="availability-description">Use a dark theme for the interface.</span>
              </span>
              <button type="button" className="bg-gray-200 relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2" role="switch" aria-checked="false">
                <span aria-hidden="true" className="translate-x-0 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"></span>
              </button>
            </div>
          </div>
        </div>

        {/* Privacy Section */}
        <div className="p-6 sm:p-8 flex flex-col sm:flex-row gap-8">
          <div className="sm:w-1/3">
            <h2 className="text-base font-semibold leading-7 text-gray-900 flex items-center gap-2">
              <Shield className="h-4 w-4 text-gray-500" /> Privacy & Data
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-500">Manage your data and history.</p>
          </div>
          <div className="sm:w-2/3">
            <button type="button" className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-red-600 shadow-sm ring-1 ring-inset ring-red-300 hover:bg-red-50">
              Clear Activity History
            </button>
            <p className="mt-3 text-sm text-gray-500">This will permanently delete all your past questions, summaries, and quizzes.</p>
          </div>
        </div>

      </div>
    </div>
  );
}
