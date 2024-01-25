export type APIGameColor = {
    rating: number;
    result: string;
    username: string;
    uuid: string;
}

export type APIBaseGameData = {
    url: string;
    pgn: string;
    time_control: string;
    rated: boolean;
    fen: string;
    time_class: string;
    rules: string;
    white: APIGameColor | string;
    black: APIGameColor | string;
};

export type APICurrentDailyGameData = APIBaseGameData & {
    move_by: number;
    last_activity: number;
    turn: string;
    start_time: number;
    white: string;
    black: string;
};

export type APIArchivesGameData = APIBaseGameData & {
    end_time: number;
    accuracies?: APIAccuracyData;
    tcn: string;
    uuid: string;
    initial_setup: string;
    white: APIGameColor;
    black: APIGameColor;
};

export type APIAccuracyData = {
    white: number;
    black: number;
};

export type GameResult = {
    white: ResultOptions;
    black: ResultOptions;
};

export type ResultOptions = "win" | "checkmated" | "agreed" | "repetition" | "timeout" | "resigned" | "stalemate" | "lose" | "insufficient" | "50move" | "abandoned" | "timevsinsufficient";

declare class GameManager {
    private username: string;

    constructor(username: string);

    getCurrentDailyGames(): Promise<CurrentDailyGame[] | null>;

    getArchivedGames(month?: number, year?: number): Promise<ArchivesGame[] | null>;
}

declare class BaseGame {
    protected data: APIBaseGameData;

    protected constructor(data: APIBaseGameData);

    readonly url: string;
    readonly moves: string;
    readonly timeControl: string;
    readonly rated: boolean;
    readonly fen: string;
    readonly timeClass: string;
    readonly rules: string;
    readonly white: string;
    readonly black: string;
}

declare class CurrentDailyGame extends BaseGame {
    constructor(data: APICurrentDailyGameData);

    readonly moveBy: string;
    readonly lastActivity: number;
    readonly turn: string;
    readonly startTime: number;
}

declare class ArchivesGame extends BaseGame {
    constructor(data: APIArchivesGameData);

    readonly endTime: number;
    readonly accuracy: APIAccuracyData;
    readonly result: GameResult;
}