export type Artist = {
    id: number,
    name: string,
    picture_small: string,
}

export interface ArtistPage {
    name: string,
    nb_album: number,
    nb_fan: number,
    nb_fan_message: string,
    picture_medium: string,
    id: number;
}

export type TracksData = {
    title: string,
    duration: number,
    preview: string,
    artist: {
        name: string
    }
}

export type Tracks = {
    data: TracksData[]
}

export interface Albuns {
    id: string,
    label: string,
    title: string,
    artist: Artist,
    nb_tracks: number,
    duration: number,
    durationAsString: string
    fans: number,
    release_date: string,
    tracks: Tracks,
    type: string;
    cover_medium: string,
}