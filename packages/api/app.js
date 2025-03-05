import { configDotenv } from 'dotenv';
import express from 'express';
import { createClient } from '@supabase/supabase-js';
import bodyParser from 'body-parser';

const app = express();

configDotenv();

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
);

app.get('/user', async (req, res) => {
    const { data, error } = await supabase.from('user').select();
    res.send(data);
});

app.listen(5000);
