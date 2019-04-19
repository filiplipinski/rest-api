import React, { Component } from 'react';
import "../styles/Form.css"

class Form extends Component {
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
    const { first_name, last_name, avatar } = this.state;

    if (this.state.first_name !== "" && this.state.last_name !== "") {
      const request = {
        method: "POST",
        body: JSON.stringify({ first_name, last_name, avatar }),
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
    const { first_name, last_name, avatar, id } = this.state;
    e.preventDefault();

    if ((id !== "") && (first_name !== "" || last_name !== "" || avatar !== "")) {
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
      alert("ID użytkownika którego chcesz aktualizować oraz dane które chcesz podmienić! :)")
    }
  }

  render() {
    const { first_name, last_name, avatar, id } = this.state;
    return (
      <div className="container">
        <div className="addUser">
          <h2>Dodaj użytkownika</h2>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="first_name">Podaj imię i nazwisko i <span>opcjonalnie</span> adres URL awatara:</label>
            <br />
            <input onChange={this.handleChange} value={first_name} name="first_name" type="text" placeholder="Imię" />
            <input onChange={this.handleChange} value={last_name} name="last_name" type="text" placeholder="Nazwisko" />
            <input onChange={this.handleChange} value={avatar} name="avatar" id="url" type="url" placeholder="Adres URL (opcjonalnie)" />
            <input type="submit" value="Dodaj Użytkownika" className="btn"></input>
          </form>
        </div>

        <div className="updateUser">
          <h2>Aktualizuj użytkownika</h2>
          <form onSubmit={this.handleUpdate}>
            <label htmlFor="id">Podaj ID użytkownika, którego chcesz aktualizować <span>oraz dane</span> (w formularzu po lewej) które chcesz zamienić:</label>
            <input onChange={this.handleChange} value={id} name="id" type="number" placeholder="Podaj ID" />
            <input type="submit" value="Aktualizuj użytkownika" className="btn"></input>
          </form>
        </div>
      </div>
    );
  }
}

export default Form;