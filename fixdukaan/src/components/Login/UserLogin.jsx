import { Paper, Typography, Box, TextField, Button, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import styled from '@emotion/styled';
import { HashLink as Link } from 'react-router-hash-link';

const Logo = styled(Box)`
float:left;
flex-grow:1;
padding: 0px 30px;
`
const TextLogo = styled(Typography)`
color:#ff6017;
font-size: 30px
`
const Base = styled(Paper)`
display:flex;
flex-direction: column;
width: 300px;
justify-content: center;
align-items: center;
`
const Textfiled = styled(Box)`
display:flex;
flex-direction: column;
justify-content: center;
align-items: center;
&>*{
    width:270px;
    margin:10px 20px;
}
`
const Container = styled(Box)`
width:100%;
height:100%;
display:flex;
flex-direction: column;
justify-content: center;
align-items: center;
margin:20px;
`
const LoginButton = styled(Button)`
width:100%;
margin:20px;
color:white;
background-color:#ff6017;
&:hover{
    color:#ff6017;
    background-color:white;
}
`
const UserLogin = () => {
    return (
        <Container>
            <Base>
                <Logo>
                    <Link to="/" style={{textDecoration:"none"}}><TextLogo>Fixdukaan</TextLogo></Link>
                </Logo>
                <Textfiled>
                    <TextField id="outlined-basic" label="User Name" variant="outlined" sx={{margin:'5px'}} />
                    <TextField id="outlined-basic" label="Password" variant="outlined" sx={{margin:'5px'}}/>
                </Textfiled>
                <FormGroup>
                    <FormControlLabel control={<Checkbox sx={{
                        '&.Mui-checked': {
                            color: "#ff6017",
                        },
                    }} />} label="Remember me" />
                </FormGroup>
                <LoginButton variant="contained">Login</LoginButton>
                <br/>
                    <Link to="/signup" style={{color:"#d18356",textDecoration: "none",margin:"5px"}}>  New to fixdukaan? signup</Link>
            </Base>
        </Container>
    )
}

export default UserLogin