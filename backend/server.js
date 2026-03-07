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
  res.send("RoastMyCode backend running ");
});

app.post("/roast", async (req, res) => {
  try {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({ error: "No code provided" });
    }

    const prompt = `
You are a funny and helpful code reviewer.

Roast the code in a playful way (example: "Bro this code looks like it was written during a caffeine overdose ☕")
However, also provide constructive feedback.

1. Roast the code playfully
2. What is wrong with the code?
3. How can it be improved?

Do NOT use profanity. Keep it fun and helpful.

Code:
${code}
`;

    const response = await client.chat.completions.create({
      model: "gpt-5-mini",
      messages: [
        { role: "system", content: "You are a playful coding reviewer." },
        { role: "user", content: prompt }
      ]
    });

    res.json({
      roast: response.choices[0].message.content
    });

  } catch (error) {
    console.error("Error generating roast:", error);
    res.status(500).json({ error: "Failed to generate roast" });
  }
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});