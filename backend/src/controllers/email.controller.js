import sendEmail from "../config/mail.js"

const sendEmailServices = async(req , res) => {
    try {
        const {toEmail , subject , message} = req.body;
        if(!toEmail || !subject || !message) {
            return res.status(400).json({message:"required all the data"});
        }
        await sendEmail(toEmail, subject, `<p>${message}</p>`)
        res.status(200).json({ message: "Email sent successfully" });
    }
    catch (error) {
        console.error("Mail error:", error.message);

        res.status(500).json({
            message: "Failed to send email",
        });
    }
}

export { sendEmailServices };