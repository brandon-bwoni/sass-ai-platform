'use client'
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { OpenAIApi, Configuration } from "openai";

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})


const openai = new OpenAIApi(configuration)

export async function POST(req: Request) {
  try {
    const { userId } = auth(); 
    const body = await req.json();
    const { messages } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!openai.apiKey) {
      return new NextResponse(`Open AI API key not configured`, { status: 500 });
    }

    if (!messages) {
      return new NextResponse('Messages are required', { status: 400 });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
    });

    return new NextResponse(response.data.choices[0].message.content, { status: 200 }); 
  } catch (error) {
    console.error("CONVERSATION_ERROR", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
