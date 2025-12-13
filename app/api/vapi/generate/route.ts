import { generateText } from "ai";
import { groq } from "@ai-sdk/groq";

import { db } from "@/firebase/admin";
import { getRandomInterviewCover } from "@/lib/utils";

export async function POST(request: Request) {
  const { type, role, level, techstack, amount, userid } = await request.json();

  try {
    const { text } = await generateText({
      model: groq("llama-3.1-8b-instant"),
      prompt: `
Return ONLY a JSON array.
Generate ${amount} ${level} ${type} interview questions for a ${role}.
Focus on ${techstack}.
No explanations.
      `,
    });

    // 🔐 SAFE PARSING (IMPORTANT)
    let questions: { question: string; type: string }[] = [];

    try {
      const parsed = JSON.parse(text.trim());

      questions = parsed.map((q: any) => ({
        question: q.question,
        type: q.type || "open-ended",
      }));
    } catch (e) {
      throw new Error("Invalid AI response format");
    }

    // 💾 Save to Firestore
    await db.collection("interviews").add({
      role,
      type,
      level,
      techstack: techstack.split(","),
      questions,
      userId: userid,
      finalized: true,
      coverImage: getRandomInterviewCover(),
      createdAt: new Date().toISOString(),
    });

    // ✅ API response
    return Response.json({ success: true, questions }, { status: 200 });
  } catch (error) {
    console.error("API Error:", error);
    return Response.json(
      { success: false, error: "AI generation failed" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return Response.json({ success: true, data: "Thank you!" }, { status: 200 });
}
