import './App.css';
import Channel from './Channel';
import ChannelList from './ChannelList';
import Header from './Header';
import React from 'react';
import base from './rebase';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { channels: {}, loading: true };
  }
  componentDidMount() {
    this.ref = base.syncState("channels", {
      context: this,
      state: 'channels',
      then: function() {
        this.setState({ loading: false });
        var channels = Object.keys(this.state.channels);
        if(channels.length > 0) {
          this.setState({ selected: channels[0] });
        }
      }
    });
  }
  setSelectedChannel(channel) {
    this.setState({selected: channel});
  }
  render() {
    return (
      <div className="App">
        <Header/>
        <div className="App-body">
          <ChannelList className="App-body" list={this.state.channels}
            selected={this.state.selected}
            setSelected={this.setSelectedChannel.bind(this)}/>
          <Channel channel={this.state.channels[this.state.selected]}
            channelId={this.state.selected} />
        </div>
      </div>
    );
  }
}
