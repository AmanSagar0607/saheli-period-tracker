# 💜 Saheli - Period Tracker & Wellness Companion

**Saheli** is a comprehensive, culturally-aware period tracking and wellness app designed specifically for Indian girls and women. Built with cutting-edge technology and grounded in Ayurvedic principles, Saheli helps users understand their menstrual cycles, track symptoms, and receive personalized wellness recommendations tailored to their body's natural rhythms.

> **Saheli** (सहेली) means "female friend" in Hindi - we're here to be your trusted companion on your wellness journey.

---

## ✨ Features

### 📊 **Intelligent Cycle Tracking**
- Track your period with daily logging of symptoms, flow intensity, and mood
- Automatic cycle phase detection (Menstrual, Follicular, Ovulation, Luteal)
- Predictive algorithms to forecast your next period and ovulation window
- Visual calendar with color-coded cycle phases

### 🎯 **Personalized Wellness Recommendations**
- **Ayurveda-Based Suggestions** - Phase-specific recommendations grounded in traditional Indian wellness practices
- **Nutrition Guidance** - Indian diet recommendations tailored to each cycle phase (iron-rich foods during menstruation, light foods during follicular phase)
- **Exercise Recommendations** - Phase-aware workout suggestions (rest days during menstruation, intense workouts during follicular phase)
- **Mental Wellness Tips** - Stress management and meditation guidance for emotional well-being

### 📚 **Educational Glossary**
- **Simple Explanations** - Medical and scientific terms explained in easy-to-understand language
- **Hindi & Hinglish Support** - Complete translations for Indian audience
- **Interactive Learning** - Tap any term to learn more about menstrual health and cycle science

### 🔐 **Privacy & Security**
- **Google Sign-In Authentication** - Secure login with encrypted session management
- **User-Scoped Data** - All data is associated with authenticated user accounts
- **End-to-End Encryption** - Your sensitive health data is encrypted and stored securely
- **No External Logging** - Your data is never shared with third parties

### 🌍 **Culturally Relevant**
- Designed for Indian audience with culturally appropriate recommendations
- Supports multiple languages (English, Hindi, Hinglish)
- Respects cultural sensitivities around menstruation
- Incorporates traditional wellness practices (Ayurveda, yoga, meditation)

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and pnpm
- Expo CLI
- iOS or Android device/emulator
- Google account for authentication

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/AmanSagar0607/saheli-period-tracker.git
   cd saheli-period-tracker
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL=your_database_url
   OAUTH_SERVER_URL=https://api.manus.im
   ```

4. **Start the development server:**
   ```bash
   pnpm dev
   ```

5. **Run on mobile:**
   - **iOS:** `pnpm ios`
   - **Android:** `pnpm android`
   - **Web:** `pnpm web`

---

## 📱 App Structure

### Navigation (5-Tab Bottom Bar)
- **🏠 Home** - Dashboard with cycle status, upcoming events, and daily wellness tip
- **📝 Track** - Quick logging of period data and symptoms
- **📊 Insights** - Cycle statistics, predictions, and trend analysis
- **👤 Profile** - User information, settings, and preferences
- **📚 Learn** - Educational glossary and health information

### Key Screens

| Screen | Purpose |
|--------|---------|
| **Login** | Google Sign-In for secure authentication |
| **Onboarding** | Initial setup - cycle length, period duration, last period date |
| **Home** | Dashboard showing current cycle phase and upcoming events |
| **Log Period** | Daily symptom tracking with pain, mood, and flow logging |
| **Calendar** | Visual monthly calendar with color-coded cycle phases |
| **Insights** | Statistics, predictions, and cycle analysis |
| **Learn** | Interactive glossary with Hindi/Hinglish translations |
| **Profile** | User settings and preferences |

---

## 🛠️ Tech Stack

### Frontend
- **React Native** 0.81 with Expo SDK 54
- **TypeScript** 5.9 for type safety
- **NativeWind** 4 (Tailwind CSS for React Native)
- **Expo Router** 6 for navigation
- **React Native Reanimated** 4 for smooth animations
- **TanStack React Query** for server state management

### Backend
- **Node.js** with Express
- **tRPC** for type-safe API communication
- **Drizzle ORM** for database operations
- **MySQL** database for data persistence
- **OAuth 2.0** for secure authentication

### Development Tools
- **Vitest** for unit testing
- **ESLint** for code quality
- **Prettier** for code formatting
- **Drizzle Kit** for database migrations

---

## 📊 Database Schema

### Users Table
Stores authenticated user information with OAuth integration.

### User Profiles Table
Stores user preferences and cycle information:
- Age
- Average cycle length (default: 28 days)
- Average period duration (default: 5 days)
- Last period start date
- Notification preferences
- Onboarding completion status

### Period Entries Table
Stores daily period tracking data:
- Date (ISO format)
- Period status (is it a period day?)
- Flow level (Light, Medium, Heavy)
- Symptoms (JSON array)
- Pain intensity (1-5 scale)
- Mood (Happy, Sad, Angry, Anxious, Neutral)
- Energy level (Low, Medium, High)
- Notes

---

## 🔐 Authentication

Saheli uses **Google OAuth 2.0** for secure authentication:

1. User clicks "Sign in with Google" on login screen
2. Redirected to Google OAuth consent screen
3. Upon approval, user is authenticated and session is created
4. Session token stored securely (SecureStore on native, cookies on web)
5. All subsequent requests include authentication headers
6. User data is scoped to authenticated account

---

## 🧠 Cycle Calculation Logic

### Cycle Phases
- **Menstrual Phase** (Days 1-5): Period bleeding
- **Follicular Phase** (Days 6-14): Estrogen rises, energy increases
- **Ovulation Phase** (Days 15-17): Peak fertility window
- **Luteal Phase** (Days 18-28): Progesterone rises, energy decreases

### Predictions
- Next period predicted based on average cycle length
- Ovulation window calculated as days 12-16 of cycle
- Predictions improve with more logged data

---

## 💡 Wellness Recommendations

### Ayurveda-Based Suggestions
Recommendations are tailored to each cycle phase:

**Menstrual Phase:**
- Rest and gentle movement
- Warm foods and spices
- Iron-rich Indian foods (spinach, dates, jaggery)
- Meditation and self-care

**Follicular Phase:**
- Increased physical activity
- Light, fresh foods
- Social activities
- Creative pursuits

**Ovulation Phase:**
- Peak energy - intense workouts
- Protein-rich foods
- Social engagement
- Confidence-building activities

**Luteal Phase:**
- Slower, restorative exercise
- Warm, nourishing foods
- Introspection and planning
- Stress management

---

## 🌐 Language Support

| Language | Status | Coverage |
|----------|--------|----------|
| English | ✅ Complete | Full app |
| Hindi | ✅ Complete | Glossary, key terms |
| Hinglish | ✅ Complete | Glossary, recommendations |

---

## 📖 Glossary Terms

The app includes 9+ key terms with simple explanations:

- **Menstruation** - Monthly bleeding from the uterus
- **Cycle** - Monthly pattern of hormonal changes
- **Ovulation** - Release of egg from ovary
- **PCOS** - Polycystic Ovary Syndrome
- **Dysmenorrhea** - Painful periods
- **Ayurveda** - Traditional Indian medicine system
- **Dosha** - Body constitution in Ayurveda
- **Follicular Phase** - First half of cycle
- **Luteal Phase** - Second half of cycle

Each term includes scientific explanation, Hindi translation, and practical health tips.

---

## 🧪 Testing

Run tests with:
```bash
pnpm test
```

Run tests in watch mode:
```bash
pnpm test:watch
```

---

## 📦 Building for Production

### iOS
```bash
eas build --platform ios
```

### Android
```bash
eas build --platform android
```

### Web
```bash
pnpm build
```

---

## 🤝 Contributing

We welcome contributions! Here's how to help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow the existing code style
- Write tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting PR

---

## 📋 Roadmap

### Phase 1: Core Features ✅
- [x] Period tracking and logging
- [x] Cycle prediction
- [x] Wellness recommendations
- [x] Educational glossary
- [x] Google authentication

### Phase 2: Advanced Features 🚀
- [ ] Daily health check-ins with smart alerts
- [ ] Push notifications for reminders
- [ ] Symptom trend analysis
- [ ] Dosha-based personalization
- [ ] Mental health tracking

### Phase 3: Community & Integration 🔮
- [ ] Community features and support groups
- [ ] Integration with health apps
- [ ] Doctor consultation booking
- [ ] Wearable device integration
- [ ] Export and sharing features

---

## 🐛 Known Issues & Limitations

- Authentication requires internet connection
- Database sync requires active backend connection
- Calendar view optimized for portrait orientation
- Predictions improve with 3+ months of data

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🙏 Acknowledgments

- Built with ❤️ for Indian girls and women
- Inspired by Ayurvedic wellness principles
- Research-backed health recommendations
- Community feedback and support

---

## 📞 Support & Contact

For questions, suggestions, or bug reports:

- **GitHub Issues:** [Report a bug](https://github.com/AmanSagar0607/saheli-period-tracker/issues)
- **Email:** support@saheli.app
- **Twitter:** [@SaheliApp](https://twitter.com/SaheliApp)

---

## 🌟 Made with Love

Saheli is built with a mission to empower Indian girls and women with knowledge about their bodies and health. We believe every person deserves access to personalized, culturally-relevant health information.

**Your health, your data, your choice. 💜**

---

**Last Updated:** June 14, 2026
**Version:** 1.0.0
