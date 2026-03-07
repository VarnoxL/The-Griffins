import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
const port = process.env.PORT || 5533;

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("RoastMyCode backend running");
});

app.post("/roast", async (req, res) => {
  const { code, level = "mild", language = "unknown" } = req.body;

  try {
    if (!code || !code.trim()) {
      return res.status(400).json({ error: "No code provided" });
    }

    let roastStyle = "light and playful";
    if (level === "medium") roastStyle = "sarcastic but friendly";
    if (level === "brutal") roastStyle = "very sarcastic but still helpful";

    const prompt = `
You are a funny and helpful code reviewer.

The programming language is: ${language}.

Roast the code in a ${roastStyle} way, but do not use profanity or anything hateful.

Return your answer as valid JSON in exactly this format:
{
  "score": number,
  "roast": "string",
  "Summary": "string",
  "WhatWrongWithCode": "string",
  "Improvement": "string"
}

Rules:
- score must be an integer from 1 to 10
- 1 means terrible code that doesn't work at all
- 10 means excellent code
- keep the roast funny but helpful
- do not include markdown
- do not include code fences

Code to roast:
${code}
`;

    const response = await client.responses.create({
      model: "gpt-5-mini",
      input: prompt,
    });

    const text = response.output_text;

    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch {
      parsed = {
        score: 5,
        roast: "The AI roasted the code so hard it forgot the JSON format 😭",
        Summary: "The response could not be parsed.",
        WhatWrongWithCode: "The AI returned invalid JSON.",
        Improvement: "Try the request again."
      };
    }

    res.json({
      score: parsed.score,
      roast: parsed.roast,
      summary: parsed.Summary,
      whatWrongWithCode: parsed.WhatWrongWithCode,
      improvement: parsed.Improvement,
      level,
      language,
    });
  } catch (error) {
    console.error("FULL OPENAI ERROR:", error);
    res.status(500).json({
      score: 5,
      roast: "Even the AI gave up looking at this code 😭",
      summary: "The code is so bad that it can't be summarized.",
      whatWrongWithCode: "Something failed during analysis.",
      improvement: "Try again in a moment.",
      level,
      language
    });
  }
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});