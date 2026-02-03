import { Event } from "../models/event.model.js";

const createEvent = async (req,res) => {
    try {
        const { eventName, clubName, startDate, endDate, coordinator, adminUser } = req.body;

        const existingEvent = await Event.findOne({ eventName, startDate });
        if(existingEvent){
            alert("Event already exists with this name and start date");
            return res.status(400).json({message: "Event already exists with this name and start date"});
        }
        const newEvent = new Event({
            eventName,
            clubName,
            startDate,
            endDate,
            coordinator,
            adminUser
        })
        await newEvent.save();
        res.status(201).json({message: "Event created successfully"});

    }
    catch (error) {
        res.status(500).json({ message: "Server Error 1", error: error.message });
    }
}

const eventsFetch= async (req, res) => {
    try {
        const adminUser = req.query.adminUser;
        const events = await Event.find({ adminUser: adminUser });
        res.status(200).json(events);

    }
    catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}
export { createEvent , eventsFetch };