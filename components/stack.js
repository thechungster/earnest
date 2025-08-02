'use client';
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QuestionCard } from "./card";

export const QuestionCardStack = ({ questions, background }) => {
  const [stack, setStack] = useState([]);

  useEffect(() => {
    setStack(questions);
  }, [questions]);

  const handleSwipeComplete = () => {
    setStack((prevStack) => (prevStack ? prevStack.slice(1) : []));
  };

  return (
    <div className="relative h-[85dvh] w-full flex justify-center items-center">
      <AnimatePresence>
        {stack && stack.slice(0, 1).map((question, index) => (
          <motion.div
            key={question.id}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: 1000, transition: { duration: 0.5 } }}
            transition={{ duration: 0.4 }}
            className="absolute"
          >
            <QuestionCard question={question} onSwipeComplete={handleSwipeComplete} background={background} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};