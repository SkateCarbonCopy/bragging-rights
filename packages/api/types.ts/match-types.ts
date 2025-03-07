export interface MatchRequestBody {
    gameType: '8ball'; // TODO: Handle more game types
    playedAt: string; // ISO Date e.g. new Date().toISOString();
    hasAsterisk: boolean;
    notes?: string;
}

export interface MatchResultRequestBody {
    matchId: number;
    players: MatchPlayer[];
}

export interface MatchPlayer {
    matchId: number;
    userId: number;
    isWinner: boolean;
}
