import { NextFunction, Request, Response } from 'express';
import { supabase } from '../app.js';

interface MatchRequestBody {
  gameType: '8ball'; // TODO: Handle more game types
  playedAt: string; // ISO Date e.g. new Date().toISOString();
  hasAsterisk: boolean;
  notes?: string;
}

export const createMatch = async(
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { gameType, playedAt, notes, hasAsterisk } = req.body as MatchRequestBody;

  let gameTypeId = null;
  const { data } = await supabase.from('gametype').select('gameTypeId').eq('name', gameType);

  if (data && data.length) {
    gameTypeId = data[0].gameTypeId;
  }

  if (gameTypeId == null) {
    return next('GameType ID not found.');
  }

  const { error, status, statusText } = await supabase.from('match').insert({
    gameTypeId,
    playedAt,
    hasAsterisk,
    notes
  });

  if (error) {
    return next(error);
  }

  res.status(status).json(statusText);
}
