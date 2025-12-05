import nodemailer from 'nodemailer';
import config from "../config/index.js";


const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST || 'smtp.gmail.com',
  port: process.env.MAIL_PORT ? Number(process.env.MAIL_PORT) : 587,
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

export async function sendRecoveryMail(to, link) {
  const html = `<p>Hacé clic en el botón para restablecer tu contraseña. El link expira en una hora.</p>
    <a href="${link}"><button>Restablecer contraseña</button></a>`;
  return transporter.sendMail({
    from: process.env.MAIL_USER,
    to,
    subject: 'Restablecer contraseña',
    html
  });
}
