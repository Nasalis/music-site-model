import React from 'react';
import { useTheme } from '../ThemeContext';
import styles from './style.module.scss';

import {Albuns, ArtistPage} from '../../components/utils/types'
import { usePlayer } from '../PlayerContext';


interface SongButtonProps {
    smallWidth: boolean,
    dataSong?: Albuns,
    dataArtist?: any[],
    artist?: ArtistPage,
}

export default function SongButton({smallWidth, dataSong, dataArtist, artist}: SongButtonProps) {

    const {theme} = useTheme();

    const {playlist, isPlaying} = usePlayer();
    const songList =  dataSong !== undefined ? dataSong.tracks.data : dataArtist
    const image = dataSong !== undefined ? dataSong.cover_medium : artist.picture_medium
    
    return (
        <div className={styles.playlistSongsButtons}>
            
            <button 
                className={!smallWidth ? styles.playingButton : `${styles.playingButton} ${styles.small}`}
                onClick = {() => playlist(songList, 0, image)}
            >
                {isPlaying ? "Playing" : 'Listen'}
                <i className="far fa-play-circle"></i>
            </button>
            <div>
                <button>
                    <i style={{color: theme.colors.grayColor4}} className="fas fa-heart"></i>
                </button>
                <button>
                    <i style={{color: theme.colors.grayColor4}} className="fas fa-share-square"></i>
                </button>
                <button>
                    <i style={{color: theme.colors.grayColor4}} className="fas fa-ellipsis-h"></i>
                </button>
            </div>
        </div>
    )
}