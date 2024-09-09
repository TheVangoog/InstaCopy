import { createSlice, } from "@reduxjs/toolkit";
import Service from "../Services/Service";
const service = new Service();

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        toggler: false,
        value: 0
    },
    reducers: {
        LOGIN: (state, action) => {
            state.value = action.payload;
        },
        UPDATEPOST: (state, action) => {
            service.putData(action.payload)
        },

        UPDATEUSER: (state, action) => {
            console.log("hello world to git")
            service.putData(action.payload)
        },

        UPDATESTATE: (state, action) => {
            return { 
                value: action.payload,
                toggler: !state.toggler
            }
        }
    }
});

export const {
    LOGIN,
    UPDATEPOST,
    UPDATEUSER,
    UPDATESTATE,
} = userSlice.actions;

export default userSlice.reducer;

// @todo: Передача даних в редакс готова, зміна стейту релізована
// Оскільки стейт працює, написати серверну частину, тобто  більшості механізм лайків, коментарів і збереженого.
// @todo PUT COMMENTS AND SAVED NORMAL 
// Дописати датабазу в деяких місцях. 