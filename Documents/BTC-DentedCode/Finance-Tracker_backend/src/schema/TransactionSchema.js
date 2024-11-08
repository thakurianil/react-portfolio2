import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
    userId :{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    type:{
        type: String,
        required: true,
    },
    amount:{
        type: Int16Array,
        required: true,

    },
    description:{
        type: String,
        required: true,
    },
    Date: {
        type: Date,
        default: Date.now(),
      },
},
{
    timestamps:true
}
)


export default mongoose.model("Transaction", TransactionSchema);