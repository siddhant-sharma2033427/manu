import styled from '@emotion/styled'
import { Box, Typography, Button } from '@mui/material'
import React from 'react'
import { MobileFriendly, LocalShipping, Inventory } from '@mui/icons-material';
import { HashLink as Link } from 'react-router-hash-link';
import { useNavigate } from 'react-router-dom';
// import banner from './image/banner.jpg'
const Image = styled('img')({
  width: "550px",
  // marginTop: "100px",
})
const Imgcontainer = styled(Box)`
width:50%;
display:flex;
justify-content:right;
align-item:right;
`
const Textbox = styled(Typography)`\
  float:left;
  color:#ff6017;
  margin:20px;
  width:50%;
  font-family: 'Roboto', sans-serif;
  &>h1{
    font-size: 40px;
  }
  &>h3{
    font-size: 30px;
  }
`
const IconContainer = styled(Box)`
display:flex;
&>*{
  margin:10px 20px 5px 5px;
  color:#ff6017;
  font-size: 20px;
}
`
const Container = styled(Box)`
  width:100%;
  margin-top:100px;
  display:flex;
`
const GetStartButton = styled(Button)`
background-color:#ff6017;
color:white;
border-radius: 25px;
&:hover{
  color:#ff6017;
  background-color:white;
}

`
const Banner = () => {
  const navigation = useNavigate();
  return (
    <>
      <Container>
        <Textbox component={'span'}>
          <h1>Aap Ki Problem Hamari Dukaan</h1><br />
          <h3>Easy 3 Step Service</h3>
          <IconContainer>
            <Box>
              <MobileFriendly fontSize={"large"}/>
              <h6>Place <br/> order</h6>
            </Box>
            <Box>
              <LocalShipping fontSize={"large"}/>
              <h6>Pickup</h6>
            </Box>
            <Box>
              <Inventory fontSize={"large"}/>
              <h6>Repaired Product<br/> Deliver</h6>
            </Box>
          </IconContainer>
          {/* <GetStartButton variant="contained" onClick={()=>navigation('/signup')}><Link to="/signup" style={{textDecoration:"none"}}>Get Started</Link></GetStartButton> */}
          <GetStartButton variant="contained" onClick={()=>navigation('/signup')}>Get Started</GetStartButton>
        </Textbox>
        <Imgcontainer>
          <Image src={require('./image/repairman3.png')} />
        </Imgcontainer>
      </Container>
    </>
  )
}

export default Banner