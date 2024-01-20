import { APIBestStats, BestStats, APIPlayerStatsData, PlayerStatsData, APILastStats, LastStats, APIRecordStats, ResultsStats, APITimeClassStats, TimeClassStats, APIPlayerStatsData, PlayerStatsData } from '../PlayerStats'

declare class PlayerStats {
    private data: PlayerStatsData;

    constructor(data: APIPlayerStatsData);

    readonly daily: TimeClassStats;
    readonly rapid: TimeClassStats;
    readonly blitz: TimeClassStats;
    readonly bullet: TimeClassStats;
}

export = PlayerStats;