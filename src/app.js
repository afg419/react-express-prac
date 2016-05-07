import React from 'react';
import ReactDOM from 'react-dom';
import Main from './components/main';


ReactDOM.render(
  <Main socket={io()}/>, document.getElementById("app-container")
);
