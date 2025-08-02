'use client';
import { motion } from "framer-motion";

export default function Categories({ games, onCardSelect }) {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-2">Earnest Cards</h1>
      <p className="text-gray-500 mb-10">Questions for more meaningful conversations.</p>
      <ul className="list gap-5 flex flex-col w-fit items-center">
        {games.map((game) => (
          <motion.li
            layoutId={`card-${game.title}`}
            key={game.title}
            onClick={() => onCardSelect(game)}
            className={`${game.isGenerator ? 'bg-indigo-50 hover:bg-indigo-100' : 'bg-[#eee9df] hover:bg-[#e6e1d7]'
              } rounded-2xl p-4 w-full md:w-96 transition-colors duration-200`}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          >
            <div className="game-wrapper">
              <div className="content-wrapper">
                <motion.h2 layoutId={`title-${game.title}`} className="game-title">
                  {game.title}
                </motion.h2>
                <motion.p layoutId={`description-${game.title}`} className="game-description">
                  {game.description}
                </motion.p>
              </div>
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}