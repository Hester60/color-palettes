'use client';

import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import {DarkMode, LightMode} from "@mui/icons-material";
import {useTheme} from "@/libs/context/ThemeContext";

export default function ToggleTheme() {
    const {theme, switchTheme} = useTheme();

    const onCheck = () => {
        switchTheme();
    }

    return (
        <Stack direction="row" spacing={0} alignItems="center">
            <DarkMode/>
            <Switch checked={'light' === theme} onChange={onCheck} inputProps={{'aria-label': 'ant design'}}/>
            <LightMode/>
        </Stack>
    )
}