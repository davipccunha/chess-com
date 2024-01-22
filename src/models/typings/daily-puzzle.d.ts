export type APIDailyPuzzleData = {
    title: string;
    url: string;
    publish_time: number;
    fen: string;
    pgn: string;
    image: string;
}

export type DailyPuzzleData = {
    url: string;
    timestamp: number;
    fen: string;
    imageURL: string;
    solution: string;
}

declare class DailyPuzzle {

    private data: DailyPuzzleData;

    constructor(data: APIDailyPuzzleData);

    readonly url: string;
    readonly timestamp: number;
    readonly fen: string;
    readonly imageURL: string;
    readonly solution: string;
}

export = DailyPuzzle;