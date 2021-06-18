import React from 'react';
import styles from './style.module.scss';

export function Footer() {
    return (
        <footer className={styles.footerContainer}>
            <div className={styles.socialMedias}>
                <ul>
                    <li><i className="fab fa-facebook-f"></i></li>
                    <li><i className="fab fa-twitter"></i></li>
                    <li><i className="fab fa-instagram"></i></li>
                    <li><i className="fab fa-youtube"></i></li>
                </ul>
            </div>
            <ul>
                <li><h4>Company</h4></li>
                <li>Sobre</li>
                <li>Empregos</li>
                <li>Ajuda</li>
                <li>About us</li>
            </ul>
            <ul>
                <li><h4>Comunities</h4></li>
                <li>Para Artistas</li>
                <li>Desenvolvedores</li>
                <li>Publicidade</li>
                <li>Investidores</li>
                <li>Fornecedores</li>
            </ul>
            <ul>
                <li><h4>Links</h4></li>
                <li>Suporte</li>
                <li>Player da Web</li>
                <li>Aplicativo móvel grátis</li>
            </ul>
        </footer>
    )
}
