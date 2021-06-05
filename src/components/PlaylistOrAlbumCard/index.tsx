import React from 'react';
import { useTheme } from '../ThemeContext';
import Link from 'next/link';
import styles from './style.module.scss';

type Artist = {
    id: number,
    name: string,
    picture_small: string,
}

type TracksData = {
    title: string,
    duration: number,
}

type Tracks = {
    data: TracksData
}

interface Albuns {
    id: string,
    label: string,
    artist: Artist,
    nb_tracks: number,
    duration: number,
    fans: string,
    gender: string,
    release_date: string,
    tracks: Tracks[],
    cover_medium: string,
}

interface PlaylistOrAlbumCardProps {
    data: Albuns
}

export function PlaylistOrAlbumCard({data}: PlaylistOrAlbumCardProps) {

    const {theme} = useTheme();
    const color = theme.colors.playlistOrAlbumColor

    return (
        <Link href={`/playlist/${data.id}`}>
            <div className={styles.playlistOrAlbumCardContainer}>
                <div className={styles.header}>
                    <img src={data.cover_medium} alt=""/>
                    <ul className={styles.iconList}>
                        <i className="fas fa-play"></i>
                        <i className="fas fa-heart"></i>
                        <i className="fas fa-ellipsis-h"></i>
                    </ul>
                </div>
                <div className={styles.cardInformations}>
                    <span style={{color}} className={styles.title}>{data.label}</span>
                    <span style={{color}}>{data.nb_tracks} tracks - {data.fans} fans</span>
                </div>
            </div>
        </Link>
    )
}
