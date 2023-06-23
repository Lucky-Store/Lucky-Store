require("dotenv").config();

const express = require("express");
const { Configuration, OpenAIApi } = require("openai");

const router = express.Router();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_AI_KEY,
});

const openai = new OpenAIApi(configuration);

router.get("/", (req, res) => {
  res.status(200).json({ message: "Hello from DALL.E ROUTES" });
});

router.post("/", async (req, res) => {
  try {
    const { prompt } = req.body;
    const res = await openai.createImage({
      prompt,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json",
    });
    const image = res.data.data[0].b64_json;
    res.status(200).json({ photo: image });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = router;