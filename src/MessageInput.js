import './MessageInput.css';
 import 'firebase/auth';
 import Button from 'material-ui/Button';
 import Input from 'material-ui/Input';
  import React from 'react';
  import base from './rebase';
  import firebase from 'firebase/app';
  import base64 from 'base-64';
  
  export default class MessageInput extends React.Component {
    constructor(props) {
      super(props);
      this.state = {message: '', secretMode: false};
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
          contents: this.state.secretMode ? base64.encode(this.state.message) 
                                          : this.state.message,
          timestamp: Date.now(),
          is_encrypted: this.state.secretMode
        },
        then: function(err) {
          if(err) {
           console.error('Error saving message', err);
         } else {
           self.setState({'message': ''});
         }
       }
     });
   }
    handleChange(event) {
      this.setState({'message': event.target.value});
    }
    toggleSecretMode(event) {
      this.setState({'secretMode': !this.state.secretMode});
    }
    
    render() {
      var secretModeText = this.state.secretMode ? "BACK TO NORMAL" : "ENABLE SECRET MODE";
      var sendButtonText = this.state.secretMode ? "SEND SECRET" : "SEND";
      var secretText = this.state.secretMode ? <div className="MessageInput">Secret text: {base64.encode(this.state.message)}</div> : <div />;
      return (
        <div>
          {secretText}
          <form className="MessageInput" onSubmit={this.sendMessage.bind(this)}>
            <Input className="MessageInput-input" placeholder="Send Message"
              value={this.state.message} onChange={this.handleChange.bind(this)}
              autoFocus={true}/>
            <Button type="submit" raised color="primary">
              {sendButtonText}
            </Button>
            <Button type="button" raised color="secondary"
              onClick={this.toggleSecretMode.bind(this)}>
              {secretModeText}
            </Button>
          </form>
         
        </div>
      );
    }
  }