'use client';

import {useSortable} from '@dnd-kit/sortable';
import {IconButton, Tooltip} from "@mui/material";
import {SyncAlt} from "@mui/icons-material";
import {useState} from "react";

type DragButtonProps = {
    listeners: ReturnType<typeof useSortable>['listeners'];
    color: 'black' | 'white';
};

export default function DragButton({listeners, color}: DragButtonProps) {
    const [isDragging, setIsDragging] = useState(false);

    const handleDragStart = () => {
        setIsDragging(true);
    };

    const handleDragEnd = () => {
        setIsDragging(false);
    };

    return (
        <Tooltip
            title="Move"
            placement="right"
            arrow={true}
            disableFocusListener={!isDragging}
            disableHoverListener={!isDragging}
            disableTouchListener={!isDragging}
        >
            <IconButton
                {...listeners}
                aria-label="Move color"
                sx={{borderRadius: '10px', color: color}}
                onMouseDown={handleDragStart}
                onMouseUp={handleDragEnd}
                onTouchStart={handleDragStart}
                onTouchEnd={handleDragEnd}
                onTouchCancel={handleDragEnd}
            >
                <SyncAlt/>
            </IconButton>
        </Tooltip>
    );
}
