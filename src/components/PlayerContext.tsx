import React, { createContext, ReactNode, useContext, useState } from 'react'

type TracksData = {
    title: string,
    duration: number,
    preview: string,
    artist: {
        name: string
    }
}

// type Tracks = {
//     data: TracksData[]
// }

type PlayerContextData = {
    songsList: Array<TracksData>;
    currentSongIndex: number;
    isPlaying: boolean;
    isShuffling: boolean;
    isLooping: boolean;
    albumImage: string;
    hasNextSong: boolean;
    play: (song: TracksData, image: string) => void;
    togglePlay: () => void;
    toggleShuffling: () => void;
    toggleLooping: () => void;    
    setPlayingState: (state: boolean) => void;
    clearPlayerState: () => void;
    playlist: (list: TracksData[], index: number, image: string) => void;
    playNext: () => void;
    playPrevious: () => void;
}

type PlayerContextProviderProps = {
    children: ReactNode
}

export const PlayerContext = createContext({} as PlayerContextData)

export function PlayerContextProvider({children}: PlayerContextProviderProps) {
    const [songsList, setSongsList] = useState([]);
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isShuffling, setIsShuffling] = useState(false);
    const [isLooping, setIsLooping] = useState(false);
    const [albumImage, setAlbumImage] = useState("");

    const hasPreviousSong = currentSongIndex > 0;
    const hasNextSong = (currentSongIndex + 1) < songsList.length;

    function play(song: TracksData, image: string) {
        setSongsList([song]);
        setCurrentSongIndex(0);
        setIsPlaying(true);
        setAlbumImage(image);
    }

    function playlist(list: TracksData[], index: number, image: string) {
        setSongsList(list);
        setCurrentSongIndex(index);
        setIsPlaying(true);
        setAlbumImage(image);
    }

    function togglePlay() {
        setIsPlaying(!isPlaying);
    }

    function toggleShuffling() {
        setIsShuffling(!isShuffling);
    }
    function toggleLooping() {
        setIsLooping(!isLooping);
    }   

    function setPlayingState(state: boolean) {
        setIsPlaying(state);
    }

    function clearPlayerState() {
        setSongsList([]);
        setCurrentSongIndex(0);
    }

    function playNext() {
        if(isShuffling) {
            const nextRandomSongIndex = Math.floor(Math.random() * songsList.length);
            setCurrentSongIndex(nextRandomSongIndex);
        }else if(hasNextSong) {
            setCurrentSongIndex(currentSongIndex + 1);
        }
    }

    function playPrevious() {
        if(hasPreviousSong) {
            setCurrentSongIndex(currentSongIndex - 1);
        }
    }

    return (
        <PlayerContext.Provider
            value={{
                songsList,
                currentSongIndex,
                isPlaying,
                isShuffling,
                isLooping,
                albumImage,
                hasNextSong,
                play,
                togglePlay,
                toggleShuffling,
                toggleLooping,
                setPlayingState,
                clearPlayerState,
                playlist,
                playNext,
                playPrevious
            }}
        >
            {children}
        </PlayerContext.Provider>
    )
}

export const usePlayer = () => {
    return useContext(PlayerContext);
}