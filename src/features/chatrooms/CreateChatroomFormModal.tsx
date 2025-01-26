import React, {useState} from "react";
import {Description, Dialog, DialogPanel, DialogTitle} from "@headlessui/react";
import {AppButton} from "../../shared/AppButton.tsx";
import {ChatroomForm} from "./ChatroomForm.tsx";

export const CreateChatroomFormModal = () => {
    let [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <AppButton variant={'purple'} onClick={() => setIsOpen(true)}>Add chatroom</AppButton>
            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-black/20">
                    <DialogPanel
                        className="max-w-lg space-y-4 px-8 py-8 bg-gradient-to-tr from-fuchsia-950 from-10% via-pink-900 to-rose-900 to-90% shadow-rose-700/50 shadow-lg rounded-lg backdrop-blur-2xl ">
                        <div className={"flex justify-between"}>
                            <DialogTitle className="text-2xl">Add chatroom</DialogTitle>
                            <AppButton
                                variant={'transparent'}
                                rounded={true} onClick={() => setIsOpen(false)}>
                                <svg xmlns="http://www.w3.org/2000/svg"
                                     height="16px" viewBox="0 -960 960 960"
                                     width="16px" fill="#e8eaed">
                                    <path
                                        d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
                                </svg>
                            </AppButton>
                        </div>
                        <ChatroomForm closeModal={() => setIsOpen(false)}/>
                    </DialogPanel>
                </div>
            </Dialog>
        </>
    )
}