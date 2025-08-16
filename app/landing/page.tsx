'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function LandingPage() {
  const [email, setEmail] = useState('')

  const features = [
    {
      icon: '🎓',
      title: 'Personalized Learning',
      description: 'AI adapts to your learning style and pace'
    },
    {
      icon: '📚',
      title: 'All Subjects',
      description: 'Math, Science, Languages, Programming, and more'
    },
    {
      icon: '🤖',
      title: '24/7 AI Tutor',
      description: 'Get instant help anytime, anywhere'
    },
    {
      icon: '📊',
      title: 'Progress Tracking',
      description: 'Monitor your improvement with detailed analytics'
    },
    {
      icon: '🎮',
      title: 'Gamified Learning',
      description: 'Earn XP, badges, and compete with friends'
    },
    {
      icon: '🎯',
      title: 'Exam Preparation',
      description: 'Targeted practice for tests and exams'
    }
  ]

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'High School Student',
      content: 'AI Tutor helped me improve my math grades from C to A in just 2 months!',
      avatar: '👧'
    },
    {
      name: 'David Kumar',
      role: 'University Student',
      content: 'The programming tutorials are amazing. I learned React in just 3 weeks!',
      avatar: '👨'
    },
    {
      name: 'Maria Garcia',
      role: 'Parent',
      content: 'My kids love the gamified learning. They actually enjoy studying now!',
      avatar: '👩'
    }
  ]

  const pricing = [
    {
      name: 'Free',
      price: '$0',
      features: [
        '5 questions per day',
        'Basic subjects',
        'Progress tracking',
        'Community support'
      ]
    },
    {
      name: 'Pro',
      price: '$9.99',
      popular: true,
      features: [
        'Unlimited questions',
        'All subjects',
        'Advanced analytics',
        'Priority support',
        'Download materials',
        'Custom study plans'
      ]
    },
    {
      name: 'Family',
      price: '$19.99',
      features: [
        'Everything in Pro',
        'Up to 5 accounts',
        'Parent dashboard',
        'Shared progress',
        'Family challenges',
        'Dedicated support'
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Navigation */}
      <nav className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <span className="text-3xl">🎓</span>
              <span className="text-xl font-bold">AI Tutor Platform</span>
            </div>
            <div className="flex items-center space-x-6">
              <Link href="#features" className="hover:text-blue-600">Features</Link>
              <Link href="#pricing" className="hover:text-blue-600">Pricing</Link>
              <Link href="#testimonials" className="hover:text-blue-600">Testimonials</Link>
              <Link 
                href="/dashboard" 
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Learn Anything, Anytime
            <br />
            With Your AI Tutor
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Personalized learning powered by advanced AI. Master any subject with adaptive lessons, 
            interactive exercises, and 24/7 tutoring support.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link 
              href="/dashboard"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg text-lg font-semibold hover:shadow-lg transform hover:scale-105 transition"
            >
              Start Learning Free
            </Link>
            <Link 
              href="/demo"
              className="px-8 py-4 bg-white dark:bg-gray-800 border-2 border-gray-300 rounded-lg text-lg font-semibold hover:shadow-lg"
            >
              Watch Demo
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div>
              <p className="text-3xl font-bold text-blue-600">50K+</p>
              <p className="text-gray-600">Active Students</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-purple-600">1M+</p>
              <p className="text-gray-600">Questions Answered</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-green-600">4.9/5</p>
              <p className="text-gray-600">User Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            Everything You Need to Excel
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                See AI Tutor in Action
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Our AI understands your questions, provides step-by-step explanations, 
                and adapts to your learning style.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  Instant answers to any question
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  Visual explanations with diagrams
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  Practice problems with solutions
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  Progress tracking and analytics
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-purple-100 dark:from-gray-800 dark:to-gray-700 rounded-xl p-8">
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-4">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="space-y-3">
                  <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg">
                    <p className="text-sm">You: "Explain the Pythagorean theorem"</p>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                    <p className="text-sm">AI: "The Pythagorean theorem states that in a right triangle, 
                    a² + b² = c², where c is the hypotenuse..."</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            What Students Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-3">{testimonial.avatar}</span>
                  <div>
                    <p className="font-bold">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 italic">"{testimonial.content}"</p>
                <div className="flex mt-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-500">⭐</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            Choose Your Plan
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricing.map((plan, idx) => (
              <div 
                key={idx} 
                className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 ${
                  plan.popular ? 'ring-4 ring-blue-500 transform scale-105' : ''
                }`}
              >
                {plan.popular && (
                  <div className="bg-blue-500 text-white text-sm px-3 py-1 rounded-full inline-block mb-4">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-4xl font-bold mb-6">
                  {plan.price}
                  <span className="text-lg text-gray-500">/month</span>
                </p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <span className="text-green-500 mr-3">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 rounded-lg font-semibold ${
                  plan.popular 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}>
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Transform Your Learning?
          </h2>
          <p className="text-xl mb-8">
            Join thousands of students achieving their academic goals with AI Tutor
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-6 py-3 rounded-lg text-gray-900 min-w-[300px]"
            />
            <button className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:shadow-lg">
              Start Free Trial
            </button>
          </div>
          <p className="mt-4 text-sm opacity-90">
            No credit card required • 7-day free trial
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-2xl">🎓</span>
              <span className="font-bold">AI Tutor Platform</span>
            </div>
            <p className="text-gray-400">
              Empowering students worldwide with AI-powered education
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Product</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/features" className="hover:text-white">Features</Link></li>
              <li><Link href="/pricing" className="hover:text-white">Pricing</Link></li>
              <li><Link href="/demo" className="hover:text-white">Demo</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/about" className="hover:text-white">About</Link></li>
              <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
              <li><Link href="/careers" className="hover:text-white">Careers</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/help" className="hover:text-white">Help Center</Link></li>
              <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
              <li><Link href="/privacy" className="hover:text-white">Privacy</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>© 2024 AI Tutor Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}