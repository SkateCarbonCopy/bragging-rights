import { configDotenv } from 'dotenv';
import express, { Express, NextFunction, Request, Response } from 'express';
import { createClient } from '@supabase/supabase-js';
import bodyParser from 'body-parser';
import { userRouter } from './routes/users-routes.js';
import { HttpError } from './models/http-error.js';
import { Database } from './database.types.js';

const app: Express = express();
const port = 5000;

configDotenv();

export const supabase = createClient<Database>(
    process.env.SUPABASE_URL as string,
    process.env.SUPABASE_KEY as string
);

app.use(bodyParser.json());

app.use('/api/user', userRouter);

// only reached if some request didn't get a response yet
app.use((req: Request, res: Response, next: NextFunction) => {
    const error = new HttpError("Couldn't find this route.", 404);
    throw error;
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:{port}`);
});
