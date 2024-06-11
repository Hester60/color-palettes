'use client';

import {Box, Typography, useMediaQuery} from "@mui/material";
import {Color} from "@/libs/types/Color";
import RemoveColorButton from "@/app/components/ColorPaletteTool/ColorPaletteItem/RemoveColorButton";
import CopyColorButton from "@/app/components/ColorPaletteTool/ColorPaletteItem/CopyColorButton";
import EditColorButton from "@/app/components/ColorPaletteTool/ColorPaletteItem/EditColorButton";
import {useSortable, SortableContext} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import {useEffect, useState} from "react";
import ShadesButton from "@/app/components/ColorPaletteTool/ColorPaletteItem/ShadesButton";
import ColorPaletteShadeItem from "@/app/components/ColorPaletteTool/ColorPaletteItem/ColorPaletteShadeItem";

type ColorPaletteItemProps = {
    color: Color;
    colorsCount: number;
    removeColor: { (color: Color): void };
    onChangeColorClick: { (color: Color): void };
    onSelectShade: { (selectedHex: string, color: Color): void };
}

export default function ColorPaletteItem({
                                             onChangeColorClick,
                                             color,
                                             removeColor,
                                             colorsCount,
                                             onSelectShade,
                                         }: ColorPaletteItemProps) {
    const {attributes, listeners, setNodeRef, transform, isDragging} = useSortable({id: color.hex});
    const [showButtons, setShowButtons] = useState<boolean>(false);
    const [showShades, setShowShades] = useState<boolean>(false);
    const isBelow1000Pixels = useMediaQuery('(max-width: 1000px)');

    useEffect(() => {
        if (isBelow1000Pixels) {
            setShowButtons(true);
        } else {
            setShowButtons(false);
            setShowShades(false);
        }
    }, [isBelow1000Pixels]);

    const style = {
        transform: CSS.Transform.toString(transform),
        width: `${100 / colorsCount}%`,
        height: '100%',
        backgroundColor: color.hex,
        display: 'flex',
        flexFlow: 'column' as const,
        justifyContent: !showShades ? 'end' : 'start',
        alignItems: 'center',
        cursor: 'grab',
        zIndex: isDragging ? 1 : 'auto',
        boxShadow: `${color.hex} 0px 0px 0px 1px`,
        '-webkit-touch-callout': "none",
        '-webkit-user-select': 'none',
        '-ms-user-select': 'none',
        'user-select': 'none',
        touchAction: 'none',
        '@media (max-width: 1000px)': {
            width: '100%',
            flexFlow: 'row-reverse',
            boxSizing: 'border-box',
            padding: '0 20px',
            alignItems: 'center',
            justifyContent: 'space-between'
        }
    };

    const selectedNewShade = (shade: string) => {
        onSelectShade(shade, color);
        setShowShades(false);
    }

    return (
        <>
            {
                !showShades && (
                    <SortableContext items={[color.hex]}>
                        <Box
                            {...listeners}
                            title="Press left click to move"
                            component="div"
                            ref={setNodeRef}
                            sx={style}
                            {...attributes}
                            onMouseEnter={() => {
                                !isBelow1000Pixels && setShowButtons(true);
                            }}
                            onMouseLeave={() => {
                                !isBelow1000Pixels && setShowButtons(false);
                            }}
                        >
                            {
                                showButtons && (
                                    <Box component="div" sx={{
                                        display: 'flex',
                                        flexFlow: 'column',
                                        '@media (max-width: 1000px)': {
                                            flexFlow: 'row',
                                            justifySelf: 'flex-end'
                                        }
                                    }}>
                                        <RemoveColorButton hide={isDragging} color={color.isDarkColor ? 'white' : 'black'}
                                                           onClick={() => removeColor(color)}/>
                                        <EditColorButton hide={isDragging} color={color.isDarkColor ? 'white' : 'black'}
                                                         onChangeColorClick={() => onChangeColorClick(color)}/>
                                        {(color.shades.length > 0 && !isBelow1000Pixels) && (
                                            <ShadesButton hide={isDragging} onClick={() => setShowShades(true)}
                                                          color={color.isDarkColor ? 'white' : 'black'}/>
                                        )}
                                        <CopyColorButton hide={isDragging} color={color.isDarkColor ? 'white' : 'black'}
                                                         hex={color.hex}/>
                                    </Box>
                                )
                            }
                            <Box component="div" sx={{
                                display: 'flex',
                                flexFlow: 'column',
                                alignItems: 'center',
                                mt: 10,
                                mb: 10,
                                '@media (max-width: 1000px)': {
                                    mt: 0,
                                    mb: 0,
                                    flexGrow: 1,
                                    flexFlow: 'row',
                                }
                            }}>
                                <Typography color={color.isDarkColor ? 'white' : 'black'} component="div" fontWeight="bold"
                                            variant="h4">{color.hex.toUpperCase()}</Typography>
                                <Typography color={color.isDarkColor ? 'white' : 'black'}
                                            sx={{display: isBelow1000Pixels ? 'none' : 'block'}}
                                            component="div">{color.name}</Typography>
                            </Box>
                        </Box>
                    </SortableContext>
                )
            }
            {
                (showShades && !isBelow1000Pixels && color.shades?.length) && (
                    <Box
                        component="div"
                        sx={style}
                        onMouseLeave={() => {
                            setShowShades(false);
                            setShowButtons(false);
                        }}
                    >
                        {color.shades!.map((shade: Color) => (
                            <ColorPaletteShadeItem key={shade.hex} onShadeClick={selectedNewShade} shade={shade}
                                                   color={color}/>
                        ))}
                    </Box>
                )
            }
        </>
    );
}