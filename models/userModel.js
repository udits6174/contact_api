import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: [true, "Please add contact name"]
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: [true, "Email already registered"],
        validate: {
            validator: function(v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: "Please enter a valid email"
        },
        required: [true, "Email required"]
    },
    password:{
        type: String,
        required: [true, "Please add password"]
    }
},
{
    timestamps: true
})

export default mongoose.model("User",userSchema);