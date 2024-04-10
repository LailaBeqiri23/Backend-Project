import "./config.js";
import mongoose from "mongoose";

const connectDb = async () => {

  try {
    await mongoose.connect(process.env.URI);
    console.log(`DB connected `);
  } catch (error) {
    console.log(error);
  }
};

 connectDb();





