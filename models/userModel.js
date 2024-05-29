const mongoose = require('mongoose');
const validator = require('validator');

// schema
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true, 'Name is Required']
    },
    lastName: {
        type:String
    },
    email:{
        type:String,
        required:[true, 'Email is Required'],
        unique: true,
        validate: validator.isEmail
    },
    password:{
        type:String,
        required: [true, 'password is Required']
    },
    location:{
        type:String,
        default: 'Pakistan'
    }
},{timestamps: true})

module.exports = mongoose.model("User", userSchema);   