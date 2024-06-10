import {IconButton, Tooltip, useMediaQuery} from "@mui/material";
import {ImportExport} from "@mui/icons-material";

type ExportButtonProps = {
    onClick: { (): void }
}

export default function ExportButton({onClick}: ExportButtonProps) {
    const isBelow1000Pixels = useMediaQuery('(max-width: 1000px)');

    return (
        <Tooltip title="Export as PDF" placement="right" arrow={true}>
            <IconButton size={isBelow1000Pixels ? 'small' : 'medium'} aria-label="Export as PDF" onClick={onClick}
                        sx={{borderRadius: '10px'}}>
                <ImportExport fontSize={isBelow1000Pixels ? 'small' : 'medium'}/>
            </IconButton>
        </Tooltip>
    )
}