// UserLogin.jsx
import React, { useState, useEffect,useContext } from 'react';
import { Paper, AlertTitle,Typography, Box, TextField, Button, FormGroup, FormControlLabel, Checkbox, IconButton, InputAdornment, Stack, Alert } from '@mui/material';
import styled from '@emotion/styled';
import { HashLink as Link } from 'react-router-hash-link';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { userLogin } from '../../service/api';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../context/user/userContext'

const Logo = styled(Box)`
  float: left;
  flex-grow: 1;
  padding: 0px 30px;
`;

const TextLogo = styled(Typography)`
  color: #ff6017;
  font-size: 30px;
`;

const Base = styled(Paper)`
  display: flex;
  flex-direction: column;
  width: 300px;
  justify-content: center;
  align-items: center;
`;

const Textfiled = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & > * {
    width: 270px;
    margin: 10px 20px;
  }
`;

const Container = styled(Box)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  position: fixed;
  z-index: 100;
`;

const LoginButton = styled(Button)`
  width: 100%;
  margin: 20px;
  color: white;
  background-color: #ff6017;
  &:hover {
    color: #ff6017;
    background-color: white;
  }
`;

const AlertBox = styled(Box)`
  width: 100%;
  position: fixed;
  z-index: 10000;
  top:0px;
`;

const UserLogin = () => {
    const [Phonenumber, setPhonenumber] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [alert, setAlert] = useState({ message: '', title: '', errorTitle: '' });
    const [alertvisibility, setalertVisibility] = useState(false);
    const [Rememberme,setRemember] = useState(false);
    const navigate = useNavigate();
    const usercontext = useContext(UserContext);
    const {setUserJWT,setUserId} = usercontext;

    const handleOnClick = async () => {
        const data = {
            "Phone_Number": Number(Phonenumber),
            "Password": password
        };

        try {
            const result = await userLogin(data);
            const { success,authtoken,userId } = result.data;

            if (success) {
                setUserJWT(authtoken)
                setUserId(userId)
                if(Rememberme === true){

                    localStorage.setItem('fixdukaan-jwt-token',authtoken);
                }
                navigate('/');
            } else {
                setAlert({ message: "Invalid Number and Password", title: "error", errorTitle: "error" });
                setalertVisibility(true);
            }
        } catch (error) {
            console.log(error)
            setAlert({ message: "Invalid Number and Password", title: "error", errorTitle: "error" });
            setalertVisibility(true);
        }
    };

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const handleRememberme =(e)=>{
        setRemember(!Rememberme);
    }
    useEffect(() => {
            const timeout = setTimeout(() => {
                setalertVisibility(false);
            }, 3000);
            return () => {
                clearTimeout(timeout);
            };
        
    }, [alertvisibility]);

    return (
        <Container>
            <AlertBox>
                {alertvisibility && (
                    <Stack sx={{ width: '100%' }}>
                        <Alert variant="outlined" severity={alert.errorTitle} sx={{ backgroundColor: 'white', color: '#ff6017', width: '100%' }}>
                            <AlertTitle>{alert.title}</AlertTitle>
                            {alert.message}
                        </Alert>
                    </Stack>
                )}
            </AlertBox>
            <Base>
                <Logo>
                    <Link to="/" style={{ textDecoration: "none" }}><TextLogo>Fixdukaan</TextLogo></Link>
                </Logo>
                <Textfiled>
                    <TextField
                        id="outlined-basic"
                        label="Phone Number"
                        variant="outlined"
                        sx={{ margin: '5px' }}
                        onChange={(e) => setPhonenumber(e.target.value)}
                    />
                    <TextField
                        sx={{ width: "270px", height: 50, margin: '10px' }}
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Textfiled>
                <FormGroup >
                    <FormControlLabel control={<Checkbox sx={{
                        '&.Mui-checked': {
                            color: "#ff6017",
                        },
                    }} onClick={handleRememberme} />} label="Remember me" />
                </FormGroup>
                <LoginButton variant="contained" onClick={handleOnClick}>Login</LoginButton>
                <br />
                <Link to="/signup" style={{ color: "#d18356", textDecoration: "none", margin: "5px" }}>New to fixdukaan? signup</Link>
            </Base>
        </Container>
    );
}

export default UserLogin;
