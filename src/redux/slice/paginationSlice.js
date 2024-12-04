import { createSlice } from "@reduxjs/toolkit";

const paginationSlice = createSlice({
    name : 'pagination',
    initialState : {
        page: 0,
        search : ''
    },
    reducers : {
        firsPage : (state) => {
             state.page = 0 ;
        },
        nextPage : (state) => {
            state.page = state.page + 1; 
        },
        prevPage : (state) => {
            state.page = state.page - 1;
        },
        lastPage : (state, action) => {
             state.page = action.payload;
        },
        searchCuce : (state, action) => {
            state.search = action.payload;
        },
        anyPage : (state,action) => {
            state.page = action.payload;
        }
    }
});

export const {firsPage,nextPage,prevPage,lastPage,searchCuce,anyPage} = paginationSlice.actions;
export default paginationSlice.reducer;

