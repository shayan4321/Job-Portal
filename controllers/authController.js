const { hashpassowrd, comparePassword } = require("../helpers/authHelper");
const userModel = require("../models/userModel")

const registerController = async (req,res, next) =>{
    try {
        const {name,email,password} = req.body
        //validate
        if(!name){
            next('Name is required'); // middleware error use kiya h.
        }
        if(!email){
            next('Email is required'); // middleware error use kiya h.
        }
        if(!password){
            next('Password is required and Greater Then 6 Charater'); // middleware error use kiya h.
        }
        const existingUser = await userModel.findOne({email})
        if(existingUser){
            next('Email Already Register Please Login'); // middleware error use kiya h.
        }
        // Register User
        const hashedPassword = await hashpassowrd(password)
        const user = await userModel.create({name,email, password: hashedPassword})
        // Token
        const token = user.createJWT()
        res.status(201).send({
            success: true,
            message: 'User Created Successfully',
            // user, agr user ki full detail show krwani h to pora variable pas karen gen, nhi to limited chezn b pas krwa sakte hn.
            user:{
                name: user.name,
                email: user.email,
                lastName: user.lastName,
                location: user.location
            },
            token
        })
    } catch (error) {
        next(error); // middleware error use kiya h.
    }
}

const loginController = async (req, res, next) =>{
    try {
        const {email, password} = req.body
        // Validation
        if(!email || !password){
            next('Please Provide All Fields')
        }
        //check user
        const user = await userModel.findOne({email}).select("+password"); // + password means hum ne usy hide kr dea jb login karen gen to for security purpose.
        
        if(!user){
            next('Invalid Username or Password');
        }
        const matchPassword = await comparePassword(password, user.password); // user.password means jo database m psw h usy compare karo.
        if(!matchPassword){
            next('Invalid Username or Password');
        }
        
        user.password = undefined; // undefined is liye kun k login k time psw show nhi krwana.
        // Token Create
        const token = user.createJWT()
        res.status(200).send({
            success: true,
            message: 'Login Successfully',
            user,
            token
        })
    } catch (error) {
        next(error);
    }
}

module.exports = {
    registerController,
    loginController
}