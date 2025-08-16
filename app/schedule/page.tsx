'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function SchedulePage() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [viewMode, setViewMode] = useState<'week' | 'month'>('week')

  const schedule = {
    monday: [
      { time: '09:00', subject: 'Mathematics', topic: 'Calculus', type: 'lesson', duration: '45 min' },
      { time: '10:00', subject: 'Physics', topic: 'Mechanics', type: 'lesson', duration: '45 min' },
      { time: '14:00', subject: 'Programming', topic: 'React Hooks', type: 'practice', duration: '60 min' },
      { time: '16:00', subject: 'Chemistry', topic: 'Organic Chemistry', type: 'quiz', duration: '30 min' },
    ],
    tuesday: [
      { time: '09:00', subject: 'English', topic: 'Essay Writing', type: 'lesson', duration: '45 min' },
      { time: '11:00', subject: 'Biology', topic: 'Genetics', type: 'lesson', duration: '45 min' },
      { time: '15:00', subject: 'Mathematics', topic: 'Linear Algebra', type: 'practice', duration: '60 min' },
    ],
    wednesday: [
      { time: '10:00', subject: 'Physics', topic: 'Thermodynamics', type: 'lesson', duration: '45 min' },
      { time: '14:00', subject: 'Programming', topic: 'Database Design', type: 'lesson', duration: '60 min' },
      { time: '16:00', subject: 'Chemistry', topic: 'Lab Session', type: 'lab', duration: '90 min' },
    ],
    thursday: [
      { time: '09:00', subject: 'Mathematics', topic: 'Statistics', type: 'lesson', duration: '45 min' },
      { time: '11:00', subject: 'History', topic: 'World War II', type: 'lesson', duration: '45 min' },
      { time: '15:00', subject: 'Physics', topic: 'Quantum Mechanics', type: 'lesson', duration: '60 min' },
    ],
    friday: [
      { time: '10:00', subject: 'Review Session', topic: 'Week Review', type: 'review', duration: '60 min' },
      { time: '14:00', subject: 'Programming', topic: 'Project Work', type: 'practice', duration: '120 min' },
      { time: '16:30', subject: 'Quiz', topic: 'Weekly Assessment', type: 'quiz', duration: '45 min' },
    ]
  }

  const upcomingEvents = [
    { date: 'Today', time: '14:00', event: 'React Hooks Practice', type: 'practice' },
    { date: 'Today', time: '16:00', event: 'Chemistry Quiz', type: 'quiz' },
    { date: 'Tomorrow', time: '09:00', event: 'Essay Writing Class', type: 'lesson' },
    { date: 'Sat', time: '10:00', event: 'Math Competition', type: 'special' },
  ]

  const assignments = [
    { subject: 'Mathematics', title: 'Calculus Problem Set', dueDate: 'Tomorrow', status: 'pending' },
    { subject: 'Programming', title: 'React Project', dueDate: 'Friday', status: 'in-progress' },
    { subject: 'Physics', title: 'Lab Report', dueDate: 'Monday', status: 'not-started' },
    { subject: 'English', title: 'Essay Draft', dueDate: 'Wednesday', status: 'completed' },
  ]

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  const timeSlots = ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00']

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      <header className="bg-white dark:bg-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                📅 Study Schedule
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                Manage your learning calendar
              </p>
            </div>
            <Link href="/dashboard" className="text-blue-500 hover:text-blue-600">
              ← Back to Dashboard
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Calendar View */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              {/* Calendar Controls */}
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-4">
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                    ←
                  </button>
                  <h2 className="text-xl font-bold">Week of Nov 18-24, 2024</h2>
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                    →
                  </button>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setViewMode('week')}
                    className={`px-4 py-2 rounded ${
                      viewMode === 'week' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                  >
                    Week
                  </button>
                  <button
                    onClick={() => setViewMode('month')}
                    className={`px-4 py-2 rounded ${
                      viewMode === 'month' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                  >
                    Month
                  </button>
                </div>
              </div>

              {/* Calendar Grid */}
              {viewMode === 'week' ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th className="text-left p-2 text-sm text-gray-500">Time</th>
                        {days.slice(0, 5).map(day => (
                          <th key={day} className="text-center p-2 text-sm font-semibold">
                            {day}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {timeSlots.map(time => (
                        <tr key={time} className="border-t dark:border-gray-700">
                          <td className="p-2 text-sm text-gray-500">{time}</td>
                          {days.slice(0, 5).map(day => {
                            const daySchedule = schedule[day.toLowerCase() as keyof typeof schedule] || []
                            const event = daySchedule.find(e => e.time === time)
                            return (
                              <td key={day} className="p-2 text-center">
                                {event && (
                                  <div className={`p-2 rounded text-xs text-white ${
                                    event.type === 'lesson' ? 'bg-blue-500' :
                                    event.type === 'practice' ? 'bg-green-500' :
                                    event.type === 'quiz' ? 'bg-orange-500' :
                                    event.type === 'lab' ? 'bg-purple-500' :
                                    'bg-gray-500'
                                  }`}>
                                    <p className="font-semibold">{event.subject}</p>
                                    <p className="text-xs opacity-90">{event.topic}</p>
                                  </div>
                                )}
                              </td>
                            )
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                /* Month View */
                <div className="grid grid-cols-7 gap-1">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="text-center text-sm font-semibold p-2">
                      {day}
                    </div>
                  ))}
                  {[...Array(35)].map((_, i) => (
                    <div key={i} className="border dark:border-gray-700 p-2 h-20 hover:bg-gray-50 dark:hover:bg-gray-700">
                      <p className="text-sm font-semibold">{((i - 3) % 31) + 1}</p>
                      {i === 18 && (
                        <div className="mt-1">
                          <div className="text-xs bg-blue-100 dark:bg-blue-900 p-1 rounded mb-1">
                            Math
                          </div>
                          <div className="text-xs bg-green-100 dark:bg-green-900 p-1 rounded">
                            Physics
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Legend */}
              <div className="flex flex-wrap gap-4 mt-6 text-sm">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-blue-500 rounded mr-2"></div>
                  <span>Lesson</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
                  <span>Practice</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-orange-500 rounded mr-2"></div>
                  <span>Quiz</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-purple-500 rounded mr-2"></div>
                  <span>Lab</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Today's Schedule */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h3 className="font-bold text-lg mb-4">📍 Today's Schedule</h3>
              <div className="space-y-3">
                {upcomingEvents.slice(0, 2).map((event, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded">
                    <div>
                      <p className="font-semibold">{event.event}</p>
                      <p className="text-sm text-gray-500">{event.time}</p>
                    </div>
                    <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                      Join
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h3 className="font-bold text-lg mb-4">🎯 Upcoming Events</h3>
              <div className="space-y-2">
                {upcomingEvents.map((event, idx) => (
                  <div key={idx} className="flex justify-between text-sm">
                    <div>
                      <p className="font-semibold">{event.event}</p>
                      <p className="text-gray-500">{event.date} • {event.time}</p>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs ${
                      event.type === 'quiz' ? 'bg-orange-100 text-orange-700' :
                      event.type === 'practice' ? 'bg-green-100 text-green-700' :
                      event.type === 'special' ? 'bg-purple-100 text-purple-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {event.type}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Assignments Due */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h3 className="font-bold text-lg mb-4">📝 Assignments</h3>
              <div className="space-y-3">
                {assignments.map((assignment, idx) => (
                  <div key={idx} className="border-l-4 border-blue-500 pl-3">
                    <p className="font-semibold text-sm">{assignment.title}</p>
                    <p className="text-xs text-gray-500">{assignment.subject}</p>
                    <div className="flex justify-between items-center mt-1">
                      <p className="text-xs text-gray-500">Due: {assignment.dueDate}</p>
                      <span className={`text-xs ${
                        assignment.status === 'completed' ? 'text-green-500' :
                        assignment.status === 'in-progress' ? 'text-yellow-500' :
                        'text-red-500'
                      }`}>
                        {assignment.status === 'completed' ? '✓' : 
                         assignment.status === 'in-progress' ? '⏳' : '○'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg shadow-lg p-6 text-white">
              <h3 className="font-bold text-lg mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full px-4 py-2 bg-white/20 backdrop-blur rounded hover:bg-white/30">
                  + Add Event
                </button>
                <button className="w-full px-4 py-2 bg-white/20 backdrop-blur rounded hover:bg-white/30">
                  📋 Create Study Plan
                </button>
                <button className="w-full px-4 py-2 bg-white/20 backdrop-blur rounded hover:bg-white/30">
                  🔔 Set Reminders
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}