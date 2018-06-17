import session from 'express-session';

export const sessionParser = session({
  saveUninitialized: false,
  secret: '$eCuRiTy',
  resave: false
});

export const rooms = {};
