import { createAsyncThunk } from "@reduxjs/toolkit";
import { userApi } from "../../api/userApi";



export const deleteUser = createAsyncThunk(
    'user/delete',
    async (id: number, thunkAPI) => {
        try {
            await userApi.delete(`/users/${id}`);
            return id;
        } catch (e) {
            return thunkAPI.rejectWithValue("Ошибка при удалении");
        }
    }
);