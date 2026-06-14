import {
  ScrollView,
  Text,
  View,
  Pressable,
  TextInput,
  FlatList,
} from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useState } from "react";
import * as Haptics from "expo-haptics";

interface GlossaryItem {
  id: string;
  term: string;
  english: string;
  hindi: string;
  hinglish: string;
  simpleExplanation: string;
  scientificExplanation: string;
  emoji: string;
}

const GLOSSARY: GlossaryItem[] = [
  {
    id: "1",
    term: "Menstruation",
    english: "Menstruation",
    hindi: "मासिक धर्म (Maasik Dharm)",
    hinglish: "Period / Periods",
    simpleExplanation:
      "Your period is when your body releases blood and tissue from your uterus. It usually happens once a month and lasts 3-7 days.",
    scientificExplanation:
      "Menstruation is the shedding of the uterine lining (endometrium) when pregnancy does not occur, resulting in vaginal bleeding that typically lasts 3-7 days.",
    emoji: "🩸",
  },
  {
    id: "2",
    term: "Cycle",
    english: "Menstrual Cycle",
    hindi: "मासिक चक्र (Maasik Chakra)",
    hinglish: "Cycle",
    simpleExplanation:
      "Your cycle is the monthly process your body goes through. It's usually about 28 days long, but can be 21-35 days. It has 4 phases.",
    scientificExplanation:
      "The menstrual cycle is a monthly hormonal cycle in people with female reproductive systems, typically 21-35 days, consisting of menstrual, follicular, ovulation, and luteal phases.",
    emoji: "📅",
  },
  {
    id: "3",
    term: "Ovulation",
    english: "Ovulation",
    hindi: "अंडोत्सर्ग (Andotsarg)",
    hinglish: "Ovulation",
    simpleExplanation:
      "Ovulation is when your ovary releases an egg. This usually happens around day 14 of your cycle. This is when you're most likely to get pregnant.",
    scientificExplanation:
      "Ovulation is the release of a mature egg from the ovary, typically occurring around the middle of the menstrual cycle. This is the most fertile period.",
    emoji: "✨",
  },
  {
    id: "4",
    term: "Dysmenorrhea",
    english: "Dysmenorrhea",
    hindi: "कष्टार्तव (Kashtartav)",
    hinglish: "Period Pain / Painful Periods",
    simpleExplanation:
      "Period pain is when you have cramps or pain in your belly during your period. It's very common and usually goes away in a few days.",
    scientificExplanation:
      "Dysmenorrhea is painful menstruation caused by uterine contractions due to prostaglandin release. Primary dysmenorrhea has no underlying condition.",
    emoji: "😣",
  },
  {
    id: "5",
    term: "Hormone",
    english: "Hormone",
    hindi: "हार्मोन (Harmon)",
    hinglish: "Hormone",
    simpleExplanation:
      "Hormones are chemicals in your body that control many things, including your period. They go up and down during your cycle.",
    scientificExplanation:
      "Hormones are signaling molecules produced by endocrine glands that regulate bodily functions. Key menstrual cycle hormones include estrogen, progesterone, FSH, and LH.",
    emoji: "⚗️",
  },
  {
    id: "6",
    term: "PCOS",
    english: "Polycystic Ovary Syndrome",
    hindi: "पॉलीसिस्टिक ओवरी सिंड्रोम (PCOS)",
    hinglish: "PCOS",
    simpleExplanation:
      "PCOS is a condition where your ovaries produce extra hormones. This can cause irregular periods, acne, and weight gain. Many Indian women have PCOS.",
    scientificExplanation:
      "PCOS is an endocrine disorder characterized by hyperandrogenism, ovulatory dysfunction, and polycystic ovarian morphology. Affects 1 in 5 Indian women.",
    emoji: "🔬",
  },
  {
    id: "7",
    term: "PMS",
    english: "Premenstrual Syndrome",
    hindi: "प्रीमेंस्ट्रुअल सिंड्रोम (PMS)",
    hinglish: "PMS",
    simpleExplanation:
      "PMS is when you feel moody, bloated, or have headaches before your period. It usually goes away once your period starts.",
    scientificExplanation:
      "PMS is a collection of physical and emotional symptoms that occur 1-2 weeks before menstruation due to hormonal changes.",
    emoji: "😔",
  },
  {
    id: "8",
    term: "Follicular Phase",
    english: "Follicular Phase",
    hindi: "फॉलिकुलर फेज (Follicular Faze)",
    hinglish: "Follicular Phase",
    simpleExplanation:
      "This is the first phase of your cycle, from day 1 to around day 13. Your energy is high and you feel good. This is a good time to exercise.",
    scientificExplanation:
      "The follicular phase begins on the first day of menstruation and lasts until ovulation. FSH levels rise, causing follicle development and estrogen production.",
    emoji: "🌸",
  },
  {
    id: "9",
    term: "Luteal Phase",
    english: "Luteal Phase",
    hindi: "ल्यूटियल फेज (Luteal Faze)",
    hinglish: "Luteal Phase",
    simpleExplanation:
      "This is the last phase of your cycle, from after ovulation until your period. You might feel tired or moody. It's good to rest more during this time.",
    scientificExplanation:
      "The luteal phase follows ovulation and lasts until menstruation. Progesterone levels rise, preparing the uterus for potential pregnancy.",
    emoji: "🌙",
  },
];

export default function KnowledgeScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showSimple, setShowSimple] = useState(true);

  const filteredGlossary = GLOSSARY.filter(
    (item) =>
      item.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.english.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.hindi.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleExpand = (id: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <ScreenContainer className="p-6">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Text className="text-2xl font-bold text-foreground mb-2">
          Learn About Your Body
        </Text>
        <Text className="text-sm text-muted mb-6">
          Understand the science behind your period in simple words
        </Text>

        {/* Toggle Simple/Scientific */}
        <View className="flex-row gap-2 mb-6">
          <Pressable
            onPress={() => setShowSimple(true)}
            style={({ pressed }) => [
              { transform: [{ scale: pressed ? 0.95 : 1 }] },
            ]}
            className={`flex-1 py-2 px-4 rounded-lg border-2 items-center ${
              showSimple
                ? "bg-primary border-primary"
                : "bg-background border-border"
            }`}
          >
            <Text
              className={`text-xs font-semibold ${
                showSimple ? "text-white" : "text-foreground"
              }`}
            >
              Simple
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setShowSimple(false)}
            style={({ pressed }) => [
              { transform: [{ scale: pressed ? 0.95 : 1 }] },
            ]}
            className={`flex-1 py-2 px-4 rounded-lg border-2 items-center ${
              !showSimple
                ? "bg-primary border-primary"
                : "bg-background border-border"
            }`}
          >
            <Text
              className={`text-xs font-semibold ${
                !showSimple ? "text-white" : "text-foreground"
              }`}
            >
              Scientific
            </Text>
          </Pressable>
        </View>

        {/* Search */}
        <TextInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search terms..."
          placeholderTextColor="#999"
          className="bg-surface border border-border rounded-2xl px-4 py-3 text-foreground mb-6"
        />

        {/* Glossary Items */}
        <View className="gap-3 mb-6">
          {filteredGlossary.map((item) => (
            <Pressable
              key={item.id}
              onPress={() => toggleExpand(item.id)}
              style={({ pressed }) => [
                { transform: [{ scale: pressed ? 0.98 : 1 }] },
              ]}
              className="bg-surface rounded-2xl border border-border overflow-hidden"
            >
              {/* Header */}
              <View className="p-4 flex-row items-center justify-between">
                <View className="flex-1 flex-row items-center gap-3">
                  <Text className="text-2xl">{item.emoji}</Text>
                  <View className="flex-1">
                    <Text className="text-sm font-semibold text-foreground">
                      {item.term}
                    </Text>
                    <Text className="text-xs text-muted mt-1">
                      {item.hindi}
                    </Text>
                  </View>
                </View>
                <Text className="text-lg text-primary">
                  {expandedId === item.id ? "−" : "+"}
                </Text>
              </View>

              {/* Expanded Content */}
              {expandedId === item.id && (
                <View className="border-t border-border px-4 py-3 gap-3">
                  {/* Hinglish */}
                  <View>
                    <Text className="text-xs font-semibold text-muted mb-1">
                      Hinglish
                    </Text>
                    <Text className="text-sm text-foreground">
                      {item.hinglish}
                    </Text>
                  </View>

                  {/* English */}
                  <View>
                    <Text className="text-xs font-semibold text-muted mb-1">
                      English
                    </Text>
                    <Text className="text-sm text-foreground">
                      {item.english}
                    </Text>
                  </View>

                  {/* Explanation */}
                  <View>
                    <Text className="text-xs font-semibold text-muted mb-1">
                      {showSimple ? "Simple Explanation" : "Scientific Explanation"}
                    </Text>
                    <Text className="text-sm text-foreground leading-relaxed">
                      {showSimple
                        ? item.simpleExplanation
                        : item.scientificExplanation}
                    </Text>
                  </View>
                </View>
              )}
            </Pressable>
          ))}
        </View>

        {/* Info Box */}
        <View className="bg-primary/10 rounded-2xl p-4 border border-primary">
          <Text className="text-xs font-semibold text-primary mb-2">
            💡 Did You Know?
          </Text>
          <Text className="text-xs text-primary leading-relaxed">
            Your period is completely normal and natural. Every girl and woman
            goes through it. If you have questions, don't hesitate to ask a
            trusted adult or doctor!
          </Text>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
