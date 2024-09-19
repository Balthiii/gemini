import express from 'express';;
import tunedController from '../controllers/tunedController.js'; 

const router = express.Router();
router.post('/model/generate', tunedController.generateContent);
router.post('/model/fine-tune', tunedController.fineTuneModel);
export default router;
