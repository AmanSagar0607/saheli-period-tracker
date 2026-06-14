/**
 * Wellness Suggestions Engine for Saheli Period Tracker
 * Provides personalized Ayurvedic and diet recommendations based on cycle phase
 */

export interface WellnessSuggestion {
  category: "diet" | "exercise" | "wellness" | "ayurveda" | "mental";
  title: string;
  description: string;
  emoji: string;
  phase: "menstrual" | "follicular" | "ovulation" | "luteal";
}

/**
 * Menstrual Phase Suggestions (Days 1-5)
 * Focus: Rest, recovery, iron replenishment
 */
const MENSTRUAL_SUGGESTIONS: WellnessSuggestion[] = [
  {
    category: "diet",
    title: "Iron-Rich Foods",
    description:
      "Eat iron-rich foods like spinach, beetroot, jaggery, and red meat to replenish blood loss. Pair with vitamin C for better absorption.",
    emoji: "🥬",
    phase: "menstrual",
  },
  {
    category: "diet",
    title: "Warm Spices",
    description:
      "Use warming spices like ginger, turmeric, and cinnamon in your meals. They help with cramps and improve circulation.",
    emoji: "🌶️",
    phase: "menstrual",
  },
  {
    category: "diet",
    title: "Hydration",
    description:
      "Drink warm water with lemon and honey. Herbal teas like chamomile and ginger tea help with cramps and bloating.",
    emoji: "🍵",
    phase: "menstrual",
  },
  {
    category: "exercise",
    title: "Gentle Yoga",
    description:
      "Practice gentle yoga like child's pose, cat-cow stretch, and legs-up-wall pose. Avoid intense workouts.",
    emoji: "🧘‍♀️",
    phase: "menstrual",
  },
  {
    category: "exercise",
    title: "Walking",
    description:
      "Take slow, mindful walks. Light movement helps with cramps without overexertion.",
    emoji: "🚶‍♀️",
    phase: "menstrual",
  },
  {
    category: "wellness",
    title: "Rest & Sleep",
    description:
      "Prioritize 7-9 hours of sleep. Your body needs extra rest during menstruation.",
    emoji: "😴",
    phase: "menstrual",
  },
  {
    category: "wellness",
    title: "Heat Therapy",
    description:
      "Use a heating pad on your lower abdomen for 15-20 minutes to ease cramps naturally.",
    emoji: "🔥",
    phase: "menstrual",
  },
  {
    category: "ayurveda",
    title: "Sesame Oil Massage",
    description:
      "Warm sesame oil massage on lower abdomen and back helps reduce pain and improves circulation (Abhyanga).",
    emoji: "💆‍♀️",
    phase: "menstrual",
  },
  {
    category: "mental",
    title: "Self-Care",
    description:
      "Journal, meditate, or spend time in nature. Emotional care is as important as physical care.",
    emoji: "📝",
    phase: "menstrual",
  },
];

/**
 * Follicular Phase Suggestions (Days 6-12)
 * Focus: Energy building, nutrient absorption, growth
 */
const FOLLICULAR_SUGGESTIONS: WellnessSuggestion[] = [
  {
    category: "diet",
    title: "Fresh Fruits & Vegetables",
    description:
      "Eat seasonal fruits and vegetables. Your digestion is strong now - enjoy salads, sprouts, and raw foods.",
    emoji: "🥗",
    phase: "follicular",
  },
  {
    category: "diet",
    title: "Protein-Rich Foods",
    description:
      "Include dal, paneer, chickpeas, and nuts. Protein supports muscle growth and energy.",
    emoji: "🥜",
    phase: "follicular",
  },
  {
    category: "diet",
    title: "Whole Grains",
    description:
      "Eat ragi, jowar, whole wheat, and quinoa. They provide sustained energy for your active phase.",
    emoji: "🌾",
    phase: "follicular",
  },
  {
    category: "exercise",
    title: "Cardio & Strength",
    description:
      "This is your best time for high-intensity workouts, running, cycling, and strength training.",
    emoji: "💪",
    phase: "follicular",
  },
  {
    category: "exercise",
    title: "Dance & Sports",
    description:
      "Your energy is high - try dance classes, sports, or any activity you enjoy.",
    emoji: "💃",
    phase: "follicular",
  },
  {
    category: "wellness",
    title: "Social Activities",
    description:
      "Your confidence and social energy peak now. Spend time with friends and family.",
    emoji: "👯‍♀️",
    phase: "follicular",
  },
  {
    category: "ayurveda",
    title: "Cooling Practices",
    description:
      "As Pitta increases, use cooling herbs like mint, cilantro, and coconut water.",
    emoji: "🥥",
    phase: "follicular",
  },
  {
    category: "mental",
    title: "New Projects",
    description:
      "Start new projects and set goals. Your mental clarity and motivation are at their peak.",
    emoji: "🎯",
    phase: "follicular",
  },
];

/**
 * Ovulation Phase Suggestions (Days 13-15)
 * Focus: Peak energy, fertility, confidence
 */
const OVULATION_SUGGESTIONS: WellnessSuggestion[] = [
  {
    category: "diet",
    title: "Antioxidant Foods",
    description:
      "Eat berries, dark leafy greens, and colorful vegetables. They support egg health and fertility.",
    emoji: "🫐",
    phase: "ovulation",
  },
  {
    category: "diet",
    title: "Zinc-Rich Foods",
    description:
      "Include pumpkin seeds, cashews, and chickpeas. Zinc supports reproductive health.",
    emoji: "🎃",
    phase: "ovulation",
  },
  {
    category: "diet",
    title: "Healthy Fats",
    description:
      "Eat avocados, coconut oil, and ghee. Healthy fats support hormone balance.",
    emoji: "🥑",
    phase: "ovulation",
  },
  {
    category: "exercise",
    title: "Peak Performance",
    description:
      "Your strength and endurance are highest. Push yourself in workouts - this is your power phase.",
    emoji: "⚡",
    phase: "ovulation",
  },
  {
    category: "wellness",
    title: "Confidence Boost",
    description:
      "You're at your most confident and charismatic. Use this energy for important meetings or presentations.",
    emoji: "✨",
    phase: "ovulation",
  },
  {
    category: "wellness",
    title: "Connection",
    description:
      "Your libido and desire for connection peak. Nurture your relationships.",
    emoji: "💕",
    phase: "ovulation",
  },
  {
    category: "ayurveda",
    title: "Agni Boost",
    description:
      "Your digestive fire (Agni) is strong. Eat warm, well-spiced meals for optimal digestion.",
    emoji: "🔥",
    phase: "ovulation",
  },
  {
    category: "mental",
    title: "Creative Expression",
    description:
      "Your creativity peaks now. Pursue artistic activities, writing, or any creative outlet.",
    emoji: "🎨",
    phase: "ovulation",
  },
];

/**
 * Luteal Phase Suggestions (Days 16-28)
 * Focus: Introspection, preparation, nourishment
 */
const LUTEAL_SUGGESTIONS: WellnessSuggestion[] = [
  {
    category: "diet",
    title: "Magnesium-Rich Foods",
    description:
      "Eat pumpkin seeds, dark chocolate, almonds, and leafy greens. Magnesium reduces PMS symptoms.",
    emoji: "🍫",
    phase: "luteal",
  },
  {
    category: "diet",
    title: "Complex Carbs",
    description:
      "Include sweet potato, oats, and brown rice. They help stabilize serotonin levels.",
    emoji: "🍠",
    phase: "luteal",
  },
  {
    category: "diet",
    title: "Warming Foods",
    description:
      "Eat warm soups, stews, and cooked vegetables. Avoid raw and cold foods.",
    emoji: "🍲",
    phase: "luteal",
  },
  {
    category: "exercise",
    title: "Restorative Yoga",
    description:
      "Practice yin yoga, pilates, or gentle stretching. Avoid intense workouts.",
    emoji: "🧘‍♀️",
    phase: "luteal",
  },
  {
    category: "exercise",
    title: "Walking & Breathing",
    description:
      "Take nature walks and practice deep breathing exercises to calm your nervous system.",
    emoji: "🌿",
    phase: "luteal",
  },
  {
    category: "wellness",
    title: "Introspection",
    description:
      "This is your time for reflection and planning. Journal about your goals and feelings.",
    emoji: "📔",
    phase: "luteal",
  },
  {
    category: "wellness",
    title: "Boundary Setting",
    description:
      "Say no to unnecessary commitments. Protect your energy and prioritize self-care.",
    emoji: "🛡️",
    phase: "luteal",
  },
  {
    category: "ayurveda",
    title: "Vata Pacification",
    description:
      "Balance Vata with warm oils, warm foods, and grounding practices like meditation.",
    emoji: "🪨",
    phase: "luteal",
  },
  {
    category: "mental",
    title: "Creative Planning",
    description:
      "Channel introspective energy into planning, organizing, and preparing for the next cycle.",
    emoji: "📋",
    phase: "luteal",
  },
];

/**
 * Get all suggestions for a specific phase
 */
export function getSuggestionsForPhase(
  phase: "menstrual" | "follicular" | "ovulation" | "luteal"
): WellnessSuggestion[] {
  switch (phase) {
    case "menstrual":
      return MENSTRUAL_SUGGESTIONS;
    case "follicular":
      return FOLLICULAR_SUGGESTIONS;
    case "ovulation":
      return OVULATION_SUGGESTIONS;
    case "luteal":
      return LUTEAL_SUGGESTIONS;
    default:
      return [];
  }
}

/**
 * Get a random suggestion for a phase (for daily tips)
 */
export function getRandomSuggestionForPhase(
  phase: "menstrual" | "follicular" | "ovulation" | "luteal"
): WellnessSuggestion {
  const suggestions = getSuggestionsForPhase(phase);
  return suggestions[Math.floor(Math.random() * suggestions.length)];
}

/**
 * Get suggestions by category
 */
export function getSuggestionsByCategory(
  phase: "menstrual" | "follicular" | "ovulation" | "luteal",
  category: "diet" | "exercise" | "wellness" | "ayurveda" | "mental"
): WellnessSuggestion[] {
  const suggestions = getSuggestionsForPhase(phase);
  return suggestions.filter((s) => s.category === category);
}

/**
 * Get phase description
 */
export function getPhaseDescription(
  phase: "menstrual" | "follicular" | "ovulation" | "luteal"
): string {
  const descriptions: Record<string, string> = {
    menstrual:
      "Menstrual Phase - Your body is shedding the uterine lining. Focus on rest, recovery, and iron replenishment.",
    follicular:
      "Follicular Phase - Estrogen rises, bringing energy and optimism. Perfect for new projects and intense workouts.",
    ovulation:
      "Ovulation Phase - Peak energy, confidence, and fertility. Your best time for important activities.",
    luteal:
      "Luteal Phase - Progesterone rises, bringing introspection. Time for planning and self-care.",
  };
  return descriptions[phase] || "";
}

/**
 * Get all suggestions across all phases
 */
export function getAllSuggestions(): WellnessSuggestion[] {
  return [
    ...MENSTRUAL_SUGGESTIONS,
    ...FOLLICULAR_SUGGESTIONS,
    ...OVULATION_SUGGESTIONS,
    ...LUTEAL_SUGGESTIONS,
  ];
}
