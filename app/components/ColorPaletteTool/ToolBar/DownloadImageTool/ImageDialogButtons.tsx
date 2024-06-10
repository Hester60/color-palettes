import {Box, Button} from "@mui/material";
import {FinalColor} from "extract-colors/lib/types/Color";

type ImageDialogButtonsProps = {
    colors: FinalColor[];
    onCancelClick: {(): void};
    onValidateClick: {(): void};
    onChangeClick: {(): void};
}

export default function ImageDialogButtons({colors, onCancelClick, onValidateClick, onChangeClick}: ImageDialogButtonsProps) {
    return (
        <Box component="div" sx={{display: 'flex', justifyContent: 'end', gap: 1}}>
            <Button variant="outlined" type="button" onClick={onCancelClick}>
                Cancel
            </Button>
            {(colors.length > 0) && (
                <>
                    <Button variant="outlined" type="button" onClick={onChangeClick}>
                        Change image
                    </Button>
                    <Button variant="contained" disableElevation={true} type="button" onClick={onValidateClick}>
                        Validate
                    </Button>
                </>
            )}
        </Box>
    )
}