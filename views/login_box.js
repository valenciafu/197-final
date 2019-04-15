var React = require('react');
var ReactDOM = require('react-dom');
var redux = require('redux');

'use strict';

const e = React.createElement;

class LoginBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
    if (this.state.liked) {
      return 'You liked this.';
    }

    return e(
      'button',
      { onClick: () => this.setState({ liked: true }) },
      'Like'
    );
  }
}

const domContainer = document.querySelector('#login_box');
ReactDOM.render(e(LoginBox), domContainer);