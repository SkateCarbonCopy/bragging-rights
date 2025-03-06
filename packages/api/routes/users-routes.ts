import express, { Router } from 'express';
import { getAllUsers, createUser } from '../controllers/users-controllers';

export const userRouter: Router = express.Router();

userRouter.post('/', createUser);
userRouter.get('/', getAllUsers);
