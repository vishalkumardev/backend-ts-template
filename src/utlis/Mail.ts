import nodemailer from "nodemailer";

const sendMail = async (email: string, subject: string, html: string) => {
    console.log(subject + " " + html + email);
    let transport = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        auth: {
            user: "5060vishalkumar@gmail.com",
            pass: "gdeshnkwrjhyuyry",
        },
    });

    var mailOptions = {
        from: "ffhbeehive@gmail.com",
        to: `${email}`,
        subject: subject,

        html: html,
    };

    transport.sendMail(mailOptions, (error: any, info: any) => {
        if (error) {
            return error;
        }
        return true;
    });
};

export { sendMail };
