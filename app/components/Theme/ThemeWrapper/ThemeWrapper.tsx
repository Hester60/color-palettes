'use client'
import {ReactNode} from "react";
import {ThemeProvider} from '@mui/material/styles';
import {themeLight} from '@/app/theme';

export default function ThemeWrapper({children}: { children: ReactNode }) {

    return (
        <ThemeProvider theme={themeLight}>
            {children}
        </ThemeProvider>
    )
}