import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = "AIzaSyAi_8aTM9-xgWLlUUBTx5nkY05xG5ige54"; // The key user provided
const genAI = new GoogleGenerativeAI(apiKey);

async function test() {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent("Hello");
    console.log("gemini-1.5-flash OK:", result.response.text());
  } catch (e: any) {
    console.error("gemini-1.5-flash ERROR:", e.message);
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent("Hello");
    console.log("gemini-pro OK:", result.response.text());
  } catch (e: any) {
    console.error("gemini-pro ERROR:", e.message);
  }
}

test();
