import mongoose, { Schema, Document } from 'mongoose';

export interface IBooking extends Document {
    hotelName: String,
    fromDate: String,
    toDate: String,
    description: String,
    price: Number,
    type: mongoose.Schema.Types.ObjectId
}

const offerSchema = new mongoose.Schema({
  hotelName: { type: String, required: true },
  fromDate: { type: String, required: true },
  toDate: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

export const Offer = mongoose.model('Offer', offerSchema);