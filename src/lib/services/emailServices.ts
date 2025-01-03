import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})

export async function sendMail () {
    // to: string, subject: string, content: string, html?: string
    console.log(process.env.EMAIL_USER);
    console.log("hehehey");
    try {
        const info = await transporter.sendMail({
            from: `Kahwin.my <${process.env.EMAIL_USER}`,
            to: "imananuar5367@gmail.com",
            subject: "Testing",
            html: "<h1>Testing la wahai Iman</h1>"
        })

        console.log('Email sent: ', info.messageId)
        return info;
    } catch (error) {
        throw error;
    }
}