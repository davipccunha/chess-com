import PlayerProfile from "./PlayerProfile";
import PlayerStats from "./PlayerStats";

declare class Player {
    private profile: PlayerProfile;
    private stats: PlayerStats;

    constructor(profile: PlayerProfile, stats: PlayerStats);

    readonly profile: PlayerProfile;
    readonly stats: PlayerStats;
}

export = Player;