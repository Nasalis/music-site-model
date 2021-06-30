import React from 'react';

import styles from './style.module.scss';

import { useTheme } from '../../components/ThemeContext';

interface BarTitleProps {
    title: string;
}

export default function BarTitle({title}: BarTitleProps) {

    const {darkMode} = useTheme();

    return (
        <div className={styles.barTitleContainer}>
            <h2 className={darkMode ? styles.darkMode : undefined}>{title}</h2>
            <div className={styles.barDetail}></div>
        </div>
    )
}