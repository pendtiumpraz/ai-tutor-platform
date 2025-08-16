'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function VideosPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const categories = [
    { id: 'all', name: 'All Videos', icon: '🎬' },
    { id: 'math', name: 'Mathematics', icon: '📐' },
    { id: 'science', name: 'Science', icon: '🔬' },
    { id: 'programming', name: 'Programming', icon: '💻' },
    { id: 'language', name: 'Languages', icon: '🌍' },
    { id: 'featured', name: 'Featured', icon: '⭐' },
  ]

  const videos = [
    {
      id: 1,
      title: 'Introduction to Calculus',
      subject: 'math',
      duration: '45:30',
      views: '12.5K',
      thumbnail: '📐',
      instructor: 'Prof. AI Math',
      level: 'Advanced',
      featured: true
    },
    {
      id: 2,
      title: 'Physics: Laws of Motion',
      subject: 'science',
      duration: '32:15',
      views: '8.2K',
      thumbnail: '⚛️',
      instructor: 'Dr. AI Physics',
      level: 'Intermediate'
    },
    {
      id: 3,
      title: 'React Hooks Explained',
      subject: 'programming',
      duration: '28:45',
      views: '15.7K',
      thumbnail: '💻',
      instructor: 'Code Master AI',
      level: 'Intermediate',
      featured: true
    },
    {
      id: 4,
      title: 'English Grammar Basics',
      subject: 'language',
      duration: '25:00',
      views: '6.3K',
      thumbnail: '📚',
      instructor: 'Language AI',
      level: 'Beginner'
    },
    {
      id: 5,
      title: 'Organic Chemistry',
      subject: 'science',
      duration: '38:20',
      views: '9.1K',
      thumbnail: '🧪',
      instructor: 'Dr. AI Chem',
      level: 'Advanced'
    },
    {
      id: 6,
      title: 'Python for Beginners',
      subject: 'programming',
      duration: '42:10',
      views: '20.4K',
      thumbnail: '🐍',
      instructor: 'Code Master AI',
      level: 'Beginner',
      featured: true
    },
    {
      id: 7,
      title: 'Algebra Fundamentals',
      subject: 'math',
      duration: '35:45',
      views: '10.8K',
      thumbnail: '🔢',
      instructor: 'Prof. AI Math',
      level: 'Beginner'
    },
    {
      id: 8,
      title: 'Biology: Cell Structure',
      subject: 'science',
      duration: '29:30',
      views: '7.5K',
      thumbnail: '🧬',
      instructor: 'Dr. AI Bio',
      level: 'Intermediate'
    }
  ]

  const filteredVideos = videos.filter(video => {
    const matchesCategory = selectedCategory === 'all' || 
                           video.subject === selectedCategory || 
                           (selectedCategory === 'featured' && video.featured)
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const playlists = [
    { name: 'Complete Math Course', videos: 24, duration: '12h 30m' },
    { name: 'Web Development Bootcamp', videos: 45, duration: '20h 15m' },
    { name: 'Science Fundamentals', videos: 30, duration: '15h 45m' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 dark:from-gray-900 dark:to-gray-800">
      <header className="bg-white dark:bg-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                🎥 Video Lessons
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                Learn from high-quality video tutorials
              </p>
            </div>
            <Link href="/dashboard" className="text-blue-500 hover:text-blue-600">
              ← Back to Dashboard
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Search and Filter */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Search videos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
            />
            <select 
              className="px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
              defaultValue="all"
            >
              <option value="all">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
            <button className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
              🔍 Search
            </button>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mt-6">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg transition ${
                  selectedCategory === category.id
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200'
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Video Grid */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredVideos.map((video) => (
                <div key={video.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
                  <div className="h-48 bg-gradient-to-br from-red-400 to-orange-400 flex items-center justify-center text-6xl">
                    {video.thumbnail}
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-2">{video.title}</h3>
                    <p className="text-sm text-gray-500 mb-3">{video.instructor}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">⏱️ {video.duration}</span>
                      <span className="text-gray-500">👁️ {video.views}</span>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <span className={`px-2 py-1 rounded text-xs ${
                        video.level === 'Beginner' ? 'bg-green-100 text-green-700' :
                        video.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {video.level}
                      </span>
                      <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm">
                        ▶️ Watch
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Continue Watching */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h3 className="font-bold text-lg mb-4">Continue Watching</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-20 h-12 bg-blue-200 rounded flex items-center justify-center">
                    📐
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm">Trigonometry Basics</p>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Playlists */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h3 className="font-bold text-lg mb-4">📚 Playlists</h3>
              <div className="space-y-3">
                {playlists.map((playlist, idx) => (
                  <div key={idx} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 cursor-pointer">
                    <p className="font-semibold">{playlist.name}</p>
                    <p className="text-sm text-gray-500">
                      {playlist.videos} videos • {playlist.duration}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended */}
            <div className="bg-gradient-to-br from-red-500 to-orange-500 rounded-lg shadow-lg p-6 text-white">
              <h3 className="font-bold text-lg mb-4">🔥 Trending Now</h3>
              <ul className="space-y-2">
                <li>• Complete Python Course</li>
                <li>• Calculus Made Easy</li>
                <li>• Web Development 2024</li>
                <li>• Physics Experiments</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}