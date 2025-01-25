import {configureStore} from '@reduxjs/toolkit';
import authSlice from "./features/auth/authSlice.ts";

export const store = configureStore({
    reducer: {
        auth: authSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware(),
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;