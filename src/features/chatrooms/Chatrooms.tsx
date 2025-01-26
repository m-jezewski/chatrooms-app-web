import {useParams} from "react-router";
import {TextInput} from "../../shared/TextInput.tsx";
import React, {useEffect, useState} from "react";
import {Formik} from "formik";
import {MessageForm} from "../messages/MessageForm.tsx";
import {AppButton} from "../../shared/AppButton.tsx";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../store.ts";
import {getChatroomByIdAction} from "./chatroomsActions.ts";
import {Chatroom} from "../../interfaces.ts";

export const Chatrooms = () => {
    const {id} = useParams();
    const disptach = useDispatch<AppDispatch>();
    const [channelData, setChannelData] = useState<Chatroom | null>(null)

    const getChannelData = async () => {
        const res = await disptach(getChatroomByIdAction({channelId: Number(id)}))
        if(res.type === "textChannels/getById/fulfilled"){
            setChannelData(res.payload)
        }
    }

    useEffect(() => {
        if(id){
            getChannelData()
        }
    }, [id])


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
                    <AppButton variant={'red'} onClick={() => { console.log('remove channel')}} >
                        Delete
                    </AppButton>
                    <AppButton onClick={() => { console.log('remove channel')}} >
                        Edit
                    </AppButton>
                </div>
            </div>
            <div className={"grow"}>

            </div>
            <MessageForm />
        </div>
    )
}
