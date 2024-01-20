import { APIPlayerProfileData, PlayerProfileData } from "../PlayerProfile";

declare class PlayerProfile {
    private data: PlayerProfileData;

    constructor(data: APIPlayerProfileData);

    readonly avatarURL: string;
    readonly id: number;
    readonly url: string;
    readonly name: string;
    readonly username: string;
    readonly followers: number;
    readonly country: string;
    readonly location: string;
    readonly lastOnline: number;
    readonly joined: number;
    readonly isPremium: boolean;
    readonly isStreamer: boolean;
    readonly isVerified: boolean;
}

export = PlayerProfile;