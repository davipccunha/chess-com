export type APIPlayerStatsData = {
    chess_daily: APITimeClassStats;
    chess_rapid: APITimeClassStats;
    chess_blitz: APITimeClassStats;
    chess_bullet: APITimeClassStats;
}

export type PlayerStatsData = {
    daily: TimeClassStats;
    rapid: TimeClassStats;
    blitz: TimeClassStats;
    bullet: TimeClassStats;
}

export type TimeClassStats = {
    rating: number;
    last: LastStats;
    best: BestStats;
    results: ResultsStats;
}

// Enum declaration stops working when exported -> Workaround is to use type
export type TimeClass = "daily" | "rapid" | "blitz" | "bullet";

declare class PlayerStats {
    private data: PlayerStatsData;

    constructor(data: APIPlayerStatsData);

    getStats(timeClass: TimeClass): TimeClassStats;
}

export = PlayerStats;