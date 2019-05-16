const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const http = require('http');
const url = require('url');
const WebSocket = require('ws');
const server = http.createServer(app);

const PORT = 3000;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('port', PORT);
server.listen(PORT);

/* GET home page. */
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/:role/:room/', (req, res, next) => {
  let room = req.params.room;
  let role = req.params.role;

  let clientsInRoom = 0;
  let clientsWithSameRole = 0;
  wss.clients.forEach(el => {
    if (el.room === room) {
      clientsInRoom++;
      if(el.role === role) clientsWithSameRole++;
    }
  });

  if(clientsInRoom > 1) {
    // room is full
    res.redirect("/?full");
  } else if(clientsWithSameRole > 0) {
    // role exists
    res.redirect("/?exists");
  } else {
    res.render('room', { room, role, isFirst: clientsInRoom===0 });
  }
});

const wss = new WebSocket.Server({
  server,
  clientTracking: true
});


wss.on('connection', (ws, req) => {
  let {room, role} = url.parse(req.url, true).query;
  ws.room = room;
  ws.role = role;
  ws.isAlive = true;

  ws.on('pong', () => { ws.isAlive = true });

  setInterval(function ping() {
    wss.clients.forEach(function each(ws) {
      if (ws.isAlive === false) {
        return ws.terminate();
      }

      ws.isAlive = false;
      ws.ping(() => {});
    });
  }, 30000);

  ws.on('message', (msg) => {
    let message = JSON.parse(msg);
    if(message === 'disconnect') ws.terminate();
    // Send message to a channel
    wss.clients.forEach(el => {
      if (el.send && el !== ws && el.room === ws.room) {
        el.send(msg);
      }
    });
  });
});
