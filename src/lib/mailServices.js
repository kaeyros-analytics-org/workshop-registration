// var nodemailer = require("nodemailer");
import nodemailer from "nodemailer"; 
//-----------------------------------------------------------------------------
export async function sendingEmail(subject, toEmail, otpText) {
    const smtpOptions = {
        // host: "mxe8ae.netcup.net", 
        port: 587, 
        host: 'smtp.ionos.de', // smtp.ionos.de // entering here the right hostprovider
        provider: 'ionos',      //  ionos // this can be remove, it is optional
        // port: 465,
        secure: false, 
        auth: {
            user: "test@kaeyros-analytics.de",
            pass: "@@Test$$",
        },
    }

    const transporter = nodemailer.createTransport({ ...smtpOptions, });

    console.log("IN THE CONFIG FILE: ", toEmail)

    var mailOptions = {
        to: "test@kaeyros-analytics.de", 
        from: toEmail, 
        subject: subject,
        text: otpText,
    };

    const mailresponse = await transporter.sendMail(mailOptions); 
    return (mailresponse); 
}




export async function sendingEmailToClient(subject, toEmail, otpText) {

    const smtpOptions = {
        host: "mxe8ae.netcup.net", 
        port: 587, 
        // host: 'smtp.ionos.de', // smtp.ionos.de // entering here the right hostprovider
        // provider: 'ionos',      //  ionos // this can be remove, it is optional
        // port: 465,
        secure: false, 
        auth: {
            user: process.env.NODEMAILER_EMAIL,
            pass: process.env.NODEMAILER_PW,
            // user: "test@kaeyros-analytics.de",
            // pass: "@@Test$$",
        },
    }

    const transporter = nodemailer.createTransport({ ...smtpOptions, });

    console.log("IN THE CONFIG FILE: ", toEmail)

    var mailOptions = {
        to: toEmail, 
        from: process.env.NODEMAILER_EMAIL, 
        // from: "test@kaeyros-analytics.de", 
        subject: `Empfangsbestätigung ${subject}`, 
        text: otpText, 
    };

    // var mailOptionsCC = {
    //     to: toEmail, 
    //     from: process.env.NODEMAILER_EMAIL, 
    //     subject: `Empfangsbestätigung ${subject}`, 
    //     text: `Sehr gehrrte Damen und Herren,\n Wir haben ihre Kontakt Anfrage bekommen und werden uns schneller wie möglich zuruckmelden.\n Viele Gruesse.\n Ihr Festivalteam`, 
    // };

    const mailresponse = await transporter.sendMail(mailOptions); 
    // const mailresponseCC = await transporter.sendMail(mailOptionsCC); 
    return (mailresponse); 
}





// export async function sendingEmail(subject, toEmail, otpText) {

//     // const smtpOptions = {
//     //     host: "smtp.mailtrap.io", 
//     //     port: 2525, 
//     //     secure: false, 
//     //     auth: {
//     //         user: process.env.NODEMAILER_EMAIL,
//     //         pass: process.env.NODEMAILER_PW,
//     //     },
//     // }

//     const smtpOptions = {
//         // host: "smtp.gmail.com", 
//         host: "mxe8ae.netcup.net", 
//         port: 587, 
//         secure: false, 
//         // from: process.env.NODEMAILER_EMAIL, 
//         auth: {
//             user: process.env.NODEMAILER_EMAIL,
//             pass: process.env.NODEMAILER_PW,
//         },
//     }

//     const transporter = nodemailer.createTransport({ ...smtpOptions, });

//     console.log("IN THE CONFIG FILE: ", toEmail)

//     var mailOptions = {
//         // from: process.env.NODEMAILER_EMAIL, 
//         // to: toEmail,
//         to: process.env.NODEMAILER_EMAIL, 
//         from: toEmail, 
//         subject: subject,
//         text: otpText,
//     };

//     // var mailOptionsCC = {
//     //     // from: process.env.NODEMAILER_EMAIL, 
//     //     // to: toEmail,
//     //     to: toEmail, 
//     //     from: process.env.NODEMAILER_EMAIL, 
//     //     subject: `Empfangsbestätigung ${subject}`, 
//     //     text: `Sehr gehrrte Damen und Herren,\n Wir haben ihre Kontakt Anfrage bekommen und werden uns schneller wie möglich zuruckmelden.\n Viele Gruesse.\n Ihr Festivalteam`, 
//     // };

//     const mailresponse = await transporter.sendMail(mailOptions); 
//     const mailresponseCC = await transporter.sendMail(mailOptionsCC); 
//     return (mailresponse && mailresponseCC); 
// }