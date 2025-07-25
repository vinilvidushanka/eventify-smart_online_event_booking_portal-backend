import mongoose from "mongoose";

const EventModel = new mongoose.Schema({
    "id":{
        type: Number,
        required: true,
        unique: true,
        index: true
    },
    "title":{
        type: String,
        required: true
    },
    "description":{
        type: String,
        required: true
    },
    "price":{
        type: Number,
        required: true
    },
    "image":{
        type: String,
        required: true
    },
    "currency":{
        type: String,
        required: true
    },
    "venue":{
        type: String,
        required: true
    },
    "date":{
        type: String,
        required: true
    },
    "time":{
        type: String,
        required: true
    }
});

const Event = mongoose.model("Event",EventModel);
export default Event