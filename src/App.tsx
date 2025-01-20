import './App.css'
import {Route, Routes} from "react-router";
import {AuthLayout} from "./features/auth/AuthLayout.tsx";
import {Login} from "./features/auth/Login.tsx";
import {Register} from "./features/auth/Register.tsx";
import {UserProtectedRoute} from "./shared/UserProtectedRoute.ts";
import {AdminProtectedRoute} from "./shared/AdminProtectedRoute.ts";

function App() {

    const user = null

    return (
        <Routes>
            <Route element={<AuthLayout/>}>
                <Route index path="/" element={<Login/>}/>
                <Route path="register" element={<Register/>}/>
            </Route>
            <Route
                path={"chatrooms"}
                element={<UserProtectedRoute user={user}>
                    <></>
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
    )
}

export default App
