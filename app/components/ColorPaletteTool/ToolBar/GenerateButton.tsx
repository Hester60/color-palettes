import {Button, useMediaQuery} from "@mui/material";
import {TipsAndUpdates} from "@mui/icons-material";

type GenerateButtonProps = {
    onClick: { (): void }
}

export default function GenerateButton({onClick}: GenerateButtonProps) {
    const isBelow1000Pixels = useMediaQuery('(max-width: 1000px)');

    return (
        <Button
            onClick={onClick}
            size="small"
            variant="contained"
            color="secondary"
            disableElevation={true}
            startIcon={isBelow1000Pixels ? null : <TipsAndUpdates/>}
        >
            {isBelow1000Pixels ? 'Generate' : 'Random palette'}
        </Button>
    )
}