import './Message.css';
import React from 'react';
import base64 from 'base-64';

export default class Message extends React.Component {
    render() {
      var renderedDate = (new Date(this.props.value.timestamp)).toLocaleString();
      var textContents = this.props.value.is_encrypted? base64.decode(this.props.value.contents) : this.props.value.contents;
      var textContentsClass = this.props.value.is_encrypted ? "Message-contents-secret" : "Message-contents";
      var renderedContents = this.props.value.image_source ? 
           <div className={textContentsClass}><img src={this.props.value.image_source} alt={textContents} /></div> :
           <div className={textContentsClass}>{textContents}</div>;
      return (
        <div className="Message">
          <div>
           <span className="Message-author">{this.props.value.author}</span>
           <span className="Message-timestamp">
             {renderedDate}
           </span>
         </div>
         {renderedContents}
       </div>
     );
   }
 }