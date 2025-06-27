import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import passport from './config/passport.config.js';
import userRouter from './routes/user.router.js';
import sessionRouter from './routes/session.router.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Iniciamos la conexión con MongoDB
const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/class-zero';
mongoose.connect(uri);

// Middlewares incorporados de Express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Inicializamos passport
app.use(passport.initialize());

// Rutas
app.use('/api/users', userRouter);
app.use('/api/sessions', sessionRouter);

// Iniciamos el servidor
app.listen(PORT, () => {
    console.log(`Start Server in Port ${PORT}`);
});
