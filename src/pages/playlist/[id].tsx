import React, { useEffect } from 'react';

import { GetStaticPaths, GetStaticProps } from 'next';

import styles from './playlist.module.scss';
import { useTheme } from '../../components/ThemeContext';
import { apiInfo } from '../../components/utils/api';
import { convertSecondsToMinutes } from '../../components/utils/convertTime';
import { usePlayer } from '../../components/PlayerContext';
import { amountAnything } from '../../components/utils/numberAmountFormated';
import SongButton from '../../components/Button';

import {Albuns} from '../../components/utils/types'
interface AlbunsProps {
    album: Albuns
}

export default function Playlist({album}: AlbunsProps) {

    const {darkMode} = useTheme();
    const {play} = usePlayer();

    useEffect(() => {
        async function getInfo() {
            if(album.type !== "album")
                return;

            const data = await fetch(`${apiInfo.BASE_URL}/album/${album.id}`,{
                "method": "GET",
                "headers": {
                    "x-rapidapi-key": process.env.NEXT_PUBLIC_NEXT_APP_DEEZER_API_KEY,
                    "x-rapidapi-host": apiInfo.HOST
                }
            }).then(response => response.json())
            album = data;
        }
        getInfo()
    }, [album])

    return (
        <div className={!darkMode ? styles.playlistContainer : `${styles.playlistContainer} ${styles.darkMode}`}>
            <header className={styles.playlistHeader}>
                <img src={album.cover_medium} alt="" />
                <div className={styles.playlistInfo}>
                    <h2 className={darkMode ? styles.darkMode : undefined}>
                        {album?.label}
                    </h2>
                    <div>
                        <img src={album.artist.picture_small} alt="" />
                        <span className={darkMode ? styles.darkMode : undefined}>{album?.artist?.name}</span>
                    </div>
                    <span className={darkMode ? styles.darkMode : undefined}>
                        {album.nb_tracks} faixas | {album.durationAsString} min | {album.release_date} | {amountAnything.fansAmountMessage(album.fans)}
                    </span>
                </div>
            </header>

            <div className={styles.datagridContainer}>
                <div className={styles.datagridToolBar}>
                    <div className={styles.playlistSongsContainer}>
                        <SongButton smallWidth={false} dataSong={album}/>
                    </div>
                </div>
                
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

                {album?.tracks?.data.map((song, index) => (
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
                            onClick={() => play(song, album.cover_medium)}
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
            </div>
        </div>
    )
}

export const getStaticPaths: GetStaticPaths = async (ctx) => {

    const paths = apiInfo.albunsIDs.map(album => {
        return {
            params: {
                id: album
            }
        }
    })

    return {
        paths,
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
    
    const {id} = ctx.params

    const data = await fetch(`${apiInfo.BASE_URL}/album/${id}`, {
        "method": "GET",
        "headers": {
        "x-rapidapi-key": process.env.NEXT_PUBLIC_NEXT_APP_DEEZER_API_KEY,
        "x-rapidapi-host": apiInfo.HOST
        }
    }).then(data => data.json());


    const album = {
        id: data.id,
        label: data.label,
        artist: data.artist,
        nb_tracks: data.nb_tracks,
        duration: data.duration,
        durationAsString: convertSecondsToMinutes(data.duration),
        fans: data.fans,
        release_date: data.release_date,
        tracks: data.tracks,
        cover_medium: data.cover_medium,
    }

    return {
        props: {
            album,
        },
        revalidate: 60 * 60 * 24
    }
}