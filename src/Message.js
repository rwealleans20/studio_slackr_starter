import './Message.css';
import React from 'react';

export default class Message extends React.Component {
  render() {
    var renderedDate = (new Date(this.props.value.timestamp)).toLocaleString();

    return (
      <div className="Message">
        <div>
          <span className="Message-author">{this.props.value.author}</span>
          <span className="Message-timestamp">
            {renderedDate}
          </span>
        </div>
        <div className="Message-contents">{this.props.value.contents}</div>
      </div>
    );
  }
}
