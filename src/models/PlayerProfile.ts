
type APIPlayerProfileData = {
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

type PlayerProfileData = {
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

export default class PlayerProfile {
    private data: PlayerProfileData;

    constructor(data: APIPlayerProfileData) {

        const profileData = {
            avatarURL: data.avatar,
            id: data.player_id,
            url: data.url,
            name: data.name,
            username: data.username,
            followers: data.followers,
            country: data.country,
            location: data.location,
            lastOnline: data.last_online,
            joined: data.joined,
            isPremium: data.status !== 'basic',
            isStreamer: data.is_streamer,
            twitchURL: data.twitch_url,
            isVerified: data.verified
        }

        this.data = profileData;
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
     * A boolean representing whether or not the profile is a streamer
     * @type {boolean}
     * @readonly
     */
    get isStreamer() {
        return this.data.isStreamer;
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