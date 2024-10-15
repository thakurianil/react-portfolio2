import mongoose from "mongoose"


const uri =  "mongodb://localhost:27017/ntd-API"

export const mongoDBconnection = ()=>{

    try {
        mongoose.connect(uri)
console.log("Db connected with mongoo");
        
    } catch (error) {
        console.log(error.message);
        
        
    }
}