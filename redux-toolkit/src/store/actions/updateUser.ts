import { createAsyncThunk } from "@reduxjs/toolkit";
import { userApi } from "../../api/userApi";
import { IUser } from "../../models/IUser";

export const updateUser = createAsyncThunk(
    'user/update',
    async (user: IUser, thunkAPI) => {
        try {
            // Отправляем измененные данные на сервер, подставляя id в URL
            const response = await userApi.put<IUser>(`/users/${user.id}`, user);
            
            // Возвращаем обновленного пользователя, которого прислал сервер
            return response.data;
        } catch (e) {
            // В случае ошибки возвращаем строку с кастомным текстом
            return thunkAPI.rejectWithValue("Не удалось обновить пользователя");
        }
    }
);