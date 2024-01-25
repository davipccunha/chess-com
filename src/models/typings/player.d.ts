import { GameManager } from "./game";
import PlayerProfile from "./player-profile";
import PlayerStats from "./player-stats";

declare class Player {
    constructor(profile: PlayerProfile, stats: PlayerStats);

    readonly profile: PlayerProfile;
    readonly stats: PlayerStats;
    readonly games: GameManager;
}

export = Player;