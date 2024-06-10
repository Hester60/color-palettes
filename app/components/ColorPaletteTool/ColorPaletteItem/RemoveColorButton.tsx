'use client';

import {IconButton, Tooltip} from "@mui/material";
import {Clear} from "@mui/icons-material";

type RemoveColorButtonProps = {
    onClick: { (): void };
    color: 'black' | 'white';
    hide?: boolean;
}

export default function RemoveColorButton({onClick, color, hide = false}: RemoveColorButtonProps) {
    return (
        <>
            {!hide && (
                <Tooltip
                    title="Remove"
                    arrow={true}
                    placement="right"
                >
                    <IconButton aria-label="Remove color" onClick={onClick} sx={{borderRadius: '10px', color: color}}>
                        <Clear/>
                    </IconButton>
                </Tooltip>
            )}
        </>
    )
}