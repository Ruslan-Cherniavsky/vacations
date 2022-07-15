import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from '../store'

interface FilterState {
    filtered: boolean
}

const initialState: FilterState = {
    filtered: false
}

const filterVacationSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        filtered: state => { // only output functionality
            state.filtered = true;
        },
        unfiltered: state => {
            state.filtered = false;
        },
    }

})

export const { filtered, unfiltered } = filterVacationSlice.actions

export default filterVacationSlice.reducer;

export const selectCount = (state: RootState) => state.filter.filtered

