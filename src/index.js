import http from 'http';
import server from './server';
import ws from './server/ws';

const mainServer = http.createServer(server);
ws(mainServer);

let currentApp = server;

mainServer.listen(process.env.PORT, error => {
  if (error) {
    console.log(error);
  }

  console.log(
    'Server started at ' + process.env.HOST + ':' + process.env.PORT + '.\n'
  );
});

if (module.hot) {
  console.log('✅  Server-side HMR Enabled!');

  module.hot.accept('./server/ws', () => {
    console.log('🔁  HMR Reloading `./server/ws`...');
  });
  module.hot.accept('./server', () => {
    console.log('🔁  HMR Reloading `./server`...');
    server.removeListener('request', currentApp);
    const newApp = require('./server').default;
    server.on('request', newApp);
    currentApp = newApp;
  });
}
