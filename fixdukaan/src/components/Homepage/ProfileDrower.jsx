import React, { useState } from 'react'
import { MenuItem, styled, Menu ,ListItemIcon,ListItemText   } from '@mui/material'
import { AccountCircle, Store, Person } from '@mui/icons-material'

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
    return (
        <>
            <AccountCircle
                onClick={() => setOpen(!open)}
                id="Profile Button"
            />
            <Menu
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
                        <ListItemText>Shop Login</ListItemText>
                    </ListItemIcon>
                </Menuitem >
                <Menuitem >
                    <ListItemIcon>
                        <Person fontSize="small"/>
                        <ListItemText>Customer Login</ListItemText>
                    </ListItemIcon>
                </Menuitem>
            </Menu>
        </>
    )
}

export default ProfileDrower