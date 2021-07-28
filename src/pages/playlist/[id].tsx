import React, { useEffect } from 'react';

import { GetStaticPaths, GetStaticProps } from 'next';

import styles from './playlist.module.scss';

import { useTheme } from '../../components/ThemeContext';

import { apiInfo } from '../../components/utils/api';
import { convertSecondsToMinutes } from '../../components/utils/convertTime';
import { amountAnything } from '../../components/utils/numberAmountFormated';
import {Albuns} from '../../components/utils/types'

import SongButton from '../../components/Button';
import SongsList from '../../components/SongsList';
import Link from 'next/link';
interface AlbunsProps {
    album: Albuns
}

export default function Playlist({album}: AlbunsProps) {

    const {darkMode} = useTheme();

    useEffect(() => {
        async function getInfo() {
            if(album.type !== "album")
                return;

            const data = await fetch(`${apiInfo.BASE_URL}/album/${album.id}`,{
                "method": "GET",
                "headers": {
                    "x-rapidapi-key": "d066035e6emshe6ee373b4813fbep19e023jsn185d48b48ca4",
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
                        {album?.title}
                    </h2>
                    <div>
                        <img src={album.artist.picture_small} alt="" />
                        <Link href={`/artist/${album.artist.id}`}>
                            <span className={darkMode ? styles.darkMode : undefined}>{album?.artist?.name}</span>
                        </Link>
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

                <SongsList album={album}/>
                
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
        "x-rapidapi-key": "d066035e6emshe6ee373b4813fbep19e023jsn185d48b48ca4",
        "x-rapidapi-host": apiInfo.HOST
        }
    }).then(data => data.json());


    const album = {
        id: data.id,
        title: data.title,
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