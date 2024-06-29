import { createSlice } from "@reduxjs/toolkit";

export const themeSlice = createSlice({
    name: 'theme',
    initialState: false,
    reducers: {
        toggleTheme: (state) => state = !state
        }
})


export const { toggleTheme } = themeSlice.actions
export default themeSlice.reducer