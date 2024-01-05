import { NextResponse } from "next/server";
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

if (!openai.apiKey) {
  throw new Error("OpenAI API key is not defined");
}

export async function POST(request) {
  const body = await request.json();

  if (!body.prompt || body.prompt.length === 0) {
    return NextResponse.error(new Error("El prompt is required"), {
      status: 400,
    });
  }

  try {
    const response = await openai.images.generate({
      prompt: body.prompt,
      model: "dall-e-2",
      n: 1,
      size: "512x512",
    });
    return NextResponse.json(response.data[0].url);
  } catch (error) {
    return NextResponse.error(error, {
      status: 500,
    });
  }
}
