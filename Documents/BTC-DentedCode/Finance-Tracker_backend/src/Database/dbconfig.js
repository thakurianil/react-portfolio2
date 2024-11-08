import mongoose from 'mongoose';

const uri = process.env.ROOT_ENV_URI;

export const MongoDbUrl = () =>{
    try {
        mongoose.connect(uri);
        console.log("Database Connected");
        
    } catch (error) {
        console.log("Database error", error.message);
    }
}