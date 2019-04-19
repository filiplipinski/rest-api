import React, { Component } from 'react';
import UsersList from "./UsersList";
import Form from "./Form";
import '../styles/App.css';
import '../styles/media-queries.css';
import blank_avatar_img from "../img/blank-avatar.jpg";

const API = "https://reqres.in";

class App extends Component {
  state = {
    users: [],
    err: false,
    firstFetch: true,
  };

  fetchData = (APIpatch, option) => {
    fetch(API + APIpatch, option)
      .then(response => {
        // if status 204 -> user is deleted, i need ID from URL:
        if (response.status === 204) return response.url.match(/\d/g).join("");
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
    switch (method) {
      case "GET":
        this.setState({
          users: data.data,
          err: false,
          firstFetch: false
        });
        break;

      case "POST":
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
        break;

      case "PATCH":
        let notExisting = true;

        const modifiedUsers = this.state.users.map(user => {
          if (user.id === Number(data.id)) {
            notExisting = false;
            if (data.first_name !== "") user.first_name = data.first_name;
            if (data.last_name !== "") user.last_name = data.last_name;
            if (data.avatar !== "") user.avatar = data.avatar;
          }
          return user
        });

        if (notExisting) alert("Nie ma użytkownika o takim ID")
        else
          this.setState({
            users: modifiedUsers,
            err: false
          });
        break;

      case "DELETE":
        let oneLessUsers = [...this.state.users];

        const indexToDelete = oneLessUsers.findIndex(user => user.id === Number(data));
        //console.log(indexToDelete);
        oneLessUsers.splice(indexToDelete, 1);

        this.setState({
          users: oneLessUsers,
          err: false
        });
        break;

      default: new Error("switch default error");
    }
  }

  componentDidMount() {
    this.fetchData("/api/users?per_page=12", { method: "GET" });
  }

  render() {
    const { users, err, firstFetch } = this.state;

    return (
      <div className="app">
        <h1>Zarządzanie użytkownikami</h1>
        {/* <button onClick={() => this.fetchData("/api/users?page=2", { method: "GET" })} className="showUsers">Pokaż uzytkowników !</button> */}

        <Form fetchData={this.fetchData} />

        {err ? <p>Nie udało się wyświetlić użytkowników</p> : <UsersList users={users} fetchData={this.fetchData} firstFetch={firstFetch} />}
        <footer>Filip Lipiński</footer>
      </div>
    );
  }
}

export default App;
