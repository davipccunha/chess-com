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

declare class PlayerStats {
    private data: PlayerStatsData;

    constructor(data: APIPlayerStatsData);

    readonly daily: TimeClassStats;
    readonly rapid: TimeClassStats;
    readonly blitz: TimeClassStats;
    readonly bullet: TimeClassStats;
}

export = PlayerStats;