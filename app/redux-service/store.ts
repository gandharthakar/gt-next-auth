'use client';

import { configureStore } from '@reduxjs/toolkit';
import authUserReducer from './slices/user-area/authUserReducer';

const store = configureStore({
    reducer: {
        auth_user_id: authUserReducer,
    },
    devTools: false,
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;