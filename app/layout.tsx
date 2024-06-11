import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import {AppRouterCacheProvider} from '@mui/material-nextjs/v13-appRouter';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {MessagesProvider} from "@/libs/context/MessagesContext";
import MessagesList from "@/app/components/Messages/MessagesList";
import NavBar from "@/app/components/NavBar/NavBar";
import ThemeWrapper from "@/app/components/Theme/ThemeWrapper/ThemeWrapper";
import "react-color-palette/css";
import {ReactNode} from "react";
import {Box} from "@mui/material";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Color Palettes Generator",
    description: "Tool to generate harmonious color palettes.",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <AppRouterCacheProvider>
            <ThemeWrapper>
                <MessagesProvider>
                    <Box component="div" sx={{display: 'flex', flexFlow: 'column', height: '100svh'}}>
                        <NavBar/>
                        <Box sx={{flex: 1}}>
                            <MessagesList/>
                            {children}
                        </Box>
                    </Box>
                </MessagesProvider>
            </ThemeWrapper>
        </AppRouterCacheProvider>
        </body>
        </html>
    );
}
