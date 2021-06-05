import React from 'react';
import styles from './style.module.scss';

export function Footer() {
    return (
        <footer className={styles.footerContainer}>
            <div className={styles.socialMedias}>
                <ul>
                    <i className="fab fa-facebook-f"></i>
                    <i className="fab fa-twitter"></i>
                    <i className="fab fa-instagram"></i>
                    <i className="fab fa-youtube"></i>
                </ul>
            </div>
            <ul>
                <h4>Company</h4>
                <li>Sobre</li>
                <li>Empregos</li>
                <li>Ajuda</li>
                <li>About us</li>
            </ul>
            <ul>
                <h4>Comunities</h4>
                <li>Para Artistas</li>
                <li>Desenvolvedores</li>
                <li>Publicidade</li>
                <li>Investidores</li>
                <li>Fornecedores</li>
            </ul>
            <ul>
                <h4>Links</h4>
                <li>Suporte</li>
                <li>Player da Web</li>
                <li>Aplicativo móvel grátis</li>
            </ul>
        </footer>
    )
}
