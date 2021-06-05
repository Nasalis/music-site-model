import React, { useState } from 'react'
import { useTheme } from '../ThemeContext';

import styles from './style.module.scss'

export function Header() {

    const [isActive, setIsActive] = useState(false);
    const [darkMode, setDarkMode] = useState(true);

    const {theme, themes, setTheme} = useTheme();

    const handleToggleMenu = () => setIsActive(!isActive);

    function numberIndexMode() {
        return darkMode ? 1 : 0
    }

    const handleDarkMode = () => {
        const index = numberIndexMode();
        setTheme(themes[index])
        setDarkMode(!darkMode);
    } 

    return (
        <header style={{
            background: theme.colors.background,
        }} className={styles.headerContainer}>
            <nav className={styles.menu}>
                <div className={styles.logo}>
                    <h1>Wave</h1>
                    <h1>Wave</h1>
                </div>
                <label htmlFor="" className={styles.toggleMenu} onClick={handleToggleMenu}>
                    <i className="fa fa-bars"></i>
                </label>
                <ul 
                    style={{background: theme.colors.background}} 
                    className={isActive ? `${styles.menubar} ${styles.active}` : styles.menubar}>
                    <li onClick={handleDarkMode}>
                        <i style={{color: theme.colors.menubarColor}} 
                            className={darkMode ? "fas fa-sun" : "fas fa-moon"}>
                        </i>
                    </li>
                    <li><a style={{color: theme.colors.menubarColor}} href="#">Home</a></li>
                    <li><a style={{color: theme.colors.menubarColor}} href="#">Contact</a></li>
                    <li><a style={{color: theme.colors.menubarColor}} href="#">Plans</a></li>
                    <li><a style={{color: theme.colors.menubarColor}} href="#">About</a></li>
                </ul>
            </nav>
        </header>
    )
}