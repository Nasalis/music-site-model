import React, { useEffect, useState } from 'react';

import Image from 'next/image';

import { GetStaticPaths, GetStaticProps } from 'next';

import styles from './playlist.module.scss';
import { useTheme } from '../../components/ThemeContext';
import { apiInfo } from '../../components/utils/api';
import { 
    convertSecondsToMinutes,
} from '../../components/utils/convertTime';
import { usePlayer } from '../../components/PlayerContext';
import { amountAnything } from '../../components/utils/numberAmountFormated';

type Artist = {
    id: number,
    name: string,
    picture_small: string,
}

type TracksData = {
    title: string,
    duration: number,
    preview: string,
    artist: {
        name: string
    }
}

type Tracks = {
    data: TracksData[]
}

interface Albuns {
    id: string,
    label: string,
    artist: Artist,
    nb_tracks: number,
    duration: number,
    durationAsString: string
    fans: number,
    release_date: string,
    tracks: Tracks,
    cover_medium: string,
}

interface AlbunsProps {
    album: Albuns
}


export default function Playlist({album}: AlbunsProps) {

    const {theme} = useTheme();
    const {play, playlist, isPlaying} = usePlayer();

    const color = theme.colors.playlistOrAlbumColor

    const songList = album.tracks.data

    return (
        <div style={{background: theme.colors.backgroundBold}} className={styles.playlistContainer}>
            <header className={styles.playlistHeader}>
                {/* <Image 
                    className={styles.playlistImage}
                    width={172} 
                    height={172} 
                    src={playlist?.cover_medium} 
                    objectFit="cover"
                /> */}
                <img src={album.cover_medium} alt="" />

                <div className={styles.playlistInfo}>
                    <h2 style={{color: theme.colors.text}}>{album?.label}</h2>
                    <div>
                        {/* <Image
                            width={28} 
                            height={28} 
                            src={playlist?.artist?.picture_small} 
                            objectFit="cover"
                        /> */}

                        <img src={album.artist.picture_small} alt="" />
                        <span style={{color}}>{album?.artist?.name}</span>
                    </div>
                    <span style={{color}}>
                        {album.nb_tracks} faixas | {album.durationAsString} min | {album.release_date} | {amountAnything.fansAmountMessage(album.fans)}
                    </span>
                </div>
            </header>

            <div className={styles.datagridContainer}>
                <div className={styles.datagridToolBar}>
                    <div className={styles.playlistSongsContainer}>
                        <div className={styles.playlistSongsButtons}>
                            <button  
                                className={styles.playingButton}
                                onClick = {() => playlist(songList, 0, album.cover_medium)}
                            >
                                {isPlaying ? "Tocando" : "Ouvir"}
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
                    </div>
                </div>
                
                <div className={`${styles.datagridRow} ${styles.isFirst}`}>
                    <div className={styles.dataContentIndex}>
                        <span style={{color: theme.colors.grayColor4}}>#</span>
                    </div>
                    <div className={styles.dataFavorite}>
                    </div>
                    <div className={styles.dataTrack}>
                        <span style={{color: theme.colors.grayColor4}}>Faixa</span>
                    </div>
                    <div className={styles.dataContentDuration}>
                        <span style={{color: theme.colors.grayColor4}}>D.</span>
                    </div>
                </div>

                {album?.tracks?.data.map((song, index) => (
                    <div key={song.title} className={`${styles.datagridRow} ${styles.isSong}`}>
                        <div className={styles.dataContentIndex}>
                            <span style={{color: theme.colors.grayColor4}}>
                                {index+1}
                            </span>
                        </div>
                        <div className={styles.dataFavorite}>
                            <i style={{color: theme.colors.grayColor4}} className="far fa-heart"></i>
                        </div>
                        <div 
                            className={styles.dataTrack}
                            onClick={() => play(song, album.cover_medium)}
                        >
                            <span style={{color: theme.colors.grayColor4}}>
                                {song.title}
                            </span>
                        </div>
                        <div className={styles.dataContentDuration}>
                            <span style={{color: theme.colors.grayColor4}}>
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
        "x-rapidapi-key": apiInfo.API_KEY,
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