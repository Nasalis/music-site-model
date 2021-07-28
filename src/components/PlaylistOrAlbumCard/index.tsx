import React from 'react';
import { useTheme } from '../ThemeContext';
import Link from 'next/link';
import styles from './style.module.scss';

import {Albuns} from '../utils/types'
import { amountAnything } from '../utils/numberAmountFormated';

interface PlaylistOrAlbumCardProps {
    data: Albuns
}

export function PlaylistOrAlbumCard({data}: PlaylistOrAlbumCardProps) {

    const {darkMode} = useTheme();

    return (
        <Link href={`/playlist/${data.id}`}>
            <div className={styles.playlistOrAlbumCardContainer}>
                <div className={styles.header}>
                    <img src={data.cover_medium} alt=""/>
                    <ul className={styles.iconList}>
                        <li><i className="fas fa-play"></i></li>
                        <li><i className="fas fa-heart"></i></li>
                        <li><i className="fas fa-ellipsis-h"></i></li>
                    </ul>
                </div>
                <div className={styles.cardInformations}>
                    <span className={!darkMode ? styles.title : `${styles.title} ${styles.darkMode}`}>
                        {data?.title || data?.label}
                    </span>
                    {data.nb_tracks !== undefined && ( 
                        <span className={!darkMode ? undefined : styles.darkMode}>{data.nb_tracks} tracks - {amountAnything.fansAmountMessage(data.fans)}</span>
                    )}
                </div>
            </div>
        </Link>
    )
}
