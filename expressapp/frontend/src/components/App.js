import React from 'react';
import { Profile } from './Profile';


class App extends React.Component {

  constructor() {
    super();
    this.state = {
      //is_super: document.querySelector('#user_info').dataset.is_super.toLowerCase() || true,
      is_super: "false",
      //userid: document.querySelector('#user_info').dataset.userid || 0,
      userid: 0,
      //username: document.querySelector('#user_info').dataset.username || 'zm412',
      username: 'zm412',
    };
  }
   

  render() {

    return (

      <div className="App-header">
          <div><Profile is_super={ this.state.is_super } userid={this.state.userid} username={this.state.username} /></div>
      </div>
          
    );
  }
}

export default App;
