import {Box} from "@mui/material";
import ColorPaletteItem from "@/app/components/ColorPaletteTool/ColorPaletteItem/ColorPaletteItem";
import {Color} from "@/libs/types/Color";
import {SortableContext} from '@dnd-kit/sortable';

type ColorPaletteListProps = {
    colors: Color[];
    removeColor: { (color: Color): void };
    onChangeColorClick: { (color: Color): void }
    onSelectShade: { (selectedHex: string, color: Color): void };
}

export default function ColorPaletteList({
                                             colors,
                                             removeColor,
                                             onChangeColorClick,
                                             onSelectShade
                                         }: ColorPaletteListProps) {
    return (
        <SortableContext items={colors.map(color => color.hex)}>
            <Box component="div"
                 sx={{
                     height: '100%',
                     display: 'flex',
                     flexDirection: 'row',
                     '@media (max-width: 1000px)': {
                         flexDirection: 'column',
                         width: '100%',
                     },
                 }}>
                {colors.map((color: Color) => (
                    <ColorPaletteItem
                        key={color.hex}
                        onSelectShade={onSelectShade}
                        color={color}
                        removeColor={removeColor}
                        onChangeColorClick={onChangeColorClick}
                        colorsCount={colors.length}
                    />
                ))}
            </Box>
        </SortableContext>
    );
}
