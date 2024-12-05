import mongoose from "mongoose";
import { config } from "./config.js";

export const connectMongoDB = async () => {
  return mongoose.connect(config.mongodb.url);
};
