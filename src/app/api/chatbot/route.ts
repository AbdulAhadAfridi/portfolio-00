import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json({ answer: null });
    }

    const lowerMessage = message.toLowerCase();

    // Search through chatbot Q&A entries
    const qas = await prisma.chatbotQA.findMany();

    let bestMatch: string | null = null;
    let bestScore = 0;

    for (const qa of qas) {
      const questionWords = qa.question.toLowerCase().split(/[\s,|]+/);
      const messageWords = lowerMessage.split(/\s+/);

      let matchCount = 0;
      for (const qWord of questionWords) {
        if (qWord.length < 2) continue;
        for (const mWord of messageWords) {
          if (mWord.includes(qWord) || qWord.includes(mWord)) {
            matchCount++;
            break;
          }
        }
      }

      const score = questionWords.length > 0 ? matchCount / questionWords.length : 0;

      if (score > bestScore && score >= 0.3) {
        bestScore = score;
        bestMatch = qa.answer;
      }
    }

    return NextResponse.json({ answer: bestMatch });
  } catch {
    return NextResponse.json({ answer: null }, { status: 500 });
  }
}
