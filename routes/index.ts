import { Request, Response } from "express";
import { supabase } from '../db-config';

export const signUpController = (async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
    });

    if (error) return res.status(401).json({ error: error.message });
    return res.status(200).json({ user: data });
});