import mongoose, { Schema, Document } from 'mongoose';

interface IDestination extends Document {
  name: string;
  budget: string;
  travelDates: string;
  preferences: string;
  bestDeals: number; // Rank or rating field
  bestTimeToVisit: string;
  imageUrl: string;
  isPopular: boolean;
}

const DestinationSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  budget: {
    type: String,
    required: true,
  },
  travelDates: {
    type: String,
    required: true,
  },
  preferences: {
    type: String,
    required: true,
  },
  bestDeals: {
    type: Number,
    required: true,
  },
  bestTimeToVisit: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  isPopular: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model<IDestination>('Destination', DestinationSchema);
