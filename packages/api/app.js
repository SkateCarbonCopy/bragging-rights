import { configDotenv } from 'dotenv';
import express from 'express';
import { createClient } from '@supabase/supabase-js';
import bodyParser from 'body-parser';
import { userRouter } from './routes/users-routes.js';
import { HttpError } from './models/http-error.js';

const app = express();

configDotenv();

export const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
);

app.use(bodyParser.json());

app.use('/api/user', userRouter);

// only reached if some request didn't get a response yet
app.use((req, res, next) => {
    const error = new HttpError("Couldn't find this route.", 404);
    throw error;
});

app.listen(5000);
