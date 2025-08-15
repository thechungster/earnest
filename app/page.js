'use client';
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Categories from "@/components/sharedLayout";
import { ActiveView } from "@/components/ActiveView";

const GAMES = [
  {
    title: "Generate your own",
    description: "Create a custom deck based on your vibe.",
    isGenerator: true,
  },
  {
    title: "Deep Conversations",
    description: "Carefully curated for cultivating deeper connections.",
    background: { bg: "bg-[#BEB3FF]", text: "text-[#5f52ad]", blob: "bg-[#9181ec]" },
    questions: [
  { "id": 1, "text": "What is a fear you have that you're embarrassed to admit?" },
  { "id": 2, "text": "What is a value you hold that most people don't seem to understand?" },
  { "id": 3, "text": "What's a belief you've changed your mind on recently?" },
  { "id": 4, "text": "What's a lesson you learned the hard way that you're now grateful for?" },
  { "id": 5, "text": "What is the one thing you are most proud of that you built or created yourself?" },
  { "id": 6, "text": "If you could have a conversation with your 16-year-old self, what advice would you give them?" },
  { "id": 7, "text": "What’s a part of your personality that you wish was different?" },
  { "id": 8, "text": "What is a moment from your childhood that you think about often?" },
  { "id": 9, "text": "What is a question you wish people would ask you more often?" },
  { "id": 10, "text": "What's a dream you've given up on, and do you regret it?" },
  { "id": 11, "text": "What does \"home\" mean to you?" },
  { "id": 12, "text": "What is the one thing you would change about the world if you had the power?" },
  { "id": 13, "text": "What is a quality in yourself that you are actively working to improve?" },
  { "id": 14, "text": "What is a small, everyday thing that brings you immense joy?" },
  { "id": 15, "text": "What is the biggest risk you've ever taken? Was it worth it?" },
  { "id": 16, "text": "What is a mistake you made that taught you the most about yourself?" },
  { "id": 17, "text": "What is a goal you're working toward right now that is deeply personal to you?" },
  { "id": 18, "text": "What do you think your future self will thank you for?" },
  { "id": 19, "text": "What is a story about your life that you've never told anyone before?" },
  { "id": 20, "text": "What does unconditional love mean to you?" },
  { "id": 21, "text": "What is a non-monetary gift you’ve received that meant a lot to you?" },
  { "id": 22, "text": "What is a part of your life that you’ve had to make peace with?" },
  { "id": 23, "text": "What does your perfect day look like, from start to finish?" },
  { "id": 24, "text": "What is the biggest challenge you have overcome?" },
  { "id": 25, "text": "What is a piece of advice you’ve received that has stuck with you?" },
  { "id": 26, "text": "What does success look like to you beyond career and money?" },
  { "id": 27, "text": "What is a memory that makes you feel deeply connected to someone?" },
  { "id": 28, "text": "What is something you're afraid to try because you're worried about failing?" },
  { "id": 29, "text": "What is a personal tradition you have that is meaningful to you?" },
  { "id": 30, "text": "What is a compliment you've received that you'll never forget?" },
  { "id": 31, "text": "What is a responsibility you had to take on too early in life?" },
  { "id": 32, "text": "What is a truth about you that you think others would find surprising?" },
  { "id": 33, "text": "What is the most significant book, movie, or song that has influenced your life?" },
  { "id": 34, "text": "What are you most grateful for in your life right now?" },
  { "id": 35, "text": "What is a moment you've experienced pure, unadulterated happiness?" },
  { "id": 36, "text": "What is a way you’ve hurt someone that you still think about?" },
  { "id": 37, "text": "What is something you’ve done that you hope no one ever finds out about?" },
  { "id": 38, "text": "What is a part of your life that you feel is a work in progress?" },
  { "id": 39, "text": "What do you think is your greatest strength and your greatest weakness?" },
  { "id": 40, "text": "What does your ideal relationship with your family look like?" },
  { "id": 41, "text": "What is a cause or issue that you feel passionate about?" },
  { "id": 42, "text": "What is a quality you admire in someone else that you wish you had?" },
  { "id": 43, "text": "What is a habit you’d like to break?" },
  { "id": 44, "text": "What do you need more of in your life right now?" },
  { "id": 45, "text": "What is something you're still figuring out about yourself?" },
  { "id": 46, "text": "What do you think is your life's purpose?" },
  { "id": 47, "text": "What do you think you're most often misunderstood about?" },
  { "id": 48, "text": "What is a time in your life when you felt truly lost?" },
  { "id": 49, "text": "What is a legacy you hope to leave behind?" },
  { "id": 50, "text": "What is a dream or goal that you're most afraid of not achieving?" },

    ],
  },
  {
    title: "Self-reflection",
    description: "Prompts for introspection and self-development.",
    background: { bg: "bg-[#fbf292]", text: "text-[#98913b]", blob: "bg-[#e8ca46]" },
    questions: [
        { "id": 1, "text": "What is one fear you have that, if you faced it, would change your life for the better?" },
  { "id": 2, "text": "When was the last time you felt a deep sense of peace, and what did it feel like in your body?" },
  { "id": 3, "text": "What is a specific negative self-talk pattern you have, and where do you think it comes from?" },
  { "id": 4, "text": "What is a personal strength of yours that you believe is currently underdeveloped?" },
  { "id": 5, "text": "What does your inner critic tell you that you secretly believe to be true?" },
  { "id": 6, "text": "If you were to write a letter to your future self five years from now, what would you want to remind them of?" },
  { "id": 7, "text": "What is the most uncomfortable truth you’ve had to accept about yourself this past year?" },
  { "id": 8, "text": "What is a personal boundary that, when crossed, causes you the most emotional pain?" },
  { "id": 9, "text": "What is an assumption you've made about yourself that holds you back from taking risks?" },
  { "id": 10, "text": "What are you doing today that your future self will thank you for?" },
  { "id": 11, "text": "What is a small, everyday habit that brings you a quiet sense of joy and contentment?" },
  { "id": 12, "text": "What is a feeling you tend to avoid, and what is a kinder way to sit with it?" },
  { "id": 13, "text": "What does it mean to you to live an authentic life, and are you currently living one?" },
  { "id": 14, "text": "What is a dream you've put on hold, and what's the one thing that still pulls you toward it?" },
  { "id": 15, "text": "What does your soul truly need that your ego has been ignoring?" },
  { "id": 16, "text": "What is a belief you have that, if it weren't true, would fundamentally change your life?" },
  { "id": 17, "text": "What does your ideal evening routine look like to help you truly decompress?" },
  { "id": 18, "text": "What is a specific way you can practice more self-compassion this week?" },
  { "id": 19, "text": "What is one small change in your environment that would significantly improve your daily mood?" },
  { "id": 20, "text": "What is a part of your life where you feel the most resistance or friction, and why?" },
  { "id": 21, "text": "What does a life of purpose mean to you, and are you moving in that direction?" },
  { "id": 22, "text": "What is one thing you can let go of today to feel less burdened?" },
  { "id": 23, "text": "What is a personal accomplishment that felt impossible at the time, and what did it teach you?" },
  { "id": 24, "text": "What is a feeling that you often confuse with another?" },
  { "id": 25, "text": "What are you holding onto that you need to forgive yourself for?" },
  { "id": 26, "text": "What is a daily practice that could help quiet your mind and bring you more clarity?" },
  { "id": 27, "text": "What is a creative project that you've been wanting to start, and what is holding you back?" },
  { "id": 28, "text": "What is the single biggest source of anxiety in your life right now, and what's one immediate step you can take to alleviate it?" },
  { "id": 29, "text": "Who do you tend to compare yourself to, and what about them do you truly admire?" },
  { "id": 30, "text": "What is one moment from your childhood that makes you feel deeply loved?" },
  { "id": 31, "text": "What is a quality in yourself that you are most proud of, but rarely talk about?" },
  { "id": 32, "text": "What does your intuition tell you about a current situation, even if it’s inconvenient?" },
  { "id": 33, "text": "What is a value you've inherited from your family that you're ready to either claim as your own or release?" },
  { "id": 34, "text": "What is an unexamined belief you have about your own potential?" },
  { "id": 35, "text": "What is a part of your emotional or mental life that you're ready to declutter?" },
  { "id": 36, "text": "What is a personal legacy you hope to leave behind that has nothing to do with your career?" },
  { "id": 37, "text": "What is a compliment you wish you could give yourself without hesitation?" },
  { "id": 38, "text": "What is a truth about the world that you struggle to accept?" },
  { "id": 39, "text": "What is something you're doing right now that you know is a waste of your precious time?" },
  { "id": 40, "text": "What is a relationship in your life that you know needs more of your honest attention?" },
  { "id": 41, "text": "What does your spirit need to feel truly nourished?" },
  { "id": 42, "text": "What is a specific action you can take to be more present in your own life?" },
  { "id": 43, "text": "What is a difficult emotion you're currently navigating, and what is one lesson it is trying to teach you?" },
  { "id": 44, "text": "What does true resilience look like in your life, not just in your career?" },
  { "id": 45, "text": "What is a piece of art that you've returned to again and again throughout your life?" },
  { "id": 46, "text": "What is one thing you can do for yourself today that will fill you up?" },
  { "id": 47, "text": "What does your ideal future self think about your current choices?" },
  { "id": 48, "text": "What is a past version of yourself that you're proud of, and what did you learn from them?" },
  { "id": 49, "text": "What is one commitment you can make to yourself that will honor your true needs?" },
  { "id": 50, "text": "What do you truly need to release to feel a greater sense of freedom?" },
    ],
  },
  {
    title: "Date Nights",
    description: "Spark deeper connection.",
    background: { bg: "bg-[#ffd0eb]", text: "text-[#f85fb7]", blob: "bg-[#f681c4]" },
    questions: [
      { id: 2, text: "What is your favorite way to spend a rainy day?" },
      { id: 6, text: "What is your favorite way to spend a sunny day?" },
    ],
  },
];

export default function Home() {
  const [activeItem, setActiveItem] = useState(null);

  const handleCardSelect = (item) => {
    setActiveItem(item);
  };

  const handleQuestionsGenerated = (generatedGames) => {
    if (generatedGames && generatedGames.length > 0) {
      // Update the active card with the generated questions and data
      const generatedDeck = {
        ...activeItem,
        description: generatedGames[0].description,
        questions: generatedGames[0].questions,
        background: generatedGames[0].background,
        hasBeenGenerated: true, // This flag tells the card to show questions now
      };
      setActiveItem(generatedDeck);
    } else {
      setActiveItem(null); // Close if generation fails
    }
  };

  const handleClose = () => {
    setActiveItem(null);
  };

  return (
    <main className="flex min-h-screen flex-col items-center md:p-12 gap-6 bg-white">
      <AnimatePresence>
        {!activeItem && (
          <motion.div key="categories" exit={{ opacity: 0 }}>
            <Categories games={GAMES} onCardSelect={handleCardSelect} />
          </motion.div>
        )}
      </AnimatePresence>

      {activeItem && (
        <ActiveView
          item={activeItem}
          onClose={handleClose}
          onQuestionsGenerated={handleQuestionsGenerated}
        />
      )}
    </main>
  );
}
