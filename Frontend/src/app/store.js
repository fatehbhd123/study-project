import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../components/features/userSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
    },
});