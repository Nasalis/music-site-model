import { useState } from 'react'
import styles from '../SongOfTheWeek/style.module.scss'
import { useTheme } from '../ThemeContext';

interface Song {
    artist: string,
    song: string,
    image: string
}

interface SongProps {
    song: Song
}

export default function SongOfTheWeek({song}: SongProps) {

    const [playActive, setPlayActive] = useState(false)

    const {theme} = useTheme();

    const playActiveTrue = () => setPlayActive(true)
    const playActiveFalse = () => setPlayActive(false)

    return (
        <div className={styles.songOfTheWeekContainer}>
            <div className={playActive ? styles.playIcon : `${styles.playIcon} ${styles.active}`}></div>
            <div className={styles.cardContent} onMouseEnter={playActiveTrue} onMouseLeave={playActiveFalse}>
                <div className={styles.songBackgroundImage}></div>
                <img src={song.image} alt={song.song}/>
                <span className={playActive ? styles.active : ''}>Listen Now</span>
            </div>
            <p 
                style={{color: theme.colors.text}}
            >{song.artist} - {song.song}</p>
        </div>
    )
}
