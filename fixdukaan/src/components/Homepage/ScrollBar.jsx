
import { AppBar, Typography, Box } from '@mui/material';
import { AccessTime, Phone, Share, Instagram, Email } from '@mui/icons-material';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import ProfileDrower from './ProfileDrower';
const Container = styled(Box)`
display:flex;

margin:10px 10px;
float:left;
width:100%;
height:100%;

`
const Text = styled(Typography)`
padding:0px 16px;
`

const Timeicon = styled(AccessTime)`
padding: 0px 10px;
`

const PhoneIcon = styled(Phone)`
padding: 0px 10px;
`

const ShareICon = styled(Box)`
display:flex;
flex-direction: row-reverse;
margin:10px 10px;
width:100%;
height:100%;
float:right;

`

const Topbar = styled(AppBar)`
display:flex;

width:100%;
background-color:#ff6017;

`
const User = styled(Box)`
display:flex;
width:100%;
flex-direction: row;
background-color:white;
&>*{
    margin:20px 0px;
}
`

const Parent = styled(Box)`
display:flex;
flex-direction: row;
`
const Logo = styled(Box)`
float:left;
flex-grow:1;
padding: 0px 30px;
`

const Login = styled(Box)`
float : right;
flex-grow:1;
padding: 0px 30px;
&>*{
    float:right;
    color:#ff6017;
    font-size: 30px
}
`
const TextLogo = styled(Typography)`
color:#ff6017;
font-size: 30px
`

const ScrollBar = () => {
    const [scroll, setScroll] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY; // => scroll position
            setScroll(scrollPosition);
            console.log(scroll);
        };
        handleScroll();
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [scroll]);
    return (
        <>{
            scroll < 80 ?
                <Topbar>
                    <Box>
                        <Parent>
                            <Container>
                                <Timeicon />
                                <Text>Welcome to Fix Dukaan</Text>
                                <PhoneIcon />
                                <Text>+91 639 8188 074</Text>
                            </Container>
                            <ShareICon>
                                <Email />
                                <Instagram />
                                <Text>Follow Us:</Text>
                                <Share />
                            </ShareICon>
                        </Parent>
                        <User>
                            <Logo>
                                <TextLogo>Fixdukaan</TextLogo>
                            </Logo>
                            {/* <Search >
                                <LiveSearch />
                            </Search> */}
                            <Login >
                                {/* <Store/>
                                <Person/> */}
                                <ProfileDrower/>
                            </Login>
                        </User>
                    </Box>
                </Topbar> : ""
        }
        </>
    )
}

export default ScrollBar