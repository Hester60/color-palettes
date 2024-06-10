'use client';

import {Box, useMediaQuery} from "@mui/material";
import ColorPaletteList from "@/app/components/ColorPaletteTool/ColorPaletteList/ColorPaletteList";
import {Color} from "@/libs/types/Color";
import {useEffect, useState} from "react";
import ColorPickerDialog from "@/app/components/ColorPickerDialog/ColorPickerDialog";
import {closestCenter, DndContext, PointerSensor, useSensor, useSensors} from '@dnd-kit/core';
import {arrayMove, SortableContext} from '@dnd-kit/sortable';
import {restrictToHorizontalAxis, restrictToVerticalAxis, restrictToWindowEdges,} from '@dnd-kit/modifiers';
import {generateColorPalette} from "@/libs/utils/generateColorPalette";
import {getColorDetails} from "@/libs/utils/getColorDetails";
import ColorPaletteToolBar from "@/app/components/ColorPaletteTool/ToolBar/ColorPaletteToolBar";
import DownloadImageDialog from "@/app/components/ColorPaletteTool/ToolBar/DownloadImageTool/DownloadImageDialog";
import {pdf} from "@react-pdf/renderer";
import PDFDocument from "@/app/components/PDFDocument/PDFDocument";
import {saveAs} from 'file-saver';

export default function ColorPaletteTool() {
    const [showColorPickerDialog, setShowColorPickerDialog] = useState<boolean>(false);
    const [selectedColor, setSelectedColor] = useState<Color | undefined>(undefined);
    const [colors, setColors] = useState<Color[]>([]);
    const [palettesHistory, setPalettesHistory] = useState<Color[][]>([]);
    const [currentHistoryIndex, setCurrentHistoryIndex] = useState(0);
    const [showUploadDialog, setShowUploadDialog] = useState<boolean>(false);
    const isBelow1000Pixels = useMediaQuery('(max-width: 1000px)');

    /**
     * Save the current palette into history then replace It by the new palette.
     *
     * @param palette
     */
    const setNewPalette = (palette: Color[]) => {
        let updatedPalettesHistory = [...palettesHistory].slice(currentHistoryIndex);

        setPalettesHistory([palette, ...updatedPalettesHistory]);

        setCurrentHistoryIndex(0);
        setColors(palette);
    }

    useEffect(() => {
        // Generate first palette when user reach the tool
        const palette: Color[] = generateColorPalette(undefined, true);
        setNewPalette(palette);
    }, []);

    const removeColor = (color: Color): void => {
        const newColors: Color[] = colors.filter((c: Color) => c.hex !== color.hex);
        setNewPalette(newColors);
    }

    const onColorChange = (selectedHex: string, color?: Color): void => {
        const copyColors: Color[] = [...colors];

        if (color) {
            const colorIndex: number | undefined = colors.findIndex((c: Color) => c.hex === color.hex);

            if (0 <= colorIndex) {
                copyColors[colorIndex] = getColorDetails(selectedHex, true);
                setNewPalette(copyColors);
            }
        } else {
            const palette: Color[] = generateColorPalette(selectedHex, true);
            setNewPalette(palette);
        }

        onCloseColorPickerDialog();
    }

    const onShadeChange = (selectedHex: string, color: Color): void => {
        const copyColors: Color[] = [...colors];

        if (color) {
            const colorIndex: number | undefined = colors.findIndex((c: Color) => c.hex === color.hex);

            if (0 <= colorIndex) {
                copyColors[colorIndex] = {
                    ...getColorDetails(selectedHex),
                    shades: copyColors[colorIndex].shades,
                };

                setNewPalette(copyColors);
            }
        }
    }

    const onChangeColorClick = (color: Color): void => {
        setSelectedColor(color);
        setShowColorPickerDialog(true);
    }

    const onPickColorClick = (): void => {
        setShowColorPickerDialog(true);
    }

    const onCloseColorPickerDialog = (): void => {
        setSelectedColor(undefined);
        setShowColorPickerDialog(false);
    }

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8
            }
        }),
    );

    const onDragEnd = (event: any) => {
        const {active, over} = event;

        if (active.id !== over.id) {
            //@ts-ignore
            setNewPalette((prev) => {
                const oldIndex = prev.findIndex((color: Color) => color.hex === active.id);
                const newIndex = prev.findIndex((color: Color) => color.hex === over.id);

                return arrayMove(prev, oldIndex, newIndex) as Color[];
            });
        }
    }

    const onBackSelection = () => {
        if (currentHistoryIndex < palettesHistory.length - 1) {
            const index: number = currentHistoryIndex + 1;
            setColors(palettesHistory[index]);
            setCurrentHistoryIndex(index);
        }
    }

    const onNextHistory = () => {
        if (currentHistoryIndex > 0) {
            const index: number = currentHistoryIndex - 1;
            setColors(palettesHistory[index]);
            setCurrentHistoryIndex(index);
        }
    }

    const generateRandomPalette = () => {
        const palette: Color[] = generateColorPalette(undefined, true);
        setNewPalette(palette);
    }

    const onExportClick = async () => {
        const blob = await pdf(<PDFDocument colors={colors}/>).toBlob();
        saveAs(blob, 'palette.pdf');
    }

    return (
        <Box component="div" sx={{
            display: 'flex',
            flexFlow: 'column',
            boxSizing: 'border-box',
            height: '100%',
            '@media (max-width: 1000px)': {
                borderRadius: 0,
                flexDirection: 'column-reverse',
                width: '100%',
            }
        }}>
            <ColorPickerDialog onSelectColor={onColorChange} show={showColorPickerDialog}
                               onClose={onCloseColorPickerDialog} selectedColor={selectedColor}/>
            <DownloadImageDialog onValidate={setNewPalette} onClose={() => setShowUploadDialog(false)}
                                 show={showUploadDialog}/>
            <ColorPaletteToolBar onExportClick={onExportClick} onNextHistory={onNextHistory}
                                 onBackHistory={onBackSelection}
                                 onUploadPictureClick={() => setShowUploadDialog(true)}
                                 onPickColorClick={onPickColorClick}
                                 canNextHistory={currentHistoryIndex > 0} generateRandomPalette={generateRandomPalette}
                                 canBackHistory={currentHistoryIndex < palettesHistory.length - 1}/>
            <Box component="div" sx={{height: '100%'}}>
                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}
                            modifiers={[isBelow1000Pixels ? restrictToVerticalAxis : restrictToHorizontalAxis, restrictToWindowEdges]}>
                    <SortableContext items={colors.map(color => color.hex)}>
                        <ColorPaletteList onSelectShade={onShadeChange} colors={colors} removeColor={removeColor}
                                          onChangeColorClick={onChangeColorClick}/>
                    </SortableContext>
                </DndContext>
            </Box>
        </Box>
    );
};