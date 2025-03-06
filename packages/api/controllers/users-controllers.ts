import { NextFunction, Request, Response } from 'express';
import { supabase } from '../app.js';

export const getAllUsers = async (req: Request, res: Response) => {
    const { data, error } = await supabase.from('user').select();
    res.send(data);
};

export const createUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { username, email, avatarUrl } = req.body;
    const newUser = {
        username,
        email: email || null,
        avatarUrl: avatarUrl || null
    };

    const { error } = await supabase.from('user').insert([newUser]);

    if (error) {
        return next(error);
    }

    res.status(201).json({ user: newUser });
};
