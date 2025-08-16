# AI Tutor Platform 🎓

> Personalized AI-powered tutoring platform with adaptive learning, real-time feedback, and comprehensive progress tracking.

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![AI Powered](https://img.shields.io/badge/AI-Powered-blue.svg)](https://github.com/pendtiumpraz/ai-tutor-platform)
[![Multi-API](https://img.shields.io/badge/API-Multi--Provider-orange.svg)](https://github.com/pendtiumpraz/ai-tutor-platform)

## 🌟 Features

### Core Capabilities
- **Adaptive Learning**: Personalized curriculum that adjusts to student pace and level
- **Multi-Subject Support**: Mathematics, Sciences, Languages, Programming, and more
- **Real-time Q&A**: Instant answers with step-by-step explanations
- **Progress Tracking**: Comprehensive analytics and performance metrics
- **Content Generation**: Auto-generate quizzes, flashcards, and study materials

### AI Integration
- **Gemini API**: Multimodal understanding and reasoning
- **GPT-4 API**: Creative explanations and content generation
- **Groq API**: Ultra-fast response times
- **DeepSeek API**: Technical and STEM specialization

### Additional Features
- 🎤 Text-to-Speech for audio lessons
- 🖼️ Image generation for visual learning
- 📊 Interactive charts and visualizations
- 📱 Mobile-responsive design
- 🌙 Dark/Light mode
- 🌍 Multi-language support

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ or Python 3.9+
- PostgreSQL 14+
- Redis 6+
- API Keys (Gemini, OpenAI, Groq, DeepSeek)

### Installation

```bash
# Clone the repository
git clone https://github.com/pendtiumpraz/ai-tutor-platform.git
cd ai-tutor-platform

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Edit .env with your API keys

# Setup database
npm run db:migrate

# Start development server
npm run dev
```

Visit `http://localhost:3000` to see the application.

## 🔧 Configuration

Create a `.env` file with the following variables:

```env
# AI APIs
GEMINI_API_KEY=your_key_here
OPENAI_API_KEY=your_key_here
GROQ_API_KEY=your_key_here
DEEPSEEK_API_KEY=your_key_here

# Database
DATABASE_URL=postgresql://user:pass@localhost:5432/ai_tutor
REDIS_URL=redis://localhost:6379

# Authentication
AUTH0_DOMAIN=your_domain.auth0.com
AUTH0_CLIENT_ID=your_client_id
AUTH0_CLIENT_SECRET=your_secret
```

## 📁 Project Structure

```
ai-tutor-platform/
├── src/
│   ├── api/              # API routes
│   ├── components/       # React components
│   ├── services/         # Business logic
│   ├── hooks/           # Custom hooks
│   └── utils/           # Utilities
├── public/              # Static assets
├── tests/               # Test files
├── docs/                # Documentation
└── scripts/             # Build scripts
```

## 🎯 Usage Examples

### Basic Question Answering

```javascript
// Ask a question
const response = await tutor.ask({
  question: "Explain photosynthesis",
  subject: "biology",
  level: "high-school"
});

// Get step-by-step solution
const solution = await tutor.solve({
  problem: "2x + 5 = 15",
  showSteps: true
});
```

### Generate Study Materials

```javascript
// Create flashcards
const flashcards = await tutor.generateFlashcards({
  topic: "World War II",
  count: 20,
  difficulty: "medium"
});

// Generate quiz
const quiz = await tutor.createQuiz({
  subject: "chemistry",
  topics: ["periodic table", "chemical bonds"],
  questions: 10
});
```

## 📊 API Documentation

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/ask` | Submit a question |
| GET | `/api/subjects` | List available subjects |
| POST | `/api/generate/quiz` | Generate a quiz |
| POST | `/api/generate/flashcards` | Create flashcards |
| GET | `/api/progress/:userId` | Get user progress |
| POST | `/api/learning-path` | Generate learning path |

### Example Request

```bash
curl -X POST https://api.ai-tutor.com/ask \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "question": "What is the Pythagorean theorem?",
    "subject": "mathematics",
    "level": "middle-school"
  }'
```

## 🧪 Testing

```bash
# Run unit tests
npm test

# Run integration tests
npm run test:integration

# Run E2E tests
npm run test:e2e

# Generate coverage report
npm run test:coverage
```

## 🚀 Deployment

### Using Docker

```bash
# Build Docker image
docker build -t ai-tutor-platform .

# Run with docker-compose
docker-compose up -d
```

### Manual Deployment

```bash
# Build for production
npm run build

# Start production server
npm start
```

## 📈 Roadmap

- [x] Basic Q&A functionality
- [x] Multi-API support
- [x] Progress tracking
- [x] Content generation
- [ ] Mobile app (React Native)
- [ ] Offline mode
- [ ] AR/VR features
- [ ] Voice interaction
- [ ] Collaborative learning
- [ ] AI model fine-tuning

See [ROADMAP.md](./ROADMAP.md) for detailed development timeline.

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](./CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 🙏 Acknowledgments

- OpenAI for GPT API
- Google for Gemini API
- Groq for inference API
- DeepSeek for specialized AI models
- All contributors and supporters

## 📞 Support

- **Documentation**: [Read the Docs](./docs)
- **Issues**: [GitHub Issues](https://github.com/pendtiumpraz/ai-tutor-platform/issues)
- **Email**: pendtiumpraz@gmail.com
- **Discord**: [Join our community](#)

## 🌟 Star History

[![Star History Chart](https://api.star-history.com/svg?repos=pendtiumpraz/ai-tutor-platform&type=Date)](https://star-history.com/#pendtiumpraz/ai-tutor-platform&Date)

---

**Built with ❤️ by [pendtiumpraz](https://github.com/pendtiumpraz)**

*Part of the [AI Applications Hub](https://github.com/pendtiumpraz) - 125+ AI solutions for every industry*