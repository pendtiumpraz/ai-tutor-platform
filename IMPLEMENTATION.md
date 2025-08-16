# Implementation Guide
## AI Tutor Platform

### 🚀 Quick Start

```bash
# Clone repository
git clone https://github.com/pendtiumpraz/ai-tutor-platform.git
cd ai-tutor-platform

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env

# Run development server
npm run dev
```

### 📁 Project Structure

```
ai-tutor-platform/
├── src/
│   ├── api/              # API routes and controllers
│   ├── components/       # React components
│   ├── services/        # Business logic and AI services
│   ├── hooks/           # Custom React hooks
│   ├── utils/           # Helper functions
│   ├── types/           # TypeScript definitions
│   └── config/          # Configuration files
├── public/              # Static assets
├── tests/               # Test files
├── docs/                # Documentation
└── docker/              # Docker configurations
```

### 🔑 Environment Setup

Create `.env` file with:

```env
# AI API Keys
GEMINI_API_KEY=your_gemini_key
OPENAI_API_KEY=your_openai_key
GROQ_API_KEY=your_groq_key
DEEPSEEK_API_KEY=your_deepseek_key

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/ai_tutor
REDIS_URL=redis://localhost:6379

# Authentication
AUTH0_DOMAIN=your_domain.auth0.com
AUTH0_CLIENT_ID=your_client_id
AUTH0_CLIENT_SECRET=your_client_secret

# Storage
AWS_ACCESS_KEY_ID=your_aws_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
S3_BUCKET_NAME=ai-tutor-assets

# TTS & Image Generation
ELEVENLABS_API_KEY=your_elevenlabs_key
DALLE_API_KEY=your_dalle_key
```

### 💻 Core Implementation

#### 1. AI Service Manager (`src/services/ai-manager.js`)

```javascript
import { GoogleGenerativeAI } from '@google/generative-ai';
import OpenAI from 'openai';
import Groq from 'groq-sdk';
import { DeepSeekAPI } from 'deepseek';

class AIServiceManager {
  constructor() {
    this.gemini = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    this.openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    this.groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
    this.deepseek = new DeepSeekAPI(process.env.DEEPSEEK_API_KEY);
  }

  async generateResponse(prompt, options = {}) {
    const { provider = 'gemini', subject, difficulty } = options;
    
    try {
      switch(provider) {
        case 'gemini':
          return await this.geminiResponse(prompt, subject, difficulty);
        case 'gpt':
          return await this.gptResponse(prompt, subject, difficulty);
        case 'groq':
          return await this.groqResponse(prompt, subject, difficulty);
        case 'deepseek':
          return await this.deepseekResponse(prompt, subject, difficulty);
        default:
          throw new Error('Invalid provider');
      }
    } catch (error) {
      console.error(`Error with ${provider}:`, error);
      // Fallback to another provider
      return this.fallbackResponse(prompt, subject, difficulty);
    }
  }

  async geminiResponse(prompt, subject, difficulty) {
    const model = this.gemini.getGenerativeModel({ model: "gemini-pro" });
    const systemPrompt = this.buildSystemPrompt(subject, difficulty);
    const result = await model.generateContent(`${systemPrompt}\n\n${prompt}`);
    return result.response.text();
  }

  buildSystemPrompt(subject, difficulty) {
    return `You are an expert tutor in ${subject}. 
            Adapt your response for ${difficulty} level.
            Provide clear, step-by-step explanations.
            Use examples and analogies when helpful.`;
  }
}

export default AIServiceManager;
```

#### 2. Learning Path Generator (`src/services/learning-path.js`)

```javascript
class LearningPathGenerator {
  constructor(aiManager) {
    this.aiManager = aiManager;
  }

  async generatePath(studentProfile) {
    const { level, subject, weaknesses, goals } = studentProfile;
    
    const prompt = `
      Create a personalized learning path for:
      - Subject: ${subject}
      - Current Level: ${level}
      - Weak Areas: ${weaknesses.join(', ')}
      - Goals: ${goals}
      
      Provide a structured 4-week plan with daily topics and exercises.
    `;

    const path = await this.aiManager.generateResponse(prompt, {
      provider: 'gemini',
      subject,
      difficulty: level
    });

    return this.structurePath(path);
  }

  structurePath(rawPath) {
    // Parse and structure the AI response into weekly/daily format
    return {
      weeks: this.parseWeeks(rawPath),
      milestones: this.extractMilestones(rawPath),
      assessments: this.planAssessments(rawPath)
    };
  }
}
```

#### 3. Question Handler (`src/api/questions.js`)

```javascript
import express from 'express';
import AIServiceManager from '../services/ai-manager';
import { validateQuestion } from '../utils/validators';

const router = express.Router();
const aiManager = new AIServiceManager();

router.post('/ask', async (req, res) => {
  try {
    const { question, subject, userId, sessionId } = req.body;
    
    // Validate input
    const validation = validateQuestion(question);
    if (!validation.valid) {
      return res.status(400).json({ error: validation.error });
    }

    // Get user context
    const userContext = await getUserContext(userId, sessionId);
    
    // Generate response
    const response = await aiManager.generateResponse(question, {
      provider: userContext.preferredProvider || 'gemini',
      subject,
      difficulty: userContext.level
    });

    // Save to history
    await saveQuestionHistory(userId, question, response);

    // Generate follow-up suggestions
    const followUps = await generateFollowUps(question, response);

    res.json({
      answer: response,
      followUpQuestions: followUps,
      relatedTopics: await getRelatedTopics(subject, question)
    });

  } catch (error) {
    console.error('Question handling error:', error);
    res.status(500).json({ error: 'Failed to process question' });
  }
});
```

#### 4. Progress Tracker (`src/services/progress-tracker.js`)

```javascript
class ProgressTracker {
  constructor(database) {
    this.db = database;
  }

  async trackProgress(userId, activity) {
    const { type, subject, score, timeSpent, difficulty } = activity;
    
    // Calculate performance metrics
    const metrics = {
      accuracy: this.calculateAccuracy(score),
      speed: this.calculateSpeed(timeSpent, difficulty),
      mastery: await this.calculateMastery(userId, subject),
      streak: await this.updateStreak(userId)
    };

    // Store in database
    await this.db.progress.create({
      userId,
      ...activity,
      ...metrics,
      timestamp: new Date()
    });

    // Check for achievements
    const newAchievements = await this.checkAchievements(userId, metrics);
    
    return {
      metrics,
      achievements: newAchievements,
      recommendations: await this.generateRecommendations(userId, metrics)
    };
  }

  async generateReport(userId, period = '7d') {
    const data = await this.db.progress.findMany({
      where: { userId },
      orderBy: { timestamp: 'desc' }
    });

    return {
      summary: this.summarizeProgress(data),
      charts: this.generateCharts(data),
      insights: await this.generateInsights(data),
      nextSteps: await this.suggestNextSteps(userId, data)
    };
  }
}
```

#### 5. Content Generator (`src/services/content-generator.js`)

```javascript
class ContentGenerator {
  constructor(aiManager, imageGenerator) {
    this.aiManager = aiManager;
    this.imageGen = imageGenerator;
  }

  async generateStudyMaterial(topic, type, options = {}) {
    switch(type) {
      case 'summary':
        return this.generateSummary(topic, options);
      case 'flashcards':
        return this.generateFlashcards(topic, options);
      case 'quiz':
        return this.generateQuiz(topic, options);
      case 'mindmap':
        return this.generateMindMap(topic, options);
      case 'practice':
        return this.generatePracticeProblems(topic, options);
      default:
        throw new Error('Invalid content type');
    }
  }

  async generateFlashcards(topic, { count = 10, difficulty = 'medium' }) {
    const prompt = `
      Create ${count} flashcards for topic: ${topic}
      Difficulty: ${difficulty}
      Format: JSON array with 'front' and 'back' fields
      Include hints and mnemonics where applicable
    `;

    const response = await this.aiManager.generateResponse(prompt, {
      provider: 'gpt',
      subject: this.extractSubject(topic)
    });

    return JSON.parse(response);
  }

  async generateMindMap(topic, options) {
    const structure = await this.aiManager.generateResponse(
      `Create a hierarchical mind map structure for: ${topic}`,
      { provider: 'gemini' }
    );

    // Generate visual representation
    const visualization = await this.createD3Visualization(structure);
    
    // Optional: Generate image
    if (options.includeImage) {
      const image = await this.imageGen.generate(
        `Educational mind map diagram for ${topic}`
      );
      return { structure, visualization, image };
    }

    return { structure, visualization };
  }
}
```

### 🎨 Frontend Components

#### Main Tutor Interface (`src/components/TutorInterface.jsx`)

```jsx
import React, { useState, useEffect } from 'react';
import { useAI } from '../hooks/useAI';
import QuestionInput from './QuestionInput';
import ResponseDisplay from './ResponseDisplay';
import ProgressBar from './ProgressBar';

const TutorInterface = () => {
  const { askQuestion, loading, response } = useAI();
  const [subject, setSubject] = useState('mathematics');
  const [history, setHistory] = useState([]);

  const handleQuestion = async (question) => {
    const result = await askQuestion(question, { subject });
    setHistory([...history, { question, answer: result }]);
  };

  return (
    <div className="tutor-container">
      <div className="header">
        <SubjectSelector value={subject} onChange={setSubject} />
        <ProgressBar userId={currentUser.id} />
      </div>
      
      <div className="chat-area">
        <ChatHistory history={history} />
        <ResponseDisplay response={response} loading={loading} />
      </div>
      
      <QuestionInput 
        onSubmit={handleQuestion}
        suggestions={getSmartSuggestions(subject, history)}
      />
    </div>
  );
};
```

### 🗄️ Database Schema

```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  grade_level VARCHAR(50),
  learning_style VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Progress tracking
CREATE TABLE progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  subject VARCHAR(100),
  topic VARCHAR(255),
  score DECIMAL(5,2),
  time_spent INTEGER,
  difficulty VARCHAR(50),
  timestamp TIMESTAMP DEFAULT NOW()
);

-- Question history
CREATE TABLE question_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  question TEXT,
  answer TEXT,
  subject VARCHAR(100),
  helpful BOOLEAN,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Learning paths
CREATE TABLE learning_paths (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  subject VARCHAR(100),
  path_data JSONB,
  progress DECIMAL(5,2),
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 🚢 Deployment

#### Docker Configuration

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

#### docker-compose.yml

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    depends_on:
      - postgres
      - redis

  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: ai_tutor
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: secure_password
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  postgres_data:
```

### 🧪 Testing

```javascript
// tests/ai-service.test.js
import { describe, it, expect } from 'vitest';
import AIServiceManager from '../src/services/ai-manager';

describe('AI Service Manager', () => {
  it('should generate response from Gemini', async () => {
    const manager = new AIServiceManager();
    const response = await manager.generateResponse(
      'Explain photosynthesis',
      { provider: 'gemini', subject: 'biology' }
    );
    expect(response).toBeTruthy();
    expect(response).toContain('light');
  });

  it('should fallback when primary provider fails', async () => {
    // Test fallback mechanism
  });
});
```

### 📊 Monitoring & Analytics

```javascript
// src/utils/analytics.js
import * as Sentry from '@sentry/node';
import { Analytics } from '@segment/analytics-node';

const analytics = new Analytics({ 
  writeKey: process.env.SEGMENT_WRITE_KEY 
});

export const trackEvent = (userId, event, properties) => {
  analytics.track({
    userId,
    event,
    properties,
    timestamp: new Date()
  });
};

export const trackError = (error, context) => {
  Sentry.captureException(error, { extra: context });
};
```

### 🔄 CI/CD Pipeline

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - run: npm ci
      - run: npm test
      - run: npm run build
      
      - name: Deploy to AWS
        env:
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        run: |
          npm run deploy:production
```

### 📝 API Documentation

Full API documentation available at `/api/docs` when running the application.

### 🆘 Troubleshooting

Common issues and solutions available in [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)