import express from 'express';
import cookieParser from 'cookie-parser';
import chatRouter from './chat/chatRouter.js';
import path from 'path';
import { fileURLToPath } from 'url';
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..', 'public')));
// Chat routes
app.use('/chat', chatRouter);
// Basic route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});
app.use((req, res) => {
    res.status(404).send('Página não encontrada');
});
export default app;
