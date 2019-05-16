var peerConnection;
var serverConnection = new WebSocket(`wss://${window.location.host}?room=${room}&role=${role}`);

var peerConnectionConfig = {
  'iceServers': [
    {'urls': 'stun:stun.stunprotocol.org:3478'},
    {'urls': 'stun:stun.l.google.com:19302'},
  ]
};

serverConnection.onmessage = gotMessageFromServer;

function init(isSender, isCaller) {
  console.log('isSender: ' + isSender)
  console.log('isCaller: ' + isCaller)
  peerConnection = new RTCPeerConnection(peerConnectionConfig);
  peerConnection.onicecandidate = gotIceCandidate;
  if(isSender) {
    peerConnection.addStream(stream);
  } else {
    peerConnection.ontrack = gotRemoteStream;
  }
  if(isCaller) {
    peerConnection.createOffer().then(createdDescription).catch(errorHandler);
  }
}

function gotMessageFromServer(message) {
  if(!peerConnection) init(role === 's',false);

  var signal = JSON.parse(message.data);
  console.log('Received messeage' + signal);
  if(signal.sdp) {
    peerConnection.setRemoteDescription(new RTCSessionDescription(signal.sdp)).then(function() {
      // Only create answers in response to offers
      if(signal.sdp.type == 'offer') {
        peerConnection.createAnswer().then(createdDescription).catch(errorHandler);
      }
    }).catch(errorHandler);
  } else if(signal.ice) {
    peerConnection.addIceCandidate(new RTCIceCandidate(signal.ice)).catch(errorHandler);
  } else if(signal === 'disconnect') {
    peerConnection.close();
    peerConnection = undefined;
  }
}

function gotIceCandidate(event) {
  console.log('IceCandidate: ' + event.candidate);
  if(event.candidate != null) {
    serverConnection.send(JSON.stringify({'ice': event.candidate}));
  }
}

function createdDescription(description) {
  peerConnection.setLocalDescription(description).then(function() {
    serverConnection.send(JSON.stringify({'sdp': peerConnection.localDescription}));
  }).catch(errorHandler);
}

function gotRemoteStream(event) {
  console.log('gotRemoteStream: ', event.streams)
  player.srcObject = event.streams[0];
}

function errorHandler(error) {
  console.log(error);
}

window.onbeforeunload = () => serverConnection.send(JSON.stringify('disconnect'));