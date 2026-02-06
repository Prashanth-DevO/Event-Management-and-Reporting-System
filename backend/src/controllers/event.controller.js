import { Event } from "../models/event.model.js";

const createEvent = async (req,res) => {
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

const allEventsFetch = async(req,res) => {
    try {
         const AllEvents = await Event.find({});
         res.status(200).json(AllEvents);
    }
    catch (error) {
        res.status(500).json({message: "Server Failed to get all the events", error: error.message});
    }
}

const searchClub = async(req , res) => {
    try {
         const clubName = req.query.clubName;
         const events  =await Event.find({clubName:clubName});
         res.status(200).json(events);
    }
    catch (error) {
        res.status(500).json({message: "Server failed while fetch base on clubs", error: error.message});
    }
}

const searchVenue = async(req,res) =>{
    try {
        const venue = req.query.venueName;
        const events  =await Event.find({venue : venue});
        res.status(200).json(events);
    }
    catch(error) {
        res.status(500).json({message: "Server failed while fetch base on venues", error: error.message})
    }
}

const sortOld = async(req, res) =>{
    try {
       const events = await Event.find().sort({startDate: 1});
       res.status(200).json(events);

    }
    catch(error) {
        res.status(500).json({message: "Server failed while fetch base on sortOld", error: error.message});
    }

}

const sortNew = async(req , res) => {
    try {
        const events = await Event.find().sort({startDate: -1});
        res.status(200).json(events);
    }
    catch(error) {
         res.status(500).json({message: "Server failed while fetch base on sortNew", error: error.message});
    }

}

const searchEvent = async(req,res)=>{
    try{
        const eventName = req.query.eventName;
        const event =await Event.find({eventName:eventName});
        res.status(200).json(event);
    }
    catch(error){
        res.status(500).json({message: "Server failed while fetch base on search", error: error.message});
    }
}

export { createEvent , eventsFetch , allEventsFetch  , searchClub , searchVenue , sortOld , sortNew , searchEvent};