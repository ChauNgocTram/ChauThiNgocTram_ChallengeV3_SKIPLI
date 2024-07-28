require("dotenv").config();
const userModel = require("../models/userModel");
const twilio = require("twilio");

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
const twilioClient = new twilio(accountSid, authToken);

const createNewAccessCode = async (req, res) => {
  const { phoneNumber } = req.body;
  try {
    const accessCode = Math.floor(100000 + Math.random() * 900000).toString();
    await userModel.createNewAccessCode(phoneNumber, accessCode);

    // Send SMS using Twilio
    await twilioClient.messages.create({
      body: `Your access code is ${accessCode}`,
      from: twilioPhoneNumber,
      to: phoneNumber,
    });

    res.json({ accessCode });
  } catch (error) {
    res.status(500).json({ error: "Failed to create access code" });
  }
};

const validateAccessCode = async (req, res) => {
  const { phoneNumber, accessCode } = req.body;
  try {
    const contents = await userModel.validateAccessCode(
      phoneNumber,
      accessCode
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to validate access code" });
  }
};

const getUserGeneratedContents = async (req, res) => {
  const { phoneNumber } = req.query;
  try {
    const contents = await userModel.getUserGeneratedContents(phoneNumber);
    res.json(contents);
  } catch (error) {
    res.status(500).json({ error: "Failed to get user generated contents" });
  }
};

const saveGeneratedContent = async (req, res) => {
  const { phoneNumber, contentId } = req.body;
  try {
    await userModel.saveGeneratedContent(phoneNumber, contentId);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to save generated content" });
  }
};

const unsaveContent = async (req, res) => {
  const { phoneNumber, contentId } = req.body;
  try {
    await userModel.unsaveContent(phoneNumber, contentId);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to unsave content" });
  }
};

module.exports = {
  createNewAccessCode,
  validateAccessCode,
  getUserGeneratedContents,
  saveGeneratedContent,
  unsaveContent,
};
