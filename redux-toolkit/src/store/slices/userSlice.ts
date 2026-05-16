import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../models/IUser";
// Импорт асинхронных экшенов (Thunks), созданных через createAsyncThunk
import { fetchUsers } from "../actions/fetchUsers";
import { deleteUser } from "../actions/deleteUser";
import { createUser } from "../actions/createUser";
import { updateUser } from "../actions/updateUser";

// Описание типа для состояния этого среза (slice)
interface UserState {
    users: IUser[];       // Массив пользователей
    isLoading: boolean;   // Индикатор загрузки данных
    error: string;        // Сообщение об ошибке
}

// Начальное состояние (стейт) по умолчанию при запуске приложения
const initialState: UserState = {
    users: [],
    isLoading: false,
    error: '',
}

export const userSlice = createSlice({
    name: 'user', // Уникальное имя слайса, используется как префикс для типов экшенов
    initialState,
    reducers: {}, // Пустой объект, так как здесь нет синхронных экшенов (все идут через API)
    
    // extraReducers отвечает за обработку внешних экшенов (в данном случае — асинхронных Thunks)
    extraReducers: (builder) => {
        builder
            // 1. Загрузка пользователей: запрос начался
            .addCase(fetchUsers.pending, (state) => { 
                state.isLoading = true; 
            })
            // Загрузка пользователей: запрос успешен. Сохраняем данные в стейт
            .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<IUser[]>) => {
                state.isLoading = false;
                state.users = action.payload; // action.payload содержит массив пользователей от API
            })
            
            // 2. Удаление пользователя: запрос на сервере успешен
            .addCase(deleteUser.fulfilled, (state, action: PayloadAction<number>) => {
                // Фильтруем массив, удаляя пользователя с id, который пришел в payload
                state.users = state.users.filter(u => u.id !== action.payload);
            })
            
            // 3. Создание пользователя: запрос успешен
            .addCase(createUser.fulfilled, (state, action: PayloadAction<IUser>) => {
                state.isLoading = false;
                state.error = '';
                // Добавляем созданного пользователя в самое начало массива
                state.users.unshift(action.payload);
            })
            // Создание пользователя: произошла ошибка (например, валидация на сервере)
            .addCase(createUser.rejected, (state, action: any) => {
                state.isLoading = false;
                // Записываем текст ошибки, пришедший из rejectWithValue в Thunk'е
                state.error = action.payload;
            })

            .addCase(updateUser.pending, (state) => {
                state.isLoading = true;
                state.error = '';
            })
            .addCase(updateUser.fulfilled, (state, action: PayloadAction<IUser>) => {
                state.isLoading = false;
                
                // Находим индекс пользователя в массиве
                const index = state.users.findIndex(u => u.id === action.payload.id);
                
                // Если пользователь найден, заменяем его обновленными данными от сервера
                if (index !== -1) {
                    state.users[index] = action.payload;
                }
            })
            .addCase(updateUser.rejected, (state, action: any) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

// Экспортируем редьюсер для подключения в store.ts
export default userSlice.reducer;