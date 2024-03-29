// import { APIPlayerStatsData, PlayerStatsData, TimeClassStats } from "./typings/player-stats";

export type APIPlayerStatsData = {
    chess_daily: APITimeClassStats;
    chess_rapid: APITimeClassStats;
    chess_blitz: APITimeClassStats;
    chess_bullet: APITimeClassStats;
}

export type PlayerStatsData = {
    daily: TimeClassStats | null;
    rapid: TimeClassStats | null;
    blitz: TimeClassStats | null;
    bullet: TimeClassStats | null;
}

export type TimeClassStats = {
    rating: number;
    last: LastStats | null;
    best: BestStats | null;
    results: ResultsStats | null;
}

export type APILastStats = {
    rating: number;
    date: number;
    rd: number;
}

export type APIBestStats = {
    rating: number;
    date: number;
    game: string;
}

export type APIRecordStats = {
    win: number;
    loss: number;
    draw: number;
}

export type LastStats = {
    rating: number;
    date: number;
    deviation: number;
}

export type BestStats = {
    rating: number;
    date: number;
    gameURL: string;
}

export type ResultsStats = {
    wins: number;
    losses: number;
    draws: number;
    winrate: number;
}

export type APITimeClassStats = {
    last: APILastStats;
    best: APIBestStats;
    record: APIRecordStats;
}

export const enum TimeClass {
    DAILY = 'daily',
    RAPID = 'rapid',
    BLITZ = 'blitz',
    BULLET = 'bullet'
}

export default class PlayerStats {
    /**@hidden */
    private data: PlayerStatsData;

    constructor(data: APIPlayerStatsData) {

        this.data = {
            daily: this.convertData(data.chess_daily),
            rapid: this.convertData(data.chess_rapid),
            blitz: this.convertData(data.chess_blitz),
            bullet: this.convertData(data.chess_bullet)
        }

    }
    /**
     * 
     * Returns the stats from a specified time class
     * 
     * @returns PlayerStatsData for a TimeClass class games
     */
    getStats(timeClass: TimeClass) {
        return this.data[timeClass];
    }

    /**
     * @hidden
     * 
     * Converts the API data to a more usable format and removes unnecessary data
     * 
     * @param data APITimeClassStats
     * @returns TimeClassStats
     */
    private convertData(data: APITimeClassStats) {
        if (!data) return null;
        const newData: TimeClassStats = {
            rating: data.last ? data.last.rating : 0,
            last: data.last ? {
                rating: data.last?.rating,
                date: data.last?.date,
                deviation: data.last?.rd
            } : null,
            best: data.best ? {
                rating: data.best?.rating,
                date: data.best?.date,
                gameURL: data.best?.game
            } : null,
            results: data.record ? {
                wins: data.record?.win,
                losses: data.record?.loss,
                draws: data.record?.draw,
                winrate: this.getWinrate(data.record?.win, data.record?.loss, data.record?.draw)
            } : null
        }

        return newData;
    }

    /**
     * @hidden
     * 
     * Calculates the winrate from the given wins, losses and draws
     * 
     * @param wins number
     * @param losses number
     * @param draws number
     * @returns number
     */
    private getWinrate(wins: number, losses: number, draws: number) {
        if (!wins && !losses && !draws) return 0;
        if (wins + losses + draws == 0) return 0;

        return parseFloat((wins / (wins + losses + draws) * 100).toFixed(2));
    }
}