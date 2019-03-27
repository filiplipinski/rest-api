import React from 'react';
import "../styles/UsersList.css";

const UsersList = (props) => {
  const users = props.users.map(user => (
    <div key={user.id}>
      <img src={user.avatar} alt="avatar" />
      <p className="id">ID: {user.id}</p>
      <p>Name: {user.first_name} {user.last_name}</p>
    </div>
  ));

  return (
    <div className="users">
      <h2>Lista użytkowników: </h2>
      {users.length > 0 ? users : <p>Pobierz listę użytkowników! (lub brak uzytkownikow)</p>}
    </div>
  );
}

export default UsersList;