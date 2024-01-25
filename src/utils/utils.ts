export function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function extractMovesFromPGN(pgn: string, removeTimestamps = true) {
    const pgnSplit = pgn.split('\n');
    let moves = pgnSplit[pgnSplit.length - 2];

    if (!moves) return null;

    moves = moves.replace(/\d+\.\.\. /g, '');

    if (removeTimestamps) moves = moves.replace(/ \{[^}]*\}/gm, '');

    return moves;
}
