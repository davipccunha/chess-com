// import { APIPlayerStatsData, PlayerStatsData, TimeClassStats } from "./typings/player-stats";

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

export default class PlayerStats {
    /**@hidden */
    private data: PlayerStatsData;

    constructor(data: APIPlayerStatsData) {

        const statsData = {
            daily: this.convertData(data.chess_daily),
            rapid: this.convertData(data.chess_rapid),
            blitz: this.convertData(data.chess_blitz),
            bullet: this.convertData(data.chess_bullet)
        }

        this.data = statsData;
    }

    //TODO: Make a single function that returns the stats for a given time class -> Enum for time class

    /**
     * 
     * Returns the stats from the daily time class
     * 
     * @returns PlayerStatsData for daily games
     */
    get daily() {
        return this.data.daily;
    }

    /**
     * 
     * Returns the stats from the rapid time class
     * 
     * @returns PlayerStatsData for rapid games
     */
    get rapid() {
        return this.data.rapid;
    }

    /**
     * 
     * Returns the stats from the blitz time class
     * 
     * @returns PlayerStatsData for blitz games
     */
    get blitz() {
        return this.data.blitz;
    }

    /**
     * 
     * Returns the stats from the bullet time class
     * 
     * @returns PlayerStatsData for bullet games
     */
    get bullet() {
        return this.data.bullet;
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
        const newData: TimeClassStats = {
            rating: data.last?.rating,
            last: {
                rating: data.last?.rating,
                date: data.last?.date,
                deviation: data.last?.rd
            },
            best: {
                rating: data.best?.rating,
                date: data.best?.date,
                gameURL: data.best?.game
            },
            results: {
                wins: data.record?.win,
                losses: data.record?.loss,
                draws: data.record?.draw,
                winrate: this.getWinrate(data.record?.win, data.record?.loss, data.record?.draw)
            }
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