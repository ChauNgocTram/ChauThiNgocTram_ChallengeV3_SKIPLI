const db = require('../config/firebase');

const generatePostCaptions = async (req, res) => {
  const { socialNetwork, subject, tone } = req.body;
  // Call Gemini API to generate captions (pseudo-code)
  const captions = await generateCaptionsFromAI({ socialNetwork, subject, tone });
  res.json({ captions });
};

const getPostIdeas = async (req, res) => {
  const { topic } = req.body;
  // Call Gemini API to generate post ideas (pseudo-code)
  const ideas = await generatePostIdeasFromAI({ topic });
  res.json({ ideas });
};

const createCaptionsFromIdeas = async (req, res) => {
  const { idea } = req.body;
  // Call Gemini API to create captions from ideas (pseudo-code)
  const captions = await createCaptionsFromAI({ idea });
  res.json({ captions });
};

const saveGeneratedContent = async (req, res) => {
  const { topic, data } = req.body;
  const contentId = db.ref('generated_contents').push().key;
  await db.ref(`generated_contents/${contentId}`).set({ topic, data });
  res.json({ success: true, contentId });
};

module.exports = {
  generatePostCaptions,
  getPostIdeas,
  createCaptionsFromIdeas,
  saveGeneratedContent
};
