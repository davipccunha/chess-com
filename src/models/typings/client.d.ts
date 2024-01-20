import Player from "./player";

declare class Client {
    async getPlayer(username: string): Promise<Player | null>;
}

export = Client;