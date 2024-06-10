'use client';

import {Button} from "@mui/material";

type SelectButtonProps = {
    onClick: {(...args: any[]): void};
}

export default function SelectButton({onClick}: SelectButtonProps) {
    return (
        <Button type="button" variant="contained" color="primary" disableElevation={true} onClick={onClick}>Select</Button>
    );
}