import axios from 'axios';

const url = 'http://localhost:8000';

export const addUser = async (data)=>{
    try{
        console.log("api data",data);
        let status = await axios.post(`${url}/signup`,data);
        return status;

    }catch(error){
        console.log("an error occured api.js addUser",error);
        let status={
            data:{
                success:false
            }
        }
        return status;
    }
}
export const getUser = async (data) =>{
    try{
        const response = await axios.get('${url}/login',data);
        return response;
    }catch(error){
        console.log("an error occured api.js getUser");
    }
}
export const userDetails = async (data)=>{
    try{
        await axios.post('${url}/userDetails',{
            headers:{
                'auth-token':data,
            }
        })
    }catch(error){
        console.log("an error occured api.js userDetails");
    }
}