import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(".")); 

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Sahi model ka istemal
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

app.post("/api/message", async (req, res) => {
  try {
    const { message } = req.body;
    const result = await model.generateContent(message);
    const text = result.response.text();
    res.json({ reply: text });
  } catch (error) {
    console.error("Gemini error:", error);
    res.status(500).json({ error: "Something went wrong." });
  }
});

app.listen(5000, () =>
  console.log("✅ Gemini Chatbot Server running on http://localhost:5000")
);
