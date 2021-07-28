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

    const {darkMode} = useTheme();

    const {playlist, isPlaying} = usePlayer();
    const songList =  dataSong !== undefined ? dataSong?.tracks?.data : dataArtist
    const image = dataSong !== undefined ? dataSong?.cover_medium : artist?.picture_medium
    
    return (
        <div className={styles.playlistSongsButtons}>
            
            <button 
                className={!smallWidth ? styles.playingButton : `${styles.playingButton} ${styles.small}`}
                onClick = {() => playlist(songList, 0, image)}
            >
                {isPlaying ? "Playing" : 'Listen'}
                <i className="far fa-play-circle"></i>
            </button>
            <div className={styles.optionsButtonsContainer}>
                <div className={styles.optionButton}>
                    <i className={!darkMode ? "fas fa-heart" : `fas fa-heart ${styles.darkMode}`}></i>
                </div>
                <div className={styles.optionButton}>
                    <i className={!darkMode ? "fas fa-share-square" : `fas fa-share-square ${styles.darkMode}`}></i>
                </div>
                <div className={styles.optionButton}>
                    <i className={!darkMode ? "fas fa-ellipsis-h" : `fas fa-ellipsis-h ${styles.darkMode}`}></i>
                </div>
            </div>
        </div>
    )
}