import React, { useEffect, useRef, useState } from 'react'

import styles from './style.module.scss'

import Slide from 'rc-slider';
import 'rc-slider/assets/index.css';
import { convertSecondsToMinutes } from '../utils/convertTime'
import { usePlayer } from '../PlayerContext';

export function Player() {

    const audioRef = useRef<HTMLAudioElement>(null);
    const [progress, setProgress] = useState(0);

    function setUpProgress() {
        audioRef.current.currentTime = 0;

        audioRef.current.addEventListener("timeupdate", () => {
            setProgress(Math.floor(audioRef.current.currentTime))
        })
    }

    function handleSec(amount: number) {
        audioRef.current.currentTime = amount;
        setProgress(amount)
    }

    function handleSongEnded() {
        if(hasNextSong) {
            playNext();
        } else {
            clearPlayerState;
        }
    }

    const {
        songsList,
        currentSongIndex,
        isPlaying,
        isShuffling,
        isLooping,
        albumImage,
        hasNextSong,
        togglePlay,
        toggleShuffling,
        toggleLooping,    
        setPlayingState,
        clearPlayerState,
        playNext,
        playPrevious
    } = usePlayer();

    useEffect(() => {
        if(!audioRef.current) {
            return;
        }

        if(isPlaying) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }

    }, [isPlaying])

    const song = songsList[currentSongIndex]


    return (
        <div className={styles.playerContainer}>
            <div className={styles.songPlaying}>
                {song && <img src={albumImage} alt="song"/>}
                <div>
                    <span>{song?.artist.name}</span>
                    <span>{song?.title}</span>
                </div>
            </div>

            <div className={styles.playerController}>
                <div className={styles.buttons}>
                    <button 
                        type="button" 
                        className={isShuffling ? styles.isActive : ''} 
                        onClick={toggleShuffling}>
                        <img src="/shuffle.svg" alt="Embaralhar"/>
                    </button>
                    <button type="button" onClick={playPrevious}>
                        <img src="/play-previous.svg" alt="Tocar anterior"/>
                    </button>
                    <button type="button" className={styles.playButton} onClick={togglePlay}>
                        <img src={isPlaying ? "/pause.svg" : "/play.svg"} alt="Tocar"/>
                    </button>
                    <button type="button" onClick={playNext}>
                        <img src="/play-next.svg" alt="Tocar próxima"/>
                    </button>
                    <button 
                        type="button" 
                        className={isLooping ? styles.isActive : ''} 
                        onClick={toggleLooping}>
                        <img src="/repeat.svg" alt="Repetir"/>
                    </button>
                </div>
                <div className={styles.progress}>
                    <span>{convertSecondsToMinutes(progress)}</span>
                    <Slide 
                        style={{width: 200}}
                        max={30}
                        value={progress}
                        onChange={handleSec}
                        className={styles.progressBar}
                        trackStyle={{backgroundColor: "#04d361"}}
                        railStyle={{backgroundColor: "#2d70b3"}}
                        handleStyle={{borderColor: "#04d361", borderWidth: 4}}
                    />
                    {song ? (
                        <span>{convertSecondsToMinutes(30)}</span>
                    ) : (
                        <span>{convertSecondsToMinutes(0)}</span>
                    )}
                </div>
            </div>

            <audio 
                src={song?.preview}
                ref={audioRef}
                autoPlay
                loop={isLooping}
                onEnded={handleSongEnded}
                onPlay={() => setPlayingState(true)}
                onPause={() => setPlayingState(false)}
                onLoadedMetadata={setUpProgress}
            />

            <div className="options">
                <div>
                </div>
            </div>
        </div>
    )
}
