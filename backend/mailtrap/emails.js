import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js";
import { MailTrapClientSaved, sender } from "./mailtrap.config.js";

export const sendVerificationEmail = async (email , verificationToken) =>{

    const recipient = [{email}];

    try{
        const response = await MailTrapClientSaved.send({
            from:sender,
            to:recipient,
            subject : "Verify your email",
            html:VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}" ,verificationToken), 
            category:"Email Verfication"
        })

        console.log("Email send successfully" ,response)

    }catch(error){

        console.error('Error sending verification email ' ,error)

        throw new Error(`Error Sending verification email ${error}` )



    }

}
export const sendWelecomEmails = async (email , fullName) =>{

    const recpient = [{email}]

    try {
          const response =  await MailTrapClientSaved.send({
            from:sender,
            to:recpient,
            template_uuid:"99cd0098-c8dc-4630-aa08-dd5c0fe9514c",
            template_variables:{
                "company_info_nam" : "authentication users",
                "name": fullName
            }
        });

        console.log('welecom emails send successfully' , response)
        
    } catch (error) {
        console.error('Error sending welecom emails ' ,error)

        throw new Error(`Error sending welecom emails ${error}`)
        
    }

    
}
export const sendPasswordResetEmail = async (email ,resetURL) =>{

    const recipient = [{email}];

    try {
        const response = MailTrapClientSaved.send({
            from:sender,
            to:recipient,
            subject:"Reset your password",
            html:PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}" , resetURL),
            category:'Password Reset',

        })
    } catch (error) {
          
        console.error('Error sending welecom emails ' ,error)

        throw new Error(`Error sending welecom emails ${error}`)

        
    }


}
export const sendResetSucesseEmail = async (email) =>{

    const recipient = [{email}]

    try {
        const response = await MailTrapClientSaved.send({
            from:sender,
            to:recipient,
            subject:'Password reset successfully',
            html:PASSWORD_RESET_SUCCESS_TEMPLATE,
            category:'Reset password'
        })
        console.log('Password reset email sent successfully',response);

    } catch (error) {
        console.error('Error sending password reset success email' ,error)
        throw new Error(`Error sending password reset success email ${error}`)
    }
}