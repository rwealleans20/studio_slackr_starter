import './Channel.css';
import Message from './Message';
import MessageInput from './MessageInput';
import React from 'react';

export default class Channel extends React.Component {
  componentDidMount() {
    this.messageEnd.scrollIntoView({behavior: 'instant'});
  }
  componentDidUpdate() {
    this.messageEnd.scrollIntoView({behavior: 'instant'});
  }
  setMessagesEnd(el) {
    this.messageEnd = el;
  }
  render() {
    var messages = [];
    if(this.props.channel && this.props.channel.messages) {
      var sorted = [];
      for(var m in this.props.channel.messages) {
        sorted.push({key: m, val: this.props.channel.messages[m]});
      }
      sorted.sort(function(a, b) {
        return a.val.timestamp - b.val.timestamp;
      });
      for(var i = 0; i < sorted.length; i++) {
        messages.push(<Message key={sorted[i].key} value={sorted[i].val}/>);
      }
    }
    return (
      <div className="Channel">
        <header className="Channel-header">
          {this.props.channel && this.props.channel.name}
        </header>
        <div className="Channel-messages">
          {messages}
          <div ref={this.setMessagesEnd.bind(this)}></div>
        </div>
        <MessageInput channelId={this.props.channelId} />
      </div>
    );
  }
}
