import dotenv from 'dotenv';
dotenv.config();


export default {
  port: process.env.PORT || 3000,
  mongoURL: process.env.MONGO_URL,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpires: process.env.JWT_EXPIRES || '1h',
  mail: {
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT || 587),
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  },
  frontendURL: process.env.FRONTEND_URL || 'http://localhost:3000'
};
