import {IconButton, Tooltip, useMediaQuery} from "@mui/material";
import {Undo, Redo} from "@mui/icons-material";

type HistoryNavigationProps = {
    onBackHistory: { (): void };
    onNextHistory: { (): void };
    canBack: boolean;
    canNext: boolean;
}

export default function HistoryNavigation({onBackHistory, onNextHistory, canBack, canNext}: HistoryNavigationProps) {
    const isBelow1000Pixels = useMediaQuery('(max-width: 1000px)');

    return (
        <>
            <Tooltip title="Undo" placement="top" arrow={true}>
                <IconButton size={isBelow1000Pixels ? 'small' : 'medium'} aria-label="Undo" onClick={() => canBack && onBackHistory()} sx={{borderRadius: '10px'}}>
                    <Undo fontSize={isBelow1000Pixels ? 'small' : 'medium'} sx={{color: !canBack ? 'rgba(0,0,0,0.2)' : 'text.secondary'}}/>
                </IconButton>
            </Tooltip>
            <Tooltip title="Redo" placement="top" arrow={true}>
                <IconButton aria-label="Redo" size={isBelow1000Pixels ? 'small' : 'medium'} onClick={() => canNext && onNextHistory()} sx={{borderRadius: '10px'}}>
                    <Redo fontSize={isBelow1000Pixels ? 'small' : 'medium'} sx={{color: !canNext ? 'rgba(0,0,0,0.2)' : 'text.secondary'}}/>
                </IconButton>
            </Tooltip>
        </>
    )
}