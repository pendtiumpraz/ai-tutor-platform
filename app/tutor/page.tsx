'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function TutorPage() {
  const [messages, setMessages] = useState<Array<{role: string, content: string, timestamp: Date}>>([
    {
      role: 'assistant',
      content: 'Halo! Saya AI Tutor Anda. Saya siap membantu Anda belajar apa saja. Anda bisa:\n\n• Bertanya tentang konsep apapun\n• Minta penjelasan step-by-step\n• Request contoh soal dan pembahasan\n• Minta saya membuat rangkuman\n• Upload gambar soal untuk dibantu\n\nApa yang ingin Anda pelajari hari ini?',
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [selectedSubject, setSelectedSubject] = useState('general')
  const [showTools, setShowTools] = useState(false)

  const quickPrompts = [
    { icon: '📐', text: 'Jelaskan teorema Pythagoras dengan contoh' },
    { icon: '⚛️', text: 'Bagaimana cara kerja fotosintesis?' },
    { icon: '💻', text: 'Apa perbedaan let, const, dan var di JavaScript?' },
    { icon: '🧪', text: 'Jelaskan tabel periodik unsur' },
    { icon: '📖', text: 'Tips belajar efektif untuk ujian' },
    { icon: '🔢', text: 'Cara cepat menghitung perkalian' },
  ]

  const tools = [
    { icon: '📸', name: 'Upload Image', action: 'upload' },
    { icon: '🎤', name: 'Voice Input', action: 'voice' },
    { icon: '📊', name: 'Create Graph', action: 'graph' },
    { icon: '🧮', name: 'Calculator', action: 'calculator' },
    { icon: '📝', name: 'Generate Quiz', action: 'quiz' },
    { icon: '📚', name: 'Summarize', action: 'summarize' },
  ]

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage = {
      role: 'user',
      content: input,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      const response = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: input,
          subject: selectedSubject,
          level: 'adaptive'
        })
      })

      const data = await response.json()
      
      const aiMessage = {
        role: 'assistant',
        content: data.answer,
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, aiMessage])
    } catch (error) {
      const errorMessage = {
        role: 'assistant',
        content: 'Maaf, terjadi kesalahan. Silakan coba lagi.',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  const handleQuickPrompt = (prompt: string) => {
    setInput(prompt)
  }

  const handleToolAction = (action: string) => {
    switch(action) {
      case 'upload':
        alert('Upload image feature coming soon!')
        break
      case 'voice':
        alert('Voice input feature coming soon!')
        break
      case 'graph':
        setInput('Buatkan grafik untuk fungsi y = x² - 2x + 1')
        break
      case 'calculator':
        setInput('Hitung: ')
        break
      case 'quiz':
        setInput('Buatkan 5 soal quiz tentang ')
        break
      case 'summarize':
        setInput('Rangkum materi tentang ')
        break
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="text-blue-500 hover:text-blue-600">
                ← Back
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  AI Tutor Assistant
                </h1>
              </div>
            </div>
            
            {/* Subject Selector */}
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
            >
              <option value="general">General</option>
              <option value="math">Mathematics</option>
              <option value="physics">Physics</option>
              <option value="chemistry">Chemistry</option>
              <option value="biology">Biology</option>
              <option value="programming">Programming</option>
              <option value="language">Language</option>
            </select>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Main Chat Area */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg flex flex-col" style={{ height: 'calc(100vh - 200px)' }}>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-3xl ${msg.role === 'user' ? 'order-2' : ''}`}>
                      <div className="flex items-start space-x-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          msg.role === 'user' ? 'bg-blue-500 text-white' : 'bg-purple-500 text-white'
                        }`}>
                          {msg.role === 'user' ? 'U' : 'AI'}
                        </div>
                        <div>
                          <div className={`p-4 rounded-lg ${
                            msg.role === 'user' 
                              ? 'bg-blue-500 text-white' 
                              : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                          }`}>
                            <p className="whitespace-pre-wrap">{msg.content}</p>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            {msg.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {loading && (
                  <div className="flex justify-start">
                    <div className="flex items-start space-x-2">
                      <div className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center">
                        AI
                      </div>
                      <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                        <div className="flex space-x-2">
                          <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                          <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                          <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Prompts */}
              <div className="border-t dark:border-gray-700 p-4">
                <div className="flex space-x-2 overflow-x-auto pb-2">
                  {quickPrompts.map((prompt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleQuickPrompt(prompt.text)}
                      className="flex-shrink-0 px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 text-sm"
                    >
                      <span className="mr-2">{prompt.icon}</span>
                      <span className="text-xs">{prompt.text.substring(0, 20)}...</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Input Area */}
              <div className="border-t dark:border-gray-700 p-4">
                <div className="flex space-x-2">
                  <button
                    onClick={() => setShowTools(!showTools)}
                    className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200"
                  >
                    ➕
                  </button>
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Tanyakan apa saja..."
                    className="flex-1 px-4 py-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                    disabled={loading}
                  />
                  <button
                    onClick={handleSend}
                    disabled={loading || !input.trim()}
                    className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
                  >
                    Send
                  </button>
                </div>
                
                {/* Tools */}
                {showTools && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {tools.map((tool, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleToolAction(tool.action)}
                        className="px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 text-sm"
                      >
                        <span className="mr-2">{tool.icon}</span>
                        {tool.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Study Mode */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
              <h3 className="font-bold mb-3">Study Mode</h3>
              <div className="space-y-2">
                <button className="w-full text-left px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200">
                  🎯 Focused Learning
                </button>
                <button className="w-full text-left px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200">
                  🔄 Practice Problems
                </button>
                <button className="w-full text-left px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200">
                  📊 Exam Preparation
                </button>
                <button className="w-full text-left px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200">
                  💡 Concept Review
                </button>
              </div>
            </div>

            {/* Recent Topics */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
              <h3 className="font-bold mb-3">Recent Topics</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Persamaan Kuadrat</span>
                  <span className="text-gray-500">10m ago</span>
                </div>
                <div className="flex justify-between">
                  <span>Hukum Newton</span>
                  <span className="text-gray-500">1h ago</span>
                </div>
                <div className="flex justify-between">
                  <span>React Hooks</span>
                  <span className="text-gray-500">2h ago</span>
                </div>
              </div>
            </div>

            {/* Learning Tips */}
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg shadow-lg p-4 text-white">
              <h3 className="font-bold mb-3">💡 Learning Tip</h3>
              <p className="text-sm">
                Break down complex problems into smaller steps. Ask me to explain each step in detail!
              </p>
            </div>

            {/* Session Stats */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
              <h3 className="font-bold mb-3">Session Stats</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Questions Asked</span>
                  <span className="font-bold">{messages.filter(m => m.role === 'user').length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Session Time</span>
                  <span className="font-bold">12 min</span>
                </div>
                <div className="flex justify-between">
                  <span>Topics Covered</span>
                  <span className="font-bold">3</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}