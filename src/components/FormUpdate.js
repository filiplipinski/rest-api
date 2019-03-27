import React, { Component } from 'react';
import "../styles/FormUpdate.css";

class FormUpdate extends Component {
  state = {
    id: "",
    first_name: "",
    last_name: "",
    avatar: ""
  }
  render() {
    const { id, first_name, last_name, avatar } = this.state;


    return (
      <div className="updateUser">
        {/* <h2>Aktualizuj użytkownika: </h2>

        <form onSubmit={this.handleSubmit}>
          <input onChange={this.handleChange} value={id} name="id" type="text" placeholder="Podaj ID" />
          <input onChange={this.handleChange} value={first_name} name="first_name" type="text" placeholder="First name" />
          <input onChange={this.handleChange} value={last_name} name="last_name" type="text" placeholder="Last name" />
          <input onChange={this.handleChange} value={avatar} name="avatar" id="url" type="text" placeholder="avatar url (NOT necessary)" />
          <input type="submit" value="Dodaj Użytkownika"></input>
        </form> */}
      </div>
    );
  }
}

export default FormUpdate;