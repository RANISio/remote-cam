module.exports=function(e){var n={};function t(o){if(n[o])return n[o].exports;var r=n[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,t),r.l=!0,r.exports}return t.m=e,t.c=n,t.d=function(e,n,o){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:o})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(t.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var r in e)t.d(o,r,function(n){return e[n]}.bind(null,r));return o},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="/",t(t.s=20)}([function(e,n){e.exports=require("react")},function(e,n){e.exports=require("styled-components")},function(e,n){e.exports=require("babel-runtime/helpers/taggedTemplateLiteral")},function(e,n){e.exports=require("babel-runtime/helpers/possibleConstructorReturn")},function(e,n){e.exports=require("babel-runtime/core-js/json/stringify")},function(e,n){e.exports=require("babel-runtime/helpers/inherits")},function(e,n){e.exports=require("babel-runtime/helpers/classCallCheck")},function(e,n){e.exports=require("babel-runtime/core-js/object/get-prototype-of")},function(e,n){e.exports=require("body-parser")},function(e,n){e.exports=require("express")},function(e,n){e.exports=require("ws")},function(e,n){e.exports=require("uuid")},function(e,n){e.exports=require("babel-runtime/core-js/object/keys")},function(e,n){e.exports=require("express-session")},function(e,n){e.exports=require("html-minifier")},function(e,n){e.exports=require("compression")},function(e,n){e.exports=require("http")},function(e,n,t){"use strict";t.r(n);var o=t(16),r=t.n(o),i=t(15),a=t.n(i),s=t(14),c=t(9),l=t.n(c),d=t(8),u=t.n(d),p=t(13),f=t.n(p)()({saveUninitialized:!1,secret:"$eCuRiTy",resave:!1}),m={},h=t(12),g=t.n(h),b=t(4),v=t.n(b),x=function(e){var n=new Date;console.log("["+n.toLocaleTimeString()+"] Server sais: "+e)},y=t(11),w=t.n(y),E=t(0),j=t.n(E),k=(t(19),t(1)),S=t.n(k),C=t(7),T=t.n(C),R=t(6),O=t.n(R),_=t(3),I=t.n(_),q=t(5),M=t.n(q),A=t(2),P=t.n(A),D={HOME:"HOME",PLAYER:"PLAYER"},z=P()(["\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  & > div {\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n  }\n  & > div > div {\n    padding: 1em;\n  }\n"],["\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  & > div {\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n  }\n  & > div > div {\n    padding: 1em;\n  }\n"]),F=P()(["\n  color: #888;\n  text-align: center;\n  border: none;\n  outline: none;\n  padding: 10px;\n  font-size: 2em;\n  background: transparent;\n  border-radius: 0;\n  transition: all 0.1s ease-in-out;\n  border-bottom: 2px solid #2196f3;\n"],["\n  color: #888;\n  text-align: center;\n  border: none;\n  outline: none;\n  padding: 10px;\n  font-size: 2em;\n  background: transparent;\n  border-radius: 0;\n  transition: all 0.1s ease-in-out;\n  border-bottom: 2px solid #2196f3;\n"]),L=P()(["\n  display: flex;\n"],["\n  display: flex;\n"]),N=P()(["\n  position: absolute;\n  left: -9999em;\n  top: -9999em;\n  &:checked + label {\n    background-color: #2196f3;\n    box-shadow: none;\n    z-index: -999;\n  }\n"],["\n  position: absolute;\n  left: -9999em;\n  top: -9999em;\n  &:checked + label {\n    background-color: #2196f3;\n    box-shadow: none;\n    z-index: -999;\n  }\n"]),U=P()(["\n  padding: 1em 3em;\n  cursor: pointer;\n  color: #fff;\n  background-color: #888;\n  & > i {\n    font-size: 2em;\n  }\n  &:first-of-type {\n    border-radius: 1em 0 0 1em;\n    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.16), 0 2px 10px rgba(0, 0, 0, 0.12);\n  }\n  &:last-of-type {\n    border-radius: 0 1em 1em 0;\n    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.16), 0 2px 10px rgba(0, 0, 0, 0.12);\n  }\n"],["\n  padding: 1em 3em;\n  cursor: pointer;\n  color: #fff;\n  background-color: #888;\n  & > i {\n    font-size: 2em;\n  }\n  &:first-of-type {\n    border-radius: 1em 0 0 1em;\n    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.16), 0 2px 10px rgba(0, 0, 0, 0.12);\n  }\n  &:last-of-type {\n    border-radius: 0 1em 1em 0;\n    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.16), 0 2px 10px rgba(0, 0, 0, 0.12);\n  }\n"]),H=P()(["\n  border: none;\n  background: transparent;\n  color: #2196f3;\n  cursor: pointer;\n  outline: none;\n  & > i {\n    font-size: 4em;\n  }\n"],["\n  border: none;\n  background: transparent;\n  color: #2196f3;\n  cursor: pointer;\n  outline: none;\n  & > i {\n    font-size: 4em;\n  }\n"]),W=S.a.form(z),Y=S.a.input(F),B=S.a.div(L),J=S.a.input(N),G=S.a.label(U),$=S.a.button(H),K=function(e){function n(e){O()(this,n);var t=I()(this,(n.__proto__||T()(n)).call(this,e));return t.state={textFieldError:"Error text",selectFieldError:"",formIsInvalid:!1,role:""},t.handleSubmit=function(e){e.preventDefault();var n=e.target.room.value.toLowerCase(),o=e.target.role.value;o&&n?fetch("/",{method:"POST",body:v()({roomName:n,role:o}),credentials:"include",headers:{"content-type":"application/json"}}).then(function(e){if(!e.ok){switch(e.status){case 409:alert("This role is already taken in this session.");break;case 412:alert("This session is full. Try a different session name.")}throw Error(e)}return e}).then(function(e){t.actions.setRoomName(n),t.actions.setRole(o),200===e.status&&t.actions.setAsInitiator(!0),t.actions.goTo(D.PLAYER)}).catch(function(e){console.log(e)}):n?o||alert('Please, select your role by clicking "Camera" or "Screen" button.'):alert("Please, type in the session name.")},t.validateTextInput=function(e){var n=new RegExp("^[a-zA-Z0-9]+$"),t=String.fromCharCode(e.charCode?e.charCode:e.which);return!!n.test(t)||(e.preventDefault(),alert("Only alphanumeric characters are allowed in session name."),!1)},t.render=function(){return j.a.createElement(W,{onSubmit:function(e){return t.handleSubmit(e)}},j.a.createElement("div",null,j.a.createElement("div",null,j.a.createElement(Y,{type:"text",placeholder:"Create or join a session",name:"room",autoComplete:"off",onKeyPress:t.validateTextInput})),j.a.createElement("div",null,j.a.createElement(B,null,j.a.createElement(J,{type:"radio",name:"role",value:"s",id:"camera"}),j.a.createElement(G,{htmlFor:"camera"},j.a.createElement("i",{className:"material-icons"},"videocam")),j.a.createElement(J,{type:"radio",name:"role",value:"r",id:"screen"}),j.a.createElement(G,{htmlFor:"screen"},j.a.createElement("i",{className:"material-icons"},"video_label"))))),j.a.createElement("div",null,j.a.createElement($,{type:"submit"},j.a.createElement("i",{className:"material-icons"},"arrow_forward_ios"))))},t.actions=e.actions,t}return M()(n,e),n}(E.Component),X=P()(["\n  video {\n    height: 100%;\n    cursor: pointer;\n    position: relative;\n  }\n  video::-webkit-media-controls-panel {\n    visibility: hidden;\n  }\n  video::-webkit-media-controls-panel>div:nth-child(3),\n  ::-internal-media-controls-button-panel {\n    height: 50px !important;\n  }\n  video::-webkit-media-controls-fullscreen-button {\n    visibility: visible;\n    background-size: 50px;\n    position: absolute;\n    right: 20px;\n    height: 50px;\n    width: 50px;\n    opacity: 1;\n    top: -9px;\n  }\n"],["\n  video {\n    height: 100%;\n    cursor: pointer;\n    position: relative;\n  }\n  video::-webkit-media-controls-panel {\n    visibility: hidden;\n  }\n  video::-webkit-media-controls-panel>div:nth-child(3),\n  ::-internal-media-controls-button-panel {\n    height: 50px !important;\n  }\n  video::-webkit-media-controls-fullscreen-button {\n    visibility: visible;\n    background-size: 50px;\n    position: absolute;\n    right: 20px;\n    height: 50px;\n    width: 50px;\n    opacity: 1;\n    top: -9px;\n  }\n"]);Object(k.injectGlobal)(X);var Z=function(e){function n(e){O()(this,n);var t=I()(this,(n.__proto__||T()(n)).call(this,e));return t.componentDidMount=function(){t.ws=new WebSocket(t.getWsUrl()),t.pc=new RTCPeerConnection(null),t.ws.onmessage=t.handle_OnMessage,t.pc.onicecandidate=t.handle_onIceCandidate,"r"===t.role&&(t.pc.ontrack=t.handle_onTrack),t.ws.onopen=function(){return t.sendMessage({type:"joined"})},"s"===t.props.role&&(t.player.muted=!0,t.player.controls=!0,navigator.mediaDevices.getUserMedia({video:{width:{min:640,max:1920},height:{min:480,max:1080},aspectRatio:16/9,facingMode:"environment",frameRate:{min:25,max:60}},audio:!0}).then(function(e){t.player.srcObject=e,e.getTracks().forEach(function(n){return t.pc.addTrack(n,e)}),t.isInitiator||t.sendOffer()}).catch(function(e){console.log(e)})),window.onbeforeunload=t.handle_onBeforeUnload},t.handle_OnMessage=function(e){console.log(e);var n=JSON.parse(e.data),o=n.type,r=n.msg;switch(o){case"joined":t.sendOffer();break;case"offer":t.receiveOffer(r);break;case"answer":t.recieveAnswer(r);break;case"icecandidate":t.receiveIceCandidate(r);break;case"disconnect":t.handle_peerDisconnect()}},t.sendMessage=function(e){t.ws.send(v()(e))},t.sendOffer=function(){t.pc.createOffer().then(function(e){return console.log("---\x3e Creating new description object to send to remote peer"),t.pc.setLocalDescription(e)}).then(function(){console.log("---\x3e Sending offer to remote peer"),t.sendMessage({type:"offer",msg:t.pc.localDescription})}).catch(function(e){return console.log("Error creating Offer: ",e)})},t.receiveOffer=function(e){console.log("---\x3e Received offer");var n=new RTCSessionDescription(e);t.pc.setRemoteDescription(n).catch(function(e){return console.log(e)}),t.sendAnswer()},t.sendAnswer=function(){console.log("---\x3e Sending Answer"),t.pc.createAnswer().then(function(e){return console.log("---\x3e Creating new description object to send to remote peer"),t.pc.setLocalDescription(e)}).then(function(){console.log("---\x3e Sending answer to remote peer"),t.sendMessage({type:"answer",msg:t.pc.localDescription})}).catch(function(e){return console.log("Error creating Answer: ",e)})},t.recieveAnswer=function(e){console.log("---\x3e Received answer");var n=new RTCSessionDescription(e);t.pc.setRemoteDescription(n).catch(function(e){return console.log(e)})},t.receiveIceCandidate=function(e){var n=new RTCIceCandidate(e);console.log("Adding received ICE candidate: "+v()(n)),t.pc.addIceCandidate(n).catch(function(e){return console.log(e)})},t.handle_onIceCandidate=function(e){console.log("---\x3e Handling Ice Candidate"),e.candidate&&t.sendMessage({type:"icecandidate",msg:e.candidate})},t.handle_onTrack=function(e){console.log("---\x3e Receiveing remote stream."),t.player.srcObject=e.streams[0]},t.handle_onBeforeUnload=function(){t.sendMessage({type:"disconnect"}),t.closeSession()},t.handle_peerDisconnect=function(){t.closeSession(),alert("The session peer has disconnected"),t.goTo(D.HOME)},t.closeSession=function(){t.pc.onaddstream=null,t.pc.onicecandidate=null,t.player.srcObject.getTracks().forEach(function(e){return e.stop()}),t.ws.close(),t.pc.close(),t.pc=null,t.ws=null,t.player.srcObject=null},t.getWsUrl=function(){var e=window.location;return("https:"===e.protocol?"wss://":"ws://")+e.host+e.pathname},t.toggleFullScreen=function(){document.webkitFullscreenElement?document.webkitExitFullscreen&&document.webkitExitFullscreen():t.player.webkitRequestFullscreen()},t.render=function(){return j.a.createElement("video",{autoPlay:!0,playsInline:!0,ref:function(e){return t.player=e}})},t.room=t.props.room,t.role=t.props.role,t.isInitiator=t.props.isInitiator,t.goTo=t.props.actions.goTo,t}return M()(n,e),n}(E.Component),Q=P()(["\n\thtml, body, #root {\n\t\twidth: 100%;\n\t\theight: 100%;\n\t\toverflow: hidden;\n\t\tpadding: 0;\n\t\tmargin: 0;\n\t\tfont-family: 'Roboto', sans-serif;\n  }\n  #root {\n    display: flex;\n    flex-direction: column;\n    flex-wrap: nowrap;\n    justify-content: center;\n    align-items: center;\n    align-content: stretch;\n  }\n\th1, h2 {\n\t\tfont-family: 'Roboto', sans-serif;\n\t}\n"],["\n\thtml, body, #root {\n\t\twidth: 100%;\n\t\theight: 100%;\n\t\toverflow: hidden;\n\t\tpadding: 0;\n\t\tmargin: 0;\n\t\tfont-family: 'Roboto', sans-serif;\n  }\n  #root {\n    display: flex;\n    flex-direction: column;\n    flex-wrap: nowrap;\n    justify-content: center;\n    align-items: center;\n    align-content: stretch;\n  }\n\th1, h2 {\n\t\tfont-family: 'Roboto', sans-serif;\n\t}\n"]);Object(k.injectGlobal)(Q);!function(e){function n(){var e,t,o,r;O()(this,n);for(var i=arguments.length,a=Array(i),s=0;s<i;s++)a[s]=arguments[s];return t=o=I()(this,(e=n.__proto__||T()(n)).call.apply(e,[this].concat(a))),o.state={view:D.HOME,room:null,role:null,isInitiator:!1},o.actions={goTo:function(e){o.setState({view:e})},setRoomName:function(e){o.setState({room:e})},setRole:function(e){o.setState({role:e})},setAsInitiator:function(e){o.setState({isInitiator:e})}},o.render=function(){return j.a.createElement(j.a.Fragment,null,o.state.view===D.HOME&&j.a.createElement(K,{actions:o.actions}),o.state.view===D.PLAYER&&j.a.createElement(Z,{role:o.state.role,room:o.state.room,isInitiator:o.state.isisInitiator,actions:o.actions}))},r=t,I()(o,r)}M()(n,e)}(E.Component);var V=t(18),ee=V.client.css,ne=V.client.js;ee&&(ee=ee.replace("/","")),ne=ne.replace("/","");var te=l()().disable("x-powered-by").use(a()()).use(l.a.static("/var/www/remote-cam/build/public")).use(u.a.json()).use(u.a.urlencoded({extended:!0})).use(f).post("/",function(e,n){x("Receied request to join with the following parameters: "+v()(e.body));var t=e.body,o=t.roomName,r=t.role,i=m[o];if(o&&r){if(i)return 2===g()(i).length?(x("Received request to join full room"),void n.status(412).send("This room is full")):i[0].role===r?(x("Received request to join room with conflicting role"),void n.status(409).send("The role in the room already exists")):(x("Joining room: "+o),void n.status(201).send("Success!"));var a=w.a.v4();return e.session.userId=a,e.session.room=o,e.session.role=r,x("Creating room: "+o),void n.status(200).send("Success!")}return x("Bad request received with incomplete paramters."),void n.status(400).send("Parameters are not provided")}).get("/",function(e,n){var t=(new k.ServerStyleSheet).getStyleTags();n.send(Object(s.minify)('<!DOCTYPE HTML>\n\t\t\t<html lang="en">\n\t\t\t\t<head>\n\t\t\t\t\t<title>Remote Camera</title>\n\n\t\t\t\t\t<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0">\n\t\t\t\t\t<meta http-equiv="X-UA-Compatible" content="IE=edge">\n\t\t\t\t\t<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">\n\n\t\t\t\t\t<meta name="description" content="">\n\n\t\t\t\t\t<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500|Material+Icons">\n\n\t\t\t\t\t'+(ee?'<link rel="stylesheet" href="'+ee+'">':"")+t+'\n\t\t\t\t\t<script defer type="application/javascript" src="'+ne+'"><\/script>\n\t\t\t\t</head>\n\t\t\t\t<body>\n\t\t\t\t\t<div id="root"></div>\n\t\t\t\t</body>\n\t\t\t</html>',{collapseWhitespace:!0,removeComments:!0,minifyCSS:!0,minifyJS:!0}))}),oe=t(10),re=t.n(oe),ie=r.a.createServer(te);!function(e){var n=new re.a.Server({server:e,clientTracking:!0});function t(){this.isAlive=!0}n.on("connection",function(e,o){x("New client connected."),e.isAlive=!0,e.on("pong",t),setInterval(function(){n.clients.forEach(function(e){if(!1===e.isAlive)return delete m[e.room],e.terminate();e.isAlive=!1,e.ping(function(){})})},3e4),f(o,{},function(){var n=e.room=o.session.room;e.role=o.session.role,m[n]||(m[n]=[]),m[n].push(e)}),e.on("message",function(n){x("Received Message from "+e.id+":"+n.type),m[e.room]&&m[e.room].forEach(function(t){t.send&&t!==e&&t.send(n)})}),e.on("close",function(){delete m[e.room]})})}(ie);ie.listen("3000",function(e){e&&console.log(e),console.log("Server started at 127.0.0.1:3000.\n")})},function(e){e.exports={client:{js:"/static/js/bundle.d9704c9e.js"}}},function(e,n){e.exports=require("react-dom/server")},function(e,n,t){e.exports=t(17)}]);