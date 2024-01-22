export type APIPlayerProfileData = {
    avatar: string;
    player_id: number;
    title?: string;
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
    title?: string;
    url: string;
    name: string;
    username: string;
    followers: number;
    country: string;
    location: string;
    lastOnline: number;
    joined: number;
    isPremium: boolean;
    isClosed: boolean;
    isStaff: boolean;
    isStreamer: boolean;
    twitchURL?: string;
    isVerified: boolean;
}

declare class PlayerProfile {
    private data: PlayerProfileData;

    constructor(data: APIPlayerProfileData);

    readonly avatarURL: string;
    readonly id: number;
    readonly title?: string;
    readonly url: string;
    readonly name: string;
    readonly username: string;
    readonly followers: number;
    readonly country: string;
    readonly location: string;
    readonly lastOnline: number;
    readonly joined: number;
    readonly isPremium: boolean;
    readonly isClosed: boolean;
    readonly isStaff: boolean;
    readonly isStreamer: boolean;
    readonly twitchURL?: string;
    readonly isVerified: boolean;
}

export = PlayerProfile;