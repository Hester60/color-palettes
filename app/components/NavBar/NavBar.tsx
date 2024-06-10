import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function NavBar(): JSX.Element {
    return (
        <Box component="div">
            <AppBar position="static" elevation={0} color={'inherit'}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        Color Palettes
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    );
}