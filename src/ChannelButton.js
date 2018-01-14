import React from 'react';
import { ListItem, ListItemText } from 'material-ui/List';

export default class ChannelButton extends React.Component {
  handleClick() {
    this.props.onChannelClick(this.props.channelKey);
  }
  render() {
    return (
      <ListItem button disabled={this.props.selected}
        onClick={this.handleClick.bind(this)}>
        <ListItemText primary={this.props.value}/>
      </ListItem>
    );
  }
}
