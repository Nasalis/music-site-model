import Head from 'next/head'
import SongOfTheWeek from '../components/SongOfTheWeek'
import styles from '../pages/home.module.scss'

import songs from '../../songs.json'
import {apiInfo} from '../components/utils/api';

import { Slider } from '../components/Slider'
import { ArtistCard } from '../components/ArtistCard'
import { PlaylistOrAlbumCard } from '../components/PlaylistOrAlbumCard'
import { PriceCard } from '../components/PriceCard'
import { useTheme } from '../components/ThemeContext'
import { useEffect, useState } from 'react'

export default function Home() {

  const {darkMode} = useTheme();

  const [artistList, setArtistList] = useState([]);
  const [albunsList, setAlbunsList] = useState([]);

  useEffect(() => {
    const loadArtists = () => {
      const getArtist = id => `${apiInfo.BASE_URL}/artist/${id}`;

      const artistInfo = [];

      for(let i = 452; i <= 464; i++) {
        artistInfo.push(fetch(getArtist(i), {
          "method": "GET",
          "headers": {
            "x-rapidapi-key": "d066035e6emshe6ee373b4813fbep19e023jsn185d48b48ca4",
            "x-rapidapi-host": apiInfo.HOST
          }
        }).then(reponse => reponse.json()));
      }

      Promise.all(artistInfo).then(artist => {
        setArtistList(artist)
      })
    }

    loadArtists();
  },[]);

  useEffect(() => {
    const loadAlbuns = () => {
      const getAlbuns = id => `${apiInfo.BASE_URL}/album/${id}`;

      const albunsInfo = [];

      apiInfo.selectedAlbunsForYou.map(id => {
        albunsInfo.push(fetch(getAlbuns(id), {
          "method": "GET",
          "headers": {
            "x-rapidapi-key": "d066035e6emshe6ee373b4813fbep19e023jsn185d48b48ca4",
            "x-rapidapi-host": apiInfo.HOST
          }
        }).then(response => response.json()));

        Promise.all(albunsInfo).then(album => {
          setAlbunsList(album)
        })
      })
    }
    loadAlbuns();
  }, [])

  return (
    <div className={!darkMode ? styles.homeContainer : `${styles.homeContainer} ${styles.darkMode}`}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className={styles.songsWeekContainer}>
        <h1 className={darkMode ? styles.darkMode : undefined}>
          Top Songs of the Week</h1>
          <div className={styles.listSongsWeek}>
            <div className={styles.songsWeek}>
              {songs.songsOfWeek.map((song, index) => (
                <SongOfTheWeek key={index} song={song}/>
              ))}
            </div>
          </div>
      </section>

      <Slider length={artistList.length}>
        {artistList.map((artist, index) => (
          <div key={index} className={styles.sliderItem}>
              <ArtistCard artist={artist}/>
          </div>
        ))}
      </Slider>

      <Slider length={albunsList.length}>
        {albunsList.map((album, index) => (
          <div key={index} className={styles.sliderItem}>
            <PlaylistOrAlbumCard data={album}/>
          </div>
        ))}
      </Slider>

      <section className={styles.plansToSubscribe}>
        <PriceCard price="26,90" avaiable={true} data={["Qualidade FLAC 16-bits", "Download gratuíto"]}/>
        <PriceCard price="16,90" avaiable={false} data={[]}/>
        <PriceCard price="32,90" avaiable={true} data={["Qualidade FLAC 16-bits", "Download gratuíto", "WaveConnection", "WaveKid"]}/>
      </section>
   

    </div>
  )
}
