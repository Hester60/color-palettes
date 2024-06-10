'use client';

import {Box, Dialog, DialogContent} from "@mui/material";
import {ColorPicker, useColor} from "react-color-palette";
import {Color} from "@/libs/types/Color";
import SelectButton from "@/app/components/ColorPickerDialog/SelectButton";
import CloseButton from "@/app/components/ColorPickerDialog/CloseButton";

type ColorPickerDialogProps = {
    show: boolean;
    selectedColor?: Color;
    onClose: { (): void };
    onSelectColor: { (selectedHex: string, color?: Color): void }
}

export default function ColorPickerDialog({show, onClose, selectedColor, onSelectColor}: ColorPickerDialogProps) {
    const [color, setColor] = useColor(selectedColor ? selectedColor.hex : "#561ecb");

    const onSelectColorClick = () => {
        onSelectColor(color.hex, selectedColor)
    };

    return (
        <Dialog onClose={onClose} open={show}>
            <DialogContent>
                <ColorPicker color={color} onChange={setColor} hideInput={["rgb", "hsv"]} hideAlpha={true}/>
                <Box component="div" sx={{display: 'flex', mt: 1, justifyContent: 'center', gap: 1}}>
                    <CloseButton onClick={onClose}/>
                    <SelectButton onClick={onSelectColorClick}/>
                </Box>
            </DialogContent>
        </Dialog>
    )
}