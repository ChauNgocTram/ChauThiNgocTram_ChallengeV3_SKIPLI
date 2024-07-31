const db = require('../config/firebase');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const generatePostCaptions = async (req, res) => {
  const { socialNetwork, subject, tone } = req.body;

  if (!socialNetwork || !subject || !tone) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Generate 5 captions for a ${socialNetwork} post about "${subject}" with a "${tone}" tone.`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();
    
   
    const lines = text.split('\n').filter(line => line.trim() !== '' && !line.startsWith('##') && !line.startsWith('Here are'));
  
    const captions = lines.slice(0, 5).map(line => line.replace(/^\d+\.\s*/, '').trim());

    res.json({ captions });
  } catch (error) {
    console.error("Error generating captions:", error);
    res.status(500).json({ error: "Failed to generate captions" });
  }
};

const getPostIdeas = async (req, res) => {
  const { topic } = req.body;

  if (!topic) {
    return res.status(400).json({ error: "Missing required field: topic" });
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Generate 10 post ideas about "${topic}". Provide each idea on a new line.`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();

    const lines = text.split('\n').filter(line => line.trim() !== '' && !line.startsWith('##') && !line.startsWith('Here are'));

    const ideas = lines.slice(0, 10).map(line => line.trim());

    res.json({ ideas });
  } catch (error) {
    console.error("Error generating post ideas:", error);
    res.status(500).json({ error: "Failed to generate post ideas" });
  }
};


const createCaptionsFromIdeas = async (req, res) => {
  const { idea } = req.body;

  console.log("Received idea:", idea);

  if (!idea) {
    return res.status(400).json({ error: "Missing required field: idea" });
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Generate 5 captions for the following post idea: "${idea}". Provide each caption on a new line.`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();

    const lines = text.split('\n').filter(line => line.trim() !== '' && !line.startsWith('##') && !line.startsWith('Here are'));

    const captions = lines.slice(0, 5).map(line => line.trim());

    res.json({ captions });
  } catch (error) {
    console.error("Error creating captions from ideas:", error);
    res.status(500).json({ error: "Failed to create captions from ideas" });
  }
};



module.exports = {
  generatePostCaptions,
  getPostIdeas,
  createCaptionsFromIdeas,
};
