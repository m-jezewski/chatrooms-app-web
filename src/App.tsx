import './App.css'
import {Route, Routes} from "react-router";
import {AuthLayout} from "./features/auth/AuthLayout.tsx";
import {Login} from "./features/auth/Login.tsx";
import {Register} from "./features/auth/Register.tsx";
import {UserProtectedRoute} from "./shared/UserProtectedRoute.ts";
import {AdminProtectedRoute} from "./shared/AdminProtectedRoute.ts";
import React, {useEffect, useState} from "react";
import {Toaster} from "react-hot-toast";
import {useDispatch, useSelector, useStore} from "react-redux";
import {selectLoggedUser} from "./features/auth/authSlice.ts";
import {statusAction} from "./features/auth/authActions.ts";
import {AppDispatch} from "./store.ts";
import {Loader} from "./shared/Loader.tsx";

function App() {
    const [appLoader, setAppLoader] = useState(false)
    const dispatch = useDispatch<AppDispatch>();

    const checkUserStatus = async () => {
        setAppLoader(true)
        const res = await dispatch(statusAction())
        setAppLoader(false)
    }

    useEffect(() => {
        checkUserStatus()
    }, [])

    const user = useSelector(selectLoggedUser)

    if(appLoader){
        return <Loader variant={'large'} />
    }

    return (
        <>
            <Toaster position={'top-right'} toastOptions={{duration: 10000, style: {fontSize: '0.85rem'}}}/>
            <Routes>
                <Route element={<AuthLayout/>}>
                    <Route index path="/" element={<Login/>}/>
                    <Route path="register" element={<Register/>}/>
                </Route>
                <Route
                    path={"chatrooms"}
                    element={<UserProtectedRoute user={user}>
                        <Route index path="/" element={<Login/>}/>
                    </UserProtectedRoute>}
                />
                <Route
                    path={"dashboard"}
                    element={<AdminProtectedRoute user={user}>
                        <></>
                    </AdminProtectedRoute>}
                />
                <Route path="/" element={<App/>}/>
                <Route path="/" element={<App/>}/>
            </Routes>
        </>
    )
}

export default App
