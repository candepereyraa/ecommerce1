import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import config from './index.js';
import User from '../models/User.js';

passport.use('login', new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
  try {
    const user = await User.findOne({ email });
    if (!user) return done(null, false, { message: 'User not found' });
    const valid = bcrypt.compareSync(password, user.password);
    if (!valid) return done(null, false, { message: 'Invalid password' });
    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));

passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtSecret
}, async (payload, done) => {
  try {
    const user = await User.findById(payload.id).lean();
    if (!user) return done(null, false);
    return done(null, user);
  } catch (err) {
    return done(err, false);
  }
}));
