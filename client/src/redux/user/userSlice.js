import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    loading: false,
    error: null
}

const userslice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signinStart: (state) => {
            state.loading = true
        },
        signinSuccess: (state, action) => {
            state.loading = false
            state.currentUser = action.payload
            state.error = null
        },
        signFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        updateUserStart: (state) => {
            state.loading = true
        },
        updateUserSuccess: (state, action) => {
            state.loading = false,
                state.currentUser = action.payload
            state.error = null
        },
        updateUserFailure: (state, action) => {
            state.loading = false,
                state.error = action.payload
        },
        delteUserStart: (state) => {
            state.loading = true
        },
        deleteUserSuccess: (state) => {
            state.currentUser = null,
                state.loading = false,
                state.error = null
        },
        deleteUserFailure: (state, action) => {
            state.loading = false,
                state.error = action.payload
        },
        signoutUserStart: (state) => {
            state.loading = true
        },
        signoutUserSuccess: (state) => {
            state.currentUser = null,
                state.loading = false,
                state.error = null
        },
        signoutUserFailure: (state, action) => {
            state.loading = false,
                state.error = action.payload
        }

    }
})

export const { signinStart,
    signinSuccess,
    signFailure,
    updateUserFailure,
    updateUserSuccess,
    updateUserStart,
    deleteUserFailure,
    deleteUserSuccess,
    delteUserStart,
    signoutUserFailure,
    signoutUserSuccess,
    signoutUserStart,

} = userslice.actions
export default userslice.reducer