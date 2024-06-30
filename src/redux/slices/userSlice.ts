import { createSlice } from "@reduxjs/toolkit";

interface initialStateType {
    id: string | null,
    email: string | null,
    token: string | null
}

const initialState: initialStateType = {
    id: '',
    email: '',
    token: ''
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.id = action.payload.id;
            state.email = action.payload.email;
            state.token = action.payload.token;
        },
        deleteUser: (state) => {
            state.id = null;
            state.email = null;
            state.token = null;
        }
    }
})

export const { setUser, deleteUser } = userSlice.actions

export default userSlice.reducer