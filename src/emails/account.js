const sgMail=require('@sendgrid/mail')
const sendgridAPIKey=process.env.SENDGRID_API_KEY

sgMail.setApiKey(sendgridAPIKey)
const sendWelcomeEmail=(email,name)=>{
    sgMail.send({
        to:email,
        from:'dhruvbajoria80@gmail.com',
        subject:'Thanks for joining in!!',
        text:`Welcome to the app,${name}.Let me know how you are.`
    })
}


const cancelemail=(email,name)=>{
    sgMail.send({
        to:email,
        from:'dhruvbajoria80@gmail.com',
        subject:'Canceling the mail',
        text:`Hello ${name} why are you canceling`
    })
}
module.exports={
    sendWelcomeEmail,
    cancelemail
}
// sgMail.send({
//     to:'dhruvbajoria80@gmail.com',
//     from:'dhruvbajoria80@gmail.com',
//     subject:'This is my first creation',
//     text:'I hope this one actuallluyy get to you.'
// })