import { NextFunction, Request, Response } from 'express';
import { supabase } from '../app.js';
import type {
    MatchPlayer,
    MatchRequestBody,
    MatchResultRequestBody
} from '../types.ts/match-types.js';
import { HttpError } from '../models/http-error.js';

export const createMatch = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { gameType, playedAt, notes, hasAsterisk } =
        req.body as MatchRequestBody;

    let gameTypeId = null;
    const { data } = await supabase
        .from('GameType')
        .select('gameTypeId')
        .eq('name', gameType);

    if (data && data.length) {
        gameTypeId = data[0].gameTypeId;
    }

    if (gameTypeId == null) {
        return next('GameType ID not found.');
    }

    const { error, status, statusText } = await supabase.from('Match').insert({
        gameTypeId,
        playedAt,
        hasAsterisk,
        notes
    });

    if (error) {
        return next(JSON.stringify(error));
    }

    res.status(status).json(statusText);
};

export const createMatchResult = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { matchId, players } = req.body as MatchResultRequestBody;

    if (matchId == null) {
        return next(new HttpError('Request missing Game Id.', 400));
    }

    const formattedPlayers = players.map((player) => {
        player.matchId = matchId;
        return player;
    });

    const { error } = await supabase
        .from('MatchPlayer')
        .upsert(formattedPlayers);

    if (error) {
        return next(JSON.stringify(error));
    }

    res.status(201).json({ players: formattedPlayers });
};
