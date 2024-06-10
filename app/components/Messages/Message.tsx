'use client';

import {useEffect} from 'react';
import {Message as Msg} from "@/libs/context/MessagesContext";
import {useMessages} from "@/libs/context/MessagesContext";
import {Alert} from "@mui/material";
import {Check, Warning, Bolt} from "@mui/icons-material";

const ALERT_TTL = 3000;

export default function Message({message}: { message: Msg }) {
    const {removeMessage} = useMessages();

    useEffect(() => {
        const to: NodeJS.Timeout = setTimeout(() => {
            removeMessage(message.id!);
        }, ALERT_TTL);

        return () => {
            clearTimeout(to);
        }
    }, []);

    const getIcon = () => {
        switch (message.severity) {
            case 'success':
                return <Check fontSize="inherit"/>;
            case 'error':
                return <Warning fontSize="inherit"/>;
            default:
                return <Bolt fontSize="inherit"/>;
        }
    }

    const onClose = () => {
        removeMessage(message.id!);
    }

    return (
        <Alert onClose={onClose} icon={getIcon()} severity={message.severity ? message.severity : 'info'}>
            {message.message}
        </Alert>
    )
}