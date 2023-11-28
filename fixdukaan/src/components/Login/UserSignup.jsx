import styled from '@emotion/styled';
import { Autocomplete, Box, TextField, Paper, InputAdornment, IconButton, Button, FormGroup, FormControlLabel, Checkbox, Typography } from '@mui/material';
import lookup from 'country-code-lookup'
import { Country, State, City } from 'country-state-city';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react'
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { addUser } from '../../service/api'
import { HashLink as Link } from 'react-router-hash-link';
// import IconButton from '@mui/material/IconButton';
// import axios from 'axios'
const Address = styled(Box)`
display:flex;
flex-wrap: wrap;
`
const Textfield = styled(TextField)`
/* Remove the arrow from the inner spin button */
& input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Remove the arrow from the outer spin button */
& input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
`
// const Page = styled(Paper)`
// width:800px;
// height:800px;
// margin:auto;
// `
const Personal = styled(Box)`
display: flex;
flex-wrap: wrap;

`
const Password = styled(Box)`
display:flex;
flex-wrap: wrap;

`
const LoginButton = styled(Button)`
width:200px;
margin:10px;
color:white;
background-color:#ff6017;
&:hover{
    color:#ff6017;
    background-color:white;
}
`

const Logo = styled(Box)`
float:left;
flex-grow:1;
padding: 0px 30px;
background-color:white;
`
const TextLogo = styled(Typography)`
color:#ff6017;
font-size: 30px
`
const Container = styled(Box)`
width:100%;
height:100%;
display:flex;
flex-direction: column;
justify-content: center;
align-items: center;
margin:20px;
background-image:require(url("./images/loginbg.jpg"))

`

const UserSignup = () => {
    const navigate = useNavigate();
    const [allcountries, setAllCountries] = useState();
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [countryISO, setCountryISO] = useState(null);
    const [allState, setAllStates] = useState([]);
    const [stateISO, setstateISO] = useState(null);
    const [state, setstate] = useState(null);
    const [allCities, setCities] = useState([])
    const [city, setCity] = useState(null)
    const [cityread, setRead] = useState(false)


    const [showPassword, setShowPassword] = useState(false);
    const [showcPassword, setShowcPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [cpassword, setCpassword] = useState('');

    const [Fname, setFname] = useState('')
    const [Lname, setLname] = useState('')
    const [Phone, setPhone] = useState('')
    const [Email, setEmail] = useState('')
    const [Zipcode, setZipcode] = useState('')
    const [uAddress, setAddress] = useState('')
    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const handleTogglecPasswordVisibility = () => {
        setShowcPassword(!showcPassword);
    };
    const handleButton = async () => {
        const data = {
            "First_name":Fname,
            "Last_name":Lname,
            "Phone_Number":Number(Phone),
            // "Phone_Number":`${Phone,
            "Email":Email,
            "Country":selectedCountry,
            "State":state,
            "City":city,
            "Zipcode":Number(Zipcode),
            // "Zipcode":Zipcode,
            "Address": uAddress,
            "Password":password,
            "Type":"Customer"
          }
        // console.log(Fname, Lname, Phone, Email, Zipcode, uAddress, password, city, state, selectedCountry);
        try{
        console.log(data);
        const status = await addUser(data);
        // await axios.post('http://localhost:8000/signup',JSON.stringify(data));
        if(status.data.success){
            navigate('/');
        }
        console.log(cityread)
        }catch(error){
            console.log(error);
        }
    }
    useEffect(() => {
        const getAllCountries = () => {
            const allCountries = Country.getAllCountries();
            setAllCountries(allCountries);
        }
        getAllCountries();
    }, [])
    useEffect(() => {
        if (selectedCountry) {
            setCountryISO(lookup.byCountry(selectedCountry).iso2)
        }
    }, [selectedCountry])
    useEffect(() => {
        if (countryISO) {
            setAllStates(State.getStatesOfCountry(countryISO));
            setRead(true)
        }
    }, [countryISO])
    useEffect(() => {

        if (stateISO) {
            setCities(City.getCitiesOfState(countryISO, stateISO))
        }
    }, [stateISO])
    return (
        <Container>
            <Logo>
                <Link to="/" style={{textDecoration:"none"}}><TextLogo>Fixdukaan</TextLogo></Link>
            </Logo>
            <Paper>

                <Personal>
                    <TextField id="F-Name" label="First Name" variant="outlined" onChange={(event) => { setFname(event.target.value) }} required sx={{ width: 150, height: 50, margin: '10px' }} />
                    <TextField id="L-Name" label="Last Name" variant="outlined" onChange={(event) => { setLname(event.target.value) }} sx={{ width: 150, height: 50, margin: '10px' }} />
                    <Textfield
                        required
                        id="filled-number"
                        label="Phone Number"
                        type="number"
                        sx={{ width: '100%', height: 50, margin: '10px' }}
                        onChange={(event) => { setPhone(event.target.value) }}
                    />
                    <Textfield
                        required
                        id="filled-number"
                        label="Email"
                        type="email"
                        sx={{ width: '100%', height: 50, margin: '10px' }}
                        onChange={(event) => { setEmail(event.target.value) }}
                    />
                </Personal>
                <Address>

                    <Autocomplete
                        id="country"
                        onChange={(event, newValue) => {
                            if (newValue) {
                                setSelectedCountry(newValue.name);
                            }
                        }}
                        getOptionLabel={(obj) => `${obj.name}`}
                        options={allcountries}
                        sx={{ width: 150, height: 50, margin: '10px' }}
                        isOptionEqualToValue={(option, value) =>
                            option.name === value.name
                        }
                        noOptionsText={"Other"}
                        renderOption={(props, obj) => (
                            <Box component="li" {...props} key={obj.name}>
                                {obj.name}
                            </Box>
                        )}
                        renderInput={(params) =>
                            <TextField {...params} label="select Country" style={{ backgroundColor: "white" }} required />
                        }
                    />
                    <Autocomplete
                        id="State"
                        // autoComplete={selectedCountry === null ? 'off':'on'}
                        onChange={(event, newValue) => {
                            if (newValue) {
                                setstate(newValue.name);
                                const states = State.getStatesOfCountry(countryISO);
                                const stateData = states.map((state) => {
                                    if (state.name === newValue.name) {
                                        setstateISO(state.isoCode);
                                    }
                                    
                                })
                                console.log(stateData)
                            }
                        }}
                        getOptionLabel={(obj) => `${obj.name}`}
                        options={allState}
                        sx={{ width: 150, height: 50, margin: '10px' }}
                        isOptionEqualToValue={(option, value) =>
                            option.name === value.name
                        }
                        noOptionsText={"Other"}
                        renderOption={(props, obj) => (
                            <Box component="li" {...props} key={obj.name}>
                                {obj.name}
                            </Box>
                        )}
                        renderInput={(params) =>
                            <TextField {...params} label="Select State" style={{ backgroundColor: "white" }} required />
                        }
                    />
                    <Autocomplete
                        id="city"
                        // autoComplete = {state===null?'off':'on'}
                        onChange={(event, newValue) => {
                            if (newValue)
                                setCity(newValue.name);
                        }}
                        getOptionLabel={(obj) => `${obj.name}`}
                        options={allCities}
                        sx={{ width: 150, height: 50, margin: '10px' }}
                        isOptionEqualToValue={(option, value) =>
                            option.name === value.name
                        }
                        noOptionsText={"Other"}
                        renderOption={(props, obj) => (
                            <Box component="li" {...props} key={obj.name}>
                                {obj.name}
                            </Box>
                        )}
                        renderInput={(params) =>
                            <TextField {...params} label="Select City" style={{ backgroundColor: "white" }} required />
                        }
                    />
                    <Textfield
                        required
                        id="filled-number"
                        label="Zipcode"
                        type="number"
                        sx={{ width: 150, height: 50, margin: '10px' }}
                        onChange={(event) => { setZipcode(event.target.value) }}
                    />
                    <TextField
                        required
                        id="outlined-required"
                        label="Address"
                        sx={{ width: '100%', height: 50, margin: '10px' }}
                        onChange={(event) => { setAddress(event.target.value) }}

                    />
                </Address>
                <Password>
                    <TextField
                        sx={{ width: 180, height: 50, margin: '10px' }}
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
                    <TextField
                        sx={{ width: 180, height: 50, margin: '10px' }}
                        label="confirm password"
                        type={showcPassword ? 'text' : 'password'}
                        value={cpassword}
                        onChange={(e) => setCpassword(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={handleTogglecPasswordVisibility} edge="end">
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Password>
                <Box>
                    <FormGroup sx={{ margin: '5px' }}>
                        <FormControlLabel control={<Checkbox sx={{
                            '&.Mui-checked': {
                                color: "#ff6017",
                            },


                        }} />} label="Remember me" />
                    </FormGroup>
                    <LoginButton variant="contained" onClick={handleButton}>
                        Signup
                    </LoginButton>
                    <br/>
                    <Link to="/login" style={{color:"#d18356",textDecoration: "none"}}>Already have account? Login</Link>
                </Box>
            </Paper>
        </Container>
    )
}

export default UserSignup
