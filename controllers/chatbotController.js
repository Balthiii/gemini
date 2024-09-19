import { generateResponse } from '../models/chatbotModel.js';
const removeAsterisks = (text) => {
  return text.replace(/\*/g, ""); 
};

export const chat = async (req, res) => {
  try {
    const userMessage = removeAsterisks(req.body.message);
    let reply = await generateResponse(userMessage);
    reply = removeAsterisks(reply);

    res.json({ reply });
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la génération de la réponse." });
  }
};
