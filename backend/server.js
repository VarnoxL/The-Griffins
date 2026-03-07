<<<<<<< Updated upstream
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
    const { code, level = "mild", language = "unknown" } = req.body;

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

Respond in this exact format:

ROAST:
<funny roast here>

WHAT IT DOES:
<brief explanation>

WHAT IS WRONG:
<main issues>

HOW TO IMPROVE:
<clear improvements>

Code:
${code}
`;

    const response = await client.responses.create({
      model: "gpt-5-mini",
      input: prompt,
    });

    res.json({
      roast: response.output_text,
      level,
      language,
    });
  } catch (error) {
    console.error("FULL OPENAI ERROR:", error);
    res.json({
      roast: "Even the AI gave up looking at this code 😭",
      level: "unknown",
      language: "unknown"
    });
  }
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
=======
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
const port = process.env.PORT;

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
    const { code, level = "mild", language = "unknown" } = req.body;

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

Respond in this exact format:

ROAST:
<funny roast here>

WHAT IT DOES:
<brief explanation>

WHAT IS WRONG:
<main issues>

HOW TO IMPROVE:
<clear improvements>

Code:
${code}
`;

    const response = await client.responses.create({
      model: "gpt-5-mini",
      input: prompt,
    });

    res.json({
      roast: response.output_text,
      level,
      language,
    });
  } catch (error) {
    console.error("FULL OPENAI ERROR:", error);
    res.json({
      roast: "Even the AI gave up looking at this code 😭",
      level: "unknown",
      language: "unknown"
    });
  }
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
>>>>>>> Stashed changes
});