import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import "../styles/UsersList.css";

class UsersList extends Component {
  state = {
    //items: Array.from({ length: 3 }),
    //hasMore: true
  }

  handleClick = (id) => {
    this.props.fetchData(`/api/users/${id}`, {
      method: "DELETE",
      headers: { 'Content-Type': 'application/json' }
    })
  }

  // fetchMoreData = () => {
  //   if (this.state.items.length >= this.props.users.length) {
  //     this.setState({ hasMore: false });
  //     return;
  //   }
  //   // a fake async api call like which sends
  //   // 20 more records in .5 secs
  //   setTimeout(() => {
  //     this.setState({
  //       items: this.props.users.concat(Array.from({ length: 3 }))
  //     });
  //   }, 500);
  // };

  render() {
    const users = this.props.users.map(user => (
      <div key={user.id}>
        <button onClick={() => this.handleClick(user.id)} className="delete">X</button>
        <img src={user.avatar} alt="avatar" />
        <p className="id">ID: {user.id}</p>
        <p>{user.first_name} {user.last_name}</p>
      </div>
    )).reverse();

    return (
      <div className="users">
        <h2>Lista użytkowników: </h2>
        {this.props.firstFetch && <p className="message">Trwa pobieranie listy użytkowników!</p>}
        {/* <InfiniteScroll
          dataLength={this.state.items.length}
          next={this.fetchMoreData}
          hasMore={this.state.hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        > */}


        {users.length > 0 ? users : <p className="message">Brak uzytkowników!</p>}
        {/* </InfiniteScroll> */}
      </div>
    );
  }
}

export default UsersList;





// const UsersList = (props) => {
//   const handleClick = (id) => {
//     props.fetchData(`/api/users/${id}`, {
//       method: "DELETE",
//       headers: { 'Content-Type': 'application/json' }
//     })
//   }

//   const users = props.users.map(user => (
//     <div key={user.id}>
//       <button onClick={() => handleClick(user.id)} className="delete">X</button>
//       <img src={user.avatar} alt="avatar" />
//       <p className="id">ID: {user.id}</p>
//       <p>Name: {user.first_name} {user.last_name}</p>
//     </div>
//   ));

//   return (
//     <div className="users">
//       <h2>Lista użytkowników: </h2>
//       {props.firstFetch && <p className="message">Trwa pobieranie listy użytkowników!</p>}
//       <InfiniteScroll>
//         {users.length > 0 ? users : <p className="message">Brak uzytkownikow</p>}
//       </InfiniteScroll>
//     </div>
//   );
// }

//export default UsersList;