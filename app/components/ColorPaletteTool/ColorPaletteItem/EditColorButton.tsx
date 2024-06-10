'use client';

import {IconButton, Tooltip} from "@mui/material";
import {Colorize} from "@mui/icons-material";

type EditColorButtonProps = {
    onChangeColorClick: { (): void }
    color: 'black' | 'white';
    hide?: boolean;
}

export default function EditColorButton({onChangeColorClick, color, hide = false}: EditColorButtonProps) {
    return (
        <>
            {!hide && (
                <Tooltip title="Edit" placement="right" arrow={true}>
                    <IconButton aria-label="Edit color" onClick={onChangeColorClick}
                                sx={{borderRadius: '10px', color: color}}>
                        <Colorize/>
                    </IconButton>
                </Tooltip>
            )}
        </>
    );
}