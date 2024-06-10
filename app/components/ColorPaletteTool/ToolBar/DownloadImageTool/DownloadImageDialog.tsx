'use client';

import {useCallback, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import {Dialog, DialogTitle, DialogContent, Typography, CircularProgress, Box, Button} from "@mui/material";
import {useMessages} from "@/libs/context/MessagesContext";
import {extractColors} from 'extract-colors'
import {FinalColor} from "extract-colors/lib/types/Color";
import {Color} from "@/libs/types/Color";
import {getColorDetails} from "@/libs/utils/getColorDetails";
import ImageDialogPreview from "@/app/components/ColorPaletteTool/ToolBar/DownloadImageTool/ImageDialogPreview";
import ImageDialogButtons from "@/app/components/ColorPaletteTool/ToolBar/DownloadImageTool/ImageDialogButtons";

type DownloadImagePopinProps = {
    onClose: { (): void };
    onValidate: { (palette: Color[]): void };
    show: boolean;
};

export default function DownloadImageDialog({onClose, show, onValidate}: DownloadImagePopinProps) {
    const {pushMessage} = useMessages();
    const [colors, setColors] = useState<FinalColor[]>([]);
    const [base64, setBase64] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        setBase64(null);
        setLoading(true);
        const file = acceptedFiles[0];

        if (file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/jpeg') {
            const reader = new FileReader();
            reader.onload = () => {
                const base64data: string = reader.result as string;
                setBase64(base64data);
                extractColors(base64data, {distance: 0.25})
                    .then((result: FinalColor[]) => {
                        console.log(result);
                        setColors(result);
                    })
                    .catch((error: any) => {
                        pushMessage({
                            severity: 'error',
                            message: `Something went wrong while extracting colors from your image.`
                        });
                    }).finally(() => {
                    setLoading(false);
                });
            };
            reader.readAsDataURL(file);
        } else {
            setLoading(false);
            pushMessage({
                severity: 'error',
                message: `Unsupported file type: ${file.type}`
            });
        }
    }, []);

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop,
        accept: {
            'image/png': ['.png'],
            'image/jpg': ['.jpg'],
            'image/jpeg': ['.jpeg'],
        },
    });

    const onValidateClick = () => {
        const palette: Color[] = colors.map((color: FinalColor) => getColorDetails(color.hex, true));

        onValidate(palette);
        closeDialog();
    }

    const closeDialog = () => {
        setColors([]);
        setBase64(null);
        onClose();
    }

    return (
        <Dialog onClose={closeDialog} open={show}>
            <DialogTitle>Upload an image to generate colors</DialogTitle>
            <DialogContent>
                {(colors.length <= 0) && (
                    <div {...getRootProps()}
                         style={{border: '2px dashed #cccccc', padding: '20px', textAlign: 'center'}}>
                        <input {...getInputProps()} />
                        {loading ? (
                            <CircularProgress/>
                        ) : (
                            <>
                                {isDragActive ?
                                    <p>Drop the files here...</p> :
                                    <p>Drag & drop your image here, or click to select one</p>
                                }
                                <Typography fontSize="small" sx={{mt: 1}} color='text.secondary'>Accepted format:
                                    JPG/PNG</Typography>
                            </>
                        )}
                    </div>
                )}
                {(colors.length > 0) && (
                    <ImageDialogPreview colors={colors} image={base64!}/>
                )}
                <Box component="div" mt={2}>
                    <ImageDialogButtons colors={colors} onCancelClick={closeDialog} onValidateClick={onValidateClick}
                                        onChangeClick={() => setColors([])}/>
                </Box>
            </DialogContent>
        </Dialog>
    )
        ;
}