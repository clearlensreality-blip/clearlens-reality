import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { image } = await req.json();

    if (!image) {
      return NextResponse.json(
        { error: "No image provided" },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "Missing Gemini API key" },
        { status: 500 }
      );
    }

    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-vision:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: "Describe this image in detailed structured format." },
                {
                  inlineData: {
                    data: image,
                    mimeType: "image/jpeg",
                  },
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await geminiRes.json();

    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No description generated.";

    return NextResponse.json({ result: text });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to process image" },
      { status: 500 }
    );
  }
}
