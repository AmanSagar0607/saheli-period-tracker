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
import { getTodayISO } from "@/lib/cycle-utils";
import { useRouter } from "expo-router";
import { useState, useEffect } from "react";
import * as Haptics from "expo-haptics";
import DateTimePicker from "@react-native-community/datetimepicker";

const SYMPTOMS = [
  { id: "cramps", label: "Cramps", emoji: "😣" },
  { id: "headache", label: "Headache", emoji: "🤕" },
  { id: "mood_changes", label: "Mood Changes", emoji: "😔" },
  { id: "bloating", label: "Bloating", emoji: "🤰" },
  { id: "fatigue", label: "Fatigue", emoji: "😴" },
  { id: "acne", label: "Acne", emoji: "🌡️" },
  { id: "backache", label: "Backache", emoji: "🤕" },
  { id: "nausea", label: "Nausea", emoji: "🤢" },
  { id: "breast_tenderness", label: "Breast Tenderness", emoji: "💔" },
  { id: "anxiety", label: "Anxiety", emoji: "😰" },
  { id: "irritability", label: "Irritability", emoji: "😤" },
];

export default function LogPeriodScreen() {
  const router = useRouter();
  const { entries, addPeriodEntry, updatePeriodEntry } = useCycle();
  const [selectedDate, setSelectedDate] = useState(getTodayISO());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isOnPeriod, setIsOnPeriod] = useState(false);
  const [flowLevel, setFlowLevel] = useState<"light" | "medium" | "heavy">(
    "medium"
  );
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [symptomIntensity, setSymptomIntensity] = useState(3);
  const [notes, setNotes] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  // Load existing entry for selected date
  useEffect(() => {
    const existingEntry = entries.find((e) => e.date === selectedDate);
    if (existingEntry) {
      setIsOnPeriod(existingEntry.isOnPeriod);
      setFlowLevel(existingEntry.flowLevel || "medium");
      setSelectedSymptoms(existingEntry.symptoms);
      setSymptomIntensity(existingEntry.symptomIntensity);
      setNotes(existingEntry.notes || "");
    } else {
      setIsOnPeriod(false);
      setFlowLevel("medium");
      setSelectedSymptoms([]);
      setSymptomIntensity(3);
      setNotes("");
    }
  }, [selectedDate, entries]);

  const handleDateChange = (event: any, date?: Date) => {
    if (date) {
      const isoDate = date.toISOString().split("T")[0];
      setSelectedDate(isoDate);
    }
    setShowDatePicker(false);
  };

  const toggleSymptom = (symptomId: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptomId)
        ? prev.filter((s) => s !== symptomId)
        : [...prev, symptomId]
    );
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

      const entry = {
        date: selectedDate,
        isOnPeriod,
        flowLevel: isOnPeriod ? flowLevel : undefined,
        symptoms: selectedSymptoms,
        symptomIntensity,
        notes: notes || undefined,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const existingEntry = entries.find((e) => e.date === selectedDate);
      if (existingEntry) {
        await updatePeriodEntry(entry);
      } else {
        await addPeriodEntry(entry);
      }

      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      router.back();
    } catch (error) {
      console.error("Error saving entry:", error);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    } finally {
      setIsSaving(false);
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
            Log Your Day
          </Text>
          <Pressable
            onPress={() => router.back()}
            className="p-2"
          >
            <Text className="text-xl">✕</Text>
          </Pressable>
        </View>

        {/* Date Selector */}
        <Pressable
          onPress={() => setShowDatePicker(true)}
          className="bg-surface rounded-2xl p-4 mb-6 border border-border flex-row items-center justify-between"
        >
          <View>
            <Text className="text-xs text-muted font-medium mb-1">
              Date
            </Text>
            <Text className="text-base font-semibold text-foreground">
              {new Date(selectedDate).toLocaleDateString("en-IN", {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}
            </Text>
          </View>
          <Text className="text-xl">📅</Text>
        </Pressable>

        {showDatePicker && (
          <DateTimePicker
            value={new Date(selectedDate)}
            mode="date"
            display="spinner"
            onChange={handleDateChange}
          />
        )}

        {/* Period Status */}
        <View className="bg-surface rounded-2xl p-4 mb-6 border border-border">
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-sm font-semibold text-foreground">
                On Your Period?
              </Text>
              <Text className="text-xs text-muted mt-1">
                Are you currently menstruating?
              </Text>
            </View>
            <Switch
              value={isOnPeriod}
              onValueChange={setIsOnPeriod}
              trackColor={{ false: "#ccc", true: "#E74C3C" }}
            />
          </View>
        </View>

        {/* Flow Level (if on period) */}
        {isOnPeriod && (
          <View className="bg-surface rounded-2xl p-4 mb-6 border border-border">
            <Text className="text-sm font-semibold text-foreground mb-3">
              Flow Level
            </Text>
            <View className="flex-row gap-2">
              {(["light", "medium", "heavy"] as const).map((level) => (
                <Pressable
                  key={level}
                  onPress={() => setFlowLevel(level)}
                  style={({ pressed }) => [
                    { transform: [{ scale: pressed ? 0.95 : 1 }] },
                  ]}
                  className={`flex-1 py-3 px-4 rounded-xl border-2 items-center ${
                    flowLevel === level
                      ? "bg-primary border-primary"
                      : "bg-background border-border"
                  }`}
                >
                  <Text
                    className={`font-semibold capitalize ${
                      flowLevel === level
                        ? "text-white"
                        : "text-foreground"
                    }`}
                  >
                    {level}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        )}

        {/* Symptoms */}
        <View className="mb-6">
          <Text className="text-sm font-semibold text-foreground mb-3">
            Symptoms
          </Text>
          <View className="flex-row flex-wrap gap-2">
            {SYMPTOMS.map((symptom) => (
              <Pressable
                key={symptom.id}
                onPress={() => toggleSymptom(symptom.id)}
                style={({ pressed }) => [
                  { transform: [{ scale: pressed ? 0.95 : 1 }] },
                ]}
                className={`px-3 py-2 rounded-full border-2 flex-row items-center gap-1 ${
                  selectedSymptoms.includes(symptom.id)
                    ? "bg-primary border-primary"
                    : "bg-background border-border"
                }`}
              >
                <Text>{symptom.emoji}</Text>
                <Text
                  className={`text-xs font-medium ${
                    selectedSymptoms.includes(symptom.id)
                      ? "text-white"
                      : "text-foreground"
                  }`}
                >
                  {symptom.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Symptom Intensity */}
        {selectedSymptoms.length > 0 && (
          <View className="bg-surface rounded-2xl p-4 mb-6 border border-border">
            <Text className="text-sm font-semibold text-foreground mb-3">
              Symptom Intensity
            </Text>
            <View className="flex-row justify-between items-center">
              {[1, 2, 3, 4, 5].map((level) => (
                <Pressable
                  key={level}
                  onPress={() => setSymptomIntensity(level)}
                  style={({ pressed }) => [
                    { transform: [{ scale: pressed ? 0.9 : 1 }] },
                  ]}
                  className={`w-10 h-10 rounded-full items-center justify-center border-2 ${
                    symptomIntensity === level
                      ? "bg-primary border-primary"
                      : "bg-background border-border"
                  }`}
                >
                  <Text
                    className={`font-bold ${
                      symptomIntensity === level
                        ? "text-white"
                        : "text-foreground"
                    }`}
                  >
                    {level}
                  </Text>
                </Pressable>
              ))}
            </View>
            <Text className="text-xs text-muted text-center mt-2">
              1 = Mild, 5 = Severe
            </Text>
          </View>
        )}

        {/* Notes */}
        <View className="mb-6">
          <Text className="text-sm font-semibold text-foreground mb-2">
            Additional Notes
          </Text>
          <TextInput
            value={notes}
            onChangeText={setNotes}
            placeholder="Add any additional observations..."
            placeholderTextColor="#999"
            multiline
            numberOfLines={4}
            className="bg-surface border border-border rounded-2xl p-4 text-foreground"
            style={{ textAlignVertical: "top" }}
          />
        </View>

        {/* Save Button */}
        <Pressable
          onPress={handleSave}
          disabled={isSaving}
          style={({ pressed }) => [
            { transform: [{ scale: pressed && !isSaving ? 0.97 : 1 }] },
          ]}
          className="bg-primary rounded-2xl p-4 items-center mb-6"
        >
          {isSaving ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white font-semibold text-base">
              Save Entry
            </Text>
          )}
        </Pressable>
      </ScrollView>
    </ScreenContainer>
  );
}
