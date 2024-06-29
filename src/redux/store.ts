import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./slices/themeSlice";

export const store = configureStore({
    reducer: {
        theme: themeReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDipatch = typeof store.dispatch