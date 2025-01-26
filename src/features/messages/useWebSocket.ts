import { useDispatch, useSelector } from 'react-redux';
import {
    connectionOpened,
    connectionClosed,
    receivedMessage,
    connectionError,
} from './messagesSlice.ts';
import io from 'socket.io-client';

import { createContext } from 'react'


const useWebSocket = () => {
    const dispatch = useDispatch();
    const socket = io('http://localhost:3001', {
        withCredentials: true,
    });

    const isConnected = useSelector((state: any) => state.messages.isConnected);

    socket.on('newMessage', (message) => {
        console.log('New message:', message);
        dispatch(receivedMessage(message));
    });

    socket.on('userJoined', (data) => {
    });


    const joinChannel = ({userId, channelId}: { userId: number, channelId: number }) => {
        socket.emit('joinChannel', { userId, channelId });
        dispatch(connectionOpened())
    };

    const sendMessage = ({userId, content, channelId}: {userId: number, content: string, channelId: number}) => {
        socket.emit('sendMessage', { userId, content, channelId });
    };

    const leaveChannel = ({userId, channelId}: {userId: number, channelId: number}) => {
        socket.emit('leaveChannel', { userId, channelId });
    };

    return { isConnected, sendMessage, joinChannel, leaveChannel };
};


export default useWebSocket;
