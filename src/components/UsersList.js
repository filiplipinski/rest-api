import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import "../styles/UsersList.css";

class UsersList extends Component {
  state = {
    items: [],
    hasMore: true,
    howMuch: 0
  }

  handleClick = (id) => {
    this.props.fetchData(`/api/users/${id}`, {
      method: "DELETE",
      headers: { 'Content-Type': 'application/json' }
    })
  }

  fetchMoreData = () => {
    if (this.state.items.length >= this.state.howMuch) {
      this.setState({ hasMore: false });
      return;
    }
    // a fake async api call like which sends
    // 20 more records in .5 secs
    setTimeout(() => {
      this.setState({
        items: this.state.items.concat(Array.from({ length: 5 }))
      });
    }, 500);
  };

  componentDidUpdate() {
    if (this.state.howMuch !== this.props.users.length)
      this.setState({
        howMuch: this.props.users.length,
        items: Array.from({ length: 5 }),
        hasMore: true
      });
  }

  render() {
    const users = this.props.users.map(user => (
      <div key={user.id} className="user">
        <button onClick={() => this.handleClick(user.id)} className="delete">X</button>
        <img src={user.avatar} alt="avatar" />
        <p className="id">ID: {user.id}</p>
        <p>{user.first_name} {user.last_name}</p>
      </div>
    )).reverse();

    return (
      <div className="users">
        <h2>Lista użytkowników ({this.props.users.length})</h2>
        {this.props.firstFetch && <p className="message">Trwa pobieranie listy użytkowników!</p>}

        <InfiniteScroll
          dataLength={this.state.items.length}
          next={this.fetchMoreData}
          hasMore={this.state.hasMore}
          loader={<h4>Ładowanie...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Wyświetliłeś wszystkich użytkowników</b>
            </p>
          }
        >
          {users.length > 0 ? users.slice(0, this.state.items.length) : <p className="message">Brak uzytkowników!</p>}
        </InfiniteScroll>
      </div>
    );
  }
}

export default UsersList;