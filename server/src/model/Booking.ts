import mongoose, { Schema, Document } from 'mongoose';

export interface IBooking extends Document {
    hotelName: String;
    fromDate: String;
    toDate: String;
    description: String;
    price: Number;
}

const BookingSchema = new Schema<IBooking>({
    hotelName: {type: String, required: true},
    fromDate: { type: String, required: true },
    toDate: { type: String, required: true },
    description: {type: String, required: true},
    price: {type: Number, required: true}
  }
);

export default mongoose.model<IBooking>('Booking', BookingSchema);
