import nodemailer from "nodemailer";

const emailOlvidePassword = async (datos) => {
    const transporte = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        }
    });
    const{email, nombre, token} = datos;
    //enviar el email
    const info = await transporte.sendMail({
        from: "APV - Administrador de Pacientes de Veterinaria",
        to: email,
        subject: 'Reestablece tu Password',
        text: 'Reestablece tu Password',
        html: `<p>Hola: ${nombre}, Reestablece tu Password.</p>
        <p>Sigue el siguiente enlace para generar el nuevo password:
        <a href="${process.env.FRONTED_URL}/olvide-password/${token}">Reestablece tu Password AQUI</a></p>

        <p>Si tu no creaste esta cuenta, puedes ignorar este mensaje</p>
        
        `,
    });

    console.log("Mensaje enviado: %s", info.messageId)
}

export default emailOlvidePassword;