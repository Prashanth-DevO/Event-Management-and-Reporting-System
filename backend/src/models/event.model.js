import mongoose , { Schema } from "mongoose";

const CoordinatorSchema = new Schema({
    name: {
        type:String,
        required:true,
        trim:true
    },
    contactNumber: {
        type: String,
        required:true
    }
})


const participantsSchema = new Schema({
    name: {
        type:String,
        required:true,
        trim:true
    },
    email: {
        type:String,
        required:true,
        trim:true
    },
    registrationNumber: {
        type:String,
        required:true,
        trim:true
    }
})
    

const eventSchema = new Schema({
    eventName: {
        type: String,
        required: true,
        trim: true
    },
    clubName: {
        type: String,
        required: true,
        trim: true
    },
    startDate: {
        type: Date,
        required:true
    },
    endDate: {
        type:Date,
        required:true,
        validate: {
            validator: function(value) {
                return value >=this.startDate;
            }
        }
    },
    coordinator: {
        type:[CoordinatorSchema],
        required:true
    },
    adminUser:{
        type: String,
        required: true,
        trim: true
    },
    venue:{
        type:String,
        required:true,
        trim:true
    },
    participants:{
        type: [participantsSchema]
    }
})

export const Event = mongoose.model("Event", eventSchema);
