import { NextResponse } from "next/server";
import { Groq } from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No audio file provided" }, { status: 400 });
    }

    console.log("Transcribing audio file...", file.size, file.type);

    const translation = await groq.audio.transcriptions.create({
      file: file,
      model: "whisper-large-v3-turbo",
    });

    return NextResponse.json({ text: translation.text });
  } catch (error: any) {
    console.error("Transcription Error:", error.message || error);
    return NextResponse.json(
      { error: "Failed to transcribe audio", details: error.message },
      { status: 500 }
    );
  }
}
