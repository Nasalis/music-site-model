import Link from 'next/link';
import React, { useState } from 'react'
import { useTheme } from '../ThemeContext';

import styles from './style.module.scss'

export function Header() {

    const [isActive, setIsActive] = useState(false);

    const {darkMode, setDarkMode} = useTheme();

    const handleToggleMenu = () => setIsActive(!isActive);

    const handleDarkMode = () => {
        setDarkMode(!darkMode);
    } 

    return (
        <header className={darkMode ? `${styles.headerContainer} ${styles.darkActive}` : styles.headerContainer}>
            <nav className={styles.menu}>
                <div className={styles.logo}>
                    <h1>Wave</h1>
                    <h1>Wave</h1>
                </div>
                <label className={styles.toggleMenu} onClick={handleToggleMenu}>
                    <i className="fa fa-bars"></i>
                </label>
                <ul className={isActive ? `${styles.menubar} ${styles.active}` : styles.menubar}>
                    <li onClick={handleDarkMode}>
                        <i className={!darkMode ? "fas fa-sun" : `fas fa-moon ${styles.darkActive}`}>
                        </i>
                    </li>
                    <li>
                        <a className={!darkMode ? styles.headerLink : `${styles.headerLink} ${styles.darkActive}`} href="#">
                            Home
                        </a>
                    </li>
                    <li>
                        <Link href="/search">
                            <a className={!darkMode ? styles.headerLink : `${styles.headerLink} ${styles.darkActive}`} href="#">
                                Search
                            </a>
                        </Link>
                    </li>
                    <li>
                        <a className={!darkMode ? styles.headerLink : `${styles.headerLink} ${styles.darkActive}`} href="#">
                            Plans
                        </a>
                    </li>
                    <li>
                        <a className={!darkMode ? styles.headerLink : `${styles.headerLink} ${styles.darkActive}`} href="#">
                            About
                        </a>
                    </li>
                </ul>
            </nav>
        </header>
    )
}