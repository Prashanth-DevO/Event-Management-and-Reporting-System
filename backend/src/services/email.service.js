import { addEmailJob } from "../util/email.queue.js";

const eventRegistrationEmail = async(user,event) => {
    try {
        const  email = user.email;
        const subject = `Successfully registered for the Event ${event.eventName}`;
        const html = `<p>Dear ${user.firstName}</p><br>
        <p>You are successfully registered for the event "${event.eventName}" which is conducted by the club "${event.clubName}"
        on ${event.startDate}</p>`;
        await addEmailJob( email , subject , html );
    }
    catch (error) {
        console.error("failed to send the email to the user");
    }
};

const registrationEmail = async(user) => {
    try {
        const email = user.email;
        const subject = `WelCome to the EventFlow`;
        const html = `<p>Dear ${user.firstName}</p><br>
        <p>You are successfully joined to the EventFlow . Now enjoy the events by registering them</p>`;
        await addEmailJob(email , subject , html);
    }
    catch (error) {
        console.error("failed to send the registration email to user");
    }
}

export { eventRegistrationEmail , registrationEmail};

