'use client';

import {Button} from "@mui/material";

type CloseButtonProps = {
    onClick: { (...args: any[]): void };
}

export default function CloseButton({onClick}: CloseButtonProps) {
    return (
        <Button type="button" variant="outlined" color="inherit" disableElevation={true}
                onClick={onClick}>Cancel</Button>
    )
}