import mongoose, { mongo } from "mongoose";

const hotelSchema = new mongoose.Schema({
    name: {type: String, required: true},
    location: {type: String, required: true},
    description: {type: String},
    services: {type: String},
    image: {type: String}
});

export const Hotel = mongoose.model("Hotel", hotelSchema);