'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Dashboard() {
  const [selectedSubject, setSelectedSubject] = useState('')
  
  const subjects = [
    { id: 'math', name: 'Matematika', icon: '📐', lessons: 45, progress: 67 },
    { id: 'physics', name: 'Fisika', icon: '⚛️', lessons: 38, progress: 45 },
    { id: 'chemistry', name: 'Kimia', icon: '🧪', lessons: 42, progress: 30 },
    { id: 'biology', name: 'Biologi', icon: '🧬', lessons: 35, progress: 55 },
    { id: 'programming', name: 'Programming', icon: '💻', lessons: 60, progress: 80 },
    { id: 'english', name: 'Bahasa Inggris', icon: '🌍', lessons: 50, progress: 72 },
    { id: 'history', name: 'Sejarah', icon: '📜', lessons: 30, progress: 40 },
    { id: 'geography', name: 'Geografi', icon: '🗺️', lessons: 28, progress: 35 },
  ]

  const features = [
    { title: 'Live Tutoring', icon: '👨‍🏫', link: '/tutor', color: 'bg-blue-500' },
    { title: 'Video Lessons', icon: '🎥', link: '/videos', color: 'bg-red-500' },
    { title: 'Practice Quiz', icon: '📝', link: '/quiz', color: 'bg-green-500' },
    { title: 'Flashcards', icon: '🎴', link: '/flashcards', color: 'bg-purple-500' },
    { title: 'Study Notes', icon: '📚', link: '/notes', color: 'bg-yellow-500' },
    { title: 'Lab Simulations', icon: '🔬', link: '/labs', color: 'bg-indigo-500' },
  ]

  const recentActivities = [
    { subject: 'Matematika', topic: 'Persamaan Kuadrat', type: 'lesson', time: '2 jam lalu' },
    { subject: 'Fisika', topic: 'Hukum Newton', type: 'quiz', time: '5 jam lalu' },
    { subject: 'Programming', topic: 'React Hooks', type: 'video', time: 'Kemarin' },
    { subject: 'Kimia', topic: 'Tabel Periodik', type: 'flashcard', time: '2 hari lalu' },
  ]

  const upcomingClasses = [
    { subject: 'Matematika', topic: 'Integral', time: '14:00', instructor: 'AI Tutor Pro' },
    { subject: 'Fisika', topic: 'Elektromagnetik', time: '16:00', instructor: 'AI Physics Expert' },
    { subject: 'Programming', topic: 'Database Design', time: '19:00', instructor: 'AI Code Master' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Dashboard Pembelajaran
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                Selamat datang kembali! Mari lanjutkan perjalanan belajarmu
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">Streak Belajar</p>
                <p className="text-2xl font-bold text-orange-500">🔥 7 Hari</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Total XP</p>
                <p className="text-2xl font-bold text-purple-500">⭐ 2,450</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Lessons Completed</p>
                <p className="text-2xl font-bold">124</p>
              </div>
              <span className="text-3xl">📖</span>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Quiz Score Avg</p>
                <p className="text-2xl font-bold">85%</p>
              </div>
              <span className="text-3xl">🎯</span>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Study Hours</p>
                <p className="text-2xl font-bold">45.5</p>
              </div>
              <span className="text-3xl">⏱️</span>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Certificates</p>
                <p className="text-2xl font-bold">3</p>
              </div>
              <span className="text-3xl">🏆</span>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Subjects */}
          <div className="lg:col-span-2 space-y-6">
            {/* Subjects Grid */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4">Mata Pelajaran</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {subjects.map((subject) => (
                  <Link
                    key={subject.id}
                    href={`/subjects/${subject.id}`}
                    className="relative group hover:scale-105 transition-transform"
                  >
                    <div className="bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-gray-700 dark:to-gray-600 p-4 rounded-lg text-center cursor-pointer">
                      <span className="text-4xl mb-2 block">{subject.icon}</span>
                      <p className="font-semibold text-sm">{subject.name}</p>
                      <p className="text-xs text-gray-500 mt-1">{subject.lessons} Lessons</p>
                      <div className="mt-2 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${subject.progress}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{subject.progress}%</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Learning Features */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4">Fitur Pembelajaran</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {features.map((feature) => (
                  <Link
                    key={feature.title}
                    href={feature.link}
                    className="group hover:scale-105 transition-transform"
                  >
                    <div className={`${feature.color} p-6 rounded-lg text-white text-center cursor-pointer`}>
                      <span className="text-4xl mb-2 block">{feature.icon}</span>
                      <p className="font-semibold">{feature.title}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4">Aktivitas Terakhir</h2>
              <div className="space-y-3">
                {recentActivities.map((activity, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                        {activity.type === 'lesson' && '📚'}
                        {activity.type === 'quiz' && '✍️'}
                        {activity.type === 'video' && '🎥'}
                        {activity.type === 'flashcard' && '🎴'}
                      </div>
                      <div>
                        <p className="font-semibold">{activity.subject}</p>
                        <p className="text-sm text-gray-500">{activity.topic}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500">{activity.time}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Schedule & Progress */}
          <div className="space-y-6">
            {/* Today's Schedule */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4">Jadwal Hari Ini</h2>
              <div className="space-y-3">
                {upcomingClasses.map((cls, idx) => (
                  <div key={idx} className="border-l-4 border-blue-500 pl-4 py-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold">{cls.subject}</p>
                        <p className="text-sm text-gray-500">{cls.topic}</p>
                        <p className="text-xs text-gray-400 mt-1">{cls.instructor}</p>
                      </div>
                      <span className="text-sm font-bold text-blue-500">{cls.time}</span>
                    </div>
                  </div>
                ))}
                <Link href="/schedule" className="block text-center py-2 text-blue-500 hover:text-blue-600">
                  Lihat Jadwal Lengkap →
                </Link>
              </div>
            </div>

            {/* Weekly Progress */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4">Progress Mingguan</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Sen</span>
                  <div className="flex-1 mx-3 bg-gray-200 rounded-full h-3">
                    <div className="bg-green-500 h-3 rounded-full" style={{ width: '100%' }} />
                  </div>
                  <span className="text-sm font-bold">2h</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Sel</span>
                  <div className="flex-1 mx-3 bg-gray-200 rounded-full h-3">
                    <div className="bg-green-500 h-3 rounded-full" style={{ width: '80%' }} />
                  </div>
                  <span className="text-sm font-bold">1.5h</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Rab</span>
                  <div className="flex-1 mx-3 bg-gray-200 rounded-full h-3">
                    <div className="bg-green-500 h-3 rounded-full" style={{ width: '60%' }} />
                  </div>
                  <span className="text-sm font-bold">1h</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Kam</span>
                  <div className="flex-1 mx-3 bg-gray-200 rounded-full h-3">
                    <div className="bg-green-500 h-3 rounded-full" style={{ width: '90%' }} />
                  </div>
                  <span className="text-sm font-bold">1.8h</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Jum</span>
                  <div className="flex-1 mx-3 bg-gray-200 rounded-full h-3">
                    <div className="bg-blue-500 h-3 rounded-full" style={{ width: '40%' }} />
                  </div>
                  <span className="text-sm font-bold text-blue-500">Hari ini</span>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4">Pencapaian Terbaru</h2>
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center">
                  <span className="text-3xl">🏅</span>
                  <p className="text-xs mt-1">First Step</p>
                </div>
                <div className="text-center">
                  <span className="text-3xl">🎯</span>
                  <p className="text-xs mt-1">Perfect Quiz</p>
                </div>
                <div className="text-center">
                  <span className="text-3xl">🔥</span>
                  <p className="text-xs mt-1">7 Day Streak</p>
                </div>
                <div className="text-center">
                  <span className="text-3xl">💎</span>
                  <p className="text-xs mt-1">Math Master</p>
                </div>
                <div className="text-center">
                  <span className="text-3xl">🚀</span>
                  <p className="text-xs mt-1">Fast Learner</p>
                </div>
                <div className="text-center opacity-50">
                  <span className="text-3xl">🔒</span>
                  <p className="text-xs mt-1">Locked</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-lg p-6 text-white">
              <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
              <div className="space-y-2">
                <Link href="/tutor" className="block bg-white/20 backdrop-blur rounded-lg p-3 hover:bg-white/30 transition">
                  💬 Tanya AI Tutor
                </Link>
                <Link href="/quiz/quick" className="block bg-white/20 backdrop-blur rounded-lg p-3 hover:bg-white/30 transition">
                  ⚡ Quick Quiz (5 soal)
                </Link>
                <Link href="/flashcards/daily" className="block bg-white/20 backdrop-blur rounded-lg p-3 hover:bg-white/30 transition">
                  🎴 Daily Flashcards
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}