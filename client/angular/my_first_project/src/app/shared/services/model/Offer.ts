/*export interface Booking{
    userId: string;
    offerId: string;
    hotelName: string;
    fromDate: Date;
    toDate: Date;
    description: string;
    price: string;
}*/

export interface Offer{
  hotelName: { type: string, required: true },
  fromDate: { type: string, required: true },
  toDate: { type: string, required: true },
  description: { type: string },
  price: { type: number, required: true },
  userId: { type: string }
};