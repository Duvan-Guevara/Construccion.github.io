const nodemailer = require("nodemailer");

if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.error("❌ Faltan variables EMAIL_USER o EMAIL_PASS");
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

exports.sendRecoveryEmail = async (to, link) => {
  try {
    const mailOptions = {
      from: `"Soporte Marketplace" <${process.env.EMAIL_USER}>`,
      to,
      subject: "Recuperación de contraseña",
      html: `
        <h2>Recuperación de contraseña</h2>
        <p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
        <a href="${link}">${link}</a>
        <p>Este enlace expira en 1 hora.</p>
      `
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("✅ Correo enviado:", info.messageId);

    return info;

  } catch (error) {
    console.error("❌ ERROR ENVIANDO CORREO:", error);
    throw error;
  }
};