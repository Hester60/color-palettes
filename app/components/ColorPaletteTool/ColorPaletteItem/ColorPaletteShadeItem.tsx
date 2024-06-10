'use client';

import {Box, Typography} from "@mui/material";
import {Color} from "@/libs/types/Color";
import {useState} from "react";

type ColorPaletteShadeItemProps = {
    onShadeClick: { (shade: string): void }
    shade: Color;
    color: Color;
}

export default function ColorPaletteShadeItem({onShadeClick, shade, color}: ColorPaletteShadeItemProps) {
    const [showText, setShowText] = useState<boolean>(false);

    return (
        <Box key={shade.hex} onMouseEnter={() => setShowText(true)} onMouseLeave={() => setShowText(false)}
             onClick={() => onShadeClick(shade.hex)} component="div" sx={{
            width: '100%',
            height: `${100 / color.shades!.length}%`,
            backgroundColor: shade.hex,
            display: 'flex',
            justifyContent: 'center',
            cursor: 'pointer',
            alignItems: 'center',
        }}>
            {(color.hex.toUpperCase() === shade.hex.toUpperCase() && !showText) && (
                <Box component="div" sx={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    backgroundColor: color.isDarkColor ? 'white' : 'black'
                }}></Box>
            )}
            {showText && (
                <Typography color={shade.isDarkColor ? 'white' : 'black'}>{shade.hex}</Typography>
            )}
        </Box>
    )
}