import WebSocket from 'ws';
import { rooms } from './constants';
import url from 'url';

export default server => {
  const wss = new WebSocket.Server({
    server,
    clientTracking: true
  });

  function heartbeat() {
    this.isAlive = true;
  }

  wss.on('connection', function(ws, req) {
    ws.isAlive = true;
    ws.on('pong', heartbeat);

    setInterval(function ping() {
      wss.clients.forEach(function each(ws) {
        if (ws.isAlive === false) {
          delete rooms[ws.room];
          return ws.terminate();
        }

        ws.isAlive = false;
        ws.ping(() => {});
      });
    }, 30000);

    let {room, role} = url.parse(req.url, true).query;
    ws.room = room;
    ws.role = role;
    if (!rooms[room]) rooms[room] = [];
    rooms[room].push(ws);

    ws.on('message', function(message) {
      // Send message to a channel
      if (rooms[ws.room]) {
        rooms[ws.room].forEach(el => {
          if (el.send && el !== ws) {
            console.log(JSON.stringify(message));
            el.send(message);
          }
        });
      }
    });

    ws.on('close', () => {
      delete rooms[ws.room];
    });
  });
};
