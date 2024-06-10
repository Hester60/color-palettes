import {Box, Typography} from "@mui/material";
import {FinalColor} from "extract-colors/lib/types/Color";

type ImagePreviewProps = {
    colors: FinalColor[];
    image: string;
}

export default function ImageDialogPreview({colors, image}: ImagePreviewProps) {
    return (
        <Box component="div" sx={{width: 500, display: 'flex', flexFlow: 'column'}}>
            <Box sx={{backgroundImage: `url(${image})`, backgroundPosition: 'center', backgroundSize: 'cover'}}
                 width={500} height={400}/>
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