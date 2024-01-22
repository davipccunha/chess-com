// import { APIPlayerProfileData, PlayerProfileData } from "./typings/player-profile";
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

export default class PlayerProfile {
    /**@hidden */
    private data: PlayerProfileData;

    constructor(data: APIPlayerProfileData) {

        this.data = {
            avatarURL: data.avatar,
            id: data.player_id,
            title: data.title,
            url: data.url,
            name: data.name,
            username: data.username,
            followers: data.followers,
            country: data.country,
            location: data.location,
            lastOnline: data.last_online,
            joined: data.joined,
            isPremium: data.status === 'premium' || data.status === 'staff' || data.status === 'mod',
            isClosed: data.status === 'closed' || data.status === 'closed:fair_play_violations',
            isStaff: data.status === 'staff' || data.status === 'mod',
            isStreamer: data.is_streamer,
            twitchURL: data.twitch_url,
            isVerified: data.verified
        }
    }

    /**
     * The URL of the profile's avatar
     * @type {string}
     * @readonly
     */
    get avatarURL() {
        return this.data.avatarURL;
    }

    /**
     * The Chess.com ID of the profile
     * @type {number}
     * @readonly
     */
    get id() {
        return this.data.id;
    }

    /**
     * The title abbreviation the profile has, if any
     * @type {string}
     * @readonly
     */
    get title() {
        return this.data.title;
    }

    /**
     * The Chess.com URL of the profile
     * @type {string}
     * @readonly
     */
    get url() {
        return this.data.url;
    }

    /**
     * The person's name assigned to the profile
     * @type {string}
     * @readonly
     */
    get name() {
        return this.data.name;
    }

    /**
     * The Chess.com profile's username
     * @type {string}
     * @readonly
     */
    get username() {
        return this.data.username;
    }

    /**
     * The number of followers the profile has on Chess.com
     * @type {number}
     * @readonly
     */
    get followers() {
        return this.data.followers;
    }

    /**
     * A string representing the name of the country assigned to the profile
     * @type {string}
     * @readonly
     */
    get country() {
        return this.data.country;
    }

    /**
     * A string representing the location assigned to the profile
     * @type {string}
     * @readonly
     */
    get location() {
        return this.data.location;
    }

    /**
     * The timestamp of the last time the profile was online
     * @type {number}
     * @readonly
     */
    get lastOnline() {
        return this.data.lastOnline;
    }

    /**
     * The timestamp of when the profile was created
     * @type {number}
     * @readonly
     */
    get joined() {
        return this.data.joined;
    }

    /**
     * A boolean representing whether or not the profile has premium membership
     * @type {boolean}
     * @readonly
     */
    get isPremium() {
        return this.data.isPremium;
    }

    /**
     * A boolean representing whether or not the profile is closed
     * @type {boolean}
     * @readonly
     */
    get isClosed() {
        return this.data.isClosed;
    }

    /**
     * A boolean representing whether or not the profile is part of Chess.com staff
     * @type {boolean}
     * @readonly
     */
    get isStaff() {
        return this.data.isStaff;
    }

    /**
     * A boolean representing whether or not the profile is a streamer
     * @type {boolean}
     * @readonly
     */
    get isStreamer() {
        return this.data.isStreamer;
    }

    /**
     * The Twitch URL of the profile, if any
     * @type {string}
     * @readonly
     */
    get twitchURL() {
        return this.data.twitchURL;
    }

    /**
     * A boolean representing whether or not the profile is verified
     * @type {boolean}
     * @readonly
     */
    get isVerified() {
        return this.data.isVerified;
    }
}