import './MessageInput.css';
import 'firebase/auth';
import Button from 'material-ui/Button';
import Input from 'material-ui/Input';
import React from 'react';
import base from './rebase';
import firebase from 'firebase/app';

export default class MessageInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {message: ''};
    this.user = {};
  }
  componentDidMount() {
    var self = this;
    firebase.auth().onAuthStateChanged(function(user) {
      self.user = user;
    });
  }
  sendMessage(event) {
    var self = this;
    event.preventDefault();
    if(!this.state.message) {
      return;
    }
    base.push('channels/' + this.props.channelId + '/messages', {
      data: {
        author: this.user.displayName,
        contents: 'TODO replace this string with the message input text',
        timestamp: Date.now(),
      },
      then: function(err) {
        if(err) {
          console.error('Error saving message', err);
        } else {
          // TODO reset the message input to empty.
        }
      }
    });
  }
  handleChange(event) {
    // TODO set the state message property to event.target.value
  }
  render() {
    return (
      <form className="MessageInput" onSubmit={this.sendMessage.bind(this)}>
        <Input className="MessageInput-input" placeholder="Send Message"
          value={this.state.message} onChange={this.handleChange.bind(this)}
          autoFocus={true}/>
        <Button type="submit" raised color="primary">
          SEND
        </Button>
      </form>
    );
  }
}
