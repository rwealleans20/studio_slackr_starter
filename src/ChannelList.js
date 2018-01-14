import './ChannelList.css';
import List from 'material-ui/List';
import ChannelInput from './ChannelInput';
import ChannelButton from './ChannelButton';
import React from 'react';

export default class ChannelList extends React.Component {
  render() {
    var channelButtons = [];
    for(var channel in this.props.list) {
      channelButtons.push(
        <ChannelButton key={channel} channelKey={channel}
          value={this.props.list[channel].name}
          selected={this.props.selected === channel}
          onChannelClick={this.props.setSelected}/>
      );
    }
    return (
      <div className="ChannelList">
        <header className="ChannelList-header">Channels</header>
        <List className="ChannelButtons">{channelButtons}</List>
        <ChannelInput/>
      </div>
    );
  }
}
