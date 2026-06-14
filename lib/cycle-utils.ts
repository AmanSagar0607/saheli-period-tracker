/**
 * Cycle calculation utilities for Saheli Period Tracker
 * Handles cycle phase detection, predictions, and fertility window calculations
 */

export interface CycleInfo {
  currentDay: number; // 1-based day in current cycle
  currentPhase: "menstrual" | "follicular" | "ovulation" | "luteal";
  phaseColor: string;
  daysUntilNextPeriod: number;
  nextPeriodDate: string;
  ovulationDate: string;
  fertileWindowStart: string;
  fertileWindowEnd: string;
  cycleLength: number;
  periodDuration: number;
}

export interface CyclePhaseInfo {
  name: "menstrual" | "follicular" | "ovulation" | "luteal";
  displayName: string;
  color: string;
  startDay: number;
  endDay: number;
  description: string;
}

/**
 * Cycle phase definitions (approximate, based on 28-day cycle)
 * These are proportional and will be adjusted based on actual cycle length
 */
const CYCLE_PHASES: Record<string, CyclePhaseInfo> = {
  menstrual: {
    name: "menstrual",
    displayName: "Menstrual Phase",
    color: "#E74C3C",
    startDay: 1,
    endDay: 5,
    description: "Bleeding phase - Rest and recovery",
  },
  follicular: {
    name: "follicular",
    displayName: "Follicular Phase",
    color: "#F8B4D6",
    startDay: 6,
    endDay: 12,
    description: "Rising energy - Growth phase",
  },
  ovulation: {
    name: "ovulation",
    displayName: "Ovulation Phase",
    color: "#F39C12",
    startDay: 13,
    endDay: 15,
    description: "Peak energy and fertility",
  },
  luteal: {
    name: "luteal",
    displayName: "Luteal Phase",
    color: "#9B59B6",
    startDay: 16,
    endDay: 28,
    description: "Preparation for next cycle",
  },
};

/**
 * Calculate days between two dates
 */
export function daysBetween(date1: string, date2: string): number {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diffTime = Math.abs(d2.getTime() - d1.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

/**
 * Add days to a date
 */
export function addDays(date: string, days: number): string {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
}

/**
 * Get today's date in ISO format
 */
export function getTodayISO(): string {
  return new Date().toISOString().split("T")[0];
}

/**
 * Determine cycle phase based on day in cycle
 */
function getPhaseForDay(
  dayInCycle: number,
  cycleLength: number
): CyclePhaseInfo {
  // Proportionally adjust phase boundaries based on cycle length
  const menstrualEnd = Math.round((5 / 28) * cycleLength);
  const follicularEnd = Math.round((12 / 28) * cycleLength);
  const ovulationEnd = Math.round((15 / 28) * cycleLength);

  if (dayInCycle <= menstrualEnd) {
    return CYCLE_PHASES.menstrual;
  } else if (dayInCycle <= follicularEnd) {
    return CYCLE_PHASES.follicular;
  } else if (dayInCycle <= ovulationEnd) {
    return CYCLE_PHASES.ovulation;
  } else {
    return CYCLE_PHASES.luteal;
  }
}

/**
 * Calculate complete cycle information
 */
export function calculateCycleInfo(
  lastPeriodStart: string,
  cycleLength: number = 28,
  periodDuration: number = 5
): CycleInfo {
  const today = getTodayISO();
  const daysSinceLastPeriod = daysBetween(lastPeriodStart, today);

  // Calculate current day in cycle (1-based)
  const currentDay = (daysSinceLastPeriod % cycleLength) + 1;

  // Calculate next period date
  const nextPeriodDate = addDays(lastPeriodStart, cycleLength);
  const daysUntilNextPeriod = daysBetween(today, nextPeriodDate);

  // Calculate ovulation date (typically day 14 for 28-day cycle)
  const ovulationDay = Math.round((14 / 28) * cycleLength);
  const ovulationDate = addDays(lastPeriodStart, ovulationDay - 1);

  // Calculate fertile window (typically 5 days before ovulation to ovulation day)
  const fertileWindowStart = addDays(lastPeriodStart, ovulationDay - 6);
  const fertileWindowEnd = ovulationDate;

  // Get current phase
  const currentPhase = getPhaseForDay(currentDay, cycleLength);

  return {
    currentDay,
    currentPhase: currentPhase.name,
    phaseColor: currentPhase.color,
    daysUntilNextPeriod,
    nextPeriodDate,
    ovulationDate,
    fertileWindowStart,
    fertileWindowEnd,
    cycleLength,
    periodDuration,
  };
}

/**
 * Get phase information for a specific date
 */
export function getPhaseForDate(
  date: string,
  lastPeriodStart: string,
  cycleLength: number = 28
): CyclePhaseInfo {
  const daysSinceLastPeriod = daysBetween(lastPeriodStart, date);
  const dayInCycle = (daysSinceLastPeriod % cycleLength) + 1;
  return getPhaseForDay(dayInCycle, cycleLength);
}

/**
 * Get all cycle phases with their date ranges for a given month
 */
export function getCyclePhasesForMonth(
  year: number,
  month: number,
  lastPeriodStart: string,
  cycleLength: number = 28
): Array<{ date: string; phase: CyclePhaseInfo }> {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const result: Array<{ date: string; phase: CyclePhaseInfo }> = [];

  for (let day = 1; day <= daysInMonth; day++) {
    const date = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const phase = getPhaseForDate(date, lastPeriodStart, cycleLength);
    result.push({ date, phase });
  }

  return result;
}

/**
 * Calculate cycle statistics from period entries
 */
export interface CycleStatistics {
  averageCycleLength: number;
  averagePeriodDuration: number;
  regularityScore: number; // 0-100
  totalCycles: number;
  lastPeriodStart: string;
}

export function calculateCycleStatistics(
  periodEntries: Array<{ date: string; isOnPeriod: boolean }>,
  lastKnownPeriodStart: string
): CycleStatistics {
  if (periodEntries.length === 0) {
    return {
      averageCycleLength: 28,
      averagePeriodDuration: 5,
      regularityScore: 0,
      totalCycles: 0,
      lastPeriodStart: lastKnownPeriodStart,
    };
  }

  // Find all period starts (transitions from not on period to on period)
  const periodStarts: string[] = [];
  let previousWasOnPeriod = false;

  const sortedEntries = [...periodEntries].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  for (const entry of sortedEntries) {
    if (entry.isOnPeriod && !previousWasOnPeriod) {
      periodStarts.push(entry.date);
    }
    previousWasOnPeriod = entry.isOnPeriod;
  }

  // Calculate cycle lengths between period starts
  const cycleLengths: number[] = [];
  for (let i = 1; i < periodStarts.length; i++) {
    const length = daysBetween(periodStarts[i - 1], periodStarts[i]);
    cycleLengths.push(length);
  }

  // Calculate period durations
  const periodDurations: number[] = [];
  for (let i = 0; i < periodStarts.length; i++) {
    let duration = 0;
    let j = 0;
    while (
      j < sortedEntries.length &&
      sortedEntries[j].date >= periodStarts[i]
    ) {
      if (
        sortedEntries[j].isOnPeriod &&
        (i === periodStarts.length - 1 ||
          sortedEntries[j].date < periodStarts[i + 1])
      ) {
        duration++;
      }
      j++;
    }
    if (duration > 0) {
      periodDurations.push(duration);
    }
  }

  // Calculate averages
  const averageCycleLength =
    cycleLengths.length > 0
      ? Math.round(
          cycleLengths.reduce((a, b) => a + b, 0) / cycleLengths.length
        )
      : 28;

  const averagePeriodDuration =
    periodDurations.length > 0
      ? Math.round(
          periodDurations.reduce((a, b) => a + b, 0) / periodDurations.length
        )
      : 5;

  // Calculate regularity score (0-100) based on cycle length variance
  let regularityScore = 100;
  if (cycleLengths.length > 1) {
    const variance =
      cycleLengths.reduce((sum, length) => {
        return sum + Math.pow(length - averageCycleLength, 2);
      }, 0) / cycleLengths.length;
    const stdDev = Math.sqrt(variance);
    // Reduce score based on standard deviation (max 30 point reduction)
    regularityScore = Math.max(70, 100 - stdDev * 2);
  }

  return {
    averageCycleLength,
    averagePeriodDuration,
    regularityScore: Math.round(regularityScore),
    totalCycles: periodStarts.length,
    lastPeriodStart: periodStarts[periodStarts.length - 1] || lastKnownPeriodStart,
  };
}
