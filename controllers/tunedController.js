import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fineTuneModel = async (req, res) => {
    const filePath = path.join(__dirname, '../models/content/color.json');
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    const accessToken = process.env.ACCESS_TOKEN;
    const projectId = process.env.PROJECT_ID;

    const response = await axios.post(`https://generativelanguage.googleapis.com/v1beta/tunedModels`, {
        display_name: data.display_name,
        base_model: data.base_model,
        tuning_task: {
            hyperparameters: data.tuning_task.hyperparameters,
            training_data: data.tuning_task.training_data
        }
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
            'x-goog-user-project': projectId
        }
    });

    res.json(response.data);
};



const modelName = 'tunedModels/color-model-xqzxsott2c4g'; 


export const generateContent = async (req, res) => {
    const accessToken = process.env.ACCESS_TOKEN;
    const projectId = process.env.PROJECT_ID;
    const userText = req.body.text || "Veuillez fournir un texte.";

    const prompt = `
      Donner moi beaucoup plus de détails sous forme de paragraphe.
      Question: ${userText}
      Réponse:
    `;

    try {
        const response = await axios.post(`https://generativelanguage.googleapis.com/v1beta/${modelName}:generateContent`, {
            contents: [
                {
                    parts: [{ text: prompt }]
                }
            ]
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
                'x-goog-user-project': projectId
            }
        });
        res.json({ reply: response.data.candidates[0].content.parts[0].text });
    } catch (error) {
        console.error('Erreur lors de la génération de la réponse:', error);
        res.status(500).json({ error: "Erreur lors de la génération de la réponse." });
    }
};


export default { fineTuneModel, generateContent };
