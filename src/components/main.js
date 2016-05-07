import React from 'react';

var Main = React.createClass({
  getInitialState(){
    return { message: "" };
  },

  componentWillMount(){
    this.props.socket.on('statusMessage', (msg) => {
      this.setState({message: msg});
    });

    this.props.socket.on('usersConnected', (msg) => {
      this.setState({message: msg});
    });
  },

  render(){
    return(
      <div>HEY! {this.state.message}</div>
    );
  }
});

module.exports = Main;
