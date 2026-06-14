import { ScrollView, Text, View, Pressable, ActivityIndicator, Image } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useRouter } from "expo-router";
import { useState } from "react";
import * as Haptics from "expo-haptics";
import * as OAuth from "@/constants/oauth";

export default function LoginScreen() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      setError(null);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

      // Use the existing OAuth login flow
      await OAuth.startOAuthLogin();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to sign in";
      console.error("[LoginScreen] Sign-in error:", err);
      setError(errorMessage);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
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
        {/* Hero Section */}
        <View className="flex-1 items-center justify-center gap-8 py-12">
          {/* Logo */}
          <View className="items-center gap-4">
            <View className="w-24 h-24 rounded-full bg-primary/20 items-center justify-center">
              <Text className="text-6xl">💜</Text>
            </View>
            <Text className="text-4xl font-bold text-foreground text-center">
              Saheli
            </Text>
            <Text className="text-base text-muted text-center">
              Your Personal Period Tracker & Wellness Companion
            </Text>
          </View>

          {/* Features */}
          <View className="gap-4 w-full">
            <View className="flex-row items-start gap-3">
              <Text className="text-2xl">📊</Text>
              <View className="flex-1">
                <Text className="text-sm font-semibold text-foreground">
                  Track Your Cycle
                </Text>
                <Text className="text-xs text-muted mt-1">
                  Log symptoms, flow, and mood with ease
                </Text>
              </View>
            </View>

            <View className="flex-row items-start gap-3">
              <Text className="text-2xl">💡</Text>
              <View className="flex-1">
                <Text className="text-sm font-semibold text-foreground">
                  Personalized Tips
                </Text>
                <Text className="text-xs text-muted mt-1">
                  Get Ayurveda-based wellness recommendations
                </Text>
              </View>
            </View>

            <View className="flex-row items-start gap-3">
              <Text className="text-2xl">🔒</Text>
              <View className="flex-1">
                <Text className="text-sm font-semibold text-foreground">
                  Private & Secure
                </Text>
                <Text className="text-xs text-muted mt-1">
                  Your data is encrypted and only yours
                </Text>
              </View>
            </View>

            <View className="flex-row items-start gap-3">
              <Text className="text-2xl">🌏</Text>
              <View className="flex-1">
                <Text className="text-sm font-semibold text-foreground">
                  Made for India
                </Text>
                <Text className="text-xs text-muted mt-1">
                  Hindi, Hinglish, and culturally relevant
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Sign In Section */}
        <View className="gap-4 pb-8">
          {/* Error Message */}
          {error && (
            <View className="bg-error/10 rounded-2xl p-4 border border-error">
              <Text className="text-xs font-semibold text-error">{error}</Text>
            </View>
          )}

          {/* Google Sign In Button */}
          <Pressable
            onPress={handleGoogleSignIn}
            disabled={isLoading}
            style={({ pressed }) => [
              { transform: [{ scale: pressed && !isLoading ? 0.97 : 1 }] },
              { opacity: isLoading ? 0.7 : 1 },
            ]}
            className="bg-primary rounded-2xl p-4 items-center flex-row justify-center gap-3"
          >
            {isLoading ? (
              <>
                <ActivityIndicator size="small" color="white" />
                <Text className="text-white font-semibold">Signing in...</Text>
              </>
            ) : (
              <>
                <Text className="text-lg">🔐</Text>
                <Text className="text-white font-semibold">
                  Sign in with Google
                </Text>
              </>
            )}
          </Pressable>

          {/* Info Box */}
          <View className="bg-surface rounded-2xl p-4 border border-border">
            <Text className="text-xs text-muted leading-relaxed">
              By signing in, you agree to our Terms of Service and Privacy Policy. Your period tracking data is encrypted and stored securely.
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
