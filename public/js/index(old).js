
let pc = null;
let ws = null;

function init(room, role) {
  initPc();
  ws = new WebSocket((window.location.protocol === 'https:' ? 'wss://' : 'ws://') + `${window.location.host}?room=${room}&role=${role}`);
  ws.onmessage = payload => {
    const { type, msg } = JSON.parse(payload.data);
    console.log(type, msg)
    switch (type) {
      case 'joined':
        sendOffer();
        break;
      case 'offer':
        receiveOffer(msg);
        break;
      case 'answer':
        recieveAnswer(msg);
        break;
      case 'icecandidate':
        receiveIceCandidate(msg);
        break;
      case 'disconnected':
        disconnectPc();
        break;
      default:
        break;
    }
  };
}

let initPc = () => {
  pc = new RTCPeerConnection(null);
  // stream.getTracks().forEach(track => pc.addTrack(track, stream));
  pc.addEventListener('icecandidate', e => {
    console.log('icecandidate');
    if (e.candidate) {
      sendMessage({
        type: 'icecandidate',
        msg: e.candidate
      });
    }
  });
}

// let initPc = () => {
//   pc = new RTCPeerConnection(null);
//   // pc.ontrack = e => {
//   //   player.srcObject = e.streams[0];
//   // };
//   pc.addEventListener('icecandidate', e => {
//     console.log('icecandidate')
//     if (e.candidate) {
//       sendMessage({
//         type: 'icecandidate',
//         msg: e.candidate
//       });
//     }
//   });
// }


let sendMessage = msg => {
  ws.send(JSON.stringify(msg));
};

let sendOffer = () => {
  pc.createOffer()
    .then(offer => {
      console.log('offer', offer);
      return pc.setLocalDescription(offer);
    })
    .then(() => {
      sendMessage({
        type: 'offer',
        msg: pc.localDescription
      });
    })
    .catch(error => console.log('Error creating Offer: ', error));
};

let receiveOffer = msg => {
  msg = JSON.parse(msg);
  let desc = new RTCSessionDescription(msg.sdp);
  pc.setRemoteDescription(desc).catch(error => console.log(error));
  sendAnswer();
};

let sendAnswer = () => {
  pc.createAnswer()
    .then(answer => {
      console.log('answer', answer);
      return pc.setLocalDescription(answer);
    })
    .then(() => {
      sendMessage({
        type: 'answer',
        msg: pc.localDescription
      });
    })
    .catch(error => console.log('Error creating Answer: ', error));
};

let recieveAnswer = msg => {
  msg = JSON.parse(msg);
  let desc = new RTCSessionDescription(msg.sdp);
  pc.setRemoteDescription(desc).catch(error => console.log(error));
};

let receiveIceCandidate = msg => {
  let candidate = new RTCIceCandidate(msg);
  pc.addIceCandidate(candidate).catch(error => console.log(error));
};

let disconnectPc = () => {
  if(pc) pc.close();
  pc=null;
}





window.onbeforeunload = () => sendMessage({ type: 'disconnect' });