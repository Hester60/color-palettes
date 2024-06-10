'use client';

import {createTheme} from '@mui/material/styles';


const themeDark = createTheme({
    palette: {
        mode: 'dark',
    },
});

const themeLight = createTheme({
    palette: {
        mode: 'light',
    },
});

export {themeDark, themeLight};