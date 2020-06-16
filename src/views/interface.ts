export interface ITrack {
    id: string;
    name: string;
    image: string;
    songs: ISong[];
}

export interface ISong {
    albumName: string;
    id: string;
    image: string;
    singer: string;
    time: string;
    title: string;
    url: string;
}