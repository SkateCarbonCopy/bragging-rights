import { supabase } from '../app.js';

export const getAllUsers = async (req, res) => {
    const { data, error } = await supabase.from('user').select();
    res.send(data);
};

export const createUser = async (req, res, next) => {
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
