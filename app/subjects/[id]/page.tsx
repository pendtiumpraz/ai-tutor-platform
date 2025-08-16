'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

export default function SubjectDetail() {
  const params = useParams()
  const [activeTab, setActiveTab] = useState('lessons')
  
  const subjectData = {
    math: {
      name: 'Matematika',
      icon: '📐',
      description: 'Pelajari konsep matematika dari dasar hingga lanjutan dengan metode interaktif',
      chapters: [
        {
          id: 1,
          title: 'Aljabar Dasar',
          lessons: [
            { id: 1, title: 'Variabel dan Konstanta', duration: '15 min', completed: true },
            { id: 2, title: 'Persamaan Linear', duration: '20 min', completed: true },
            { id: 3, title: 'Sistem Persamaan', duration: '25 min', completed: false },
            { id: 4, title: 'Pertidaksamaan', duration: '20 min', completed: false },
          ]
        },
        {
          id: 2,
          title: 'Geometri',
          lessons: [
            { id: 5, title: 'Bangun Datar', duration: '30 min', completed: false },
            { id: 6, title: 'Bangun Ruang', duration: '35 min', completed: false },
            { id: 7, title: 'Transformasi Geometri', duration: '25 min', completed: false },
          ]
        },
        {
          id: 3,
          title: 'Trigonometri',
          lessons: [
            { id: 8, title: 'Sudut dan Radian', duration: '20 min', completed: false },
            { id: 9, title: 'Fungsi Trigonometri', duration: '30 min', completed: false },
            { id: 10, title: 'Identitas Trigonometri', duration: '25 min', completed: false },
          ]
        }
      ]
    },
    physics: {
      name: 'Fisika',
      icon: '⚛️',
      description: 'Eksplorasi hukum-hukum fisika dengan simulasi dan eksperimen virtual',
      chapters: [
        {
          id: 1,
          title: 'Mekanika',
          lessons: [
            { id: 1, title: 'Gerak Lurus', duration: '20 min', completed: true },
            { id: 2, title: 'Hukum Newton', duration: '25 min', completed: false },
            { id: 3, title: 'Energi dan Usaha', duration: '30 min', completed: false },
          ]
        },
        {
          id: 2,
          title: 'Gelombang dan Optik',
          lessons: [
            { id: 4, title: 'Gelombang Mekanik', duration: '25 min', completed: false },
            { id: 5, title: 'Cahaya dan Optik', duration: '30 min', completed: false },
          ]
        }
      ]
    },
    programming: {
      name: 'Programming',
      icon: '💻',
      description: 'Kuasai berbagai bahasa pemrograman dan konsep computer science',
      chapters: [
        {
          id: 1,
          title: 'Web Development',
          lessons: [
            { id: 1, title: 'HTML & CSS Basics', duration: '30 min', completed: true },
            { id: 2, title: 'JavaScript Fundamentals', duration: '45 min', completed: true },
            { id: 3, title: 'React.js Introduction', duration: '60 min', completed: false },
          ]
        },
        {
          id: 2,
          title: 'Backend Development',
          lessons: [
            { id: 4, title: 'Node.js Basics', duration: '40 min', completed: false },
            { id: 5, title: 'Database Design', duration: '35 min', completed: false },
          ]
        }
      ]
    }
  }

  const subjectId = params.id as string
  const subject = subjectData[subjectId as keyof typeof subjectData] || subjectData.math

  const exercises = [
    { title: 'Latihan Persamaan Linear', questions: 20, difficulty: 'Easy', bestScore: 85 },
    { title: 'Quiz Sistem Persamaan', questions: 15, difficulty: 'Medium', bestScore: 72 },
    { title: 'Ujian BAB 1', questions: 30, difficulty: 'Hard', bestScore: null },
  ]

  const resources = [
    { type: 'video', title: 'Video Penjelasan Aljabar', duration: '15:30' },
    { type: 'pdf', title: 'Rangkuman Rumus Matematika', size: '2.4 MB' },
    { type: 'interactive', title: 'Simulasi Grafik Fungsi', size: 'Online' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard" className="text-blue-500 hover:text-blue-600">
              ← Kembali
            </Link>
            <div className="flex-1">
              <div className="flex items-center space-x-3">
                <span className="text-4xl">{subject.icon}</span>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    {subject.name}
                  </h1>
                  <p className="text-gray-600 dark:text-gray-300">
                    {subject.description}
                  </p>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Progress</p>
              <p className="text-2xl font-bold text-green-500">23%</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow mb-6">
          <div className="flex border-b dark:border-gray-700">
            <button
              onClick={() => setActiveTab('lessons')}
              className={`px-6 py-3 font-semibold ${
                activeTab === 'lessons' 
                  ? 'text-blue-500 border-b-2 border-blue-500' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              📚 Materi Pelajaran
            </button>
            <button
              onClick={() => setActiveTab('exercises')}
              className={`px-6 py-3 font-semibold ${
                activeTab === 'exercises' 
                  ? 'text-blue-500 border-b-2 border-blue-500' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              ✍️ Latihan & Quiz
            </button>
            <button
              onClick={() => setActiveTab('resources')}
              className={`px-6 py-3 font-semibold ${
                activeTab === 'resources' 
                  ? 'text-blue-500 border-b-2 border-blue-500' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              📂 Resources
            </button>
            <button
              onClick={() => setActiveTab('progress')}
              className={`px-6 py-3 font-semibold ${
                activeTab === 'progress' 
                  ? 'text-blue-500 border-b-2 border-blue-500' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              📊 Progress
            </button>
          </div>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'lessons' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {subject.chapters.map((chapter) => (
                <div key={chapter.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                  <h2 className="text-xl font-bold mb-4">
                    Chapter {chapter.id}: {chapter.title}
                  </h2>
                  <div className="space-y-3">
                    {chapter.lessons.map((lesson) => (
                      <div
                        key={lesson.id}
                        className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer transition"
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            lesson.completed ? 'bg-green-500 text-white' : 'bg-gray-300'
                          }`}>
                            {lesson.completed ? '✓' : lesson.id}
                          </div>
                          <div>
                            <p className="font-semibold">{lesson.title}</p>
                            <p className="text-sm text-gray-500">⏱️ {lesson.duration}</p>
                          </div>
                        </div>
                        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                          {lesson.completed ? 'Review' : 'Start'}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <h3 className="font-bold mb-4">Next Up</h3>
                <div className="space-y-2">
                  <p className="text-sm">Chapter 1, Lesson 3</p>
                  <p className="font-semibold">Sistem Persamaan</p>
                  <button className="w-full mt-3 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                    Continue Learning
                  </button>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <h3 className="font-bold mb-4">Study Streak</h3>
                <div className="text-center">
                  <span className="text-4xl">🔥</span>
                  <p className="text-2xl font-bold mt-2">3 Days</p>
                  <p className="text-sm text-gray-500">Keep it up!</p>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <h3 className="font-bold mb-4">Quick Links</h3>
                <div className="space-y-2">
                  <Link href={`/flashcards/${subjectId}`} className="block text-blue-500 hover:text-blue-600">
                    🎴 Flashcards
                  </Link>
                  <Link href={`/notes/${subjectId}`} className="block text-blue-500 hover:text-blue-600">
                    📝 My Notes
                  </Link>
                  <Link href={`/formulas/${subjectId}`} className="block text-blue-500 hover:text-blue-600">
                    📐 Formula Sheet
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'exercises' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {exercises.map((exercise, idx) => (
              <div key={idx} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <h3 className="font-bold text-lg mb-2">{exercise.title}</h3>
                <div className="space-y-2 mb-4">
                  <p className="text-sm text-gray-500">📝 {exercise.questions} questions</p>
                  <p className="text-sm text-gray-500">
                    Difficulty: 
                    <span className={`ml-2 font-semibold ${
                      exercise.difficulty === 'Easy' ? 'text-green-500' :
                      exercise.difficulty === 'Medium' ? 'text-yellow-500' :
                      'text-red-500'
                    }`}>
                      {exercise.difficulty}
                    </span>
                  </p>
                  {exercise.bestScore && (
                    <p className="text-sm text-gray-500">
                      Best Score: <span className="font-semibold text-green-500">{exercise.bestScore}%</span>
                    </p>
                  )}
                </div>
                <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                  {exercise.bestScore ? 'Retake' : 'Start'}
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'resources' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((resource, idx) => (
              <div key={idx} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <div className="flex items-center space-x-3 mb-3">
                  <span className="text-2xl">
                    {resource.type === 'video' && '🎥'}
                    {resource.type === 'pdf' && '📄'}
                    {resource.type === 'interactive' && '🎮'}
                  </span>
                  <div>
                    <h3 className="font-semibold">{resource.title}</h3>
                    <p className="text-sm text-gray-500">
                      {resource.duration || resource.size}
                    </p>
                  </div>
                </div>
                <button className="w-full px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600">
                  Open
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'progress' && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">Your Progress</h2>
            <div className="space-y-4">
              <div>
                <p className="text-gray-500 mb-2">Overall Completion</p>
                <div className="bg-gray-200 rounded-full h-4">
                  <div className="bg-green-500 h-4 rounded-full" style={{ width: '23%' }} />
                </div>
                <p className="text-sm text-gray-500 mt-1">7 of 30 lessons completed</p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-blue-500">7</p>
                  <p className="text-sm text-gray-500">Lessons Done</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-green-500">85%</p>
                  <p className="text-sm text-gray-500">Avg Score</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-purple-500">4.5h</p>
                  <p className="text-sm text-gray-500">Time Spent</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-orange-500">3</p>
                  <p className="text-sm text-gray-500">Streak Days</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}