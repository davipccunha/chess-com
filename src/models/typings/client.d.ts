declare class Client {
    async getPlayer(username: string): Promise<Player | undefined>;
}