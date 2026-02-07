import { Event } from "../models/event.model.js";

const createEventAdmin = async (req,res) => {
    try {
        const { eventName, clubName, startDate, endDate, coordinator, adminUser , venue } = req.body;
 
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
            adminUser,
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
        const adminUser = req.query.adminUser;
        const events = await Event.find({ adminUser: adminUser });
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


export { createEventAdmin , eventsFetchAdmin , eventMenu };