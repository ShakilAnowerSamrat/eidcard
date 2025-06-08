import { NextResponse } from "next/server"

const OPENROUTER_API_KEY =
  process.env.OPENROUTER_API_KEY || "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"

export async function POST(request: Request) {
  try {
    const { name, relationship, tone, language } = await request.json()

    // Create a more focused prompt based on tone
    let toneInstruction = ""
    switch (tone) {
      case "unique":
        toneInstruction =
          "Create an unconventional, creative, and memorable wish that stands out from typical greetings. Be innovative and surprising while remaining respectful."
        break
      case "spiritual":
        toneInstruction = "Focus on spiritual blessings, divine guidance, and religious significance of Eid."
        break
      case "humorous":
        toneInstruction = "Include light humor and playful elements while maintaining respect for the occasion."
        break
      case "poetic":
        toneInstruction = "Use beautiful, lyrical language with metaphors and elegant expressions."
        break
      case "formal":
        toneInstruction = "Use formal, respectful language appropriate for professional or formal relationships."
        break
      case "emotional":
        toneInstruction = "Express deep emotions, love, and heartfelt sentiments."
        break
      case "playful":
        toneInstruction = "Use a fun, lighthearted approach with cheerful expressions."
        break
      case "traditional":
        toneInstruction = "Use traditional Islamic greetings and classical expressions."
        break
      case "inspirational":
        toneInstruction = "Include motivational and uplifting messages that inspire hope and positivity."
        break
      case "casual":
        toneInstruction = "Use relaxed, friendly language as if talking to a close friend."
        break
      default:
        toneInstruction = "Use a respectful and warm tone appropriate for the relationship."
    }

    // Language mapping
    const languageMap: { [key: string]: string } = {
      english: "English",
      arabic: "Arabic",
      bengali: "Bengali",
      urdu: "Urdu",
      hindi: "Hindi",
      turkish: "Turkish",
      indonesian: "Indonesian",
      malay: "Malay",
      french: "French",
      spanish: "Spanish",
    }

    const targetLanguage = languageMap[language] || "English"

    const systemPrompt = `You are an expert at writing personalized Eid greeting messages. Generate exactly one primary message and 2 alternative variations.

Rules:
- Keep each message concise (2-4 sentences maximum)
- Make it personal and warm
- Avoid meta-commentary or explanations
- Don't include subject lines or formatting instructions
- Focus on the specific relationship and tone requested
- ${toneInstruction}

Format your response as JSON:
{
  "primary": "main message here",
  "alternatives": ["alternative 1", "alternative 2"]
}`

    const userPrompt = `Generate an Eid-ul-Adha greeting message for my ${relationship} named ${name}. 
Tone: ${tone}
Language: ${targetLanguage}
Make it appropriate for the relationship and tone specified.`

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        "HTTP-Referer": "https://eid-greetings.app",
        "X-Title": "Eid Greetings App",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-r1-0528:free",
        messages: [
          {
            role: "system",
            content: systemPrompt,
          },
          {
            role: "user",
            content: userPrompt,
          },
        ],
        response_format: { type: "json_object" },
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      return NextResponse.json({ error: errorData }, { status: response.status })
    }

    const data = await response.json()
    const generatedContent = data.choices[0].message.content

    try {
      const parsedContent = JSON.parse(generatedContent)
      return NextResponse.json({
        primary: parsedContent.primary,
        alternatives: parsedContent.alternatives || [],
      })
    } catch (parseError) {
      // Fallback if JSON parsing fails
      return NextResponse.json({
        primary: generatedContent,
        alternatives: [],
      })
    }
  } catch (error) {
    console.error("Error generating message:", error)
    return NextResponse.json({ error: "Failed to generate message" }, { status: 500 })
  }
}
