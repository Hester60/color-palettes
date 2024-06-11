'use client';

import {IconButton, Tooltip, useMediaQuery} from "@mui/material";
import {CameraAltOutlined} from "@mui/icons-material";

type UploadPictureButtonProps = {
    onClick: { (): void };
}

export default function UploadPictureButton({onClick}: UploadPictureButtonProps) {
    const isBelow1000Pixels = useMediaQuery('(max-width: 1000px)');

    return (
        <Tooltip title="Extract colors from image" placement="right" arrow={true}>
            <IconButton size={isBelow1000Pixels ? 'small' : 'medium'} aria-label="Extract colors from image" onClick={onClick}
                        sx={{borderRadius: '10px'}}>
                <CameraAltOutlined fontSize={isBelow1000Pixels ? 'small' : 'medium'}/>
            </IconButton>
        </Tooltip>
    )
}