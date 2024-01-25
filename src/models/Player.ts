import GameManager from "../managers/GameManager";
import PlayerProfile from "./PlayerProfile";
import PlayerStats from "./PlayerStats";

export default class Player {

    /**@hidden */
    private _profile: PlayerProfile;
    /**@hidden */
    private _stats: PlayerStats;
    /**@hidden */
    private gameManager: GameManager;

    constructor(profile: PlayerProfile, stats: PlayerStats) {
        this._profile = profile;
        this._stats = stats;
        this.gameManager = new GameManager(profile.username);
    }

    /**
     * The player's profile
     * @type {PlayerProfile}
     * @readonly
     */
    get profile(): PlayerProfile {
        return this._profile;
    }

    /**
     * The player's stats
     * @type {PlayerStats}
     * @readonly
     */
    get stats(): PlayerStats {
        return this._stats;
    }

    /**
     * The player's games
     * @type {GameManager}
     * @readonly
     */
    get games() {
        return this.gameManager;
    }

    // Currently not working -> Problem with the API itself
    // async isOnline(): Promise<boolean | undefined> {
    //     const url = `https://api.chess.com/pub/player/${this.profile.username}/is-online`;

    //     const response = await axios.get(url).catch(console.error);
    //     if (!response) return;

    //     return response.data.online;
    // }
}