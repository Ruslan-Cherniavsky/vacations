import { configureStore } from "@reduxjs/toolkit";
import vacationsFilterSlice from './vacations/vacationsFilterSlice'
import vacationsDataSlice from "./vacations/vacationsDataSlice";
import userDataSlice from "./users/vacationsUserDataSlice";
const store = configureStore({
    reducer: {
        filter: vacationsFilterSlice,
        vcData: vacationsDataSlice,
        userData: userDataSlice, 
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
