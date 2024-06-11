import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {GitHub, LinkedIn} from "@mui/icons-material";
import {IconButton} from "@mui/material";
import Link from "next/link";

export default function NavBar(): JSX.Element {
    return (
        <Box component="div">
            <AppBar position="static" elevation={0} color={'inherit'}>
                <Toolbar>
                    <Typography variant="h6" component="div"
                                sx={{flexGrow: 1, textTransform: 'upperCase', fontWeight: 'bold'}} color='primary'>
                        CoOOOoleurs
                    </Typography>
                    <Box component="div" sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                        <Link target="_blank" href={process.env.NEXT_PUBLIC_LINKEDIN_PROFIL_URL as string}>
                            <IconButton aria-label="LinkedIn URL" color="primary"
                                        sx={{borderRadius: '10px'}}>
                                <LinkedIn/>
                            </IconButton>
                        </Link>
                        <Link target="_blank" href={process.env.NEXT_PUBLIC_SOURCE_CODE_URL as string}>
                            <IconButton aria-label="GitHub URL" color="secondary"
                                        sx={{borderRadius: '10px'}}>
                                <GitHub/>
                            </IconButton>
                        </Link>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}