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
    description: "Carefully curated for cultivating friendships.",
    background: { bg: "bg-[#BEB3FF]", text: "text-[#5f52ad]", blob: "bg-[#9181ec]" },
    questions: [
      { id: 1, text: "What is the kindest thing someone did for you recently?" },
      { id: 4, text: "In what areas of life do you care most about what others think?" },
      { id: 5, text: "What do you tell yourself when you succeed?" },
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