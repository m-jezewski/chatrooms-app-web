import {useNavigate, useParams} from "react-router";
import React, {useEffect, useState} from "react";
import {MessageForm} from "../messages/MessageForm.tsx";
import {AppButton} from "../../shared/AppButton.tsx";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../store.ts";
import {deleteChatroomAction, getChatroomByIdAction, listChatroomsAction} from "./chatroomsActions.ts";
import {User} from "../../interfaces.ts";
import {ChatroomFormModal} from "./ChatroomFormModal.tsx";
import toast from "react-hot-toast";

export const Chatrooms = () => {
    const {id} = useParams();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [initialValues, setInitialValues] = useState<User | null>(null);
    const dispatch = useDispatch<AppDispatch>();
    const [channelData, setChannelData] = useState<any | null>(null) // todo: refactor any
    const navigate = useNavigate()

    const getChannelData = async () => {
        const res = await dispatch(getChatroomByIdAction({channelId: Number(id)}))
        if(res.type === "textChannels/getById/fulfilled"){
            setChannelData(res.payload)
        }
    }

    useEffect(() => {
        if(id){
            getChannelData()
        }
    }, [id])

    const handleRemoveClick = async () => {
        if(!id){
            return
        }

        try{
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
        <div className={"min-h-full flex flex-col"}>
            <div className={"m-4 bg-white/5 p-4 rounded-lg"}>
                <h1 className={"text-3xl mb-2 border-b-2 pb-1 break-all border-gray-700"}># {channelData?.name}</h1>
                <div className="flex gap-2 justify-end">
                    <AppButton variant={'red'} onClick={() => handleRemoveClick()} >
                        Delete
                    </AppButton>
                    <AppButton onClick={() => setIsOpen(true)} >
                        Edit
                    </AppButton>
                </div>
            </div>
            <div className={"grow"}>

            </div>
            <MessageForm />
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
