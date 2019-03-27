import React, { Component } from 'react';
import "../styles/FormAdd.css"

class FormAdd extends Component {
  state = {
    first_name: "",
    last_name: "",
    avatar: "",
    id: ""
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = e => {
    e.preventDefault()

    if (this.state.first_name !== "" && this.state.last_name !== "") {
      const request = {
        method: "POST",
        body: JSON.stringify(this.state),
        headers: { 'Content-Type': 'application/json' }
      }
      this.props.fetchData("/api/users", request)

      this.setState({
        first_name: "",
        last_name: "",
        avatar: ""
      })
    } else {
      alert("Podaj imię i nazwisko ! :)")
    }
  }

  handleUpdate = e => {
    const { first_name, last_name, id } = this.state;
    e.preventDefault();

    if (id !== "") {
      const request = {
        method: "PATCH",
        body: JSON.stringify(this.state),
        headers: { 'Content-Type': 'application/json' }
      }
      this.props.fetchData(`/api/users/${id}`, request)

      this.setState({
        first_name: "",
        last_name: "",
        avatar: "",
        id: ""
      })
    } else {
      alert("ID użytkownika którego chcesz aktualizować! :)")
    }
  }

  render() {
    const { first_name, last_name, avatar, id } = this.state;
    return (
      <div className="addUser">
        <h2>Dodaj użytkownika: </h2>
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.handleChange} value={first_name} name="first_name" type="text" placeholder="First name" />
          <input onChange={this.handleChange} value={last_name} name="last_name" type="text" placeholder="Last name" />
          {/* <label htmlFor="url">Enter an avatar URL (not neccesary)</label> */}
          <input onChange={this.handleChange} value={avatar} name="avatar" id="url" type="text" placeholder="avatar url (NOT necessary)" />
          <input type="submit" value="Dodaj Użytkownika"></input>
        </form>

        <br />

        <h2>Aktualizuj użytkownika: </h2>
        <p>Podaj ID którego chcesz aktualizować oraz wartości które chcesz zapisać</p>
        <form onSubmit={this.handleUpdate}>
          <input onChange={this.handleChange} value={id} name="id" type="number" placeholder="Podaj ID" />
          <input type="submit" value="Aktualizuj użytkownika"></input>
        </form>
      </div>
    );
  }
}

export default FormAdd;