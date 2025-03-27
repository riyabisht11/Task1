const mongoose = require("mongoose");
const Schema = new mongoose.Schema(
    { 
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ["Pending", "Completed"],
            default: "Pending",
            
        },
        createdAt:{
            type: Date,
            default: Date.now,
        },
    }
)
module.exports = mongoose.model("Task", Schema);
