import express, { Router } from 'express';
import { getAllUsers, createUser, getUser } from '../controllers/users-controllers.js';

export const userRouter: Router = express.Router();

userRouter.post('/', createUser);
userRouter.get('/', getAllUsers);
userRouter.get('/:userId', getUser);
