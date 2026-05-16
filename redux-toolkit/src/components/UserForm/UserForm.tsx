import React, { useState } from 'react';
import { useAppDispatch } from '../../hooks/redux';
import { createUser } from '../../store/actions/createUser';

export const UserForm: React.FC = () => {
    const dispatch = useAppDispatch();
    
    // Локальное состояние для полей ввода
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (name && email) {
            // Отправляем данные в Redux
            dispatch(createUser({ name, email }));
            
            // Очищаем поля после отправки
            setName('');
            setEmail('');
        } else {
            alert("Заполните все поля!");
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: '30px', padding: '15px', background: '#f9f9f9', borderRadius: '8px' }}>
            <h3>Добавить нового героя</h3>
            <div style={{ marginBottom: '10px' }}>
                <input 
                    type="text" 
                    placeholder="Имя" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                    style={{ padding: '8px', marginRight: '10px' }}
                />
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ padding: '8px' }}
                />
            </div>
            <button type="submit" style={{ padding: '8px 15px', cursor: 'pointer', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}>
                Создать
            </button>
        </form>
    );
};