import React from 'react';
import { useTheme } from '../ThemeContext';
import styles from './style.module.scss';

interface PriceCardProps {
    avaiable: boolean;
    data: Array<string>;
    price: string;
}

export function PriceCard({avaiable, data, price}: PriceCardProps) {

    const {darkMode} = useTheme()
    
    return (
        <div className={styles.priceCardContainer}>
            <header className={styles.priceCardHeader}>
                <h2>Name of Plan</h2>
                <h3> <sup>R$</sup> {price}<small>/mês</small></h3>
                <img src="/waveBg.svg" alt=""/>
                <img src='/wave.svg' alt=""/>
            </header>

            <ul className={!darkMode ? styles.priceCardDetails : `${styles.priceCardDetails} ${styles.darkMode}`}>
                <li><i className={!darkMode ? "fas fa-check" : `fas fa-check ${styles.darkMode}`}></i>73 milhões de faixas</li>
                <li><i className={!darkMode ? "fas fa-check" : `fas fa-check ${styles.darkMode}`}></i>Sem publicidade</li>
                <li><i className={!darkMode ? "fas fa-check" : `fas fa-check ${styles.darkMode}`}></i>Pule quantas faixas quiser</li>
                <li><i className={!darkMode ? "fas fa-check" : `fas fa-check ${styles.darkMode}`}></i>Modo offline</li>
                {data.map((info, index) => (
                    <li key={index}><i className={!darkMode ? "fas fa-check" : `fas fa-check ${styles.darkMode}`}></i>{info}</li>
                ))}
                {avaiable ? (
                    <li><i className={!darkMode ? "fas fa-check" : `fas fa-check ${styles.darkMode}`}></i>6 contas</li>
                ): (
                    <li className={darkMode ? undefined : styles.darkMode}>
                        <i className="fas fa-times"></i>
                        6 contas
                    </li>
                )}
            </ul>

            <div className={!darkMode ? styles.priceCardInformations : `${styles.priceCardInformations} ${styles.darkMode}`}>
                <span>1 mês grátis</span>
                <button type="button">Experimente agora</button>
                <span>Mais informações</span>
            </div>  
        </div>
    )
}