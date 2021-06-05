import React from 'react';
import { useTheme } from '../ThemeContext';
import styles from './style.module.scss';

interface PriceCardProps {
    avaiable: boolean;
    data: Array<string>;
    price: string;
}

export function PriceCard({avaiable, data, price}: PriceCardProps) {

    const {theme} = useTheme()
    const background = theme.colors.priceCardColorBackground;
    const backgroundBold = theme.colors.priceCardColorBackgroundFooter;
    const itemCardColor = theme.colors.grayColor4;
    
    return (
        <div className={styles.priceCardContainer}>
            <header className={styles.priceCardHeader}>
                <h2>Name of Plan</h2>
                <h3> <sup>R$</sup> {price}<small>/mês</small></h3>
                <img src="/waveBg.svg" alt=""/>
                <img src='/wave.svg' alt=""/>
            </header>

            <ul style={{background}} className={styles.priceCardDetails}>
                <li style={{color: itemCardColor}}><i className="fas fa-check"></i>73 milhões de faixas</li>
                <li style={{color: itemCardColor}}><i className="fas fa-check"></i>Sem publicidade</li>
                <li style={{color: itemCardColor}}><i className="fas fa-check"></i>Pule quantas faixas quiser</li>
                <li style={{color: itemCardColor}}><i className="fas fa-check"></i>Modo offline</li>
                {data.map((info, index) => (
                    <li key={index} style={{color: itemCardColor}}><i className="fas fa-check"></i>{info}</li>
                ))}
                {avaiable ? (
                    <li style={{color: itemCardColor}}><i className="fas fa-check"></i>6 contas</li>
                ): (
                    <li style={{
                        color: itemCardColor, 
                        opacity: 0.6
                    }}><i className="fas fa-times"></i>6 contas</li>
                )}
            </ul>

            <div style={{background: backgroundBold}} className={styles.priceCardInformations}>
                <span>1 mês grátis</span>
                <button type="button">Experimente agora</button>
                <span>Mais informações</span>
            </div>  
        </div>
    )
}