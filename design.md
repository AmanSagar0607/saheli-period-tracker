# Saheli - Period Tracker & Wellness: Design Document

## Overview
Saheli is a mobile period tracking application tailored for Indian girls. It combines cycle tracking, symptom logging, personalized health suggestions (including Ayurvedic and diet tips), and predictive insights that improve with daily data.

## Design Principles
- **Mobile-first**: Portrait orientation (9:16), optimized for one-handed usage
- **Cultural relevance**: Terminology and suggestions tailored for Indian audience
- **Privacy-focused**: All data stored locally by default
- **Growth-based**: Predictions improve as users log more data
- **Wellness-centric**: Holistic health including Ayurveda, nutrition, and mental wellness

---

## Screen List

### 1. **Onboarding Flow**
- **Welcome Screen**: Introduction to Saheli with key benefits
- **Cycle Info Screen**: User enters average cycle length and period duration
- **Last Period Screen**: User logs their last period start date
- **Preferences Screen**: Symptom tracking preferences, reminder settings

### 2. **Home Screen (Dashboard)**
- **Cycle Status Widget**: Current cycle day, days until next period, current phase
- **Quick Log Button**: Fast access to log today's symptoms
- **Today's Insights**: Wellness tip for today based on cycle phase
- **Upcoming Events**: Next period prediction, ovulation window
- **Navigation**: Tab bar to Calendar, Insights, Settings

### 3. **Log Period / Symptoms Screen**
- **Date Picker**: Select date for logging
- **Period Status**: Toggle "On Period" or "Not on Period"
- **Symptom Checklist**: Common symptoms (cramps, headache, mood changes, bloating, etc.)
- **Intensity Scale**: Rate intensity of period/symptoms (1-5)
- **Flow Level**: Light, Medium, Heavy (if on period)
- **Notes**: Free-text notes for additional observations
- **Save Button**: Store data locally

### 4. **Calendar View**
- **Monthly Calendar**: Visual representation of cycle phases
  - Red: Menstruation phase
  - Pink: Follicular phase
  - Orange: Ovulation phase
  - Purple: Luteal phase
- **Day Details**: Tap any day to see logged data
- **Legend**: Color coding explanation

### 5. **Insights Screen**
- **Cycle Statistics**: Average cycle length, period duration, regularity
- **Predictions**: Next period date, ovulation window, fertile window
- **Phase-based Suggestions**: Personalized tips for current/upcoming phase
  - Diet recommendations (Ayurvedic and modern)
  - Exercise suggestions
  - Wellness activities
  - Mental health tips
- **Symptom Trends**: Most common symptoms over time

### 6. **Settings Screen**
- **Profile**: Name, age, cycle preferences
- **Notifications**: Toggle reminders for period, ovulation, wellness tips
- **Symptom Preferences**: Customize symptom list
- **Data Management**: View/export data, reset app
- **About**: App version, privacy policy, contact support

---

## Primary Content and Functionality

### Home Screen
- **Cycle Day Counter**: "Day 5 of 28" with visual progress
- **Next Period Prediction**: "Your period is expected in 18 days"
- **Today's Phase**: "Menstrual Phase" with color indicator
- **Quick Actions**: "Log Today", "View Calendar", "Get Wellness Tip"
- **Daily Wellness Tip**: Contextual suggestion based on cycle phase

### Log Period Screen
- **Date Selection**: Defaults to today, can select past dates
- **Period Toggle**: Binary choice for period status
- **Symptom Checkboxes**: 
  - Cramps, Headache, Mood Changes, Bloating, Fatigue, Acne, Backache, Nausea, Breast Tenderness, Anxiety, Irritability
- **Intensity Rating**: 1-5 scale with visual feedback
- **Flow Level**: Dropdown (Light, Medium, Heavy)
- **Notes Field**: Optional text input

### Calendar View
- **Color-coded Cells**: Each day shows phase color
- **Logged Data Indicator**: Small dot on days with logged data
- **Tap Interaction**: View/edit data for any day
- **Month Navigation**: Swipe or arrows to change month

### Insights Screen
- **Statistics Cards**: 
  - Average Cycle Length
  - Average Period Duration
  - Regularity Score (%)
  - Prediction Accuracy
- **Prediction Cards**:
  - Next Period: Date + confidence
  - Ovulation Window: Date range
  - Fertile Window: Date range
- **Phase-based Recommendations**:
  - **Menstrual Phase**: Rest, iron-rich foods, gentle yoga
  - **Follicular Phase**: High energy workouts, light foods
  - **Ovulation Phase**: Social activities, protein-rich diet
  - **Luteal Phase**: Calming activities, magnesium-rich foods

---

## Key User Flows

### Flow 1: First-Time Setup
1. User opens app → Onboarding Welcome
2. Enters cycle information → Confirms
3. Logs last period date → Confirms
4. Sets preferences → Completes setup
5. Lands on Home screen with initial prediction

### Flow 2: Daily Logging
1. User taps "Log Today" on Home
2. Selects date (defaults to today)
3. Toggles period status
4. Selects symptoms from checklist
5. Rates intensity (1-5)
6. Adds optional notes
7. Taps "Save" → Returns to Home with updated data

### Flow 3: Viewing Insights
1. User taps "Insights" tab
2. Sees cycle statistics
3. Views predictions (next period, ovulation)
4. Reads phase-based wellness suggestions
5. Explores symptom trends

### Flow 4: Checking Calendar
1. User taps "Calendar" tab
2. Views color-coded month
3. Taps on a day to see logged data
4. Swipes to navigate months
5. Returns to Home

---

## Color Scheme

### Cycle Phase Colors
- **Menstrual Phase**: `#E74C3C` (Red) - Represents bleeding
- **Follicular Phase**: `#F8B4D6` (Light Pink) - Growth and energy
- **Ovulation Phase**: `#F39C12` (Orange) - Peak energy and fertility
- **Luteal Phase**: `#9B59B6` (Purple) - Introspection and preparation

### UI Colors
- **Primary**: `#E74C3C` (Warm Red - aligned with wellness theme)
- **Background**: `#FFFFFF` (Light) / `#1A1A1A` (Dark)
- **Surface**: `#F5F5F5` (Light) / `#2D2D2D` (Dark)
- **Foreground**: `#2C3E50` (Dark) / `#ECF0F1` (Light)
- **Muted**: `#7F8C8D` (Gray)
- **Success**: `#27AE60` (Green) - For confirmations
- **Warning**: `#F39C12` (Orange) - For alerts
- **Error**: `#E74C3C` (Red) - For errors

### Accent Elements
- **Wellness Tips**: Soft gradient using phase colors
- **Buttons**: Warm red with white text
- **Cards**: Subtle shadow with phase-color left border

---

## Typography & Spacing

### Font Sizes
- **Headings**: 28px (H1), 24px (H2), 20px (H3)
- **Body**: 16px (Regular), 14px (Secondary)
- **Labels**: 12px

### Spacing
- **Padding**: 16px (standard), 8px (compact), 24px (generous)
- **Gap**: 12px (between elements), 16px (between sections)
- **Border Radius**: 12px (cards), 8px (buttons), 24px (full-width buttons)

---

## Interaction Patterns

### Buttons
- **Primary**: Full-width, warm red background, white text, 48px height
- **Secondary**: Outlined, 44px height
- **Icon Buttons**: 40x40px, tap area 44x44px

### Inputs
- **Text Fields**: 44px height, 12px padding, subtle border
- **Toggles**: iOS-style switch
- **Sliders**: 1-5 rating with visual feedback

### Feedback
- **Success**: Green checkmark + "Saved" toast (2s)
- **Error**: Red alert + descriptive message
- **Loading**: Subtle spinner, no blocking overlay

---

## Data Model (Local Storage)

```typescript
interface PeriodEntry {
  date: string; // ISO date
  isOnPeriod: boolean;
  flowLevel?: 'light' | 'medium' | 'heavy';
  symptoms: string[]; // ['cramps', 'headache', ...]
  symptomIntensity: number; // 1-5
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

interface UserProfile {
  name: string;
  age: number;
  cycleLengthAverage: number; // days
  periodDurationAverage: number; // days
  lastPeriodStart: string; // ISO date
  notificationsEnabled: boolean;
  preferredSymptoms: string[];
}
```

---

## Accessibility Considerations
- **Color Contrast**: All text meets WCAG AA standards
- **Touch Targets**: Minimum 44x44px for interactive elements
- **Labels**: All inputs have associated labels
- **Haptic Feedback**: Subtle vibration on key actions
- **Dark Mode**: Full support with readable colors

---

## Performance & Storage
- **Local Storage**: AsyncStorage for all user data (no cloud sync by default)
- **Data Limit**: ~1000 entries (1-2 years of daily logs) fits comfortably
- **Offline**: Fully functional without internet
- **Sync**: Optional cloud backup (future feature)

---

## Next Steps for Implementation
1. Set up local storage schema
2. Build Onboarding flow
3. Implement Home screen with cycle calculations
4. Build Log Period screen
5. Create Calendar view with color coding
6. Develop Insights screen with predictions
7. Add Settings and customization
8. Integrate wellness suggestions engine
9. Polish UI and add animations
10. Test end-to-end flows
