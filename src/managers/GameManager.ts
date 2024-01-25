import axios from "axios";
import { APIArchivesGameData, APICurrentDailyGameData, ArchivesGame, CurrentDailyGame } from "../models/Game";

export default class GameManager {
    private username: string;

    constructor(username: string) {
        this.username = username;
    }

    async getCurrentDailyGames(): Promise<CurrentDailyGame[] | null> {
        const url = `https://api.chess.com/pub/player/${this.username}/games`;

        const response = await axios.get(url).catch(console.error);
        if (!response) return null;

        const games: CurrentDailyGame[] = await Promise.all(response.data.games.map(async (gameData: APICurrentDailyGameData) => new CurrentDailyGame(gameData)));

        return games;
    }

    async getArchivedGames(month?: number, year?: number): Promise<ArchivesGame[] | null> {
        let url = `https://api.chess.com/pub/player/${this.username}/games/archives`;
        const response = await axios.get(url).catch(console.error);
        if (!response) return null;

        let archives = response.data.archives as string[];

        const monthFilter = function (url: string) {
            const urlSplit = url.split('/');
            const monthString = '0' + month?.toString();

            return urlSplit[urlSplit.length - 1] === monthString;
        }

        const yearFilter = function (url: string) {
            const urlSplit = url.split('/');
            return urlSplit[urlSplit.length - 2] === year?.toString();
        }

        if (month) {
            archives = archives.filter(monthFilter);
        }
        if (year) {
            archives = archives.filter(yearFilter);
        }

        const games = await joinGames(archives);

        return games;
    }
}

async function joinGames(urls: string[]) {
    const games: ArchivesGame[] = [];

    for (const url of urls) {
        const response = await axios.get(url).catch(console.error);
        if (!response) return null;

        const gamesData = response.data.games as APIArchivesGameData[];

        for (const data of gamesData) {
            const game = new ArchivesGame(data);
            games.push(game);
        }
    }

    return games;
}