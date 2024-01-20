export type APIPlayerProfileData = {
    avatar: string;
    player_id: number;
    url: string;
    name: string;
    username: string;
    followers: number;
    country: string;
    location: string;
    last_online: number;
    joined: number;
    status: string;
    is_streamer: boolean;
    twitch_url?: string;
    verified: boolean;
    league: string;
}

export type PlayerProfileData = {
    avatarURL: string;
    id: number;
    url: string;
    name: string;
    username: string;
    followers: number;
    country: string | null;
    location: string;
    lastOnline: number;
    joined: number;
    isPremium: boolean;
    isStreamer: boolean;
    twitchURL?: string;
    isVerified: boolean;
}

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