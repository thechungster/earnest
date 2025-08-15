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
    title: "Self-knowledge",
    description: "Prompts for personal growth.",
    background: { bg: "bg-[#fbf292]", text: "text-[#98913b]", blob: "bg-[#e8ca46]" },
    questions: [
      { id: 3, text: "What is one thing you are grateful for today?" },
      { id: 14, text: "When do you feel lonely?" },
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
