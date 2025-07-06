import { NextFunction, Request, Response } from 'express';
import { supabase } from '../app.js';
import { GetUserParams } from '../types.ts/users.js';

export const getAllUsers = async (req: Request, res: Response) => {
    const { data } = await supabase.from('User').select();
    res.send(data);
};

export const getUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { userId } = req.params as unknown as GetUserParams;

    const { data, status, error } = await supabase
        .from('User')
        .select('*')
        .eq('userId', userId);

    if (error) {
        return next(JSON.stringify(error));
    }

    res.status(status).json(data);
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

    const { error } = await supabase.from('User').insert([newUser]);

    if (error) {
        return next(JSON.stringify(error));
    }

    res.status(201).json({ user: newUser });
};
