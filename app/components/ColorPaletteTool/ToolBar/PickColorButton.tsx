import {Button, useMediaQuery} from "@mui/material";
import {Colorize} from "@mui/icons-material";

type PickColorButtonProps = {
    onClick: { (): void }
}

export default function PickColorButton({onClick}: PickColorButtonProps) {
    const isBelow1000Pixels = useMediaQuery('(max-width: 1000px)');

    return (
        <Button
            onClick={onClick}
            size={isBelow1000Pixels ? 'small' : 'medium'}
            variant="contained"
            color="primary"
            disableElevation={true}
            startIcon={isBelow1000Pixels ? null : <Colorize/>}
        >
            {isBelow1000Pixels ? 'Pick' : 'Pick a color'}
        </Button>
    )
}