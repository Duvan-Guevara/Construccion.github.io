const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

exports.sendRecoveryEmail = async (to, link) => {
  const mailOptions = {
    from: `"Soporte" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Recuperación de contraseña",
    html: `
      <h2>Recuperación de contraseña</h2>
      <p>Haz clic en el siguiente enlace:</p>
      <a href="${link}">${link}</a>
      <p>Este enlace expira en 1 hora</p>
    `
  };

  await transporter.sendMail(mailOptions);
};