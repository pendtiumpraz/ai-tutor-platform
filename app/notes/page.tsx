'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function NotesPage() {
  const [selectedNote, setSelectedNote] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [newNoteTitle, setNewNoteTitle] = useState('')
  const [newNoteContent, setNewNoteContent] = useState('')
  const [showNewNote, setShowNewNote] = useState(false)

  const [notes, setNotes] = useState([
    {
      id: 1,
      title: 'Rumus Matematika Penting',
      subject: 'Mathematics',
      content: `# Rumus Matematika Penting

## Aljabar
- Persamaan Kuadrat: x = (-b ± √(b²-4ac)) / 2a
- Identitas: (a+b)² = a² + 2ab + b²
- Faktorisasi: a² - b² = (a+b)(a-b)

## Geometri
- Luas Lingkaran: πr²
- Keliling Lingkaran: 2πr
- Volume Bola: (4/3)πr³

## Trigonometri
- sin²θ + cos²θ = 1
- tan θ = sin θ / cos θ`,
      lastEdited: '2 hours ago',
      tags: ['math', 'formulas', 'important']
    },
    {
      id: 2,
      title: 'React Hooks Summary',
      subject: 'Programming',
      content: `# React Hooks Summary

## useState
\`\`\`javascript
const [state, setState] = useState(initialValue)
\`\`\`

## useEffect
\`\`\`javascript
useEffect(() => {
  // Side effect code
  return () => {
    // Cleanup
  }
}, [dependencies])
\`\`\`

## useContext
For consuming context values

## useReducer
For complex state management`,
      lastEdited: '1 day ago',
      tags: ['react', 'javascript', 'hooks']
    },
    {
      id: 3,
      title: 'Physics - Laws of Motion',
      subject: 'Physics',
      content: `# Newton's Laws of Motion

## First Law (Inertia)
An object at rest stays at rest unless acted upon by an external force.

## Second Law
F = ma (Force = mass × acceleration)

## Third Law
For every action, there is an equal and opposite reaction.`,
      lastEdited: '3 days ago',
      tags: ['physics', 'newton', 'motion']
    },
    {
      id: 4,
      title: 'Chemistry - Periodic Table',
      subject: 'Chemistry',
      content: `# Periodic Table Notes

## Groups
- Group 1: Alkali Metals (Li, Na, K, Rb, Cs, Fr)
- Group 2: Alkaline Earth Metals
- Group 17: Halogens
- Group 18: Noble Gases

## Trends
- Atomic radius decreases across a period
- Ionization energy increases across a period`,
      lastEdited: '1 week ago',
      tags: ['chemistry', 'periodic-table']
    }
  ])

  const subjects = ['All', 'Mathematics', 'Physics', 'Chemistry', 'Programming', 'Biology', 'Languages']

  const handleCreateNote = () => {
    if (newNoteTitle && newNoteContent) {
      const newNote = {
        id: notes.length + 1,
        title: newNoteTitle,
        subject: 'General',
        content: newNoteContent,
        lastEdited: 'Just now',
        tags: []
      }
      setNotes([newNote, ...notes])
      setNewNoteTitle('')
      setNewNoteContent('')
      setShowNewNote(false)
      setSelectedNote(newNote.id)
    }
  }

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-amber-100 dark:from-gray-900 dark:to-gray-800">
      <header className="bg-white dark:bg-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                📚 Study Notes
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                Your personal knowledge base
              </p>
            </div>
            <Link href="/dashboard" className="text-blue-500 hover:text-blue-600">
              ← Back to Dashboard
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - Notes List */}
          <div className="lg:col-span-1 space-y-4">
            {/* Search and New Note */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
              <input
                type="text"
                placeholder="Search notes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 mb-3"
              />
              <button
                onClick={() => setShowNewNote(true)}
                className="w-full px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
              >
                + New Note
              </button>
            </div>

            {/* Subject Filter */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
              <h3 className="font-bold mb-3">Subjects</h3>
              <div className="space-y-2">
                {subjects.map((subject) => (
                  <button
                    key={subject}
                    className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    {subject}
                  </button>
                ))}
              </div>
            </div>

            {/* Notes List */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
              <h3 className="font-bold mb-3">Recent Notes</h3>
              <div className="space-y-2">
                {filteredNotes.map((note) => (
                  <div
                    key={note.id}
                    onClick={() => setSelectedNote(note.id)}
                    className={`p-3 rounded-lg cursor-pointer transition ${
                      selectedNote === note.id
                        ? 'bg-yellow-100 dark:bg-yellow-900 border-l-4 border-yellow-500'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <h4 className="font-semibold text-sm">{note.title}</h4>
                    <p className="text-xs text-gray-500 mt-1">{note.subject}</p>
                    <p className="text-xs text-gray-400">{note.lastEdited}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {showNewNote ? (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-4">Create New Note</h2>
                <input
                  type="text"
                  placeholder="Note Title..."
                  value={newNoteTitle}
                  onChange={(e) => setNewNoteTitle(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 mb-4"
                />
                <textarea
                  placeholder="Start writing your note..."
                  value={newNoteContent}
                  onChange={(e) => setNewNoteContent(e.target.value)}
                  className="w-full px-4 py-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 h-96 font-mono"
                />
                <div className="flex justify-end space-x-3 mt-4">
                  <button
                    onClick={() => setShowNewNote(false)}
                    className="px-6 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCreateNote}
                    className="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                  >
                    Save Note
                  </button>
                </div>
              </div>
            ) : selectedNote ? (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                {notes.find(n => n.id === selectedNote) && (
                  <>
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h2 className="text-2xl font-bold">
                          {notes.find(n => n.id === selectedNote)?.title}
                        </h2>
                        <p className="text-gray-500 mt-1">
                          {notes.find(n => n.id === selectedNote)?.subject} • 
                          Last edited {notes.find(n => n.id === selectedNote)?.lastEdited}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <button className="p-2 bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200">
                          ✏️ Edit
                        </button>
                        <button className="p-2 bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200">
                          📤 Share
                        </button>
                        <button className="p-2 bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200">
                          🗑️ Delete
                        </button>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {notes.find(n => n.id === selectedNote)?.tags.map((tag, idx) => (
                        <span key={idx} className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 rounded-full text-sm">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Note Content */}
                    <div className="prose dark:prose-invert max-w-none">
                      <pre className="whitespace-pre-wrap font-sans">
                        {notes.find(n => n.id === selectedNote)?.content}
                      </pre>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
                <div className="text-6xl mb-4">📝</div>
                <h2 className="text-2xl font-bold mb-2">Select a Note</h2>
                <p className="text-gray-500 mb-6">Choose a note from the sidebar or create a new one</p>
                <button
                  onClick={() => setShowNewNote(true)}
                  className="px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                >
                  Create Your First Note
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 text-center">
            <p className="text-3xl font-bold text-yellow-500">{notes.length}</p>
            <p className="text-gray-500">Total Notes</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 text-center">
            <p className="text-3xl font-bold text-blue-500">5</p>
            <p className="text-gray-500">Subjects</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 text-center">
            <p className="text-3xl font-bold text-green-500">12</p>
            <p className="text-gray-500">Tags</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 text-center">
            <p className="text-3xl font-bold text-purple-500">Today</p>
            <p className="text-gray-500">Last Updated</p>
          </div>
        </div>
      </main>
    </div>
  )
}