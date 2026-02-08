import { Event } from "../models/event.model.js";

const createEventAdmin = async (req,res) => {
    try {
        const { eventName, clubName, startDate, endDate, coordinator, venue } = req.body;
        const user = req.user;
 
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
            adminUser:user.firstName,
            venue
        })
        await newEvent.save();
        res.status(201).json({message: "Event created successfully"});

    }
    catch (error) {
        res.status(500).json({ message: "Server Error 1", error: error.message });
    }
}

const eventsFetchAdmin= async (req, res) => {
    try {
        const user = req.user;
        const events = await Event.find({ adminUser: user.firstName });
        res.status(200).json(events);

    }
    catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}

const eventMenu= async(req,res) => {
     try {
        const filter = {};
        const { club , venue , search , sort } = req.body;
        if(club!=="All Clubs"){
            filter.clubName=club;
        }
        if(venue!=="All Venues"){
            filter.venue = venue;
        }
        if(search!==""){
            filter.eventName = search;
        }
        let data = Event.find(filter);
        if(sort==="New"){
            data = data.sort({startDate:-1});
        }
        else if(sort==="Old"){
            data = data.sort({startDate : 1});
        }
        const events = await data;
        res.status(200).json(events);

     }
     catch (error){
        res.status(500).json({ message: "Server Error", error: error.message });
     }
}

const registerEvent = async(req,res) => {
    try {
        const eventId = req.body.eventId;
        const user = req.user;
        if(!eventId){
            res.status(400).json({message: "no eventId"})
            return;
        }
        if(!user){
            res.status(400).json({message: "No User"})
            return;
        }
        const event = await Event.findById(eventId);
        const exists = event.participants.find(
            p => p.email === user.email
        );
        if(exists){
            res.status(400).json({message: "already registerd bro!!!!!"})
        }
        event.participants.push({
            name:user.firstName,
            email:user.email,
            payment:"unpaid"
        })

        await event.save();
        res.status(200).json({ message: "Successfully added in event List"});
    }
    catch (error){
        res.status(500).json({ message: "Server Error from registerEvent", error: error.message });
    }
}
export { createEventAdmin , eventsFetchAdmin , eventMenu , registerEvent};