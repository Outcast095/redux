import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { fetchUsers } from './store/reducers/ActionCreators';

function App() {
  const dispatch = useAppDispatch();
  const { users, isLoading, error } = useAppSelector(state => state.userReducer);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Список пользователей (RTK + Axios)</h1>
      
      {isLoading && <h2>Идет загрузка...</h2>}
      {error && <h2 style={{ color: 'red' }}>{error}</h2>}
      
      <div style={{ display: 'grid', gap: '10px' }}>
        {users.map(user => (
          <div key={user.id} style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '8px' }}>
            <strong>{user.name}</strong> — {user.email}
            <br />
            <small>Web: {user.website}</small>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;