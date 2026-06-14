import {
  ScrollView,
  Text,
  View,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useCycle } from "@/lib/cycle-context";
import { useRouter } from "expo-router";
import * as Haptics from "expo-haptics";

export default function ProfileScreen() {
  const router = useRouter();
  const { profile, isLoading } = useCycle();

  if (isLoading || !profile) {
    return (
      <ScreenContainer className="items-center justify-center">
        <ActivityIndicator size="large" color="#E74C3C" />
      </ScreenContainer>
    );
  }

  const handleEditProfile = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push("../onboarding");
  };

  return (
    <ScreenContainer className="p-6">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Text className="text-2xl font-bold text-foreground mb-6">
          My Profile
        </Text>

        {/* Profile Card */}
        <View className="bg-surface rounded-2xl p-6 border border-border mb-6">
          <View className="items-center mb-6">
            <View className="w-16 h-16 rounded-full bg-primary items-center justify-center mb-3">
              <Text className="text-3xl">👩</Text>
            </View>
            <Text className="text-2xl font-bold text-foreground">
              {profile.name}
            </Text>
            <Text className="text-sm text-muted mt-1">
              {profile.age} years old
            </Text>
          </View>

          <View className="border-t border-border pt-4 gap-4">
            <View className="flex-row justify-between items-center">
              <Text className="text-sm text-muted">Cycle Length</Text>
              <Text className="text-base font-semibold text-foreground">
                {profile.cycleLengthAverage} days
              </Text>
            </View>

            <View className="flex-row justify-between items-center">
              <Text className="text-sm text-muted">Period Duration</Text>
              <Text className="text-base font-semibold text-foreground">
                {profile.periodDurationAverage} days
              </Text>
            </View>

            <View className="flex-row justify-between items-center">
              <Text className="text-sm text-muted">Last Period</Text>
              <Text className="text-base font-semibold text-foreground">
                {new Date(profile.lastPeriodStart).toLocaleDateString("en-IN")}
              </Text>
            </View>

            <View className="flex-row justify-between items-center">
              <Text className="text-sm text-muted">Notifications</Text>
              <Text className="text-base font-semibold text-primary">
                {profile.notificationsEnabled ? "Enabled" : "Disabled"}
              </Text>
            </View>
          </View>
        </View>

        {/* Edit Profile Button */}
        <Pressable
          onPress={handleEditProfile}
          style={({ pressed }) => [
            { transform: [{ scale: pressed ? 0.97 : 1 }] },
          ]}
          className="bg-primary rounded-2xl p-4 items-center mb-6"
        >
          <Text className="text-white font-semibold">Edit Profile</Text>
        </Pressable>

        {/* Settings Section */}
        <Text className="text-base font-semibold text-foreground mb-3">
          Settings
        </Text>

        <View className="gap-3 mb-6">
          <Pressable
            style={({ pressed }) => [
              { transform: [{ scale: pressed ? 0.97 : 1 }] },
            ]}
            className="bg-surface rounded-2xl p-4 border border-border flex-row items-center justify-between"
          >
            <View className="flex-row items-center gap-3">
              <Text className="text-xl">🔔</Text>
              <Text className="text-sm font-semibold text-foreground">
                Notification Settings
              </Text>
            </View>
            <Text className="text-lg">›</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              { transform: [{ scale: pressed ? 0.97 : 1 }] },
            ]}
            className="bg-surface rounded-2xl p-4 border border-border flex-row items-center justify-between"
          >
            <View className="flex-row items-center gap-3">
              <Text className="text-xl">🌙</Text>
              <Text className="text-sm font-semibold text-foreground">
                Dark Mode
              </Text>
            </View>
            <Text className="text-lg">›</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              { transform: [{ scale: pressed ? 0.97 : 1 }] },
            ]}
            className="bg-surface rounded-2xl p-4 border border-border flex-row items-center justify-between"
          >
            <View className="flex-row items-center gap-3">
              <Text className="text-xl">🔒</Text>
              <Text className="text-sm font-semibold text-foreground">
                Privacy & Security
              </Text>
            </View>
            <Text className="text-lg">›</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              { transform: [{ scale: pressed ? 0.97 : 1 }] },
            ]}
            className="bg-surface rounded-2xl p-4 border border-border flex-row items-center justify-between"
          >
            <View className="flex-row items-center gap-3">
              <Text className="text-xl">ℹ️</Text>
              <Text className="text-sm font-semibold text-foreground">
                About Saheli
              </Text>
            </View>
            <Text className="text-lg">›</Text>
          </Pressable>
        </View>

        {/* About Section */}
        <View className="bg-primary/10 rounded-2xl p-4 border border-primary">
          <Text className="text-xs font-semibold text-primary mb-2">
            💜 About Saheli
          </Text>
          <Text className="text-xs text-primary leading-relaxed">
            Saheli is your personal period tracker and wellness companion,
            designed specifically for Indian girls and women. All your data is
            stored privately on your device.
          </Text>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
