import axios from 'axios';

const url = 'http://localhost:8000';

export const addUser = async (data) => {
    try {
        console.log("api data", data);
        let status = await axios.post(`${url}/signup`, data);
        return status;

    } catch (error) {
        console.log("an error occured api.js addUser", error);
        let status = {
            data: {
                success: false
            }
        }
        return status;
    }
}
export const userLogin = async (data) => {
    try {
        const response = await axios.post(`http://localhost:8000/login`, data);
        return response;
    } catch (error) {
        console.log("an error occured api.js getUser", error);
    }
}
export const userDetails = async (data) => {
    try {

        let user = await axios.get(`http://localhost:8000/getUser`, {
            headers: {
                'auth-token': data,    
            }
        })
        return user; 
    } catch (error) {
        if (error.response) {
            // The request was made, but the server responded with an error
            console.error('Server responded with an error:', error.response.data);
        } else if (error.request) {
            // The request was made, but no response was received
            console.error('No response received from the server');
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error setting up the request:', error.message);
        }
    }
}
export const getOrders = async(data)=>{
    try{
        console.log(data)
        const orders = await axios.get(`${url}/user/getOrder/${data}`)
        return orders;
    }catch(error){
        if (error.response) {
            // The request was made, but the server responded with an error
            console.error('Server responded with an error:', error.response.data);
        } else if (error.request) {
            // The request was made, but no response was received
            console.error('No response received from the server');
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error setting up the request:', error.message);
        }
    }
}

export const getProductDetails = async(data)=>{
    try {
        const data2 = await axios.post(`${url}/produect/getProduct`,data);
        console.log("api data",data2);
        return data2;
    } catch(error){
        if (error.response) {
            // The request was made, but the server responded with an error
            console.error('Server responded with an error:', error.response.data);
        } else if (error.request) {
            // The request was made, but no response was received
            console.error('No response received from the server');
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error setting up the request:', error.message);
        }
    }
}

export const getAllProduct = async(req,res) =>{
    try {
        const data = await axios(`${url}/product/products`);
        return data;
    } catch(error){
        if (error.response) {
            // The request was made, but the server responded with an error
            console.error('Server responded with an error:', error.response.data);
        } else if (error.request) {
            // The request was made, but no response was received
            console.error('No response received from the server');
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error setting up the request:', error.message);
        }
    }
}

export const placeOrder = async(data)=>{
    let exists
    try {
        exists = await axios.post(`${url}/user/findUser`,data);
        console.log(exists);
    }catch(error){
        exists = {
            data:{
                success:false
            }}
        if (error.response) {
            // The request was made, but the server responded with an error
            console.error('Server responded with an error:', error.response.data);
        } else if (error.request) {
            // The request was made, but no response was received
            console.error('No response received from the server');
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error setting up the request:', error.message);
        }
    }
    // console.log("inside api",exists.data.success);
        if(exists.data.success){
            try{
            const update = await axios.put(`${url}/user/updateOrder`,data);
            return update.data;
            }catch(error){
                if (error.response) {
                    // The request was made, but the server responded with an error
                    console.error('Server responded with an error:', error.response.data);
                } else if (error.request) {
                    // The request was made, but no response was received
                    console.error('No response received from the server');
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.error('Error setting up the request:', error.message);
                }
            }
        }else{
            try{
            const placeOrder = await axios.post(`${url}/user/Order`,data);
            return placeOrder.data;
            }catch(error){
                if (error.response) {
                    // The request was made, but the server responded with an error
                    console.error('Server responded with an error:', error.response.data);
                } else if (error.request) {
                    // The request was made, but no response was received
                    console.error('No response received from the server');
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.error('Error setting up the request:', error.message);
                }
            }
        }
        
    }