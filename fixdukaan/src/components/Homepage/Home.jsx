// import { useEffect, useState } from "react";
import ScrollBar from "./ScrollBar"
import Banner from "./Banner"
import CarouselComp from "./Carousels/CarouselComp"
import { useEffect,useContext,useState } from "react"
import UserContext from '../../context/user/userContext'
import { userDetails } from '../../service/api'

const Home = () => {
    const userContext = useContext(UserContext);
    const {setUserJWT,setUserId,setfound} = userContext;
    // const {setUserId,setUserJWT} = useContext(userContext)
    useEffect(() => {
        const findToken = async () => {
            const jtwToken = localStorage.getItem('fixdukaan-jwt-token');
            if (jtwToken !== null) {
                setfound(true);
                const user = await userDetails(jtwToken);
                // console.log("activity drower", user.data);
                setUserJWT(jtwToken);
                setUserId(user._id);
            }
        }
        findToken()
    }, [])
    return (
        <>

            <ScrollBar />
            <Banner />
            {/* <CarouselComp /> */}
            {/* setp 1 place order step 2 order pickup step 3 Order delivered */} frdge ac fan
        </>
    )
}

export default Home