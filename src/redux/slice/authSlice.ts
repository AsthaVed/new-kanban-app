import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface User{
    email: string,
    password: string,
    name?: string
}

interface AuthState{
    isLoggedIn: boolean,
    userEmail: string | null,
    users: User[]
}

const initialState: AuthState = {
    isLoggedIn: false,
    userEmail: null,
    users: []
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        signup(state, action: PayloadAction<User>){
            const exists = state.users.find(u => u.email == action.payload.email);
            if(!exists){
                state.users.push({ email: action.payload.email, password: action.payload.password, name: action.payload.name});
                state.isLoggedIn = true;
                state.userEmail = action.payload.email;
            }
        },
        login(state, action: PayloadAction<User>){
            const exists = state.users.find(u => u.email === action.payload.email && u.password === action.payload.password);
            if(exists){
                state.isLoggedIn = true;
                state.userEmail = action.payload.email;
            }
        },
        logout(state){
            state.isLoggedIn = false;
            state.userEmail = null;
            // state.users = [];
        }
    }
})

export const {signup, login, logout} = authSlice.actions;
export default authSlice.reducer