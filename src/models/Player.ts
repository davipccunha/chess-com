import PlayerProfile from "./PlayerProfile";
import PlayerStats from "./PlayerStats";

export default class Player {
    private _profile: PlayerProfile;
    private _stats: PlayerStats;
    //private _games: Game[];

    constructor(profile: PlayerProfile, stats: PlayerStats) {
        this._profile = profile;
        this._stats = stats;
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
}