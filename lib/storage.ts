import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Data models for Saheli Period Tracker
 */

export interface PeriodEntry {
  date: string; // ISO date string (YYYY-MM-DD)
  isOnPeriod: boolean;
  flowLevel?: "light" | "medium" | "heavy";
  symptoms: string[];
  symptomIntensity: number; // 1-5
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile {
  name: string;
  age: number;
  cycleLengthAverage: number; // days
  periodDurationAverage: number; // days
  lastPeriodStart: string; // ISO date
  notificationsEnabled: boolean;
  preferredSymptoms: string[];
  onboardingCompleted: boolean;
}

export interface CyclePhase {
  name: "menstrual" | "follicular" | "ovulation" | "luteal";
  color: string;
  startDay: number;
  endDay: number;
}

/**
 * Default user profile for new users
 */
const DEFAULT_PROFILE: UserProfile = {
  name: "",
  age: 0,
  cycleLengthAverage: 28,
  periodDurationAverage: 5,
  lastPeriodStart: new Date().toISOString().split("T")[0],
  notificationsEnabled: true,
  preferredSymptoms: [
    "cramps",
    "headache",
    "mood_changes",
    "bloating",
    "fatigue",
    "acne",
    "backache",
    "nausea",
    "breast_tenderness",
    "anxiety",
    "irritability",
  ],
  onboardingCompleted: false,
};

/**
 * Storage keys
 */
const STORAGE_KEYS = {
  USER_PROFILE: "@saheli_user_profile",
  PERIOD_ENTRIES: "@saheli_period_entries",
  CYCLE_PREDICTIONS: "@saheli_cycle_predictions",
};

/**
 * Get user profile from storage
 */
export async function getUserProfile(): Promise<UserProfile> {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.USER_PROFILE);
    return data ? JSON.parse(data) : DEFAULT_PROFILE;
  } catch (error) {
    console.error("Error reading user profile:", error);
    return DEFAULT_PROFILE;
  }
}

/**
 * Save user profile to storage
 */
export async function saveUserProfile(profile: UserProfile): Promise<void> {
  try {
    await AsyncStorage.setItem(
      STORAGE_KEYS.USER_PROFILE,
      JSON.stringify(profile)
    );
  } catch (error) {
    console.error("Error saving user profile:", error);
    throw error;
  }
}

/**
 * Get all period entries from storage
 */
export async function getPeriodEntries(): Promise<PeriodEntry[]> {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.PERIOD_ENTRIES);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error reading period entries:", error);
    return [];
  }
}

/**
 * Save a single period entry
 */
export async function savePeriodEntry(entry: PeriodEntry): Promise<void> {
  try {
    const entries = await getPeriodEntries();
    const existingIndex = entries.findIndex((e) => e.date === entry.date);

    if (existingIndex >= 0) {
      entries[existingIndex] = entry;
    } else {
      entries.push(entry);
    }

    // Sort by date
    entries.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    await AsyncStorage.setItem(
      STORAGE_KEYS.PERIOD_ENTRIES,
      JSON.stringify(entries)
    );
  } catch (error) {
    console.error("Error saving period entry:", error);
    throw error;
  }
}

/**
 * Get period entry for a specific date
 */
export async function getPeriodEntry(date: string): Promise<PeriodEntry | null> {
  try {
    const entries = await getPeriodEntries();
    return entries.find((e) => e.date === date) || null;
  } catch (error) {
    console.error("Error reading period entry:", error);
    return null;
  }
}

/**
 * Delete a period entry
 */
export async function deletePeriodEntry(date: string): Promise<void> {
  try {
    const entries = await getPeriodEntries();
    const filtered = entries.filter((e) => e.date !== date);
    await AsyncStorage.setItem(
      STORAGE_KEYS.PERIOD_ENTRIES,
      JSON.stringify(filtered)
    );
  } catch (error) {
    console.error("Error deleting period entry:", error);
    throw error;
  }
}

/**
 * Clear all data (for reset/logout)
 */
export async function clearAllData(): Promise<void> {
  try {
    await AsyncStorage.multiRemove(Object.values(STORAGE_KEYS));
  } catch (error) {
    console.error("Error clearing all data:", error);
    throw error;
  }
}

/**
 * Export data as JSON string
 */
export async function exportData(): Promise<string> {
  try {
    const profile = await getUserProfile();
    const entries = await getPeriodEntries();

    const exportData = {
      profile,
      entries,
      exportDate: new Date().toISOString(),
    };

    return JSON.stringify(exportData, null, 2);
  } catch (error) {
    console.error("Error exporting data:", error);
    throw error;
  }
}
