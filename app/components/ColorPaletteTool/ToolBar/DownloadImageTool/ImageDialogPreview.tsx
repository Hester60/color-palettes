import {Box, useMediaQuery} from "@mui/material";
import {FinalColor} from "extract-colors/lib/types/Color";

type ImagePreviewProps = {
    colors: FinalColor[];
    image: string;
}

export default function ImageDialogPreview({colors, image}: ImagePreviewProps) {
    const isBelow1000Pixels = useMediaQuery('(max-width: 1000px)');

    return (
        <Box component="div" sx={{
            width: isBelow1000Pixels ? '100%' : 500,
            display: 'flex',
            flexFlow: 'column',
            maxHeight: '80svh',
        }}>
            <img src={image} alt={"Your image"}
                 width={'100%'} height={'auto'} style={{
                width: '100%',
                height: 'auto',
                maxHeight: '100%',
                objectFit: 'contain',
            }}/>
            <Box component="div"
                 sx={{display: 'flex', mt: 2, borderRadius: '10px', overflow: 'hidden'}}>
                {colors.map((color: FinalColor) => (
                    <Box sx={{
                        backgroundColor: color.hex,
                        width: `${100 / colors.length}%`,
                        height: 50,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        border: '1px solid rgba(0,0,0,0.05)'
                    }} key={color.hex}>
                    </Box>
                ))}
            </Box>
        </Box>
    )
}