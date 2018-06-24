import { rooms } from './constants';

export default (req, res) => {
  let { roomName, role } = req.body;

  let room = rooms[roomName];

  if (!roomName || !role) {
    res.status(400).send('Parameters are not provided');
    return;
  } else if (!room) {
    res.status(200).send('Success!');
    return;
  } else if (Object.keys(room).length === 2) {
    res.status(412).send('This room is full');
    return;
  } else if (room[0].role === role) {
    res.status(409).send('The role in the room already exists');
    return;
  } else {
    res.status(201).send('Success!');
    return;
  }
};
