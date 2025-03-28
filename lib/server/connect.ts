import mongoose from "mongoose";

export const MONGODB_URI = 'mongodb+srv://asilbekt84:rD5vmMvHaHEC7qpT@cluster0.mjzji.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

const connectDB = async () => { 
  try {
    await mongoose.connect(MONGODB_URI, { 
      bufferCommands: false, // Buffering muammosini oldini oladi
      serverSelectionTimeoutMS: 50000,
    }); 
    return true;
  } catch (error) {
    console.log(error)
  }
}

export default connectDB;