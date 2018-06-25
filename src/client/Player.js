import React, { Component } from 'react';
import { injectGlobal } from 'styled-components';
import { VIEWS } from './constants';

injectGlobal`
  video {
    height: 100%;
    position: relative;
  }
  video::-webkit-media-controls-panel {
    visibility: hidden;
  }
  video::-webkit-media-controls-panel>div:nth-child(3),
  ::-internal-media-controls-button-panel {
    height: 50px !important;
  }
  video::-webkit-media-controls-fullscreen-button {
    visibility: visible;
    background-size: 50px;
    position: absolute;
    right: 20px;
    height: 50px;
    width: 50px;
    opacity: 1;
    top: -9px;
  }
`;

class Player extends Component {
  constructor(props) {
    super(props);
    this.room = this.props.room;
    this.role = this.props.role;
    this.isInitiator = this.props.isInitiator;
    this.goTo = this.props.actions.goTo;
  }

  componentDidMount = () => {
    this.ws = new WebSocket(this.getWsUrl());
    this.pc = new RTCPeerConnection(null);

    this.ws.onmessage = this.handle_OnMessage;
    this.pc.onicecandidate = this.handle_onIceCandidate;
    if (this.role === 'r') {
      if( this.pc.addTrack ) {
        this.pc.ontrack = this.handle_onTrack;
      } else {
        this.pc.onaddstream = this.handle_onAddStream;
      }
    }
    this.ws.onopen = () => this.sendMessage({ type: 'joined' });

    if (this.props.role === 's') {
      this.player.muted = true;
      this.player.controls = true;

      let constrains;

      if (navigator.userAgent.match(/Android/i)) {
        constrains = {
          width: { ideal: 1920 },
          height: { ideal: 1080 },
          aspectRatio: 16 / 9,
          facingMode: 'environment',
          frameRate: { min: 25, max: 60 }
        }
      } else {
        constrains = {
          facingMode: 'environment'
        };
      }

      navigator.mediaDevices
        .getUserMedia({
          video: constrains,
          audio: true
        })
        .then(stream => {
          this.player.srcObject = stream;
          if(this.pc.adTrack) {
            stream.getStracks().forEach(track => this.pc.addTrack(track, stream));
          } else {
            this.pc.addStream(stream);
          }
          if (!this.isInitiator) this.sendOffer();
        })
        .catch(e => {
          console.log(e);
        });
    }

    window.onbeforeunload = this.handle_onBeforeUnload;
  };

  handle_OnMessage = payload => {
    const { type, msg } = JSON.parse(payload.data);
    switch (type) {
      case 'joined':
        this.sendOffer();
        break;
      case 'offer':
        this.receiveOffer(msg);
        break;
      case 'answer':
        this.recieveAnswer(msg);
        break;
      case 'icecandidate':
        this.receiveIceCandidate(msg);
        break;
      case 'disconnect':
        this.handle_peerDisconnect();
        break;
      default:
        break;
    }
  };

  sendMessage = msg => {
    this.ws.send(JSON.stringify(msg));
  };

  sendOffer = () => {
    this.pc
      .createOffer()
      .then(offer => {
        return this.pc.setLocalDescription(offer);
      })
      .then(() => {
        this.sendMessage({
          type: 'offer',
          msg: this.pc.localDescription
        });
      })
      .catch(error => console.log('Error creating Offer: ', error));
  };

  receiveOffer = msg => {
    var desc = new RTCSessionDescription(msg);
    this.pc.setRemoteDescription(desc).catch(error => console.log(error));
    this.sendAnswer();
  };

  sendAnswer = () => {
    this.pc
      .createAnswer()
      .then(answer => {
        return this.pc.setLocalDescription(answer);
      })
      .then(() => {
        this.sendMessage({
          type: 'answer',
          msg: this.pc.localDescription
        });
      })
      .catch(error => console.log('Error creating Answer: ', error));
  };

  recieveAnswer = msg => {
    var desc = new RTCSessionDescription(msg);
    this.pc.setRemoteDescription(desc).catch(error => console.log(error));
  };

  receiveIceCandidate = msg => {
    var candidate = new RTCIceCandidate(msg);
    this.pc.addIceCandidate(candidate).catch(error => console.log(error));
  };

  handle_onIceCandidate = e => {
    if (e.candidate) {
      this.sendMessage({
        type: 'icecandidate',
        msg: e.candidate
      });
    }
  };

  handle_onAddStream = e => {
    this.player.srcObject = e.stream;
  };

  handle_onTrack = e => {
    this.player.srcObject = e.streams[0];
  };

  handle_onBeforeUnload = () => {
    this.sendMessage({ type: 'disconnect' });
    this.closeSession();
  };

  handle_peerDisconnect = () => {
    this.closeSession();
    alert('The session peer has disconnected');
    this.goTo(VIEWS.HOME);
  };

  closeSession = () => {
    this.pc.onaddstream = null;
    this.pc.onicecandidate = null;
    let tracks = this.player.srcObject.getTracks();
    if(tracks) tracks.forEach(track => track.stop());

    this.ws.close();
    this.pc.close();
    this.pc = null;
    this.ws = null;
    this.player.srcObject = null;
  };

  getWsUrl = () => {
    var l = window.location;
    return (l.protocol === 'https:' ? 'wss://' : 'ws://') + `${l.host}?room=${this.room}&role=${this.role}`;
  };

  render = () => (
    <video autoPlay playsInline ref={node => (this.player = node)} />
  );
}

export default Player;
