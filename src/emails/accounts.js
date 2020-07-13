const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const signUp = (email, name) => {
    sgMail.send({
        to: email,
        from: 'jlprogrammer_@outlook.com',
        subject: `Welcome!`,
        text: `Welcome to the Task App, ${name}!`,
    })
}

const deleteAcc = (email, name) => {
    sgMail.send({
        to: email,
        from: 'jlprogrammer_@outlook.com',
        subject: `Goodbye ${name}...`,
        text: 'Before you leave, why not tell us why?'
    })
}

module.exports = {
    signUp,
    deleteAcc
}