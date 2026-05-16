import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { fetchUsers } from './store/actions/fetchUsers';
import { deleteUser } from './store/actions/deleteUser';
import { UserItem } from './components/UserItem/UserItem';
import { UserForm } from './components/UserForm/UserForm';

const App = () => {
    // Хук для отправки экшенов в Redux-хранилище
    const dispatch = useAppDispatch();
    
    // Подписка на состояние: получаем список пользователей, статус загрузки и ошибку
    const { users, isLoading, error } = useAppSelector(state => state.userReducer);

    // Запрос данных с сервера один раз при первом рендере (монтировании) компонента
    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    // Обработчик удаления: отправляет экшен в Redux и передается ниже в UserItem
    const handleDelete = (id: number) => dispatch(deleteUser(id));

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
            <h1>Dashboard управления</h1>
            
            {/* Форма добавления нового пользователя */}
            <UserForm />

            <hr />

            {/* Обработка состояний загрузки и ошибок (условный рендеринг) */}
            {isLoading && <p>Загрузка данных...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            
            {/* Список пользователей: обходим массив и для каждого рендерим карточку */}
            <div style={{ marginTop: '20px' }}>
                {users.map(user => (
                    <UserItem key={user.id} user={user} onDelete={handleDelete} />
                ))}
            </div>
        </div>
    );
};

export default App;