import express, { Router } from 'express';
import {
    createMatch,
    createMatchResult
} from '../controllers/match-controllers.js';

export const matchRouter: Router = express.Router();

matchRouter.post('/', createMatch);
matchRouter.post('/result', createMatchResult);
