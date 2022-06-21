import express from 'express';
import dotenv from 'dotenv';
import workouts from './routes/workouts.js';
import mongoose from 'mongoose';

// calling the env file
dotenv.config();

// express app
const app = express();

// any request it's converted in json format
app.use(express.json());

// routes
app.use('/api/workouts', workouts)

// connect to mongodb
mongoose.connect(process.env.MONGO_URI)
    .then(() => {

        // port
        app.listen(process.env.PORT, () => {
            console.log(`Server working`)
        });
    })
    .catch(() => {
        console.log("Something went wrong...");
    })