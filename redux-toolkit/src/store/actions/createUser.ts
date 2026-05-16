import { createAsyncThunk } from "@reduxjs/toolkit";
import { userApi } from "../../api/userApi";
import { IUser } from "../../models/IUser";



export const createUser = createAsyncThunk(
    'user/create',
    async (user: Omit<IUser, 'id'>, thunkAPI) => {
        try {
            // Отправляем данные на сервер
            const response = await userApi.post<IUser>('/users', user);
            // Возвращаем созданного пользователя (с ID от сервера)
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue("Не удалось создать пользователя");
        }
    }
);