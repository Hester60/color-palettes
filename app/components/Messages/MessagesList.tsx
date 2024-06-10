'use client';

import {Box} from '@mui/material';
import {useMessages} from "@/libs/context/MessagesContext";
import Message from '@/app/components/Messages/Message';
import {Message as Msg} from "@/libs/context/MessagesContext";

export default function MessagesList(): JSX.Element {
    const {messages} = useMessages();

    if (messages.length === 0) {
        return <></>;
    }

    return (
        <Box sx={{position: 'absolute', bottom: 30, left: '50%',  transform: 'translate(-50%)', display: 'flex', flexFlow: 'column', maxWidth: 400, gap: 1}}>
            {messages.map((message: Msg) => (
                <Message key={message.id} message={message}/>
            ))}
        </Box>
    );
}
