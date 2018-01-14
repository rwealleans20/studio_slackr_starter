import Button from 'material-ui/Button';
import Input from 'material-ui/Input';
import React from 'react';
import base from './rebase';

export default class ChannelInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {name: ''};
  }
  addChannel(event) {
    event.preventDefault();
    if(!this.state.name) {
      return;
    }
    var self = this;
    base.push('channels', {
      data: {name: this.state.name},
      then: function(err) {
        if(err) {
          console.error('Error adding channel', err);
        } else {
          self.setState({name: ''});
        }
      }
    });
  }
  handleChange(event) {
    this.setState({name: event.target.value});
  }
  render() {
    return (
      <form onSubmit={this.addChannel.bind(this)}>
        <Input placeholder="Add Channel" label="Channel Name"
          value={this.state.name} onChange={this.handleChange.bind(this)}/>
        <Button type="submit">
          Add
        </Button>
      </form>
    );
  }
}
