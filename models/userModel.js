const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');

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
        required: [true, 'password is Required'],
        minlength:[6, 'Password length should be greater than 6 character']
    },
    location:{
        type:String,
        default: 'Pakistan'
    }
},{timestamps: true})

// middlewares
// userSchema.pre("save", async function(){ // save hone se pehle function execute karo, or psw encrypt karo
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
// })

// JSON Webtoken
userSchema.methods.createJWT = function(){
    return JWT.sign({userID:this._id}, process.env.JWT_SECRET, {expiresIn: '1d'})
}
module.exports = mongoose.model("User", userSchema);   