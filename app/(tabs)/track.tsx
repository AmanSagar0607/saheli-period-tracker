import { Text, View, Pressable } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useRouter } from "expo-router";

export default function TrackScreen() {
  const router = useRouter();

  return (
    <ScreenContainer className="p-6 items-center justify-center">
      <View className="gap-4 items-center">
        <Text className="text-3xl">📝</Text>
        <Text className="text-2xl font-bold text-foreground">Quick Log</Text>
        <Text className="text-sm text-muted text-center mb-6">
          Log your period, symptoms, and how you're feeling today
        </Text>
        <Pressable
          onPress={() => router.push("../log-period")}
          style={({ pressed }) => [
            { transform: [{ scale: pressed ? 0.97 : 1 }] },
          ]}
          className="bg-primary rounded-2xl px-8 py-4 items-center"
        >
          <Text className="text-white font-semibold">Start Logging</Text>
        </Pressable>
      </View>
    </ScreenContainer>
  );
}
