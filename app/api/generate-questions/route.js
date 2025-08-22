import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function generateQuestionsWithAI(prompt) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    const questionsArray = text
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0 && (line.startsWith('“') || line.startsWith('"') || /^\d+\./.test(line) === false));

    return questionsArray.map((qText, index) => ({ id: index + 1, text: qText.replace(/["“”]/g, '') }));
  } catch (error) {
    console.error("Error generating content with Google AI:", error);
    throw new Error("Failed to generate questions from AI model.");
  }
}

export async function POST(request) {
  let { who, closeness, vibe, isExtreme } = await request.json();

  if (!who) {
    return NextResponse.json({ error: 'The "Who is playing?" field is required.' }, { status: 400 });
  }

  if (!closeness) {
    closeness = "getting to know each other";
  }
  if (!vibe || vibe.length === 0) {
    vibe = ["A mix of everything"];
  }

  const allVibes = ["Fun and silly", "Deep and emotional", "Romantic", "Healing/reconnecting", "Thought-provoking"];

  let finalVibes;

  if (vibe.includes("A mix of everything")) {
    finalVibes = allVibes;
  } else {
    finalVibes = vibe;
  }

  const NUMBER_OF_QUESTIONS = 20;
  const vibeString = finalVibes.join(', ');
  let prompt;

  if (isExtreme) {
    prompt = `Generate ${NUMBER_OF_QUESTIONS} bold, emotionally intense, or thought-provoking conversation questions for ${who} who are ${closeness} and want a ${vibeString} experience. These should be more extreme than typical icebreakers — aim to create vulnerability, emotional impact, or shocking honesty.

Avoid basic or overused questions. Make the questions feel like they could spark a major revelation, a surprising confession, or a deep emotional moment.

Tone: Intense, honest, occasionally uncomfortable — but still meaningful and safe for conversation.

Respond only with the list of questions, without any explanation. Each question should be in it's own line and should not contain numbering.`;
  } else {
    prompt = `Generate ${NUMBER_OF_QUESTIONS} thought-provoking, emotionally resonant conversation questions for ${who} who are ${closeness} and want a ${vibeString} experience.

Avoid generic or overused questions. Make each one feel tailored and natural for this type of relationship and tone. Keep questions clear and open-ended.

Examples of good formats:
“What’s something you wish you talked about more?”
“When was a time we really understood each other without words?”

Respond only with the list of questions, without any explanation. Each question should be in it's own line and should not contain numbering.`;
  }

  try {
    const generatedQuestions = await generateQuestionsWithAI(prompt);

    if (!generatedQuestions || generatedQuestions.length === 0) {
      throw new Error("AI returned no questions.");
    }

    const game = {
      title: "Your Curated Questions",
      description: `Specially generated for ${who}.`,
      questions: generatedQuestions,
      background: {
        bg: isExtreme ? "bg-red-200" : "bg-[#BEB3FF]",
        text: isExtreme ? "text-red-900" : "text-[#5f52ad]",
        blob: isExtreme ? "bg-red-300" : "bg-[#9181ec]",
      },
    };

    return NextResponse.json([game]);
  } catch (error) {
    console.error('API route error:', error);
    return NextResponse.json({ error: error.message || 'Failed to generate questions' }, { status: 500 });
  }
}