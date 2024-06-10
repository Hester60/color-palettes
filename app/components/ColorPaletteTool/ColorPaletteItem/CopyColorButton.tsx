'use client';

import {useMessages} from "@/libs/context/MessagesContext";
import {IconButton, Tooltip} from "@mui/material";
import {ContentCopy} from "@mui/icons-material";

type CopyColorButtonProps = {
    hex: string;
    color: 'black' | 'white';
    hide?: boolean;
}

export default function CopyColorButton({hex, color, hide = false}: CopyColorButtonProps) {
    const {pushMessage} = useMessages();

    const onCopyClick = () => {
        navigator.clipboard.writeText(hex).then(() => {
            pushMessage({
                message: 'Color copied to the clipboard !',
                severity: 'success',
            });
        }).catch((error: any) => {
            pushMessage({
                message: 'Sorry, something went wrong while copying to the clipboard',
                severity: 'error',
            });
        });
    }

    return (
        <>
            {!hide && (
                <Tooltip title="Copy" placement="right" arrow={true}>
                    <IconButton aria-label="Copy color" onClick={onCopyClick} sx={{borderRadius: '10px', color: color}}>
                        <ContentCopy/>
                    </IconButton>
                </Tooltip>
            )}
        </>
    );
}