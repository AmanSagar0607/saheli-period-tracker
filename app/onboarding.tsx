import {
  ScrollView,
  Text,
  View,
  Pressable,
  TextInput,
  Switch,
  ActivityIndicator,
} from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useCycle } from "@/lib/cycle-context";
import { getTodayISO, addDays } from "@/lib/cycle-utils";
import { useRouter } from "expo-router";
import { useState } from "react";
import * as Haptics from "expo-haptics";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function OnboardingScreen() {
  const router = useRouter();
  const { updateProfile } = useCycle();
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [cycleLength, setCycleLength] = useState("28");
  const [periodDuration, setPeriodDuration] = useState("5");
  const [lastPeriodStart, setLastPeriodStart] = useState(getTodayISO());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleDateChange = (event: any, date?: Date) => {
    if (date) {
      const isoDate = date.toISOString().split("T")[0];
      setLastPeriodStart(isoDate);
    }
    setShowDatePicker(false);
  };

  const handleNext = () => {
    if (step === 1 && !name.trim()) {
      alert("Please enter your name");
      return;
    }
    if (step === 2 && !age.trim()) {
      alert("Please enter your age");
      return;
    }
    if (step < 4) {
      setStep(step + 1);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  const handleComplete = async () => {
    try {
      setIsLoading(true);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

      await updateProfile({
        name,
        age: parseInt(age),
        cycleLengthAverage: parseInt(cycleLength),
        periodDurationAverage: parseInt(periodDuration),
        lastPeriodStart,
        notificationsEnabled,
        onboardingCompleted: true,
      });

      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      // Navigate back to home after onboarding
      setTimeout(() => {
        router.back();
      }, 500);
    } catch (error) {
      console.error("Error completing onboarding:", error);
      alert("Failed to save profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScreenContainer className="p-6">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Progress Indicator */}
        <View className="flex-row gap-2 mb-8">
          {[1, 2, 3, 4].map((s) => (
            <View
              key={s}
              className={`flex-1 h-1 rounded-full ${
                s <= step ? "bg-primary" : "bg-border"
              }`}
            />
          ))}
        </View>

        {/* Step 1: Welcome & Name */}
        {step === 1 && (
          <View className="flex-1">
            <Text className="text-3xl font-bold text-foreground mb-2">
              Welcome to Saheli!
            </Text>
            <Text className="text-base text-muted mb-8">
              Your personal period tracker and wellness companion tailored for
              you.
            </Text>

            <View className="mb-6">
              <Text className="text-sm font-semibold text-foreground mb-2">
                What's your name?
              </Text>
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="Enter your name"
                placeholderTextColor="#999"
                className="bg-surface border border-border rounded-2xl px-4 py-3 text-foreground text-base"
              />
            </View>

            <View className="flex-1" />

            <Pressable
              onPress={handleNext}
              style={({ pressed }) => [
                { transform: [{ scale: pressed ? 0.97 : 1 }] },
              ]}
              className="bg-primary rounded-2xl p-4 items-center"
            >
              <Text className="text-white font-semibold text-base">
                Continue
              </Text>
            </Pressable>
          </View>
        )}

        {/* Step 2: Age */}
        {step === 2 && (
          <View className="flex-1">
            <Text className="text-3xl font-bold text-foreground mb-2">
              How old are you?
            </Text>
            <Text className="text-base text-muted mb-8">
              This helps us provide age-appropriate health recommendations.
            </Text>

            <View className="mb-6">
              <Text className="text-sm font-semibold text-foreground mb-2">
                Age
              </Text>
              <TextInput
                value={age}
                onChangeText={setAge}
                placeholder="Enter your age"
                placeholderTextColor="#999"
                keyboardType="number-pad"
                className="bg-surface border border-border rounded-2xl px-4 py-3 text-foreground text-base"
              />
            </View>

            <View className="flex-1" />

            <View className="flex-row gap-3">
              <Pressable
                onPress={() => {
                  setStep(step - 1);
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                }}
                style={({ pressed }) => [
                  { transform: [{ scale: pressed ? 0.97 : 1 }] },
                ]}
                className="flex-1 border-2 border-primary rounded-2xl p-4 items-center"
              >
                <Text className="text-primary font-semibold text-base">
                  Back
                </Text>
              </Pressable>
              <Pressable
                onPress={handleNext}
                style={({ pressed }) => [
                  { transform: [{ scale: pressed ? 0.97 : 1 }] },
                ]}
                className="flex-1 bg-primary rounded-2xl p-4 items-center"
              >
                <Text className="text-white font-semibold text-base">
                  Continue
                </Text>
              </Pressable>
            </View>
          </View>
        )}

        {/* Step 3: Cycle Information */}
        {step === 3 && (
          <View className="flex-1">
            <Text className="text-3xl font-bold text-foreground mb-2">
              Your Cycle
            </Text>
            <Text className="text-base text-muted mb-8">
              Help us understand your menstrual cycle pattern.
            </Text>

            <View className="mb-6">
              <Text className="text-sm font-semibold text-foreground mb-2">
                Average Cycle Length (days)
              </Text>
              <TextInput
                value={cycleLength}
                onChangeText={setCycleLength}
                placeholder="28"
                placeholderTextColor="#999"
                keyboardType="number-pad"
                className="bg-surface border border-border rounded-2xl px-4 py-3 text-foreground text-base"
              />
              <Text className="text-xs text-muted mt-2">
                Typical range: 21-35 days
              </Text>
            </View>

            <View className="mb-6">
              <Text className="text-sm font-semibold text-foreground mb-2">
                Average Period Duration (days)
              </Text>
              <TextInput
                value={periodDuration}
                onChangeText={setPeriodDuration}
                placeholder="5"
                placeholderTextColor="#999"
                keyboardType="number-pad"
                className="bg-surface border border-border rounded-2xl px-4 py-3 text-foreground text-base"
              />
              <Text className="text-xs text-muted mt-2">
                Typical range: 2-7 days
              </Text>
            </View>

            <View className="flex-1" />

            <View className="flex-row gap-3">
              <Pressable
                onPress={() => {
                  setStep(step - 1);
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                }}
                style={({ pressed }) => [
                  { transform: [{ scale: pressed ? 0.97 : 1 }] },
                ]}
                className="flex-1 border-2 border-primary rounded-2xl p-4 items-center"
              >
                <Text className="text-primary font-semibold text-base">
                  Back
                </Text>
              </Pressable>
              <Pressable
                onPress={handleNext}
                style={({ pressed }) => [
                  { transform: [{ scale: pressed ? 0.97 : 1 }] },
                ]}
                className="flex-1 bg-primary rounded-2xl p-4 items-center"
              >
                <Text className="text-white font-semibold text-base">
                  Continue
                </Text>
              </Pressable>
            </View>
          </View>
        )}

        {/* Step 4: Last Period & Preferences */}
        {step === 4 && (
          <View className="flex-1">
            <Text className="text-3xl font-bold text-foreground mb-2">
              Almost Done!
            </Text>
            <Text className="text-base text-muted mb-8">
              Set your last period date and preferences.
            </Text>

            <View className="mb-6">
              <Text className="text-sm font-semibold text-foreground mb-2">
                When did your last period start?
              </Text>
              <Pressable
                onPress={() => setShowDatePicker(true)}
                className="bg-surface border border-border rounded-2xl px-4 py-3 flex-row items-center justify-between"
              >
                <Text className="text-foreground text-base">
                  {new Date(lastPeriodStart).toLocaleDateString("en-IN")}
                </Text>
                <Text className="text-xl">📅</Text>
              </Pressable>
            </View>

            {showDatePicker && (
              <DateTimePicker
                value={new Date(lastPeriodStart)}
                mode="date"
                display="spinner"
                onChange={handleDateChange}
              />
            )}

            <View className="bg-surface rounded-2xl p-4 border border-border mb-6">
              <View className="flex-row items-center justify-between">
                <View>
                  <Text className="text-sm font-semibold text-foreground">
                    Enable Notifications
                  </Text>
                  <Text className="text-xs text-muted mt-1">
                    Get reminders for your period and wellness tips
                  </Text>
                </View>
                <Switch
                  value={notificationsEnabled}
                  onValueChange={setNotificationsEnabled}
                  trackColor={{ false: "#ccc", true: "#E74C3C" }}
                />
              </View>
            </View>

            <View className="flex-1" />

            <View className="flex-row gap-3">
              <Pressable
                onPress={() => {
                  setStep(step - 1);
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                }}
                style={({ pressed }) => [
                  { transform: [{ scale: pressed ? 0.97 : 1 }] },
                ]}
                className="flex-1 border-2 border-primary rounded-2xl p-4 items-center"
              >
                <Text className="text-primary font-semibold text-base">
                  Back
                </Text>
              </Pressable>
              <Pressable
                onPress={handleComplete}
                disabled={isLoading}
                style={({ pressed }) => [
                  { transform: [{ scale: pressed && !isLoading ? 0.97 : 1 }] },
                ]}
                className="flex-1 bg-primary rounded-2xl p-4 items-center"
              >
                {isLoading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text className="text-white font-semibold text-base">
                    Get Started
                  </Text>
                )}
              </Pressable>
            </View>
          </View>
        )}
      </ScrollView>
    </ScreenContainer>
  );
}
