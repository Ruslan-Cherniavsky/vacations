import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from '../store'

interface DataSlice {
    data: any,
    status: boolean,
}

const initialState: DataSlice = {
    data: [],
    status: true,
}

const vacationsDataSlice = createSlice({
    name: 'vcData',
    initialState,
    reducers: {
        setVcData: (state, action) => {
            state.data = action.payload;
        },
        setVcDataUpdated: (state) => {
            state.status = !state.status;
        },


    }
})

export const { setVcData, setVcDataUpdated } = vacationsDataSlice.actions
export default vacationsDataSlice.reducer;
export const selectCount = (state: RootState) => state.vcData.data
