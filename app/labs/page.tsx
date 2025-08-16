'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function LabsPage() {
  const [selectedLab, setSelectedLab] = useState<string | null>(null)
  const [isRunning, setIsRunning] = useState(false)

  const labs = [
    {
      id: 'physics-pendulum',
      subject: 'Physics',
      title: 'Simple Pendulum Experiment',
      description: 'Study the relationship between pendulum length and period',
      difficulty: 'Beginner',
      duration: '20 min',
      icon: '🔬',
      equipment: ['Virtual Pendulum', 'Timer', 'Ruler', 'Graph Plotter']
    },
    {
      id: 'chemistry-titration',
      subject: 'Chemistry',
      title: 'Acid-Base Titration',
      description: 'Determine the concentration of an unknown acid',
      difficulty: 'Intermediate',
      duration: '30 min',
      icon: '🧪',
      equipment: ['Burette', 'pH Meter', 'Indicators', 'Solutions']
    },
    {
      id: 'biology-microscope',
      subject: 'Biology',
      title: 'Cell Structure Analysis',
      description: 'Examine plant and animal cells under microscope',
      difficulty: 'Beginner',
      duration: '25 min',
      icon: '🔬',
      equipment: ['Virtual Microscope', 'Cell Samples', 'Staining Kit']
    },
    {
      id: 'physics-circuit',
      subject: 'Physics',
      title: 'Electric Circuit Builder',
      description: 'Build and test electrical circuits',
      difficulty: 'Intermediate',
      duration: '35 min',
      icon: '⚡',
      equipment: ['Circuit Board', 'Components', 'Multimeter', 'Power Supply']
    },
    {
      id: 'chemistry-periodic',
      subject: 'Chemistry',
      title: 'Interactive Periodic Table',
      description: 'Explore element properties and reactions',
      difficulty: 'Beginner',
      duration: '15 min',
      icon: '⚛️',
      equipment: ['3D Periodic Table', 'Element Database', 'Reaction Simulator']
    },
    {
      id: 'programming-algo',
      subject: 'Computer Science',
      title: 'Algorithm Visualizer',
      description: 'Visualize sorting and searching algorithms',
      difficulty: 'Advanced',
      duration: '40 min',
      icon: '💻',
      equipment: ['Code Editor', 'Visualizer', 'Performance Analyzer']
    }
  ]

  const simulationData = {
    pendulum: {
      length: 1.0,
      angle: 30,
      period: 2.01,
      frequency: 0.497
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 dark:from-gray-900 dark:to-gray-800">
      <header className="bg-white dark:bg-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                🔬 Virtual Laboratory
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                Interactive simulations and experiments
              </p>
            </div>
            <Link href="/dashboard" className="text-blue-500 hover:text-blue-600">
              ← Back to Dashboard
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {!selectedLab ? (
          <>
            {/* Lab Categories */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 text-center">
                <span className="text-3xl">⚛️</span>
                <p className="font-bold mt-2">Physics</p>
                <p className="text-sm text-gray-500">12 Experiments</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 text-center">
                <span className="text-3xl">🧪</span>
                <p className="font-bold mt-2">Chemistry</p>
                <p className="text-sm text-gray-500">10 Experiments</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 text-center">
                <span className="text-3xl">🧬</span>
                <p className="font-bold mt-2">Biology</p>
                <p className="text-sm text-gray-500">8 Experiments</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 text-center">
                <span className="text-3xl">💻</span>
                <p className="font-bold mt-2">Computer Science</p>
                <p className="text-sm text-gray-500">15 Simulations</p>
              </div>
            </div>

            {/* Available Labs */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-6">Available Experiments</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {labs.map((lab) => (
                  <div key={lab.id} className="border dark:border-gray-700 rounded-lg p-4 hover:shadow-lg transition">
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-3xl">{lab.icon}</span>
                      <span className={`px-2 py-1 rounded text-xs ${
                        lab.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
                        lab.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {lab.difficulty}
                      </span>
                    </div>
                    <h3 className="font-bold text-lg mb-2">{lab.title}</h3>
                    <p className="text-sm text-gray-500 mb-3">{lab.description}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                      <span>⏱️ {lab.duration}</span>
                      <span>{lab.subject}</span>
                    </div>
                    <button
                      onClick={() => setSelectedLab(lab.id)}
                      className="w-full px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
                    >
                      Start Lab
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          /* Lab Simulation Interface */
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Simple Pendulum Experiment</h2>
              <button
                onClick={() => setSelectedLab(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕ Close Lab
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Simulation Area */}
              <div className="lg:col-span-2">
                <div className="bg-gradient-to-br from-blue-100 to-purple-100 dark:from-gray-700 dark:to-gray-600 rounded-lg p-8 h-96 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🔬</div>
                    <p className="text-xl font-semibold mb-4">Pendulum Simulation</p>
                    {isRunning ? (
                      <div className="animate-pulse">
                        <p className="text-lg">Experiment Running...</p>
                        <div className="mt-4">
                          <div className="inline-block w-2 h-32 bg-gray-600 rounded-full transform rotate-12 origin-top animate-swing"></div>
                          <div className="inline-block w-6 h-6 bg-gray-800 rounded-full -mt-2"></div>
                        </div>
                      </div>
                    ) : (
                      <p className="text-gray-600">Click "Start Experiment" to begin</p>
                    )}
                  </div>
                </div>

                {/* Data Display */}
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <p className="text-sm text-gray-500">Pendulum Length</p>
                    <p className="text-2xl font-bold">{simulationData.pendulum.length} m</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <p className="text-sm text-gray-500">Initial Angle</p>
                    <p className="text-2xl font-bold">{simulationData.pendulum.angle}°</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <p className="text-sm text-gray-500">Period</p>
                    <p className="text-2xl font-bold">{simulationData.pendulum.period} s</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <p className="text-sm text-gray-500">Frequency</p>
                    <p className="text-2xl font-bold">{simulationData.pendulum.frequency} Hz</p>
                  </div>
                </div>
              </div>

              {/* Control Panel */}
              <div className="space-y-6">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <h3 className="font-bold mb-4">Experiment Controls</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm mb-2">Pendulum Length (m)</label>
                      <input 
                        type="range" 
                        min="0.5" 
                        max="2.0" 
                        step="0.1" 
                        defaultValue="1.0"
                        className="w-full"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm mb-2">Initial Angle (degrees)</label>
                      <input 
                        type="range" 
                        min="10" 
                        max="90" 
                        step="5" 
                        defaultValue="30"
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label className="block text-sm mb-2">Gravity (m/s²)</label>
                      <select className="w-full px-3 py-2 border rounded dark:bg-gray-600 dark:border-gray-500">
                        <option>Earth (9.81)</option>
                        <option>Moon (1.62)</option>
                        <option>Mars (3.71)</option>
                        <option>Jupiter (24.79)</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex space-x-2 mt-6">
                    <button
                      onClick={() => setIsRunning(!isRunning)}
                      className={`flex-1 px-4 py-2 rounded text-white ${
                        isRunning ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
                      }`}
                    >
                      {isRunning ? '⏸️ Pause' : '▶️ Start'}
                    </button>
                    <button className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
                      🔄 Reset
                    </button>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <h3 className="font-bold mb-4">Lab Instructions</h3>
                  <ol className="text-sm space-y-2">
                    <li>1. Set the pendulum length using the slider</li>
                    <li>2. Choose an initial angle</li>
                    <li>3. Select gravity condition</li>
                    <li>4. Click "Start" to begin simulation</li>
                    <li>5. Observe and record the data</li>
                    <li>6. Try different values and compare</li>
                  </ol>
                </div>

                <div className="bg-indigo-100 dark:bg-indigo-900 rounded-lg p-4">
                  <h3 className="font-bold mb-2">💡 Learning Tip</h3>
                  <p className="text-sm">
                    The period of a pendulum depends on its length but not on its mass. 
                    Try changing the length to see how it affects the period!
                  </p>
                </div>

                <button className="w-full px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600">
                  📊 Generate Lab Report
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Recent Lab Activities */}
        {!selectedLab && (
          <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4">Recent Lab Activities</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded">
                <div>
                  <p className="font-semibold">Electric Circuit Builder</p>
                  <p className="text-sm text-gray-500">Completed 2 hours ago</p>
                </div>
                <div className="text-right">
                  <p className="text-green-500 font-bold">✓ Completed</p>
                  <p className="text-sm text-gray-500">Score: 92%</p>
                </div>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded">
                <div>
                  <p className="font-semibold">Acid-Base Titration</p>
                  <p className="text-sm text-gray-500">In progress</p>
                </div>
                <button className="px-4 py-2 bg-indigo-500 text-white rounded text-sm hover:bg-indigo-600">
                  Continue
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}