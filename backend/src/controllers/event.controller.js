import { Event } from "../models/event.model.js";
import { eventRegistrationEmail } from "../services/email.service.js";

const createEventAdmin = async (req,res) => {
    try {
        const { eventName, clubName, startDate, endDate, coordinator, venue } = req.body;
        const user = req.user;
 
        const existingEvent = await Event.findOne({ eventName, startDate });
        if(existingEvent){
            return res.status(400).json({ success: false, message: "Event already exists with this name and start date" });
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
        console.error("createEventAdmin error:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

const eventsFetchAdmin= async (req, res) => {
    try {
        const user = req.user;
        const events = await Event.find({ adminUser: user.firstName });
        res.status(200).json(events);

    }
    catch (error) {
        console.error("eventsFetchAdmin error:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

const eventMenu= async(req,res) => {
     try {
        const filter = {};
        const { club , venue , search , sort , pageNo, limit, eventId} = req.body;
        if(eventId){
            const event = await Event.findById(eventId);
            if(!event){
                res.status(404).json({ success: false, message: "Event not found" });
                return;
            }
            res.status(200).json(event);
            return;
        }
        else {
            if(club!=="All Clubs"){
                filter.clubName=club;
            }
            if(venue!=="All Venues"){
                filter.venue = venue;
            }
            if(search!==""){
                filter.eventName ={ $regex :search , $options: "i" };
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

      }
      catch (error){
          console.error("eventMenu error:", error);
          res.status(500).json({ success: false, message: "Server Error" });
      }
}

const registerEvent = async(req,res) => {
    try {
        const eventId = req.body.eventId;
        const user = req.user;
        if(!eventId){
            res.status(400).json({ success: false, message: "Missing eventId" })
            return;
        }
        if(!user){
            res.status(400).json({ success: false, message: "User not found" })
            return;
        }
        const event = await Event.findById(eventId);
        const exists = event.participants.find(
            p => p.email === user.email
        );
        if(exists){
            res.status(400).json({ success: false, message: "User already registered for this event" });
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
        console.error("registerEvent error:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

const deleteEvent = async(req,res) => {
    try {
        const eventId = req.body.eventId;
        if(!eventId){
            res.status(400).json({ success: false, message: "Missing eventId" })
            return;
        }
        const verify = await Event.findByIdAndDelete(eventId);
        const userName = req.user.firstName;
        if(!verify.adminUser === userName){
            res.status(403).json({ success: false, message: "You are not authorized to delete this event" });
            return;
        }
        if(!verify){
            res.status(404).json({ success: false, message: "Event not found" });
            return;
        }
        res.status(200).json({ message: "Event deleted successfully" });
    }
    catch (error) {
        console.error("deleteEvent error:", error);
        res.status(500).json({ success: false, message: "Server Error" });
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
        console.error("eventMenuDetails error:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

const eventsSearch = async(req,res) => {
    try {
        const search = req.body.search;
        if(!search){
            return res.status(200).json({message: "No search query provided"});
        }
        const events = await Event.find({ eventName: { $regex: search, $options: "i" } });
        let result = [];
        events.forEach(event => {
            result.push(event.eventName);
        })
        res.status(200).json(result);
    }
    catch (error) {
        console.error("eventsSearch error:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}
export { createEventAdmin , eventsFetchAdmin , eventMenu , registerEvent , deleteEvent , eventMenuDetails ,eventsSearch};