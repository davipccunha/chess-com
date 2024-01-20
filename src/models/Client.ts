import axios from 'axios';
import PlayerProfile from './PlayerProfile';
import { sleep } from '../utils/utils';
import Player from './Player';
import PlayerStats from './PlayerStats';

export default class Client {
    async getPlayer(username: string) {
        const profile = await this.getPlayerProfile(username);
        if (!profile) return;

        const stats = await this.getPlayerStats(username);
        if (!stats) return;

        return new Player(profile, stats);
    }

    async getPlayerProfile(username: string) {
        const url = `https://api.chess.com/pub/player/${username}`;
        const response = await axios.get(url).catch(console.error);

        // Always sleeping for 100ms after a request to avoid rate limiting
        sleep(100);

        if (!response) return;

        const data = response.data;

        const APICountry = await axios.get(data.country).catch(console.error);
        sleep(100);

        if (!APICountry) return;
        const countryName = APICountry.data.name;

        data.country = countryName;

        return new PlayerProfile(data);
    }

    async getPlayerStats(username: string) {
        const url = `https://api.chess.com/pub/player/${username}/stats`;
        const response = await axios.get(url).catch(console.error);

        sleep(100);
        if (!response) return;

        return new PlayerStats(response.data);
    }
}