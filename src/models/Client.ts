import axios from 'axios';
import PlayerProfile from './PlayerProfile';
import { sleep } from '../utils/utils';
import Player from './Player';
import PlayerStats from './PlayerStats';
import DailyPuzzle from './DailyPuzzle';

export default class Client {

    /**
     * Returns a Player object represeting the player with the given username
     * 
     * @param username chess.com username
     * @returns Player object for this username or null if not found
     * 
     * @example
     * ```typescript
     * const client = new Client();
     * const player = await client.getPlayer('davipccunha');
     * 
     * console.log(player.profile.username); // davipccunha
     * ```
     */
    async getPlayer(username: string) {
        const profile = await this.getPlayerProfile(username);
        const stats = await this.getPlayerStats(username);

        if (!profile || !stats) return null;

        return new Player(profile, stats);
    }

    /**
     * 
     * Returns a DailyPuzzle object represeting the daily puzzle
     * 
     * @param random If true, returns a random daily puzzle. Otherwise, returns the daily puzzle
     * @returns DailyPuzzle object for the daily puzzle or null if not found
     * 
     * @example
     * ```typescript
     * const client = new Client();
     * const puzzle = await client.getDailyPuzzle();
     * 
     * console.log(puzzle.solution); // 1. e4 e6 2. d4 d5...
     * ```
     */
    async getDailyPuzzle(random = false) {
        let url = `https://api.chess.com/pub/puzzle`;
        if (random) url += '/random';

        const response = await axios.get(url).catch(console.error);
        if (!response) return null;

        return new DailyPuzzle(response.data);
    }

    /**
     * @hidden
     * 
     * Returns a PlayerProfile associated with the given username
     * 
     * @param username chess.com username
     * @returns Promise<PlayerProfile | null>
     */
    private async getPlayerProfile(username: string) {
        const url = `https://api.chess.com/pub/player/${username}`;
        const response = await axios.get(url).catch(
            (err) => { if (err.response.statusText === 'Not Found') { } else { console.log(err) } }
        );

        // Always sleeping for 100ms after a request to avoid rate limiting
        sleep(100);

        if (!response) return null;

        const data = response.data;

        const APICountry = await axios.get(data.country).catch(console.error);
        sleep(100);

        if (!APICountry) return null;
        const countryName = APICountry.data.name;

        data.country = countryName;

        return new PlayerProfile(data);
    }

    /**
     * @hidden
     * 
     * Returns a PlayerStats associated with the given username
     * 
     * @param username chess.com username
     * @returns Promise<PlayerStats | null>
     */
    private async getPlayerStats(username: string) {
        const url = `https://api.chess.com/pub/player/${username}/stats`;
        const response = await axios.get(url).catch(
            (err) => { if (err.response.statusText === 'Not Found') { } else { console.log(err) } }
        );

        sleep(100);
        if (!response) return null;

        return new PlayerStats(response.data);
    }
}