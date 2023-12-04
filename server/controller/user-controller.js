import User from '../models/User.js'
import { validationResult } from 'express-validator';
// const bcrypt = require('bcryptjs');
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
const JWT_SEC = "ss11666665@123"

export const addUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.array());
        return res.status(400).json({ errors: errors.array() })
    } else {
        try {
            // console.log("user controller",req.body);
            let exist = await User.findOne({ Phone_Number: req.body.Phone_Number });
            if (exist) {
                return res.status(200).json({ msg: 'user already exists' });
            }
            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.Password, salt);
            // const newUser = new User(req.body);
            // await newUser.save();
            const user = await User.create({
                First_name: req.body.First_name,
                Last_name: req.body.Last_name,
                Phone_Number: req.body.Phone_Number,
                Email: req.body.Email,
                Country: req.body.Country,
                State: req.body.State,
                City: req.body.City,
                Zipcode: req.body.Zipcode,
                Address: req.body.Address,
                // Password: req.body.Password
                Password: secPass,
                Type:req.body.Type
            })
            const data = {
                user:{
                    id:user.id
                }
            }
            const authtoken = jwt.sign(data,JWT_SEC)
            // return res.status(200).json({ msg: 'new user added' });
            res.status(200).json({"authtoken":authtoken,success:true});
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ msg: 'error occures user controller addUser',success:false })
        }
    }
}

export const getUser = async (req, res) => {
    try {
        // console.log("usercontroller",req.body)
        const user = await User.findOne({ Phone_Number: req.body.Phone_Number });
        if(!user){
            return res.status(400).json({error:"please enter correct credentials", "authtoken":false,"userId":false,"success":false});
        }
        // return res.status(200).json(user);
        const PassComp = await bcrypt.compare(req.body.Password,user.Password);
        if(!PassComp){
            return res.status(400).json({error:"please enter correct credentials", "authtoken":false,"userId":false,"success":false});
        }
        const data = {
            user:{
                id:user.id
            }
        }
        const authtoken = jwt.sign(data,JWT_SEC)
        // console.log("success");
        res.status(200).json({"authtoken":authtoken,"userId":user.id,"success":true});
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: 'error while fatching user getUser user-controller', "authtoken":false,"userId":false,"success":false});
    }
}

export const userDetails = async (req,res) =>{
    try{
        const userId = req.user.id;
        const user = await User.findById(userId).select("-Password");
        res.send(user)
    }catch(error){
        res.status(500).send("internal server error");
    }
}