import { ScrollView, Text, View, Pressable, ActivityIndicator } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useCycle } from "@/lib/cycle-context";
import { getRandomSuggestionForPhase } from "@/lib/wellness-suggestions";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import * as Haptics from "expo-haptics";

export default function HomeScreen() {
  const router = useRouter();
  const { profile, cycleInfo, isLoading } = useCycle();
  const [dailyTip, setDailyTip] = useState<any>(null);

  // Get a random wellness tip for the current phase
  useEffect(() => {
    if (cycleInfo?.currentPhase) {
      const tip = getRandomSuggestionForPhase(cycleInfo.currentPhase);
      setDailyTip(tip);
    }
  }, [cycleInfo?.currentPhase]);

  if (isLoading) {
    return (
      <ScreenContainer className="items-center justify-center">
        <ActivityIndicator size="large" color="#E74C3C" />
      </ScreenContainer>
    );
  }

  if (!profile || !cycleInfo) {
    return (
      <ScreenContainer className="items-center justify-center p-6">
        <Text className="text-xl font-semibold text-foreground mb-4">
          Welcome to Saheli
        </Text>
        <Text className="text-base text-muted text-center mb-6">
          Let's get you started with your period tracking journey
        </Text>
        <Pressable
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            router.push("../onboarding");
          }}
          style={({ pressed }) => [
            { transform: [{ scale: pressed ? 0.97 : 1 }] },
          ]}
          className="bg-primary px-8 py-3 rounded-full"
        >
          <Text className="text-white font-semibold text-center">
            Get Started
          </Text>
        </Pressable>
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
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="mb-8">
          <Text className="text-3xl font-bold text-foreground">
            Welcome, {profile.name || "Friend"}!
          </Text>
          <Text className="text-sm text-muted mt-1">
            {new Date().toLocaleDateString("en-IN", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </Text>
        </View>

        {/* Cycle Status Widget */}
        <View
          className="bg-gradient-to-b from-pink-50 to-red-50 rounded-3xl p-6 mb-6 border border-border"
          style={{ borderColor: cycleInfo.phaseColor }}
        >
          <View className="flex-row items-center justify-between mb-4">
            <View className="flex-1">
              <Text className="text-sm text-muted font-medium mb-1">
                Current Phase
              </Text>
              <Text className="text-2xl font-bold text-foreground">
                {getPhaseEmoji(cycleInfo.currentPhase)}{" "}
                {getPhaseDisplayName(cycleInfo.currentPhase)}
              </Text>
            </View>
            <View className="bg-white rounded-full p-3">
              <Text className="text-2xl">{getPhaseEmoji(cycleInfo.currentPhase)}</Text>
            </View>
          </View>

          <View className="bg-white rounded-2xl p-4">
            <View className="flex-row justify-between mb-3">
              <View>
                <Text className="text-xs text-muted font-medium mb-1">
                  Cycle Day
                </Text>
                <Text className="text-2xl font-bold text-primary">
                  {cycleInfo.currentDay}
                </Text>
              </View>
              <View className="items-end">
                <Text className="text-xs text-muted font-medium mb-1">
                  Next Period
                </Text>
                <Text className="text-lg font-semibold text-foreground">
                  {cycleInfo.daysUntilNextPeriod} days
                </Text>
              </View>
            </View>
            <Text className="text-xs text-muted">
              Expected: {new Date(cycleInfo.nextPeriodDate).toLocaleDateString("en-IN")}
            </Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View className="gap-3 mb-6">
          <Pressable
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              router.push("../log-period");
            }}
            style={({ pressed }) => [
              { transform: [{ scale: pressed ? 0.97 : 1 }] },
            ]}
            className="bg-primary rounded-2xl p-4 flex-row items-center justify-between"
          >
            <View>
              <Text className="text-white font-semibold text-base">
                Log Today's Symptoms
              </Text>
              <Text className="text-white/80 text-xs mt-1">
                Track your health
              </Text>
            </View>
            <Text className="text-2xl">📝</Text>
          </Pressable>

          <View className="flex-row gap-3">
            <Pressable
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                router.push("../calendar");
              }}
              style={({ pressed }) => [
                { transform: [{ scale: pressed ? 0.97 : 1 }] },
              ]}
              className="flex-1 bg-surface rounded-2xl p-4 items-center justify-center border border-border"
            >
              <Text className="text-2xl mb-2">📅</Text>
              <Text className="text-foreground font-semibold text-sm">
                Calendar
              </Text>
            </Pressable>

            <Pressable
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                router.push("../insights");
              }}
              style={({ pressed }) => [
                { transform: [{ scale: pressed ? 0.97 : 1 }] },
              ]}
              className="flex-1 bg-surface rounded-2xl p-4 items-center justify-center border border-border"
            >
              <Text className="text-2xl mb-2">📊</Text>
              <Text className="text-foreground font-semibold text-sm">
                Insights
              </Text>
            </Pressable>
          </View>
        </View>

        {/* Daily Wellness Tip */}
        {dailyTip && (
          <View className="bg-surface rounded-2xl p-4 mb-6 border border-border">
            <View className="flex-row items-start gap-3">
              <Text className="text-2xl">{dailyTip.emoji}</Text>
              <View className="flex-1">
                <Text className="text-sm font-semibold text-foreground mb-1">
                  {dailyTip.title}
                </Text>
                <Text className="text-xs text-muted leading-relaxed">
                  {dailyTip.description}
                </Text>
              </View>
            </View>
          </View>
        )}

        {/* Upcoming Events */}
        <View className="gap-3">
          <Text className="text-base font-semibold text-foreground mb-2">
            Upcoming Events
          </Text>

          <View className="bg-surface rounded-2xl p-4 border border-border">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-3">
                <Text className="text-2xl">🌙</Text>
                <View>
                  <Text className="text-sm font-semibold text-foreground">
                    Next Period
                  </Text>
                  <Text className="text-xs text-muted">
                    {new Date(cycleInfo.nextPeriodDate).toLocaleDateString("en-IN")}
                  </Text>
                </View>
              </View>
              <Text className="text-sm font-bold text-primary">
                {cycleInfo.daysUntilNextPeriod}d
              </Text>
            </View>
          </View>

          <View className="bg-surface rounded-2xl p-4 border border-border">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-3">
                <Text className="text-2xl">✨</Text>
                <View>
                  <Text className="text-sm font-semibold text-foreground">
                    Ovulation
                  </Text>
                  <Text className="text-xs text-muted">
                    {new Date(cycleInfo.ovulationDate).toLocaleDateString("en-IN")}
                  </Text>
                </View>
              </View>
              <Text className="text-sm font-bold text-warning">
                {Math.max(0, Math.ceil((new Date(cycleInfo.ovulationDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)))}d
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
