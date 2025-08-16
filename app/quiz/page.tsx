'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function QuizPage() {
  const [selectedSubject, setSelectedSubject] = useState('')
  const [difficulty, setDifficulty] = useState('medium')
  const [quizStarted, setQuizStarted] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [answers, setAnswers] = useState<number[]>([])

  const questions = [
    {
      id: 1,
      question: "Apa hasil dari 2x + 5 = 15?",
      options: ["x = 5", "x = 10", "x = 7.5", "x = 20"],
      correct: 0,
      explanation: "Untuk menyelesaikan 2x + 5 = 15, kurangi 5 dari kedua sisi: 2x = 10, kemudian bagi dengan 2: x = 5"
    },
    {
      id: 2,
      question: "Manakah yang merupakan bilangan prima?",
      options: ["9", "15", "17", "21"],
      correct: 2,
      explanation: "17 adalah bilangan prima karena hanya dapat dibagi oleh 1 dan dirinya sendiri"
    },
    {
      id: 3,
      question: "Berapa luas lingkaran dengan radius 7 cm? (π = 22/7)",
      options: ["154 cm²", "44 cm²", "308 cm²", "88 cm²"],
      correct: 0,
      explanation: "Luas = πr² = (22/7) × 7 × 7 = 154 cm²"
    },
    {
      id: 4,
      question: "Apa turunan dari f(x) = 3x² + 2x - 5?",
      options: ["6x + 2", "3x + 2", "6x - 5", "3x² + 2"],
      correct: 0,
      explanation: "Turunan dari 3x² adalah 6x, turunan dari 2x adalah 2, dan turunan konstanta adalah 0"
    },
    {
      id: 5,
      question: "Berapa nilai dari sin 30°?",
      options: ["1/2", "√3/2", "√2/2", "1"],
      correct: 0,
      explanation: "sin 30° = 1/2 adalah nilai yang harus dihafal dalam trigonometri dasar"
    }
  ]

  const handleStartQuiz = () => {
    setQuizStarted(true)
    setCurrentQuestion(0)
    setScore(0)
    setAnswers([])
    setShowResult(false)
  }

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
  }

  const handleNext = () => {
    if (selectedAnswer !== null) {
      const newAnswers = [...answers, selectedAnswer]
      setAnswers(newAnswers)
      
      if (selectedAnswer === questions[currentQuestion].correct) {
        setScore(score + 1)
      }

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer(null)
      } else {
        setShowResult(true)
      }
    }
  }

  const restartQuiz = () => {
    setQuizStarted(false)
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setScore(0)
    setAnswers([])
    setShowResult(false)
  }

  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <header className="bg-white dark:bg-gray-800 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  📝 Practice Quiz
                </h1>
                <p className="text-gray-600 dark:text-gray-300 mt-1">
                  Test your knowledge with interactive quizzes
                </p>
              </div>
              <Link href="/dashboard" className="text-blue-500 hover:text-blue-600">
                ← Back to Dashboard
              </Link>
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Setup Your Quiz</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Select Subject</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {['Math', 'Physics', 'Chemistry', 'Biology'].map((subject) => (
                    <button
                      key={subject}
                      onClick={() => setSelectedSubject(subject)}
                      className={`p-3 rounded-lg border-2 transition ${
                        selectedSubject === subject
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {subject}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Difficulty Level</label>
                <div className="grid grid-cols-3 gap-3">
                  {['easy', 'medium', 'hard'].map((level) => (
                    <button
                      key={level}
                      onClick={() => setDifficulty(level)}
                      className={`p-3 rounded-lg border-2 capitalize transition ${
                        difficulty === level
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {level === 'easy' && '😊 Easy'}
                      {level === 'medium' && '🤔 Medium'}
                      {level === 'hard' && '😤 Hard'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleStartQuiz}
                  className="w-full py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition"
                >
                  Start Quiz (5 Questions)
                </button>
              </div>
            </div>
          </div>

          {/* Recent Quizzes */}
          <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4">Recent Quiz Results</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded">
                <div>
                  <p className="font-semibold">Math - Algebra</p>
                  <p className="text-sm text-gray-500">2 hours ago</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-green-500">85%</p>
                  <p className="text-sm text-gray-500">17/20 correct</p>
                </div>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded">
                <div>
                  <p className="font-semibold">Physics - Mechanics</p>
                  <p className="text-sm text-gray-500">Yesterday</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-yellow-500">70%</p>
                  <p className="text-sm text-gray-500">14/20 correct</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  if (showResult) {
    const percentage = (score / questions.length) * 100

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-2xl w-full">
          <div className="text-center">
            <div className="text-6xl mb-4">
              {percentage >= 80 ? '🎉' : percentage >= 60 ? '👍' : '💪'}
            </div>
            <h2 className="text-3xl font-bold mb-2">Quiz Complete!</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
              You scored {score} out of {questions.length}
            </p>
            
            <div className="mb-8">
              <div className="text-5xl font-bold text-blue-500">{percentage.toFixed(0)}%</div>
              <div className="mt-2 bg-gray-200 rounded-full h-4 max-w-xs mx-auto">
                <div 
                  className={`h-4 rounded-full ${
                    percentage >= 80 ? 'bg-green-500' : 
                    percentage >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>

            <div className="space-y-4 text-left mb-6">
              <h3 className="font-bold text-lg">Review Your Answers:</h3>
              {questions.map((q, idx) => (
                <div key={idx} className="p-3 bg-gray-50 dark:bg-gray-700 rounded">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold">Question {idx + 1}</p>
                    <span className={`px-2 py-1 rounded text-sm ${
                      answers[idx] === q.correct
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {answers[idx] === q.correct ? '✓ Correct' : '✗ Wrong'}
                    </span>
                  </div>
                  {answers[idx] !== q.correct && (
                    <p className="text-sm text-gray-500 mt-1">
                      Correct answer: {q.options[q.correct]}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <div className="flex space-x-4">
              <button
                onClick={restartQuiz}
                className="flex-1 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600"
              >
                Try Another Quiz
              </button>
              <Link
                href="/dashboard"
                className="flex-1 py-3 bg-gray-200 dark:bg-gray-700 text-center rounded-lg font-semibold hover:bg-gray-300"
              >
                Back to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-500 mb-2">
              <span>Question {currentQuestion + 1} of {questions.length}</span>
              <span>Score: {score}</span>
            </div>
            <div className="bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6">
              {questions[currentQuestion].question}
            </h2>

            <div className="space-y-3">
              {questions[currentQuestion].options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  className={`w-full p-4 text-left rounded-lg border-2 transition ${
                    selectedAnswer === idx
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="flex items-center">
                    <span className="mr-3 w-8 h-8 rounded-full border-2 flex items-center justify-center">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{option}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <button
              onClick={() => setQuizStarted(false)}
              className="px-6 py-2 text-gray-500 hover:text-gray-700"
            >
              Exit Quiz
            </button>
            <button
              onClick={handleNext}
              disabled={selectedAnswer === null}
              className={`px-8 py-2 rounded-lg font-semibold ${
                selectedAnswer !== null
                  ? 'bg-blue-500 text-white hover:bg-blue-600'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}