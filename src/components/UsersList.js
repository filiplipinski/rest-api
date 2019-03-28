import React from 'react';
import "../styles/UsersList.css";

const UsersList = (props) => {
  const handleClick = (id) => {
    props.fetchData(`/api/users/${id}`, {
      method: "DELETE",
      headers: { 'Content-Type': 'application/json' }
    })
  }

  const users = props.users.map(user => (
    <div key={user.id}>
      <button onClick={() => handleClick(user.id)} className="delete">X</button>
      <img src={user.avatar} alt="avatar" />
      <p className="id">ID: {user.id}</p>
      <p>Name: {user.first_name} {user.last_name}</p>
    </div>
  ));

  return (
    <div className="users">
      <h2>Lista użytkowników: </h2>
      {props.firstFetch && <p className="message">Trwa pobieranie listy użytkowników!</p>}
      {users.length > 0 ? users : <p className="message">Brak uzytkownikow</p>}
    </div>
  );
}

export default UsersList;