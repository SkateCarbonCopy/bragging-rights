import express, { Router } from 'express';
import { createMatch } from '../controllers/match.js';

export const matchRouter: Router = express.Router();

matchRouter.post('/', createMatch);
