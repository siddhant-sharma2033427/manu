import express from 'express'
import {addUser,getUser,userDetails} from '../controller/user-controller.js'
import {placeOrder,getOrders} from '../controller/order-controller.js'
import {addProduct,getAllProducts} from '../controller/product-controller.js'
import {body} from "express-validator"
import fetchUser from "../middleware/fetchUser.js"
const route = express.Router();

//user routes
route.post('/signup',[
    body('First_name',"name is required").isLength({min:3}),
    body('Phone_Number',"phone number is required").isLength({min:10,max:10}),
    body('Country',"country required").exists(),
    body('State',"state required").exists(),
    body('City',"city required").exists(),
    body('Address',"address required").exists().isLength({min:5}),
    body('Email',"email required").exists(),
    body('Password',"passowrd required").matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()-_+=<>?]).{8,}$/)
],addUser);
route.get('/login',getUser);
route.post('/getUser',fetchUser,userDetails);


//order routes
route.post('/user/Order',placeOrder);
route.get('/user/getOrder/:userId',getOrders);



//Product Routes
route.post('/admin/product',addProduct);
route.get('/product/products',getAllProducts);

export default route