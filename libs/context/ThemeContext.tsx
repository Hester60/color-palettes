'use client';

import React, {useContext, createContext, useState, useEffect, ReactNode} from "react";

type ThemeContextType = 'dark' | 'light';

const ThemeContext = createContext<ThemeContextType>('light');

const ThemeCtxProvider = ({children}: { children: ReactNode }) => {
    const [theme, setTheme] = useState<ThemeContextType>('light');

    useEffect(() => {
        setTheme(localStorage.getItem('theme') as ThemeContextType || 'light');
    }, []);

    const switchTheme = () => {
        const newTheme: 'light' | 'dark' = 'dark' === theme ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    }

    return (
        <ThemeContext.Provider value={{switchTheme, theme}}>
            {children}
        </ThemeContext.Provider>
    )
}

const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error('useTheme must be used within a ThemeCtxProvider');
    }

    return context;
}

export {useTheme, ThemeCtxProvider};