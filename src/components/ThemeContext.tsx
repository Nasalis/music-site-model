import React, { createContext, ReactNode, useContext, useState } from 'react';

interface Theme {
    title : string,
    colors: {
        background: string,
        backgroundBold: string,
        text: string,
        menubarColor: string,
        artistCardColor: string,
        playlistOrAlbumColor: string,
        priceCardColorBackground: string,
        priceCardColorBackgroundFooter: string,
        grayColor4: string,
    }
}

interface TableContextData {
    theme: Theme,
    themes: Array<Theme>
    setTheme: (state: Theme) => void,
}

interface TableProviderProps {
    children: ReactNode;
}

export const ThemeContext = createContext({} as TableContextData);

export const themes = [
    {
        title : 'light',
        colors: {
            background: '#f5f5f5',
            backgroundBold: '#f7f7f7',
            text: '#333',
            menubarColor: '#131313',
            artistCardColor: '#252525',
            playlistOrAlbumColor: '#72727d',
            priceCardColorBackground: '#f8f9fa',
            priceCardColorBackgroundFooter: '#ebe6e6',
            grayColor4:'#4e4c4c',
            
        }
    },
    
    {
        title : 'dark',
        colors: {
            background: '#222',
            backgroundBold: '#141414',
            text: '#fff',
            menubarColor: '#f2f2f2',
            artistCardColor: '#e9e6e6',
            playlistOrAlbumColor: '#cbcbce',
            priceCardColorBackground: '#212122',
            priceCardColorBackgroundFooter: '#2e2b2b',
            grayColor4:'#b4b3b3',
        }
    }
]

export function ThemeContextProvider({children}: TableProviderProps) {
    const [theme, setTheme] = useState(themes[0]);

    return (
        <ThemeContext.Provider value={{theme, themes, setTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    const context = useContext(ThemeContext);
    const {theme, themes, setTheme} = context;
    return {theme, themes, setTheme}
}