import { extractMovesFromPGN } from "../utils/utils";
import { TimeClass } from "./PlayerStats";

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
}

export type APICurrentDailyGameData = APIBaseGameData & {
    move_by: number;
    last_activity: number;
    turn: string;
    start_time: number;
    white: string;
    black: string;
}

export type APIAccuracyData = {
    white: number;
    black: number;
}

export type APIArchivesGameData = APIBaseGameData & {
    end_time: number;
    accuracies?: APIAccuracyData;
    tcn: string;
    uuid: string;
    initial_setup: string;
    white: APIGameColor;
    black: APIGameColor;
}

export type BaseGameData = {
    url: string;
    moves: string | null;
    timeControl: string;
    rated: boolean;
    fen: string;
    timeClass: TimeClass;
    rules: string;

    // Tried to convert username to Player but it takes too long -> Might try to return it as Promise<Player> instead
    white: string | null;
    black: string | null;
}

export type CurrentDailyGameData = BaseGameData & {
    moveBy: number;
    lastActivity: number;
    turn: string;
    startTime: number;
}

export enum ResultOptions {
    'win' = 'Win',
    'checkmated' = 'Lost by Checkmate',
    'agreed' = 'Draw by Agreement',
    'repetition' = 'Draw by Repetition',
    'timeout' = 'Lost by Timeout',
    'resigned' = 'Lost by Resignation',
    'stalemate' = 'Draw by Stalemate',
    'lose' = 'Lost',
    'insufficient' = 'Draw by Insufficient Material',
    '50move' = 'Draw by 50 Move Rule',
    'abandoned' = 'Lost by Abandonment',
    'timevsinsufficient' = 'Draw by Time vs Insufficient Material'
}

export type GameResult = {
    white: ResultOptions;
    black: ResultOptions;
}

export type ArchivesGameData = BaseGameData & {
    result: GameResult;
    endTime: number;
    accuracy?: APIAccuracyData;
}

class BaseGame {
    /**@hidden */
    protected data: BaseGameData | CurrentDailyGameData | ArchivesGameData;

    protected constructor(data: APIBaseGameData) {
        this.data = {
            url: data.url,
            moves: extractMovesFromPGN(data.pgn),
            timeControl: data.time_control,
            rated: data.rated,
            fen: data.fen,
            timeClass: data.time_class as TimeClass,
            rules: data.rules,
            white: typeof data.white === 'string' ? data.white.split('/').pop()! : data.white.username,
            black: typeof data.black === 'string' ? data.black.split('/').pop()! : data.black.username
        }
    }

    /**
     * The game's URL
     * @type {string}
     * @readonly
     */
    get url() {
        return this.data.url;
    }

    /**
     * The game's moves in algebraic notation
     * @type {string}
     * @readonly
     */
    get moves() {
        return this.data.moves;
    }

    /**
     * The game's time control (such as 600 for 10 minutes)
     * @type {string}
     * @readonly
     */
    get timeControl() {
        return this.data.timeControl;
    }

    /**
     * Whether the game was rated or not
     * @type {boolean}
     * @readonly
     */
    get rated() {
        return this.data.rated;
    }

    /**
     * The game's FEN
     * @type {string}
     * @readonly
     */
    get fen() {
        return this.data.fen;
    }

    /**
     * The game's time class
     * @type {TimeClass}
     * @readonly
     */
    get timeClass() {
        return this.data.timeClass;
    }

    /**
     * The chess variant of the game
     * @type {string}
     * @readonly
     */
    get rules() {
        return this.data.rules;
    }

    /**
     * The username of the player playing as white
     * @type {string}
     * @readonly
     */
    get white() {
        return this.data.white;
    }

    /**
     * The username of the player playing as black
     * @type {string}
     * @readonly
     */
    get black() {
        return this.data.black;
    }
}

export class CurrentDailyGame extends BaseGame {
    constructor(data: APICurrentDailyGameData) {
        super(data);

        this.data = {
            ...this.data,
            moveBy: data.move_by,
            lastActivity: data.last_activity,
            turn: data.turn,
            startTime: data.start_time,
        }
    }

    /**
     * The time in seconds the player has to make a move
     * @type {number}
     * @readonly
     */
    get moveBy() {
        return (this.data as CurrentDailyGameData).moveBy;
    }

    /**
     * The timestamp of the last time something happened in the game (move, message, draw offer, etc.)
     * @type {number}
     * @readonly
     */
    get lastActivity() {
        return (this.data as CurrentDailyGameData).lastActivity;
    }

    /**
     * The color of the player who's turn it is
     * @type {string}
     * @readonly
     */
    get turn() {
        return (this.data as CurrentDailyGameData).turn;
    }

    /**
     * The timestamp of when the game started
     * @type {number}
     * @readonly
     */
    get startTime() {
        return (this.data as CurrentDailyGameData).startTime;
    }
}

export class ArchivesGame extends BaseGame {
    constructor(data: APIArchivesGameData) {
        super(data);

        this.data = {
            ...this.data,
            endTime: data.end_time,
            accuracy: data.accuracies ? { white: parseAccuracy(data.accuracies.white), black: parseAccuracy(data.accuracies.black) } : undefined,
            result: { white: parseResultOption(data.white.result), black: parseResultOption(data.black.result) }
        }
    }

    /**
     * The timestamp of when the game ended
     * @type {number}
     * @readonly
     */
    get endTime() {
        return (this.data as ArchivesGameData).endTime;
    }

    /**
     * The accuracies of the players
     * @type {APIAccuracyData}
     * @readonly
     */
    get accuracy() {
        return (this.data as ArchivesGameData).accuracy;
    }

    /**
     * The result of the game
     * @type {GameResult}
     * @readonly
     */
    get result() {
        return (this.data as ArchivesGameData).result;
    }
}

function parseAccuracy(accuracy: number) {
    if (!accuracy) return -1;
    return parseFloat(accuracy.toFixed(4));
}

function parseResultOption(result: string) {
    return ResultOptions[result as keyof typeof ResultOptions];
}