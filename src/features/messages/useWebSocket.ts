import { useDispatch, useSelector } from 'react-redux';
import {
    connectionOpened,
    connectionClosed,
    receivedMessage,
    connectionError, setMessages,
} from './messagesSlice.ts';
import io from 'socket.io-client';


const useWebSocket = () => {
    const dispatch = useDispatch();
    const socket = io('ws://localhost:3001/', {
        withCredentials: true,
        secure: true,
        port: 3001
    });

    const isConnected = useSelector((state: any) => state.messages.isConnected);

    socket.on('newMessage', (message) => {
        console.log('New message:', message);
        dispatch(receivedMessage(message));
    });

    socket.on('joinedChannel', (data) => {
        console.log('User joined:', data);

        dispatch(setMessages(data.messages));
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
