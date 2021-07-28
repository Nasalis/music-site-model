import React, { useEffect, useState } from 'react';
import styles from './artist.module.scss';
import { GetStaticPaths, GetStaticProps } from 'next';
import { apiInfo } from '../../components/utils/api';
import { amountAnything } from '../../components/utils/numberAmountFormated';

import {Albuns, ArtistPage} from '../../components/utils/types'

import Link from 'next/link';
import { PlaylistOrAlbumCard } from '../../components/PlaylistOrAlbumCard';
import { useTheme } from '../../components/ThemeContext';

import SongButton from '../../components/Button';
import SongsList from '../../components/SongsList';
import BarTitle from '../../components/BarTitle';

interface ArtistCardProps {
    artist: ArtistPage,
}

export default function Artist({artist}: ArtistCardProps) {

    const [artistSong, setArtistSong] = useState([]);
    let albunsList: Albuns[] = [];

    const {darkMode} = useTheme();

    useEffect(() => {
        async function searchSongs() {
            const data = await fetch(`${apiInfo.BASE_URL}/artist/${artist.id}/top?limit=20`, {
                "method": "GET",
                "headers": {
                    "x-rapidapi-key": "d066035e6emshe6ee373b4813fbep19e023jsn185d48b48ca4",
                    "x-rapidapi-host": apiInfo.HOST,
                }
            })
            .then(response => response.json())
            setArtistSong(data.data);
        }
        searchSongs();
    }, [])

    async function fillAbunsList() {
        artistSong.map(song => {
            albunsList.push(song.album)
        })
    }

   fillAbunsList();

    albunsList = albunsList.filter(function (a) {
        return !this[JSON.stringify(a)] && (this[JSON.stringify(a)] = true);
    }, Object.create(null))

    return (
        <div className={!darkMode ? styles.artistContainer : `${styles.artistContainer} ${styles.darkMode}`}>
            <div className={styles.artistProfile}>
                <img src={artist.picture_medium} alt={artist.name} />
                <div>
                    <h1 className={darkMode ? styles.darkMode : undefined}>
                        {artist.name}
                    </h1>
                    <small className={darkMode ? styles.darkMode : undefined}>
                        {artist.nb_fan_message}
                    </small>
                    <SongButton smallWidth={true} dataArtist={artistSong} artist={artist}/>
                </div>
            </div>

            <div className={styles.artistLinks}>
                <div className={styles.linkContainer}>
                    <Link href={`${artist.id}`}>
                        <h4 className={darkMode ? styles.darkMode : undefined}>
                            Discografy
                        </h4>
                    </Link>
                </div>

                <div className={styles.linkContainer}>
                    <Link href={`${artist.id}/related_artist`}>
                        <h4 className={darkMode ? styles.darkMode : undefined}>
                            Related artists
                        </h4>
                    </Link>
                </div>
                <div className={styles.linkContainer}>
                    <Link href={`${artist.id}/related_playlist`}>
                        <h4 className={darkMode ? styles.darkMode : undefined}>
                            Related playlist
                        </h4>
                    </Link>
                </div>
                <div className={styles.linkContainer}>
                    <Link href={`${artist.id}/biography`}>
                        <h4 className={darkMode ? styles.darkMode : undefined}>
                            Biography
                        </h4>
                    </Link>
                </div>
            </div>

            <div className={styles.topSongsGridContainer}>
                <BarTitle title={"Top Songs"}/>
                <div className={darkMode ? `${styles.topSongsList} ${styles.darkMode}` : styles.topSongsList}>
                    <SongsList songs={artistSong}/>
                </div>
            </div>
            
            <div className={styles.albunsCollection}>
                <BarTitle title={"Albuns"}/>
                <div className={styles.albunsCardsArea}>
                    {albunsList.map((album, index) => (
                        <PlaylistOrAlbumCard key={index} data={album}/>
                    ))}
                </div>

            </div>
        </div>
    )
}

export const getStaticPaths: GetStaticPaths = async (ctx) => {

    const paths = apiInfo.artistsIDS.map(album => {
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
    
    const {id} = ctx.params;

    const data = await fetch(`${apiInfo.BASE_URL}/artist/${id}`, {
        "method": "GET",
        "headers": {
        "x-rapidapi-key": process.env.NEXT_PUBLIC_NEXT_APP_DEEZER_API_KEY,
        "x-rapidapi-host": apiInfo.HOST
        }
    }).then(data => data.json());

    const artist = {
        name: data.name,
        nb_album: data.nb_album,
        nb_fan: data.nb_fan,
        nb_fan_message: amountAnything.fansAmountMessage(data.nb_fan),
        picture_medium: data.picture_medium,
        id: data.id,
    }

    return {
        props: {
            artist,
        },
        revalidate: 60 * 60 * 24
    }
}