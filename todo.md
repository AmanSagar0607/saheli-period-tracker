# Saheli - Period Tracker & Wellness: Project TODO

## Phase 1: Core Infrastructure & Setup
- [x] Generate custom app logo and update branding
- [x] Configure app name and theme colors in app.config.ts
- [x] Set up local storage schema (AsyncStorage)
- [x] Create data types and interfaces for period entries and user profile
- [x] Set up state management (Context + useReducer)

## Phase 2: Onboarding Flow
- [x] Build Welcome screen
- [x] Build Cycle Info screen (cycle length, period duration input)
- [x] Build Last Period screen (date picker)
- [x] Build Preferences screen (symptom preferences, notifications)
- [x] Implement onboarding completion and data persistence
- [x] Create onboarding navigation flow

## Phase 3: Home Screen (Dashboard)
- [x] Build cycle calculation engine (current day, next period prediction)
- [x] Create cycle phase detection logic
- [x] Build Home screen layout with cycle status widget
- [x] Implement "Quick Log" button
- [x] Add today's wellness tip display
- [x] Display upcoming events (next period, ovulation window)
- [x] Set up tab bar navigation (Home, Calendar, Insights, Settings)

## Phase 4: Log Period & Symptoms
- [x] Build Log Period screen with date picker
- [x] Implement period status toggle
- [x] Create symptom checklist component
- [x] Add intensity rating (1-5 scale)
- [x] Add flow level selector (Light, Medium, Heavy)
- [x] Implement notes field
- [x] Add save functionality with local storage
- [x] Create data validation

## Phase 5: Calendar View
- [x] Build monthly calendar component
- [x] Implement color coding for cycle phases
- [x] Add day detail view (tap to see logged data)
- [x] Implement month navigation (swipe/arrows)
- [x] Add legend for color meanings
- [x] Display logged data indicators on calendar

## Phase 6: Insights & Predictions
- [x] Build cycle statistics calculator
- [x] Implement prediction algorithm (next period, ovulation, fertile window)
- [x] Create statistics cards (avg cycle length, period duration, regularity)
- [x] Build phase-based suggestions engine
- [x] Implement Ayurvedic wellness tips
- [x] Add diet recommendations
- [x] Create symptom trend analysis
- [x] Build insights screen layout

## Phase 7: Wellness Suggestions Engine
- [x] Create Ayurvedic phase-based recommendations
- [x] Build diet suggestion database (Indian foods)
- [x] Implement exercise recommendations
- [x] Add mental wellness tips
- [x] Create notification content for reminders
- [x] Implement suggestion randomization (avoid repetition)

## Phase 8: Settings & Customization
- [x] Build Settings screen layout (Profile tab)
- [x] Implement profile editing
- [x] Add notification toggle and scheduling
- [ ] Create symptom preference customization
- [ ] Implement data export functionality
- [ ] Add app reset/clear data option
- [ ] Add about and support information

## Phase 8.5: Navigation & UI Enhancement
- [x] Add bottom navbar with 5 tabs (Home, Track, Insights, Profile, Learn)
- [x] Create Track tab for quick logging
- [x] Create Profile tab with user information
- [x] Create Knowledge/Learn tab with glossary
- [x] Add icon mappings for all tabs
- [x] Implement tab navigation and routing

## Phase 9: Polish & Refinement
- [x] Add loading states
- [x] Implement error handling and user feedback
- [x] Add haptic feedback for key interactions
- [ ] Create smooth transitions between screens
- [ ] Test dark mode compatibility
- [ ] Optimize performance
- [ ] Add accessibility features

## Phase 10: Testing & Delivery
- [ ] Test all user flows end-to-end
- [ ] Verify data persistence across app restarts
- [ ] Test on multiple screen sizes
- [ ] Validate predictions accuracy
- [ ] Check for data privacy (no external logging)
- [ ] Create checkpoint for delivery
- [ ] Prepare app for publication


## Phase 11: Autonomous Health Checks & Smart Alerts (Research-Based)
- [ ] Build daily health check-in screen with personalized questions
- [ ] Implement smart alert system based on check-in responses
- [ ] Add symptom severity tracking with pattern detection
- [ ] Create alerts for abnormal patterns (irregular cycles, increasing pain)
- [ ] Implement PCOS risk assessment based on cycle data
- [ ] Add "see a doctor" recommendations when patterns suggest disorders

## Phase 12: Intelligent Wellness Reminders
- [ ] Implement smart hydration reminders (phase-aware frequency)
- [ ] Create nutrition alerts based on phase and symptoms
- [ ] Build exercise recommendations (rest vs. intense by phase)
- [ ] Add posture reminders during heavy flow days
- [ ] Implement sleep optimization tips by phase
- [ ] Create stress management and meditation suggestions

## Phase 13: Mental Health Integration
- [ ] Add mood tracking tied to cycle phases
- [ ] Implement PMS/PMDD symptom monitoring
- [ ] Create anxiety/depression alerts during high-risk phases
- [ ] Build phase-aware meditation and mindfulness recommendations
- [ ] Add mental health resources and when to seek help

## Phase 14: Ayurveda-Based Personalization
- [ ] Add dosha assessment quiz (Vata, Pitta, Kapha)
- [ ] Create dosha-specific recommendations
- [ ] Implement phase-specific Ayurvedic herbs and spices
- [ ] Add seasonal adjustments to recommendations
- [ ] Build traditional Indian wellness practice integration

## Phase 15: Health Monitoring & Early Detection
- [ ] Implement dysmenorrhea severity tracking
- [ ] Create pain management tips based on severity
- [ ] Add irregular cycle detection algorithm
- [ ] Build PCOS risk scoring system
- [ ] Implement doctor visit reminders and health checkup tracking
