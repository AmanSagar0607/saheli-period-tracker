import {
  ScrollView,
  Text,
  View,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useCycle } from "@/lib/cycle-context";
import {
  getSuggestionsForPhase,
} from "@/lib/wellness-suggestions";
import {
  calculateCycleStatistics,
} from "@/lib/cycle-utils";
import { useRouter } from "expo-router";
import { useMemo } from "react";

export default function InsightsScreen() {
  const router = useRouter();
  const { profile, entries, cycleInfo, isLoading } = useCycle();

  const statistics = useMemo(() => {
    if (!profile || entries.length === 0) {
      return null;
    }
    return calculateCycleStatistics(entries, profile.lastPeriodStart);
  }, [profile, entries]);

  const phaseSuggestions = useMemo(() => {
    if (!cycleInfo) return [];
    return getSuggestionsForPhase(cycleInfo.currentPhase);
  }, [cycleInfo]);

  if (isLoading || !profile || !cycleInfo) {
    return (
      <ScreenContainer className="items-center justify-center">
        <ActivityIndicator size="large" color="#E74C3C" />
      </ScreenContainer>
    );
  }

  const getPhaseEmoji = (phase: string) => {
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
        return "💜";
    }
  };

  const getPhaseDisplayName = (phase: string) => {
    switch (phase) {
      case "menstrual":
        return "Menstrual";
      case "follicular":
        return "Follicular";
      case "ovulation":
        return "Ovulation";
      case "luteal":
        return "Luteal";
      default:
        return "Unknown";
    }
  };

  return (
    <ScreenContainer className="p-6">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="flex-row items-center justify-between mb-6">
          <Text className="text-2xl font-bold text-foreground">
            Insights
          </Text>
          <Pressable
            onPress={() => router.back()}
            className="p-2"
          >
            <Text className="text-xl">✕</Text>
          </Pressable>
        </View>

        {/* Cycle Statistics */}
        {statistics && statistics.totalCycles > 0 ? (
          <View className="mb-6">
            <Text className="text-base font-semibold text-foreground mb-3">
              Cycle Statistics
            </Text>
            <View className="gap-3">
              <View className="bg-surface rounded-2xl p-4 border border-border flex-row justify-between items-center">
                <View>
                  <Text className="text-xs text-muted font-medium mb-1">
                    Average Cycle Length
                  </Text>
                  <Text className="text-2xl font-bold text-primary">
                    {statistics.averageCycleLength}
                  </Text>
                </View>
                <Text className="text-3xl">📅</Text>
              </View>

              <View className="bg-surface rounded-2xl p-4 border border-border flex-row justify-between items-center">
                <View>
                  <Text className="text-xs text-muted font-medium mb-1">
                    Average Period Duration
                  </Text>
                  <Text className="text-2xl font-bold text-primary">
                    {statistics.averagePeriodDuration}
                  </Text>
                </View>
                <Text className="text-3xl">🩸</Text>
              </View>

              <View className="bg-surface rounded-2xl p-4 border border-border flex-row justify-between items-center">
                <View>
                  <Text className="text-xs text-muted font-medium mb-1">
                    Regularity Score
                  </Text>
                  <Text className="text-2xl font-bold text-success">
                    {statistics.regularityScore}%
                  </Text>
                </View>
                <Text className="text-3xl">✅</Text>
              </View>

              <View className="bg-surface rounded-2xl p-4 border border-border flex-row justify-between items-center">
                <View>
                  <Text className="text-xs text-muted font-medium mb-1">
                    Total Cycles Tracked
                  </Text>
                  <Text className="text-2xl font-bold text-foreground">
                    {statistics.totalCycles}
                  </Text>
                </View>
                <Text className="text-3xl">📊</Text>
              </View>
            </View>
          </View>
        ) : (
          <View className="bg-surface rounded-2xl p-4 mb-6 border border-border">
            <Text className="text-sm text-muted text-center">
              Log more data to see detailed statistics
            </Text>
          </View>
        )}

        {/* Predictions */}
        <View className="mb-6">
          <Text className="text-base font-semibold text-foreground mb-3">
            Predictions
          </Text>
          <View className="gap-3">
            <View className="bg-surface rounded-2xl p-4 border border-border">
              <View className="flex-row items-center justify-between mb-2">
                <Text className="text-sm font-semibold text-foreground">
                  Next Period
                </Text>
                <Text className="text-xs font-medium text-muted">
                  {cycleInfo.daysUntilNextPeriod} days away
                </Text>
              </View>
              <Text className="text-lg font-bold text-primary">
                {new Date(cycleInfo.nextPeriodDate).toLocaleDateString("en-IN", {
                  month: "short",
                  day: "numeric",
                })}
              </Text>
            </View>

            <View className="bg-surface rounded-2xl p-4 border border-border">
              <View className="flex-row items-center justify-between mb-2">
                <Text className="text-sm font-semibold text-foreground">
                  Ovulation Window
                </Text>
                <Text className="text-xs font-medium text-muted">Peak fertility</Text>
              </View>
              <Text className="text-lg font-bold text-warning">
                {new Date(cycleInfo.fertileWindowStart).toLocaleDateString("en-IN", {
                  month: "short",
                  day: "numeric",
                })}{" "}
                -{" "}
                {new Date(cycleInfo.fertileWindowEnd).toLocaleDateString("en-IN", {
                  month: "short",
                  day: "numeric",
                })}
              </Text>
            </View>

            <View className="bg-surface rounded-2xl p-4 border border-border">
              <View className="flex-row items-center justify-between mb-2">
                <Text className="text-sm font-semibold text-foreground">
                  Fertile Window
                </Text>
                <Text className="text-xs font-medium text-muted">
                  High fertility
                </Text>
              </View>
              <Text className="text-lg font-bold text-primary">
                {new Date(cycleInfo.ovulationDate).toLocaleDateString("en-IN", {
                  month: "short",
                  day: "numeric",
                })}
              </Text>
            </View>
          </View>
        </View>

        {/* Phase-Based Suggestions */}
        <View className="mb-6">
          <Text className="text-base font-semibold text-foreground mb-3">
            {getPhaseEmoji(cycleInfo.currentPhase)}{" "}
            {getPhaseDisplayName(cycleInfo.currentPhase)} Phase Tips
          </Text>
          <View className="gap-2">
            {phaseSuggestions.slice(0, 4).map((suggestion, index) => (
              <View
                key={index}
                className="bg-surface rounded-2xl p-4 border border-border flex-row gap-3"
              >
                <Text className="text-2xl">{suggestion.emoji}</Text>
                <View className="flex-1">
                  <Text className="text-sm font-semibold text-foreground mb-1">
                    {suggestion.title}
                  </Text>
                  <Text className="text-xs text-muted leading-relaxed">
                    {suggestion.description}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* All Suggestions by Category */}
        <View className="mb-6">
          <Text className="text-base font-semibold text-foreground mb-3">
            More Wellness Tips
          </Text>
          <View className="gap-2">
            {phaseSuggestions.slice(4).map((suggestion, index) => (
              <View
                key={index}
                className="bg-surface rounded-2xl p-4 border border-border flex-row gap-3"
              >
                <Text className="text-2xl">{suggestion.emoji}</Text>
                <View className="flex-1">
                  <Text className="text-sm font-semibold text-foreground mb-1">
                    {suggestion.title}
                  </Text>
                  <Text className="text-xs text-muted leading-relaxed">
                    {suggestion.description}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Data Tracking Encouragement */}
        <View className="bg-primary/10 rounded-2xl p-4 border border-primary mb-6">
          <Text className="text-sm font-semibold text-primary mb-2">
            💡 Tip
          </Text>
          <Text className="text-xs text-primary leading-relaxed">
            The more data you log, the more accurate your predictions become.
            Try logging your symptoms daily for better insights!
          </Text>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
