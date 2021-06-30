import React from 'react'

import { useTheme } from '../ThemeContext'
import { usePlayer } from '../PlayerContext'

import styles from './style.module.scss'

import {Albuns} from '../../components/utils/types'

import { convertSecondsToMinutes } from '../utils/convertTime'

interface AlbunsProps {
    album?: Albuns
    songs?: any[]
}

export default function SongsList({album, songs}: AlbunsProps) {

    const {darkMode} = useTheme();
    const {play} = usePlayer();

    const songsList = album ? album.tracks.data : songs;

    return (
        <>
            <div className={`${styles.datagridRow} ${styles.isFirst}`}>
                <div className={styles.dataContentIndex}>
                    <span className={darkMode ? styles.darkMode : undefined}>#</span>
                </div>
                <div className={styles.dataFavorite}>
                </div>
                <div className={styles.dataTrack}>
                    <span className={darkMode ? styles.darkMode : undefined}>Faixa</span>
                </div>
                <div className={styles.dataContentDuration}>
                    <span className={darkMode ? styles.darkMode : undefined}>D.</span>
                </div>
            </div>

            {songsList.map((song, index) => (
                <div key={song.title} className={`${styles.datagridRow} ${styles.isSong}`}>
                    <div className={styles.dataContentIndex}>
                        <span className={darkMode ? styles.darkMode : undefined}>
                            {index+1}
                        </span>
                    </div>
                    <div className={styles.dataFavorite}>
                        <i className={!darkMode ? "far fa-heart" : `far fa-heart ${styles.darkMode}`}></i>
                    </div>
                    <div 
                        className={styles.dataTrack}
                        onClick={() => play(song, song.album.cover_medium)}
                    >
                        <span className={darkMode ? styles.darkMode : undefined}>
                            {song.title}
                        </span>
                    </div>
                    <div className={styles.dataContentDuration}>
                        <span className={darkMode ? styles.darkMode : undefined}>
                            {convertSecondsToMinutes(song.duration)}
                        </span>
                    </div>
                </div>
            ))}
        </>
    )
}
