export function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function extractMovesFromPGN(pgn: string, removeTimestamps = true) {
    if (!pgn) return null;

    const pgnSplit = pgn.split('\n');

    let moves = pgnSplit[pgnSplit.length - 2];

    if (!moves) return null;

    moves = moves.replace(/\d+\.\.\. /g, '');

    if (removeTimestamps) moves = moves.replace(/ \{[^}]*\}/gm, '');

    return moves;
}

export function capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
