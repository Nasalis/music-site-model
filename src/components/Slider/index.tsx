import React, { ReactNode, useState } from 'react';
import { useTheme } from '../ThemeContext';
import styles from './style.module.scss';

type SliderProps = {
    length: number;
    children: ReactNode;
}

export function Slider({length, children}: SliderProps) {

    const [scrollX, setScrollX] = useState(-40);

    const {darkMode} = useTheme();

    const handleLeftArrow = () => {
        let xAxis = scrollX + Math.round(window.innerWidth / 2);

        if (xAxis > 0) {
            xAxis = 0;
        }

        setScrollX(xAxis); 
    }

    const handleRightArrow = () => {
        let xAxis = scrollX - Math.round(window.innerWidth / 2);
        let listWidth = length * 300;

        if((window.innerWidth - listWidth) > xAxis) {
            xAxis = (window.innerWidth - listWidth) - 60;
        }

        setScrollX(xAxis)
    }

    return (
     <section className={styles.artistProfiles}>
        <h1 className={darkMode ? styles.darkMode : undefined}>Playlists that may interest you</h1>
          <div className={styles.artistRowLeft} onClick={handleLeftArrow}>
            <i className="fas fa-chevron-left"></i>
          </div>
          <div className={styles.artistRowRight} onClick={handleRightArrow}>
            <i className="fas fa-chevron-right"></i>
          </div>
          <div className={styles.sliderContainer}>
            <div className={styles.sliderBody} style={{
                marginLeft: scrollX,
                width: length*300
            }}>
                {children}
            </div>
          </div>
      </section>
    )
}