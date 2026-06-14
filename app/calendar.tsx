import {
  ScrollView,
  Text,
  View,
  Pressable,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useCycle } from "@/lib/cycle-context";
import { getPhaseForDate } from "@/lib/cycle-utils";
import { useRouter } from "expo-router";
import { useState } from "react";
import * as Haptics from "expo-haptics";

const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

interface CalendarDay {
  date: string;
  day: number;
  isCurrentMonth: boolean;
  hasEntry: boolean;
  phase: "menstrual" | "follicular" | "ovulation" | "luteal";
}

export default function CalendarScreen() {
  const router = useRouter();
  const { profile, entries, isLoading } = useCycle();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  if (isLoading || !profile) {
    return (
      <ScreenContainer className="items-center justify-center">
        <ActivityIndicator size="large" color="#E74C3C" />
      </ScreenContainer>
    );
  }

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Get calendar days for the month
  const getCalendarDays = (): CalendarDay[] => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: CalendarDay[] = [];

    // Add previous month's days
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const day = prevMonthLastDay - i;
      const date = new Date(year, month - 1, day).toISOString().split("T")[0];
      const phase = getPhaseForDate(date, profile.lastPeriodStart, profile.cycleLengthAverage);
      days.push({
        date,
        day,
        isCurrentMonth: false,
        hasEntry: entries.some((e) => e.date === date),
        phase: phase.name,
      });
    }

    // Add current month's days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day).toISOString().split("T")[0];
      const phase = getPhaseForDate(date, profile.lastPeriodStart, profile.cycleLengthAverage);
      days.push({
        date,
        day,
        isCurrentMonth: true,
        hasEntry: entries.some((e) => e.date === date),
        phase: phase.name,
      });
    }

    // Add next month's days
    const remainingDays = 42 - days.length;
    for (let day = 1; day <= remainingDays; day++) {
      const date = new Date(year, month + 1, day).toISOString().split("T")[0];
      const phase = getPhaseForDate(date, profile.lastPeriodStart, profile.cycleLengthAverage);
      days.push({
        date,
        day,
        isCurrentMonth: false,
        hasEntry: entries.some((e) => e.date === date),
        phase: phase.name,
      });
    }

    return days;
  };

  const getPhaseColor = (phase: string): string => {
    switch (phase) {
      case "menstrual":
        return "#E74C3C";
      case "follicular":
        return "#F8B4D6";
      case "ovulation":
        return "#F39C12";
      case "luteal":
        return "#9B59B6";
      default:
        return "#E5E7EB";
    }
  };

  const getPhaseEmoji = (phase: string): string => {
    switch (phase) {
      case "menstrual":
        return "🩸";
      case "follicular":
        return "🌸";
      case "ovulation":
        return "✨";
      case "luteal":
        return "🌙";
      default:
        return "";
    }
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
    setSelectedDate(null);
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
    setSelectedDate(null);
  };

  const handleDayPress = (date: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedDate(date);
  };

  const calendarDays = getCalendarDays();
  const selectedEntry = selectedDate
    ? entries.find((e) => e.date === selectedDate)
    : null;
  const selectedPhase = selectedDate
    ? getPhaseForDate(selectedDate, profile.lastPeriodStart, profile.cycleLengthAverage)
    : null;

  return (
    <ScreenContainer className="p-6">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="flex-row items-center justify-between mb-6">
          <Text className="text-2xl font-bold text-foreground">
            Calendar
          </Text>
          <Pressable
            onPress={() => router.back()}
            className="p-2"
          >
            <Text className="text-xl">✕</Text>
          </Pressable>
        </View>

        {/* Month Navigation */}
        <View className="flex-row items-center justify-between mb-6 bg-surface rounded-2xl p-4 border border-border">
          <Pressable
            onPress={handlePrevMonth}
            className="p-2"
          >
            <Text className="text-xl">←</Text>
          </Pressable>
          <Text className="text-lg font-semibold text-foreground">
            {MONTHS[month]} {year}
          </Text>
          <Pressable
            onPress={handleNextMonth}
            className="p-2"
          >
            <Text className="text-xl">→</Text>
          </Pressable>
        </View>

        {/* Legend */}
        <View className="bg-surface rounded-2xl p-4 mb-6 border border-border">
          <Text className="text-xs font-semibold text-muted mb-3">
            CYCLE PHASES
          </Text>
          <View className="gap-2">
            {[
              { phase: "menstrual", name: "Menstrual" },
              { phase: "follicular", name: "Follicular" },
              { phase: "ovulation", name: "Ovulation" },
              { phase: "luteal", name: "Luteal" },
            ].map((item) => (
              <View key={item.phase} className="flex-row items-center gap-2">
                <View
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: getPhaseColor(item.phase) }}
                />
                <Text className="text-xs text-foreground">{item.name}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Calendar Grid */}
        <View className="bg-surface rounded-2xl p-4 mb-6 border border-border">
          {/* Days of week header */}
          <View className="flex-row justify-between mb-3">
            {DAYS_OF_WEEK.map((day) => (
              <Text
                key={day}
                className="text-xs font-semibold text-muted text-center flex-1"
              >
                {day}
              </Text>
            ))}
          </View>

          {/* Calendar days */}
          <View>
            {Array.from({ length: 6 }).map((_, weekIndex) => (
              <View key={weekIndex} className="flex-row justify-between mb-2">
                {calendarDays.slice(weekIndex * 7, (weekIndex + 1) * 7).map((day) => (
                  <Pressable
                    key={day.date}
                    onPress={() => handleDayPress(day.date)}
                    style={({ pressed }) => [
                      {
                        transform: [{ scale: pressed ? 0.95 : 1 }],
                        backgroundColor: getPhaseColor(day.phase),
                        opacity: day.isCurrentMonth ? 1 : 0.3,
                      },
                    ]}
                    className={`flex-1 aspect-square items-center justify-center rounded-lg mx-0.5 relative ${
                      selectedDate === day.date
                        ? "border-2 border-primary"
                        : "border border-border"
                    }`}
                  >
                    <Text
                      className={`text-xs font-semibold ${
                        day.isCurrentMonth
                          ? "text-white"
                          : "text-foreground/50"
                      }`}
                    >
                      {day.day}
                    </Text>
                    {day.hasEntry && (
                      <View className="absolute bottom-1 w-1 h-1 bg-white rounded-full" />
                    )}
                  </Pressable>
                ))}
              </View>
            ))}
          </View>
        </View>

        {/* Selected Day Details */}
        {selectedDate && (
          <View className="bg-surface rounded-2xl p-4 border border-border">
            <View className="flex-row items-center justify-between mb-4">
              <View>
                <Text className="text-xs text-muted font-medium mb-1">
                  {new Date(selectedDate).toLocaleDateString("en-IN", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })}
                </Text>
                <Text className="text-lg font-bold text-foreground">
                  {selectedPhase && getPhaseEmoji(selectedPhase.name)}{" "}
                  {selectedPhase?.displayName}
                </Text>
              </View>
              <Pressable
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  router.push({
                    pathname: "/log-period",
                    params: { date: selectedDate },
                  });
                }}
                className="bg-primary px-4 py-2 rounded-lg"
              >
                <Text className="text-white font-semibold text-sm">
                  {selectedEntry ? "Edit" : "Log"}
                </Text>
              </Pressable>
            </View>

            {selectedEntry ? (
              <View className="gap-3">
                {selectedEntry.isOnPeriod && (
                  <View>
                    <Text className="text-xs text-muted font-medium mb-1">
                      Flow Level
                    </Text>
                    <Text className="text-sm font-semibold text-foreground capitalize">
                      {selectedEntry.flowLevel}
                    </Text>
                  </View>
                )}

                {selectedEntry.symptoms.length > 0 && (
                  <View>
                    <Text className="text-xs text-muted font-medium mb-2">
                      Symptoms
                    </Text>
                    <View className="flex-row flex-wrap gap-2">
                      {selectedEntry.symptoms.map((symptom) => (
                        <View
                          key={symptom}
                          className="bg-primary/10 px-3 py-1 rounded-full"
                        >
                          <Text className="text-xs font-medium text-primary capitalize">
                            {symptom.replace("_", " ")}
                          </Text>
                        </View>
                      ))}
                    </View>
                  </View>
                )}

                {selectedEntry.notes && (
                  <View>
                    <Text className="text-xs text-muted font-medium mb-1">
                      Notes
                    </Text>
                    <Text className="text-sm text-foreground">
                      {selectedEntry.notes}
                    </Text>
                  </View>
                )}
              </View>
            ) : (
              <Text className="text-sm text-muted">
                No data logged for this day
              </Text>
            )}
          </View>
        )}
      </ScrollView>
    </ScreenContainer>
  );
}
