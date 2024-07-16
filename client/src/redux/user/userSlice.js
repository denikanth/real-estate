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
            state.error=null
        },
        updateUserFailure: (state, action) => {
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
    updateUserStart
} = userslice.actions
export default userslice.reducer