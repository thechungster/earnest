'use client';
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { QuestionCardStack } from "./stack";
import { Questionnaire } from "./Questionnaire";

export const ActiveView = ({ item, onClose, onQuestionsGenerated }) => {
  const [shuffledQuestions, setShuffledQuestions] = useState([]);

  useEffect(() => {
    if (item && item.questions && item.questions.length > 0) {
      const shuffleArray = (array) => {
        const shuffled = [...(array || [])];
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
      };
      setShuffledQuestions(shuffleArray(item.questions));
    }
  }, [item]);

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  if (!item) {
    return null;
  }

  // Determine what content to show inside the card
  const showQuestionnaire = item.isGenerator && !item.hasBeenGenerated;

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
      <div key="active-view-container" className="active-game rounded-none">
        <motion.div
          layoutId={`card-${item.title}`}
          className="inner"
          style={{ backgroundColor: showQuestionnaire ? 'white' : '#eee9df' }}
        >
          <div className="header">
            <div className="header-inner">
              <div className="content-wrapper">
                <motion.h2 layoutId={`title-${item.title}`} className="game-title">
                  {item.hasBeenGenerated ? "Your Generated Deck" : item.title}
                </motion.h2>
                <motion.p layoutId={`description-${item.title}`} className="game-description">
                  {item.description}
                </motion.p>
              </div>
              <motion.button className="button p-2 rounded-full hover:bg-black/10" onClick={onClose}>
                <X />
              </motion.button>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative w-full h-full flex justify-center items-center"
          >
            {showQuestionnaire ? (
              <Questionnaire onQuestionsGenerated={onQuestionsGenerated} />
            ) : (
              <QuestionCardStack questions={shuffledQuestions} background={item.background} />
            )}
          </motion.div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};