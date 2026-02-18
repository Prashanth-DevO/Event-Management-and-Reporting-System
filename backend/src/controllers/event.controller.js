import { Event } from "../models/event.model.js";
import { eventRegistrationEmail } from "../services/email.service.js";

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
        const { club , venue , search , sort , pageNo, limit} = req.body;
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
        const events =await data.skip((pageNo-1)*limit).limit(limit);
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
            res.status(400).json({message: "already registerd bro!!!!!"});
            return;
        }
        event.participants.push({
            name:user.firstName,
            email:user.email,
            payment:"unpaid"
        })

        await event.save();
        await eventRegistrationEmail(user , event);
        res.status(200).json({ message: "Successfully added in event List"});
    }
    catch (error){
        res.status(500).json({ message: "Server Error from registerEvent", error: error.message });
    }
}

const deleteEvent = async(req,res) => {
    try {
        const eventId = req.body.eventId;
        if(!eventId){
            res.status(400).json({message: "no eventId"})
            return;
        }
        const verify = await Event.findByIdAndDelete(eventId);
        if(!verify){
            res.status(404).json({message:"Event not fount"});
        }
        res.status(200).json({message: "Event deleted successfully"});
    }
    catch (error) {
        res.status(500).json({ message: "Server Error from deleteEvent", error: error.message });
    }
}

const eventMenuDetails = async(req,res) => {
    try {
        const clubSet = new Set();
        const venueSet = new Set();
        const events = await Event.find({});
        let count =0;
        events.forEach(event => {
            count++;
            clubSet.add(event.clubName);
            venueSet.add(event.venue);
        })
        res.status(200).json({ count, clubset: Array.from(clubSet) , venueset: Array.from(venueSet) });
    }
    catch (error) {
        res.status(500).json({ message: "Server Error from eventMenuDetails", error: error.message });
    }
}

export { createEventAdmin , eventsFetchAdmin , eventMenu , registerEvent , deleteEvent , eventMenuDetails };