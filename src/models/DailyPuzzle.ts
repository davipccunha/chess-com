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

export default class DailyPuzzle {

    /**@hidden */
    private data: DailyPuzzleData;

    constructor(data: APIDailyPuzzleData) {
        this.data = {
            url: data.url,
            timestamp: data.publish_time,
            fen: data.fen,
            imageURL: data.image,
            solution: this.extractSolution(data.pgn)
        }
    }

    /**
     * The Chess.com URL of the puzzle
     * @type {string}
     * @readonly
     */
    get url() {
        return this.data.url;
    }

    /**
     * The timestamp of when the puzzle was published
     * @type {number}
     * @readonly
     */
    get timestamp() {
        return this.data.timestamp;
    }

    /**
     * The FEN string of the puzzle's starting position
     * @type {string}
     * @readonly
     */
    get fen() {
        return this.data.fen;
    }

    /**
     * The URL of an image representing the puzzle's starting position
     * @type {string}
     * @readonly
     */
    get imageURL() {
        return this.data.imageURL;
    }

    /**
     * A string with moves in algebraic notation representing the solution to the puzzle
     * @type {string}
     * @readonly
     */
    get solution() {
        return this.data.solution;
    }

    /**
     * @hidden
     * 
     * Returns a string representation of the puzzle
     * 
     * @param pgn The PGN representation of the puzzle
     * @returns The solution to the puzzle as a string
     */
    private extractSolution(pgn: string) {
        // The API returns a different PGN format if the puzzle is random

        const solution = pgn.split(']').pop()?.replace(/[\n\r]/g, '').replace('*', '').trim();
        if (!solution) throw new Error("Could not extract solution from PGN");

        return solution;

    }
}