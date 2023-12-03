import React, { useState,useEffect,useContext } from 'react'
import { MenuItem, styled, Menu ,ListItemIcon,ListItemText   } from '@mui/material'
import { AccountCircle, Store, Person } from '@mui/icons-material'
import { HashLink as Link } from 'react-router-hash-link';
import UserContext from '../../context/user/userContext'
const Menuitem = styled(MenuItem)`
    color:#ff6017;
    background-color:white;
    &:hover{
        color:white;
        background-color:#ff6017
    }
    &>*{
        color:#ff6017;
        &:hover{
            color:white;
        }
    }
    
`

const ProfileDrower = () => {
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(!open);
    }
    const handleSignout = (e)=>{
        localStorage.removeItem('fixdukaan-jwt-token');
        window.location.reload()
    }
    const usercontext = useContext(UserContext);
    const {found,userId} = usercontext;
    return (
        <>
            <AccountCircle
                onClick={() => setOpen(!open)}
                id="Profile Button"
            />
            {found ===true || userId?<Menu
                id="Profile Button"
                
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'Profile Button',
                }}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                {/* <MenuItem onClick={handleClose}>Profile</MenuItem> */}
                <Menuitem >
                    <ListItemIcon>
                        <Store fontSize="small"/>
                        <ListItemText><Link to='./user' style={{ textDecoration: "none",color:"#595757"}}>UserDashboard</Link></ListItemText>
                    </ListItemIcon>
                </Menuitem >
                <Menuitem onClick={handleSignout}>
                    <ListItemIcon>
                        <Person fontSize="small"/>
                        <ListItemText>Signuout</ListItemText>
                    </ListItemIcon>
                </Menuitem>
            </Menu>: <Menu
                id="Profile Button"
                
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'Profile Button',
                }}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                {/* <MenuItem onClick={handleClose}>Profile</MenuItem> */}
                <Menuitem >
                    <ListItemIcon >
                        <Store fontSize="small" />
                        <ListItemText><Link to='/login' style={{ textDecoration: "none",color:"#595757"}} >Login</Link></ListItemText>
                    </ListItemIcon>
                </Menuitem >
            </Menu>}
        </>
    )
}

export default ProfileDrower