'use client'

import React, {useContext, createContext, useState, FC, ReactNode} from "react";
import {v4 as uuidv4} from 'uuid';

export type Message = {
    id?: string;
    message: string;
    severity?: 'error' | 'success' | 'info';
}

type MessagesContextType = {
    messages: Message[];
    pushMessage: { (message: Message): void }
    removeMessage: { (id: string): void }
}

const MessagesContext = createContext<MessagesContextType | undefined>(undefined);

const MessagesProvider= ({children}: { children: ReactNode }) => {
    const [messages, setMessages] = useState<Message[]>([]);

    const pushMessage = (message: Message): void => {
        message.id = uuidv4();
        setMessages((prev) => [...prev, message]);
    }

    const removeMessage = (id: string): void => {
        setMessages((prev) => prev.filter((message) => message.id !== id));
    }

    return (
        <MessagesContext.Provider value={{messages, pushMessage, removeMessage}}>
            {children}
        </MessagesContext.Provider>
    )
}

const useMessages = (): MessagesContextType => {
    const context = useContext(MessagesContext);

    if (!context) {
        throw new Error('useMessages must be used within a MessagesProvider');
    }

    return context;
}

export {MessagesProvider, useMessages};