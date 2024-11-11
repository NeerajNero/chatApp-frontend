import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
const initialState = {
    user: [],
    status: "idle",
    error: null,
    authentication: []
}
export const userRegistration = createAsyncThunk('register', async({user}) => {
    const response = await axios.post('http://localhost:3000/user/register', user)
    return response.data
}) 

export const userLogin = createAsyncThunk('login', async({user}) => {
    const response = await axios.post('http://localhost:3000/user/login', user, {withCredentials: true})
    return response.data
}) 
export const privateRoute = createAsyncThunk('privateRoute', async() => {
    const response = await axios.get('http://localhost:3000/app/chat', {withCredentials: true})
    console.log(response.data)
    return response.data
})
const userSlice = createSlice({
    name: 'USER',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(userRegistration.pending, (state) => {
            state.status = "loading"
        })
        .addCase(userRegistration.fulfilled, (state,action) => {
            state.status = "success",
            state.user = action.payload
        })
        .addCase(userRegistration.rejected, (state,action) => {
            state.status = "failed",
            state.error = action.error.message
        })
        builder
        .addCase(userLogin.pending, (state) => {
            state.status = "loading"
        })
        .addCase(userLogin.fulfilled, (state,action) => {
            state.status = "success",
            state.user = action.payload.payload
        })
        .addCase(userLogin.rejected, (state,action) => {
            state.status = "failed",
            state.error = action.error.message
        })
        builder
        .addCase(privateRoute.pending, (state) => {
            state.status = "loading"
        })
        .addCase(privateRoute.fulfilled, (state, action) => {
            state.status = "success"
            state.isAuthenticated = action.payload
        })
        .addCase(privateRoute.rejected, (state,action) => {
            state.status = "failed",
            state.error = action.error.message
        })
    }
})
export default userSlice.reducer