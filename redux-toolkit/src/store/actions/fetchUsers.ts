import { createAsyncThunk } from "@reduxjs/toolkit";
import { userApi } from "../../api/userApi";
import { IUser } from "../../models/IUser";


export const fetchUsers = createAsyncThunk(
    'user/fetchAll',
    async (_, thunkAPI) => {
        try {
            const response = await userApi.get<IUser[]>('/users');
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue("Ошибка при загрузке");
        }
    }
);