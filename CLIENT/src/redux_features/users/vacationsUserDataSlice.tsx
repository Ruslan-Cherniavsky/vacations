import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from '../store'

interface UserDataSlice {
    userName: string,
    userRole: string
}

const initialState: UserDataSlice = {
    userName: '',
    userRole: ''
}

const userDataSlice = createSlice({
    name: 'userData',
    initialState,
    reducers: {
        setUserName: (state, action) => {
            state.userName = action.payload;
        },
        resetUserName: (state) => {
            state.userName = ''
        },
        setUserRole: (state, action) => {
            state.userRole = action.payload;
        },
        resetUserRole: (state) => {
            state.userRole = ''
        }
    }
})

export const { setUserName, resetUserName, setUserRole, resetUserRole } = userDataSlice.actions
export default userDataSlice.reducer;
export const selecUserName = (state: RootState) => state.userData.userName
