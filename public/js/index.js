function app(room, role, isFirst) {
  let stream;
  let pc;

  const isSender = role === 's';
  const player = document.querySelector('video');
  const wss = new WebSocket(`wss://${window.location.host}?room=${room}&role=${role}`);

  wss.onmessage = gotMessageFromServer;

  wss.onopen = () => {
    if(isSender) {
      player.muted = true;
      player.controls = true;
      navigator.mediaDevices
      .getUserMedia({
        video: (() => {
          if (navigator.userAgent.match(/Android/i)) {
            return {
              width: { ideal: 1920 },
              height: { ideal: 1080 },
              aspectRatio: 16 / 9,
              facingMode: 'environment',
              frameRate: { min: 25, max: 60 }
            }
          }
          return {
            facingMode: 'environment'
          }
        })(),
        audio: true
      })
      .then(str => {
        stream = str;
        player.srcObject = str;
        initPeerConnection();
        if(!isFirst) { 
          sendOffer();
        }
      })
      .catch(e => {
        console.log(e);
      });
    } else {
      initPeerConnection();
      wss.send(JSON.stringify('connected'));
    }
  }

  function initPeerConnection() {
    if(!pc) {
      pc = new RTCPeerConnection({
        'iceServers': [
          {'urls': 'stun:stun.stunprotocol.org:3478'},
          {'urls': 'stun:stun.l.google.com:19302'},
        ]
      });
      pc.onicecandidate = gotIceCandidate;
      if(isSender) {
        pc.addStream(stream);
      } else {
        pc.ontrack = gotRemoteStream;
      }
    }
  }

  function sendOffer() {
    pc.createOffer().then(createdDescription).catch(errorHandler);
  }

  function gotMessageFromServer(message) {
    initPeerConnection();
    var signal = JSON.parse(message.data);
    if(signal === 'connected') {
      sendOffer();
    } else if(signal.sdp) {
      pc.setRemoteDescription(new RTCSessionDescription(signal.sdp)).then(function() {
        // Only create answers in response to offers
        if(signal.sdp.type == 'offer') {
          pc.createAnswer().then(createdDescription).catch(errorHandler);
        }
      }).catch(errorHandler);
    } else if(signal.ice) {
      pc.addIceCandidate(new RTCIceCandidate(signal.ice)).catch(errorHandler);
    } else if(signal === 'disconnect') {
      resetPc();
    }
  }

  function gotIceCandidate(event) {
    if(event.candidate != null) {
      wss.send(JSON.stringify({'ice': event.candidate}));
    }
  }

  function createdDescription(description) {
    pc.setLocalDescription(description).then(function() {
      wss.send(JSON.stringify({'sdp': pc.localDescription}));
    }).catch(errorHandler);
  }

  function gotRemoteStream(event) {
    player.srcObject = event.streams[0];
  }

  function errorHandler(error) {
    console.log(error);
  }

  function resetPc() {
    pc.close();
    pc = undefined;
  }

  window.onbeforeunload = () => { 
    wss.send(JSON.stringify('disconnect')); 
    resetPc(); 
  };
}