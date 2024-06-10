import ColorPaletteTool from "@/app/components/ColorPaletteTool/ColorPaletteTool";
import {Box} from "@mui/material";

export default function Home() {
    return (
        <Box component="main" sx={{height: '100%', width: '100%'}}>
            <ColorPaletteTool/>
        </Box>
    );
}
