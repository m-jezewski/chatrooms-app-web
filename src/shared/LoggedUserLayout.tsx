import {Link, Outlet} from "react-router";
import {selectLoggedUser} from "../features/auth/authSlice.ts";
import {useDispatch, useSelector} from "react-redux";
import {AppButton} from "./AppButton.tsx";
import {ChatroomFormModal} from "../features/chatrooms/ChatroomFormModal.tsx";
import React, {useState} from "react";
import {ChatroomList} from "../features/chatrooms/ChatroomList.tsx";
import {AppDispatch} from "../store.ts";
import {logoutAction} from "../features/auth/authActions.ts";


export const LoggedUserLayout = () => {
    const user = useSelector(selectLoggedUser);
    const dispatch = useDispatch<AppDispatch>();
    const [isOpen, setIsOpen] = useState(false)


    return (
        <div
            className={"flex flex-row items-stretch h-screen w-screen bg-gradient-to-tr from-slate-900 to-neutral-900 relative"}>
            <div className={"basis-1/5 max-w-72 overflow-y-auto from-slate-900 to-neutral-900 flex flex-col p-3"}>
                <Link to={'/chatrooms'}><h2
                    className={"text-left text-white landingLogo text-2xl select-none p-4 border-b-2 border-purple-950 w-full"}>Chatrooms</h2>
                </Link>
                <div className="flex flex-col gap-4 mt-4">
                    {user?.role === "ADMIN" && <Link to="/dashboard">
                        <div className={"text-center p-2 bg-white/5"}>
                            Users
                        </div>
                    </Link>}
                    <AppButton className={""} onClick={() => dispatch(logoutAction())}>Logout</AppButton>
                    <AppButton variant={'purple'} onClick={() => setIsOpen(true)}>Add chatroom</AppButton>
                    <ChatroomList/>
                </div>
            </div>
            <main className={"basis-4/5 grow from-slate-800 to-neutral-900 bg-gradient-to-tr"}>
                <Outlet/>
            </main>
            <ChatroomFormModal
                closeModal={() => setIsOpen(false)}
                isOpen={isOpen}
            />
        </div>
    )
}