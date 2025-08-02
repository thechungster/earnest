'use client';
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { QuestionCardStack } from "./stack";

export const ActiveGame = ({ game, onClose }) => {
  const [shuffledGame, setShuffledGame] = useState(null);

  // Shuffle questions when the component mounts or the game data changes
  useEffect(() => {
    const shuffleArray = (array) => {
      const shuffled = [...(array || [])];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    };

    setShuffledGame({
      ...game,
      questions: shuffleArray(game.questions)
    });
  }, [game]);

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  if (!shuffledGame) {
    return null; // Or a loading spinner
  }

  return (
    <AnimatePresence>
      <motion.div
        key="overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="overlay"
        onClick={onClose}
      />
      <div key="active-game-container" className="active-game rounded-none">
        <motion.div
          layoutId={`card-${shuffledGame.title}`}
          className="inner"
          style={{ backgroundColor: shuffledGame.isGenerator ? 'white' : '#eee9df' }}
        >
          <div className="header">
            <div className="header-inner">
              <div className="content-wrapper">
                <motion.h2
                  layoutId={`title-${shuffledGame.title}`}
                  className="game-title"
                >
                  {shuffledGame.title}
                </motion.h2>
                <motion.p
                  layoutId={`description-${shuffledGame.title}`}
                  className="game-description"
                >
                  {shuffledGame.description}
                </motion.p>
              </div>
              <motion.button
                className="button p-2 rounded-full hover:bg-black/10"
                onClick={onClose}
              >
                <X />
              </motion.button>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative w-full h-full flex justify-center items-center"
          >
            <QuestionCardStack questions={shuffledGame.questions} background={shuffledGame.background} />
          </motion.div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};