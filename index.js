import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
import chatbotRoutes from './routes/chatbotRoutes.js';
import tunedRoutes from './routes/tunedRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Configurer le moteur de vues et les fichiers statiques
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

// Définir les routes
app.use(chatbotRoutes); 
app.use('/', tunedRoutes); 

app.get('/', (req, res) => {
  res.render('index');
});


app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});

