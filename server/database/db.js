import mongoose from "mongoose";

//DataBase connection by Async And await
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connection successfully");
  } catch (error) {
    console.log(error.message);
  }
};
export default connectDB;
