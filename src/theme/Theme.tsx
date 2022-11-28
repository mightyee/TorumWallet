import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useCallback, useEffect, useState } from 'react';
import { createContext } from 'react';
import { ThemeProvider as ThemeProviderStyled } from 'styled-components';

import { darkTheme } from './darkTheme';
import { lightTheme } from './lightTheme';

export enum ThemeType {
    light = 'light',
    dark = 'dark',
}

const themes = {
    [ThemeType.light]: lightTheme,
    [ThemeType.dark]: darkTheme,
};

export const ThemeContext = createContext({
    theme: ThemeType.light,
    toggleTheme: () => { },
});


type IThemeProps = {
    children?: React.ReactNode;
}

export const ThemeProvider = (props: IThemeProps) => {
    const [theme, setTheme] = useState(ThemeType.light);

    useEffect(() => {
        loadTheme();
    }, []);

    const loadTheme = useCallback(async () => {
        const savedTheme = await AsyncStorage.getItem('@theme');
        if (savedTheme) {
            setTheme(JSON.parse(savedTheme));
        }
    }, [setTheme]);

    const toggleTheme = useCallback(
        () => {
            let newTheme;
            if (theme === ThemeType.light) {
                newTheme = ThemeType.dark;
            } else {
                newTheme = ThemeType.light;
            }

            AsyncStorage.setItem('@theme', newTheme);
            setTheme(newTheme);
        },
        [setTheme],
    );

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <ThemeProviderStyled theme={themes[theme]}>
                {props.children}
            </ThemeProviderStyled>
        </ThemeContext.Provider>
    );
};
