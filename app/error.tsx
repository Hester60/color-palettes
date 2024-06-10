'use client';

import {useEffect} from 'react';
import {Box, Typography, Button} from "@mui/material";
import FloatingCubes from "@/app/components/FloatingCubes/FloatingCubes";
import {Undo, Handshake} from '@mui/icons-material';
import Link from "next/link";

export default function Error({
                                  error,
                                  reset,
                              }: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error]);

    return (
        <Box component="div" sx={{
            width: '100%',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexFlow: 'column',
            textAlign: 'center',
        }}>
            <FloatingCubes/>
            <Typography component="p" variant="h2" fontWeight='bold'>
                Oh <Typography component="span" variant="h2" fontWeight='bold' color="error">NoOoOooOooOoo
                !</Typography>
            </Typography>
            <Typography component="p" variant="h2" fontWeight='bold'>What did you do ? You <Typography component="span"
                                                                                                       variant="h2"
                                                                                                       fontWeight='bold'>
                <mark style={{padding: '1px 5px'}}>BROKE</mark>
            </Typography> my app !
            </Typography>
            <Typography component="p" sx={{mt: 3}} variant="h4" fontWeight='bold'>Just kidding, It's my fault, I'm too
                bad
                🙄</Typography>
            <Box component="div" sx={{mt: 5, display: 'flex', flexFlow: 'column', gap: 1}}>
                <Link href="/">
                    <Button variant="contained" sx={{textTransform: 'unset !important'}} size="large"
                            disableElevation={true}>Forgot this experience and go back to app 👍</Button>
                </Link>
                <Link href={process.env.NEXT_PUBLIC_LINKEDIN_PROFIL_URL as string} target="_blank">
                    <Button variant="contained" sx={{textTransform: 'unset !important'}} size="large" color="secondary"
                            disableElevation={true}>Help me to improve my skills by hiring me 🤑</Button>
                </Link>
            </Box>
        </Box>
    );
}