import React, { createContext, useContext, useReducer, useEffect, ReactNode } from "react";
import {
  getUserProfile,
  saveUserProfile,
  getPeriodEntries,
  savePeriodEntry,
  PeriodEntry,
  UserProfile,
} from "./storage";
import { calculateCycleInfo, CycleInfo } from "./cycle-utils";

/**
 * Cycle Context - Manages global cycle data and user profile
 */

interface CycleContextType {
  profile: UserProfile | null;
  entries: PeriodEntry[];
  cycleInfo: CycleInfo | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  updateProfile: (profile: Partial<UserProfile>) => Promise<void>;
  addPeriodEntry: (entry: PeriodEntry) => Promise<void>;
  updatePeriodEntry: (entry: PeriodEntry) => Promise<void>;
  refreshData: () => Promise<void>;
}

const CycleContext = createContext<CycleContextType | undefined>(undefined);

type CycleAction =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "SET_PROFILE"; payload: UserProfile }
  | { type: "SET_ENTRIES"; payload: PeriodEntry[] }
  | { type: "SET_CYCLE_INFO"; payload: CycleInfo };

interface CycleState {
  profile: UserProfile | null;
  entries: PeriodEntry[];
  cycleInfo: CycleInfo | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: CycleState = {
  profile: null,
  entries: [],
  cycleInfo: null,
  isLoading: true,
  error: null,
};

function cycleReducer(state: CycleState, action: CycleAction): CycleState {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "SET_PROFILE":
      return { ...state, profile: action.payload };
    case "SET_ENTRIES":
      return { ...state, entries: action.payload };
    case "SET_CYCLE_INFO":
      return { ...state, cycleInfo: action.payload };
    default:
      return state;
  }
}

/**
 * Cycle Provider Component
 */
export function CycleProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cycleReducer, initialState);

  // Load initial data
  useEffect(() => {
    loadData();
  }, []);

  // Recalculate cycle info when profile or entries change
  useEffect(() => {
    if (state.profile) {
      const cycleInfo = calculateCycleInfo(
        state.profile.lastPeriodStart,
        state.profile.cycleLengthAverage,
        state.profile.periodDurationAverage
      );
      dispatch({ type: "SET_CYCLE_INFO", payload: cycleInfo });
    }
  }, [state.profile, state.entries]);

  async function loadData() {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      const profile = await getUserProfile();
      const entries = await getPeriodEntries();

      dispatch({ type: "SET_PROFILE", payload: profile });
      dispatch({ type: "SET_ENTRIES", payload: entries });
      dispatch({ type: "SET_ERROR", payload: null });
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: error instanceof Error ? error.message : "Failed to load data",
      });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }

  async function updateProfile(updates: Partial<UserProfile>) {
    try {
      if (!state.profile) throw new Error("Profile not loaded");

      const updatedProfile = { ...state.profile, ...updates };
      await saveUserProfile(updatedProfile);
      dispatch({ type: "SET_PROFILE", payload: updatedProfile });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to update profile";
      dispatch({ type: "SET_ERROR", payload: message });
      throw error;
    }
  }

  async function addPeriodEntry(entry: PeriodEntry) {
    try {
      await savePeriodEntry(entry);
      const entries = await getPeriodEntries();
      dispatch({ type: "SET_ENTRIES", payload: entries });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to save entry";
      dispatch({ type: "SET_ERROR", payload: message });
      throw error;
    }
  }

  async function updatePeriodEntry(entry: PeriodEntry) {
    try {
      await savePeriodEntry(entry);
      const entries = await getPeriodEntries();
      dispatch({ type: "SET_ENTRIES", payload: entries });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to update entry";
      dispatch({ type: "SET_ERROR", payload: message });
      throw error;
    }
  }

  async function refreshData() {
    await loadData();
  }

  const value: CycleContextType = {
    profile: state.profile,
    entries: state.entries,
    cycleInfo: state.cycleInfo,
    isLoading: state.isLoading,
    error: state.error,
    updateProfile,
    addPeriodEntry,
    updatePeriodEntry,
    refreshData,
  };

  return (
    <CycleContext.Provider value={value}>
      {children}
    </CycleContext.Provider>
  );
}

/**
 * Hook to use Cycle Context
 */
export function useCycle(): CycleContextType {
  const context = useContext(CycleContext);
  if (!context) {
    throw new Error("useCycle must be used within CycleProvider");
  }
  return context;
}
