import React from 'react';
import { useTheme } from '../ThemeContext';
import Link from 'next/link';
import styles from './style.module.scss';
import { amountAnything } from '../utils/numberAmountFormated';
interface Artist {
    name: string,
    nb_album: number,
    nb_fan: number,
    picture_medium: string,
    id: number;
}

interface ArtistCardProps {
    artist: Artist
}

export function ArtistCard({artist}: ArtistCardProps) {

    const {darkMode} = useTheme();

    return (
        <Link href={`/artist/${artist.id}`}>
            <div className={styles.artistCardContainer}>
                <div className={styles.header}>
                    <img src={artist.picture_medium} alt={artist.name}/>
                    <i className="fas fa-heart"></i>
                </div>
                <h4 className={!darkMode ? undefined : styles.darkMode}>{artist.name}</h4>
                <div className={styles.cardInformations}>
                    <span className={!darkMode ? undefined : styles.darkMode}>Albuns: {artist.nb_album}</span>
                    <span className={!darkMode ? undefined : styles.darkMode}>
                        {amountAnything.fansAmountMessage(artist.nb_fan)}
                    </span>
                </div>
            </div>
        </Link>
    )
}
