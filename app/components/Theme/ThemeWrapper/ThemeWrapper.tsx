'use client'
import {ReactNode} from "react";
import {ThemeProvider} from '@mui/material/styles';
import {themeLight, themeDark} from '@/app/theme';
import {useTheme} from "@/libs/context/ThemeContext";

export default function ThemeWrapper({children}: { children: ReactNode }) {
    const {theme} = useTheme();

    return (
        <ThemeProvider theme={'dark' === theme ? themeDark : themeLight}>
            {children}
        </ThemeProvider>
    )
}