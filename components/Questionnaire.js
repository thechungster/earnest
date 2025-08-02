'use client';
import { useState } from "react";

export const Questionnaire = ({ onQuestionsGenerated }) => {
  const [answers, setAnswers] = useState({
    who: "",
    closeness: "",
    vibe: [],
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(null);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAnswers((prev) => ({ ...prev, [name]: value }));
  };

  const handleMultiChoiceChange = (e) => {
    const { value, checked } = e.target;
    setAnswers((prev) => {
      const newVibe = prev.vibe ? [...prev.vibe] : [];
      if (checked) {
        if (!newVibe.includes(value)) {
          newVibe.push(value);
        }
      } else {
        const index = newVibe.indexOf(value);
        if (index > -1) {
          newVibe.splice(index, 1);
        }
      }
      return { ...prev, vibe: newVibe };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsGenerating(true);
    setError(null);

    try {
      const response = await fetch('/api/generate-questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(answers),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate questions');
      }

      const generatedGames = await response.json();
      onQuestionsGenerated(generatedGames);

    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-6 bg-white rounded-xl shadow-lg w-11/12 max-w-2xl">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800">Create Your Deck</h2>
        <p className="text-gray-500 mt-1">Personalize your conversation experience.</p>
      </div>
      <div>
        <label htmlFor="who" className="block text-lg font-semibold text-gray-700 mb-1">
          Who is playing? <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="who"
          id="who"
          placeholder="e.g., Me and my best friend"
          value={answers.who}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3"
          required
        />
      </div>

      <div>
        <p className="text-lg font-semibold text-gray-700">How close are you? <span className="text-gray-400 text-sm font-normal">(Optional)</span></p>
        <div className="flex flex-wrap gap-2 mt-2">
          {["just met", "getting to know each other", "pretty close", "extremely close"].map((level) => (
            <button
              type="button"
              key={level}
              onClick={() => setAnswers((prev) => ({ ...prev, closeness: level }))}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ease-in-out ${answers.closeness === level
                ? "bg-indigo-600 text-white shadow-lg transform scale-105"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-lg font-semibold text-gray-700">What vibe are you going for? <span className="text-gray-400 text-sm font-normal">(Optional)</span></p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
          {["Fun and silly", "Deep and emotional", "Romantic", "Healing/reconnecting", "Thought-provoking", "A mix of everything"].map((vibe) => (
            <label key={vibe} className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 ease-in-out ${answers.vibe.includes(vibe) ? 'bg-indigo-100 border-indigo-500' : 'bg-gray-50 border-gray-200'} border`}>
              <input
                type="checkbox"
                value={vibe}
                checked={answers.vibe.includes(vibe)}
                onChange={handleMultiChoiceChange}
                className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-sm text-gray-700 font-medium">{vibe}</span>
            </label>
          ))}
        </div>
      </div>
      {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      <button
        type="submit"
        disabled={isGenerating || !answers.who}
        className="w-full px-4 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all duration-200 ease-in-out"
      >
        {isGenerating ? (
          <>
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Generating...</span>
          </>
        ) : "Generate Questions"}
      </button>
    </form>
  );
};