import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";
import { VESLI_KNOWLEDGE } from "@/lib/vesli-knowledge";

const apiKey = process.env.GROQ_API_KEY;
const groq = apiKey ? new Groq({ apiKey }) : null;

const SYSTEM_PROMPT = VESLI_KNOWLEDGE;

export async function POST(req: NextRequest) {
  try {
    if (!groq) {
      return NextResponse.json(
        { error: "VESLI is currently sleeping (GROQ_API_KEY not configured)." },
        { status: 500 }
      );
    }

    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Invalid messages format." },
        { status: 400 }
      );
    }

    // Format chat history for Groq (OpenAI compatible)
    const formattedMessages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...messages.map((msg: any) => ({
        role: msg.role === "assistant" ? "assistant" : "user",
        content: msg.content,
      }))
    ];

    const completion = await groq.chat.completions.create({
      messages: formattedMessages as any,
      model: "llama-3.3-70b-versatile",
    });

    const responseText = completion.choices[0]?.message?.content || "I have no words!";

    return NextResponse.json({ text: responseText });
  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      { error: "Failed to communicate with VESLI's new Groq brain." },
      { status: 500 }
    );
  }
}
