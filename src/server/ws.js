import WebSocket from 'ws';
import { rooms, sessionParser } from './constants';
import { log } from './utils';

export default server => {
  const wss = new WebSocket.Server({
    server,
    clientTracking: true
  });

  function heartbeat() {
    this.isAlive = true;
  }

  wss.on('connection', function(ws, req) {
    log('New client connected.');

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

    sessionParser(req, {}, () => {
      let room = (ws.room = req.session.room);
      ws.role = req.session.role;
      if (!rooms[room]) rooms[room] = [];
      rooms[room].push(ws);
    });

    ws.on('message', function(message) {
      log('Received Message from ' + ws.id + ':' + message.type);
      // Send message to a channel
      if (rooms[ws.room])
        rooms[ws.room].forEach(el => {
          if (el.send && el !== ws) {
            el.send(message);
          }
        });
    });

    ws.on('close', () => {
      delete rooms[ws.room];
    });
  });
};
