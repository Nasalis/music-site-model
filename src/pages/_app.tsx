import '../styles/globals.scss'
import styles from '../styles/app.module.scss';
import { Header } from '../components/Header';
import { Player } from '../components/Player';
import { Footer } from '../components/Footer';
import {ThemeContextProvider} from '../components/ThemeContext';
import { PlayerContextProvider } from '../components/PlayerContext';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeContextProvider>
      <PlayerContextProvider>
        <div className={styles.wrapper}>
          <main>
            <Header/>
              <Component {...pageProps} />
            <Footer/>
          </main>
          <Player/>
        </div>
      </PlayerContextProvider>
    </ThemeContextProvider>
  )
}

export default MyApp
