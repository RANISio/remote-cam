import { log } from './utils';
import uuid from 'uuid';
import { rooms } from './constants';

export default (req, res) => {
  log(
    'Receied request to join with the following parameters: ' +
      JSON.stringify(req.body)
  );

  let { roomName, role } = req.body;

  let room = rooms[roomName];

  if (!roomName || !role) {
    log('Bad request received with incomplete paramters.');
    res.status(400).send('Parameters are not provided');
    return;
  } else if (!room) {
    const id = uuid.v4();
    req.session.userId = id;
    req.session.room = roomName;
    req.session.role = role;

    log('Creating room: ' + roomName);
    res.status(200).send('Success!');
    return;
  } else if (Object.keys(room).length === 2) {
    log('Received request to join full room');
    res.status(412).send('This room is full');
    return;
  } else if (room[0].role === role) {
    log('Received request to join room with conflicting role');
    res.status(409).send('The role in the room already exists');
    return;
  } else {
    log('Joining room: ' + roomName);
    res.status(201).send('Success!');
    return;
  }
};
