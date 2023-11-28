import mongoose from 'mongoose';

const DB_PASS='CUjaYDlHe29ngmFw'
const DB_USER='Owner';
const String= `mongodb+srv://${DB_USER}:${DB_PASS}@fixdukaandata.xtnjdpo.mongodb.net/fixdukaan?retryWrites=true&w=majority`
const Connection = async ()=>{
    try{
        await mongoose.connect(String)
        console.log("DB_connected");
    }catch(error){
        console.log("some error occured while connecting",error);
    }
}

export default Connection