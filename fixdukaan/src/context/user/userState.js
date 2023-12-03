import React, { useState,useEffect } from 'react';
import userContext from './userContext';

const UserState = (props) => {
    const [user_JWT, setUserJWT] = useState("");
    const [userId, setUserId] = useState("");
    const [Alertmsg,setAlertmsg] = useState("");
    const [Alerttitle,setAlerttitle] = useState("");
    const [AlertSev,setAlertSev] = useState("");
    const [found,setfound] = useState(false);
    useEffect(()=>{
        if(user_JWT !==""){
            setfound(true);
        }
    },[user_JWT])

    return (
        <userContext.Provider value={{setfound,found,AlertSev,setAlertSev,setAlerttitle,Alertmsg,setAlertmsg,Alerttitle, user_JWT, setUserJWT, userId, setUserId }}>
            {props.children}
        </userContext.Provider>
    );
}

export default UserState;
