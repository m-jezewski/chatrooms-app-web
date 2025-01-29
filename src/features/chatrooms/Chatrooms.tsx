import {useNavigate, useParams} from "react-router";
import React, {useEffect, useRef, useState} from "react";
import {MessageForm} from "../messages/MessageForm.tsx";
import {AppButton} from "../../shared/AppButton.tsx";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../store.ts";
import {deleteChatroomAction, getChatroomByIdAction, listChatroomsAction} from "./chatroomsActions.ts";
import {User} from "../../interfaces.ts";
import {ChatroomFormModal} from "./ChatroomFormModal.tsx";
import toast from "react-hot-toast";
import useWebSocket from "../messages/useWebSocket.ts";
import {selectLoggedUser} from "../auth/authSlice.ts";
import {Message} from "../../interfaces.ts";

export const Chatrooms = () => {
    const {id} = useParams();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [initialValues, setInitialValues] = useState<User | null>(null);
    const dispatch = useDispatch<AppDispatch>();
    const [channelData, setChannelData] = useState<any | null>(null) // todo: refactor any
    const loggedUser = useSelector(selectLoggedUser);
    const messages = useSelector((state: any) => state.messages.messages);
    const navigate = useNavigate()
    const chatContainerRef  = useRef<HTMLDivElement | null>(null);

    const {isConnected, sendMessage, joinChannel, leaveChannel} = useWebSocket();


    const getChannelData = async () => {
        const res = await dispatch(getChatroomByIdAction({channelId: Number(id)}))
        if (res.type === "textChannels/getById/fulfilled") {
            setChannelData(res.payload)
        }
    }

    useEffect(() => {
        if (id) {
            getChannelData()
        }
    }, [id])

    useEffect(() => {
        if (id && loggedUser?.id) {
            joinChannel({userId: loggedUser.id, channelId: Number(id)})
        }

        return () => {
            leaveChannel({userId: loggedUser!.id, channelId: Number(id)})
        }
    }, [isConnected, id, isConnected]);


    const handleSendMessage = (message: string) => {
        sendMessage({channelId: Number(id), userId: loggedUser!.id, content: message});
    };

    useEffect(() => {
        // if (isConnected && id) {
        //     sendMessage({ channelId: Number(id), userId: loggedUser!.id });
        // }
    }, [isConnected, sendMessage]);

    const handleRemoveClick = async () => {
        if (!id) {
            return
        }

        try {
            navigate("/chatrooms")
            const res = await dispatch(deleteChatroomAction({
                channelId: Number(id)
            }))
            await dispatch(listChatroomsAction());
            toast.success('Successfully removed the chatroom!')
        } catch (e) {
            toast.error("Cannot remove channel")
        }
    }

    useEffect(() => {
        if(id && chatContainerRef.current){
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);


    if (!id) {
        return <div className={"flex justify-center items-center min-h-full text-center"}>
            <div>
                <h1 className={"landingLogo text-4xl"}>Welcome to chatrooms</h1>
                <br/>
                <p>Create your own chat with friends and blah blah blah</p>
            </div>
        </div>
    }

    return (
        <div className={"max-h-full min-h-full flex flex-col"}>
            <div className={"m-4 bg-white/5 p-4 rounded-lg"}>
                <h1 className={"text-3xl mb-2 border-b-2 pb-1 break-all border-gray-700"}># {channelData?.name}</h1>
                <div className="flex gap-2 justify-end">
                    <AppButton variant={'red'} onClick={() => handleRemoveClick()}>
                        Delete
                    </AppButton>
                    <AppButton onClick={() => setIsOpen(true)}>
                        Edit
                    </AppButton>
                </div>
            </div>
            <div ref={chatContainerRef} className={"grow flex flex-col gap-2 p-4 overflow-y-auto"}>
                {messages.map((message: Message, index: number) => (
                    <ChatMessage key={message.id} previousMessageFromThisAuthor={index === 0 ? false : messages[index-1]?.authorId === message?.authorId} message={message} />
                ))}
            </div>
            <MessageForm sendMessage={handleSendMessage}/>
            <ChatroomFormModal
                onSuccess={() => getChannelData()}
                isEditing={true}
                initialValues={channelData}
                closeModal={() => setIsOpen(false)}
                isOpen={isOpen}
            />
        </div>
    )
}


const ChatMessage = ({message, previousMessageFromThisAuthor}: {message: Message, previousMessageFromThisAuthor: boolean}) => {
    const loggedUser = useSelector(selectLoggedUser);

    if (message.authorId === loggedUser?.id) {
        return (
            <div className={"flex gap-2 flex-row"}>
                <div className={"w-fit ml-auto"}>
                    {!previousMessageFromThisAuthor && <p className={'text-right text-gray-500 font-medium text-xs pr-2'}>You</p>}
                    <div className={"p-1.5 px-3 max-w-60 text-wrap break-all bg-purple-900 text-md rounded-2xl"}>{message.content}</div>
                </div>
            </div>
        )
    }

    return (
        <div className={"flex gap-2 flex-row"}>
            <div className={"w-fit mr-auto"}>
                {!previousMessageFromThisAuthor && <p className={'text-left text-gray-500 font-medium text-xs pl-2'}>{message.author.name}</p>}
                <div className={"p-1.5 px-3 max-w-72 break-all text-wrap bg-blue-900 text-md rounded-2xl"}>{message.content}</div>
            </div>
        </div>
    )
}