import React, { Component } from 'react';
import UsersList from "./UsersList";
import FormAdd from "./FormAdd";
import FormUpdate from "./FormUpdate";
import '../styles/App.css';
import blank_avatar_img from "../img/blank-avatar.jpg";

const API = "https://reqres.in";

class App extends Component {
  state = {
    users: [],
    err: false,
  };

  fetchData = (request, option) => {
    fetch(API + request, option)
      .then(response => {
        if (response.ok) return response.json();
        throw Error(`Error ${response.status}: connection failed`);
      })
      .then(data => {
        console.log(data);
        this.setData(data, option.method);
      })
      .catch(err => {
        console.log(err);
        this.setState({
          err: true
        })
      });
  };

  setData = (data, method = "GET") => {
    if (method === "GET") {
      this.setState(prevState => ({
        // users: prevState.users.concat(data.data),
        users: data.data,
        err: false
      }));
    }
    else if (method === "POST") {
      if (data.avatar === undefined || data.avatar === "") data.avatar = blank_avatar_img;
      const newUser = {
        id: Number(data.id),
        first_name: data.first_name,
        last_name: data.last_name,
        avatar: data.avatar
      }
      this.setState(prevState => ({
        users: [...prevState.users, newUser],
        err: false
      }));
    }
    else if (method === "PATCH") {
      const modifiedUsers = this.state.users.map(user => {
        if (user.id === Number(data.id)) {
          if (data.first_name !== "") user.first_name = data.first_name;
          if (data.last_name !== "") user.last_name = data.last_name;
          if (data.avatar !== "") user.avatar = data.avatar;
        }
        return user
      });

      this.setState({
        users: modifiedUsers,
        err: false
      });
    }
  }

  componentDidMount() {
    this.fetchData("/api/users?page=2", { method: "GET" });
  }

  render() {
    const { users, err } = this.state;

    return (
      <div className="app">
        {/* <button onClick={() => this.fetchData("/api/users?page=2", { method: "GET" })} className="showUsers">Pokaż uzytkowników !</button> */}
        <FormAdd fetchData={this.fetchData} />
        <FormUpdate />

        {err ? <p>Nie udało się wyświetlić użytkowników</p> : <UsersList users={users} />}
      </div>
    );
  }
}

export default App;
