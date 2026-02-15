import { Event } from "../models/event.model.js";

const getEvents = async () => {
    const now = new Date();
    console.log("started the schedular");
    const next24Hours = new Date(now.getTime()+24 * 60 * 60 * 1000);
    const events = await Event.find({
        startDate: {
            $gte: now,
            $lte: next24Hours,
        }
    });
    return events;
}

export default getEvents;
