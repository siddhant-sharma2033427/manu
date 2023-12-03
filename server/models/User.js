import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    First_name:{
        type:String,
        required:true
    },
    Last_name:{
        type:String,
        required:true
    },
    Phone_Number:{
        type: Number,
        required:true
    },
    Email:{
        type:String,
        required:true
    },
    Country:{
        type:String,
        required:true
    },
    State:{
        type:String,
        required:true
    },
    City:{
        type:String,
        required:true
    },
    Zipcode:{
        type:Number,
        required:true
    },
    Address:{
        type:String,
        required:true
    },
    Password:{
        type: String,
        required:true
    },
    Type:{
        type:String,
        enum : ['Customer','Shopeowner']
    },
    Orders:{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Orders"
    }


})
const User = mongoose.model('User',userSchema);
export default User;