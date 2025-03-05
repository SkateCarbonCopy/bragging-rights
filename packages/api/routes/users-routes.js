import express from 'express';
import { getAllUsers, createUser } from '../controllers/users-controllers.js';

export const userRouter = express.Router();

userRouter.post('/', createUser);
userRouter.get('/', getAllUsers);
