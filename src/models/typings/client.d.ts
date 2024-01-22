import Player from "./player";
import DailyPuzzle from "./daily-puzzle";

declare class Client {
    async getPlayer(username: string): Promise<Player | null>;
    async getDailyPuzzle(random?: boolean): Promise<DailyPuzzle | null>;
}

export = Client;