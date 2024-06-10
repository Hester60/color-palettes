'use client';

import {IconButton, Tooltip} from "@mui/material";
import {Palette} from "@mui/icons-material";

type ShadesButtonProps = {
    onClick: { (): void };
    color: 'black' | 'white';
    hide?: boolean;
}

export default function ShadesButton({color, onClick, hide = false}: ShadesButtonProps) {
    return (
        <>
            {
                !hide && (
                    <Tooltip title="View Shades" placement="right" arrow={true}>
                        <IconButton aria-label="Views Shades" onClick={onClick} sx={{borderRadius: '10px', color: color}}>
                            <Palette/>
                        </IconButton>
                    </Tooltip>
                )
            }
        </>
    )
}