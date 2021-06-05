import React from 'react';
import { useTheme } from '../ThemeContext';
import styles from './style.module.scss';

interface Artist {
    name: string,
    nb_album: number,
    nb_fan: number,
    picture_medium: string,
}

interface ArtistCardProps {
    artist: Artist
}

export function ArtistCard({artist}: ArtistCardProps) {

    const {theme} = useTheme();

    return (
        <div className={styles.artistCardContainer}>
            <div className={styles.header}>
                <img src={artist.picture_medium} alt={artist.name}/>
                <i className="fas fa-heart"></i>
            </div>
            <h4 style={{
                color: theme.colors.text
            }} >{artist.name}</h4>
            <div className={styles.cardInformations}>
                <span style={{color: theme.colors.text}}>Albuns: {artist.nb_album}</span>
                <span style={{color: theme.colors.text}}>{artist.nb_fan}
                    <strong style={{color: theme.colors.text}}>fans</strong>
                </span>
            </div>
        </div>
    )
}
