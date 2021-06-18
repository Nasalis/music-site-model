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
    darkMode: boolean;
    setDarkMode: (darkmode: boolean) => void;
}

interface TableProviderProps {
    children: ReactNode;
}

export const ThemeContext = createContext({} as TableContextData);

export function ThemeContextProvider({children}: TableProviderProps) {
    const [darkMode, setDarkMode] = useState(false);

    return (
        <ThemeContext.Provider value={{darkMode, setDarkMode}}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    return useContext(ThemeContext);
}