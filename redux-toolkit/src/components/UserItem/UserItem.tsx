import React from 'react';
import { IUser } from '../../models/IUser';

interface UserItemProps {
    user: IUser;
    onDelete: (id: number) => void;
}

export const UserItem: React.FC<UserItemProps> = ({ user, onDelete }) => {
    return (
        <div style={{ border: '1px solid #ddd', padding: '10px', marginBottom: '5px' }}>
            {user.name} 
            <button onClick={() => onDelete(user.id)}>Удалить</button>
        </div>
    );
};