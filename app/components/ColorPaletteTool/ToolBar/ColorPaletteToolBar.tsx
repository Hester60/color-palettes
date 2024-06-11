import {Box, Divider} from "@mui/material";
import HistoryNavigation from "@/app/components/ColorPaletteTool/ToolBar/HistoryNavigation";
import GenerateButton from "@/app/components/ColorPaletteTool/ToolBar/GenerateButton";
import PickColorButton from "@/app/components/ColorPaletteTool/ToolBar/PickColorButton";
import UploadPictureButton from "@/app/components/ColorPaletteTool/ToolBar/UploadPictureButton";
import ExportButton from "@/app/components/ColorPaletteTool/ToolBar/ExportButton";

type ColorPaletteToolBarProps = {
    onBackHistory: { (): void };
    onNextHistory: { (): void };
    canBackHistory: boolean;
    canNextHistory: boolean;
    generateRandomPalette: { (): void };
    onPickColorClick: { (): void };
    onUploadPictureClick: { (): void };
    onExportClick: { (): void };
}

export default function ColorPaletteToolBar({
                                                onBackHistory,
                                                onNextHistory,
                                                canNextHistory,
                                                canBackHistory,
                                                generateRandomPalette,
                                                onPickColorClick,
                                                onUploadPictureClick,
                                                onExportClick,
                                            }: ColorPaletteToolBarProps) {
    return (
        <Box component="div" sx={{
            boxShadow: 2,
            height: '55px',
            padding: '0 25px',
            display: 'flex',
            justifyContent: 'end',
            alignItems: 'center',
            gap: '20px',
            backgroundColor: 'background.default',
            '@media (max-width: 1000px)': {
                width: '100%',
                boxSizing: 'border-box',
                boxShadow: 0,
                padding: '0 8px',
                justifyContent: 'space-between',
                gap: '10px',
                height: '65px',
            },
        }}>
            <Box component="div"
                 sx={{display: 'flex', flexFlow: 'row', alignItems: 'center', gap: '10px', height: '100%'}}>
                <GenerateButton onClick={generateRandomPalette}/>
                <Divider orientation="vertical" flexItem sx={{height: '50%', alignSelf: 'center'}}/>
                <PickColorButton onClick={onPickColorClick}/>
            </Box>
            <Box component="div"
                 sx={{display: 'flex', flexFlow: 'row', alignItems: 'center', gap: '10px', height: '100%'}}>
                <Divider orientation="vertical" flexItem sx={{height: '50%', alignSelf: 'center'}}/>
                <ExportButton onClick={onExportClick}/>
                <UploadPictureButton onClick={onUploadPictureClick}/>
                <Divider orientation="vertical" flexItem sx={{height: '50%', alignSelf: 'center'}}/>
                <HistoryNavigation onNextHistory={onNextHistory} onBackHistory={onBackHistory} canBack={canBackHistory}
                                   canNext={canNextHistory}/>
            </Box>
        </Box>
    );
}