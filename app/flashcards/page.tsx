'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function FlashcardsPage() {
  const [currentCard, setCurrentCard] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [selectedDeck, setSelectedDeck] = useState('math')
  const [studyMode, setStudyMode] = useState(false)
  const [knownCards, setKnownCards] = useState<number[]>([])
  const [unknownCards, setUnknownCards] = useState<number[]>([])

  const decks = {
    math: {
      name: 'Matematika - Rumus Dasar',
      cards: [
        { front: 'Luas Lingkaran', back: 'πr²\n\nDimana:\nπ = 3.14 atau 22/7\nr = jari-jari lingkaran' },
        { front: 'Rumus Pythagoras', back: 'a² + b² = c²\n\nDimana:\na, b = sisi tegak\nc = sisi miring (hipotenusa)' },
        { front: 'Rumus ABC', back: 'x = (-b ± √(b²-4ac)) / 2a\n\nUntuk persamaan ax² + bx + c = 0' },
        { front: 'Volume Bola', back: '(4/3)πr³\n\nDimana:\nr = jari-jari bola' },
        { front: 'Turunan x^n', back: 'nx^(n-1)\n\nContoh: Turunan dari x³ adalah 3x²' },
      ]
    },
    physics: {
      name: 'Fisika - Hukum Dasar',
      cards: [
        { front: 'Hukum Newton I', back: 'Benda akan tetap diam atau bergerak lurus beraturan jika resultan gaya = 0\n\nΣF = 0' },
        { front: 'Hukum Newton II', back: 'F = m × a\n\nDimana:\nF = Gaya (Newton)\nm = massa (kg)\na = percepatan (m/s²)' },
        { front: 'Energi Kinetik', back: 'Ek = ½mv²\n\nDimana:\nm = massa (kg)\nv = kecepatan (m/s)' },
        { front: 'Hukum Ohm', back: 'V = I × R\n\nDimana:\nV = Tegangan (Volt)\nI = Arus (Ampere)\nR = Hambatan (Ohm)' },
        { front: 'Periode Bandul', back: 'T = 2π√(L/g)\n\nDimana:\nL = panjang tali\ng = percepatan gravitasi' },
      ]
    },
    chemistry: {
      name: 'Kimia - Konsep Dasar',
      cards: [
        { front: 'Rumus Molekul Air', back: 'H₂O\n\n2 atom Hidrogen + 1 atom Oksigen' },
        { front: 'pH Asam', back: 'pH < 7\n\nSemakin kecil pH, semakin asam' },
        { front: 'pH Basa', back: 'pH > 7\n\nSemakin besar pH, semakin basa' },
        { front: 'Mol', back: '1 mol = 6.022 × 10²³ partikel\n\n(Bilangan Avogadro)' },
        { front: 'Hukum Lavoisier', back: 'Massa zat sebelum reaksi = Massa zat setelah reaksi\n\n(Hukum Kekekalan Massa)' },
      ]
    }
  }

  const currentDeck = decks[selectedDeck as keyof typeof decks]

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  const handleNext = () => {
    if (currentCard < currentDeck.cards.length - 1) {
      setCurrentCard(currentCard + 1)
      setIsFlipped(false)
    }
  }

  const handlePrevious = () => {
    if (currentCard > 0) {
      setCurrentCard(currentCard - 1)
      setIsFlipped(false)
    }
  }

  const handleKnow = () => {
    setKnownCards([...knownCards, currentCard])
    handleNext()
  }

  const handleDontKnow = () => {
    setUnknownCards([...unknownCards, currentCard])
    handleNext()
  }

  const resetStudy = () => {
    setKnownCards([])
    setUnknownCards([])
    setCurrentCard(0)
    setIsFlipped(false)
  }

  if (studyMode) {
    const progress = ((knownCards.length + unknownCards.length) / currentDeck.cards.length) * 100
    const isComplete = knownCards.length + unknownCards.length === currentDeck.cards.length

    if (isComplete) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-md w-full text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold mb-4">Study Session Complete!</h2>
            <div className="space-y-2 mb-6">
              <p className="text-green-500 font-semibold">
                ✓ Mastered: {knownCards.length} cards
              </p>
              <p className="text-orange-500 font-semibold">
                ⟳ Need Review: {unknownCards.length} cards
              </p>
            </div>
            <div className="space-y-3">
              <button
                onClick={resetStudy}
                className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Study Again
              </button>
              <button
                onClick={() => setStudyMode(false)}
                className="w-full py-3 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300"
              >
                Back to Decks
              </button>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-900 dark:to-gray-800 p-4">
        <div className="max-w-4xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span>Card {currentCard + 1} of {currentDeck.cards.length}</span>
              <div className="space-x-4">
                <span className="text-green-500">✓ {knownCards.length}</span>
                <span className="text-orange-500">⟳ {unknownCards.length}</span>
              </div>
            </div>
            <div className="bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Flashcard */}
          <div className="flex items-center justify-center" style={{ minHeight: '400px' }}>
            <div 
              className="relative w-full max-w-2xl h-96 cursor-pointer preserve-3d transition-transform duration-500"
              style={{ 
                transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                transformStyle: 'preserve-3d'
              }}
              onClick={handleFlip}
            >
              {/* Front of card */}
              <div 
                className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-2xl p-8 flex items-center justify-center backface-hidden"
                style={{ backfaceVisibility: 'hidden' }}
              >
                <div className="text-white text-center">
                  <p className="text-sm mb-4 opacity-75">Question</p>
                  <h2 className="text-3xl font-bold">{currentDeck.cards[currentCard].front}</h2>
                  <p className="mt-8 text-sm opacity-75">Click to reveal answer</p>
                </div>
              </div>

              {/* Back of card */}
              <div 
                className="absolute inset-0 bg-gradient-to-br from-blue-500 to-teal-500 rounded-2xl shadow-2xl p-8 flex items-center justify-center backface-hidden"
                style={{ 
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)'
                }}
              >
                <div className="text-white text-center">
                  <p className="text-sm mb-4 opacity-75">Answer</p>
                  <div className="text-xl whitespace-pre-line">{currentDeck.cards[currentCard].back}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Study Controls */}
          <div className="flex justify-center space-x-4 mt-8">
            <button
              onClick={handleDontKnow}
              className="px-8 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600"
              disabled={!isFlipped}
            >
              😕 Need Practice
            </button>
            <button
              onClick={handleKnow}
              className="px-8 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
              disabled={!isFlipped}
            >
              😊 Got It!
            </button>
          </div>

          <div className="text-center mt-4">
            <button
              onClick={() => setStudyMode(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              Exit Study Mode
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-900 dark:to-gray-800">
      <header className="bg-white dark:bg-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                🎴 Flashcards
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                Master concepts with spaced repetition
              </p>
            </div>
            <Link href="/dashboard" className="text-blue-500 hover:text-blue-600">
              ← Back to Dashboard
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Deck Selection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {Object.entries(decks).map(([key, deck]) => (
            <div
              key={key}
              onClick={() => {
                setSelectedDeck(key)
                setCurrentCard(0)
                setIsFlipped(false)
              }}
              className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 cursor-pointer transition ${
                selectedDeck === key ? 'ring-4 ring-purple-500' : 'hover:shadow-xl'
              }`}
            >
              <h3 className="font-bold text-lg mb-2">{deck.name}</h3>
              <p className="text-gray-500 mb-4">{deck.cards.length} cards</p>
              <div className="flex justify-between items-center">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedDeck(key)
                    setStudyMode(true)
                    resetStudy()
                  }}
                  className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
                >
                  Study Now
                </button>
                <span className="text-2xl">
                  {key === 'math' && '📐'}
                  {key === 'physics' && '⚛️'}
                  {key === 'chemistry' && '🧪'}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Preview Mode */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6">Preview: {currentDeck.name}</h2>
          
          {/* Card Display */}
          <div className="flex items-center justify-center mb-8" style={{ minHeight: '300px' }}>
            <div 
              className="relative w-full max-w-xl h-64 cursor-pointer"
              onClick={handleFlip}
            >
              <div className={`absolute inset-0 transition-opacity duration-300 ${!isFlipped ? 'opacity-100' : 'opacity-0'}`}>
                <div className="h-full bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl shadow-xl p-6 flex items-center justify-center">
                  <div className="text-white text-center">
                    <p className="text-sm mb-2 opacity-75">Front</p>
                    <h3 className="text-2xl font-bold">{currentDeck.cards[currentCard].front}</h3>
                  </div>
                </div>
              </div>
              
              <div className={`absolute inset-0 transition-opacity duration-300 ${isFlipped ? 'opacity-100' : 'opacity-0'}`}>
                <div className="h-full bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl shadow-xl p-6 flex items-center justify-center">
                  <div className="text-white text-center">
                    <p className="text-sm mb-2 opacity-75">Back</p>
                    <div className="text-lg whitespace-pre-line">{currentDeck.cards[currentCard].back}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentCard === 0}
              className={`px-6 py-2 rounded-lg ${
                currentCard === 0
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              ← Previous
            </button>
            
            <span className="text-gray-500">
              {currentCard + 1} / {currentDeck.cards.length}
            </span>
            
            <button
              onClick={handleNext}
              disabled={currentCard === currentDeck.cards.length - 1}
              className={`px-6 py-2 rounded-lg ${
                currentCard === currentDeck.cards.length - 1
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              Next →
            </button>
          </div>

          <div className="text-center mt-6">
            <button
              onClick={() => {
                setStudyMode(true)
                resetStudy()
              }}
              className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:shadow-lg transition"
            >
              Start Study Session
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}