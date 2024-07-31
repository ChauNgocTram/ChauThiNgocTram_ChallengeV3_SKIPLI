require("dotenv").config();
const userModel = require("../models/userModel");
const { Vonage } = require('@vonage/server-sdk');

const apiKey = process.env.NEXMO_API_KEY;
const apiSecret = process.env.NEXMO_API_SECRET;
const nexmoPhoneNumber = process.env.NEXMO_PHONE_NUMBER;

const vonage = new Vonage({
    apiKey,
    apiSecret
});

const normalizePhoneNumber = (phoneNumber) => {
  const cleaned = phoneNumber.replace(/[^0-9]/g, '');
  return cleaned.startsWith('0') ? `+84${cleaned.substring(1)}` : `+${cleaned}`;
};

const createNewAccessCode = async (req, res) => {
  const { phoneNumber } = req.body;

  if (!phoneNumber) {
    return res.status(400).json({ error: "Phone number is required" });
  }

  const normalizedPhoneNumber = normalizePhoneNumber(phoneNumber);

  if (!/^\+\d+$/.test(normalizedPhoneNumber)) {
    return res.status(400).json({ error: "Invalid phone number format" });
  }

  try {
    const accessCode = Math.floor(100000 + Math.random() * 900000).toString();
    await userModel.createNewAccessCode(normalizedPhoneNumber, accessCode);

    const from = nexmoPhoneNumber;
    const to = normalizedPhoneNumber;
    const text = `Your access code is ${accessCode}`;

    const response = await vonage.sms.send({ to, from, text });

    if (response.messages[0].status === '0') {
      return res.json({ accessCode });
    } else {
      return res.status(500).json({ error: `Failed to send SMS: ${response.messages[0].errorText}` });
    }
  } catch (error) {
    return res.status(500).json({ error: "Failed to create access code" });
  }
};

const validateAccessCode = async (req, res) => {
  const { phoneNumber, accessCode } = req.body;

  const normalizedPhoneNumber = normalizePhoneNumber(phoneNumber);

  try {
    const result = await userModel.validateAccessCode(normalizedPhoneNumber, accessCode);
    if (result.success) {
      return res.json(result);
    } else {
      return res.status(400).json({ error: result.error || "Invalid access code" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Failed to validate access code" });
  }
};

const getUserGeneratedContents = async (req, res) => {
  const phoneNumber = req.query.phoneNumber; 
  if (!phoneNumber) {
    return res.status(400).json({ error: "Phone number is required" });
  }

  try {
    const contents = await userModel.getUserGeneratedContents(phoneNumber);
    res.json(contents); 
  } catch (error) {
    res.status(500).json({ error: "Failed to get user generated contents" });
  }
};

const saveGeneratedContent = async (req, res) => {
  const { topic, data, phone_number } = req.body;
  const normalizedPhoneNumber = normalizePhoneNumber(phone_number);

  if (!topic || !data || !phone_number) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const result = await userModel.saveGeneratedContent(topic, data, normalizedPhoneNumber);

    if (result.success) {
      res.json({
        success: true,
        contentId: result.contentId,
        topic: result.topic,
        data: result.data
      });
    } else {
      res.status(500).json({ error: "Failed to save content" });
    }
  } catch (error) {
    console.error("Error saving content:", error);
    res.status(500).json({ error: "Failed to save content" });
  }
};


const unsaveGeneratedContent = async (req, res) => {
  const { contentId } = req.body;

  if (!contentId) {
    return res.status(400).json({ error: "Missing required field: contentId" });
  }

  try {
    await userModel.unsaveGeneratedContent(contentId);
    res.json({ success: true });
  } catch (error) {
    console.error("Error unsaving content:", error);
    res.status(500).json({ error: "Failed to unsave content" });
  }
};

module.exports = {
  createNewAccessCode,
  validateAccessCode,
  getUserGeneratedContents,
  saveGeneratedContent,
  unsaveGeneratedContent
};
