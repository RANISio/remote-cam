import React, { Component } from 'react';
import { injectGlobal } from 'styled-components';
import Home from './Home';
import Player from './Player';
import { VIEWS } from './constants';

injectGlobal`
	html, body, #root {
		width: 100%;
		height: 100%;
		overflow: hidden;
		padding: 0;
		margin: 0;
		font-family: 'Roboto', sans-serif;
  }
  #root {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    align-content: stretch;
  }
	h1, h2 {
		font-family: 'Roboto', sans-serif;
	}
`;

export default class App extends Component {
  state = {
    view: VIEWS.HOME,
    room: null,
    role: null,
    isInitiator: false
  };

  actions = {
    goTo: view => {
      this.setState({ view: view });
    },

    setRoomName: room => {
      this.setState({ room });
    },

    setRole: role => {
      this.setState({ role });
    },

    setAsInitiator: isInitiator => {
      this.setState({ isInitiator });
    }
  };

  render = () => (
    <React.Fragment>
      {this.state.view === VIEWS.HOME && <Home actions={this.actions} />}
      {this.state.view === VIEWS.PLAYER && (
        <Player
          role={this.state.role}
          room={this.state.room}
          isInitiator={this.state.isInitiator}
          actions={this.actions}
        />
      )}
    </React.Fragment>
  );
}
