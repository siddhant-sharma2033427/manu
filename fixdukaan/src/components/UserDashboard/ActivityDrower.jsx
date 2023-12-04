import React, { useEffect, useContext, useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Add, Inventory } from '@mui/icons-material';
// import { HashLink as Link } from 'react-router-hash-link';
import { useNavigate } from 'react-router-dom';
import { getOrders, userDetails, getProductDetails } from '../../service/api'
import userContext from '../../context/user/userContext';
import ProductInfo from './ProductInfo';
import PlaceOrder from './PlaceOrder';

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export default function MiniDrawer() {
    const [OrderUpdate,setOrderUpdate] = useState(false);
    const navigate = useNavigate();
    const theme = useTheme();
    const [Orders, setOrders] = useState([{ product: "", quantity: 0, status: "", totalprice: 0, productName: "" }]);
    const [open, setOpen] = React.useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isNewOrder, setIsNewOrder] = useState(false);
    const [lggedUserDetails,setloggedUserDetails] = useState(null) 
    

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    const handleHome = (e) => {
        navigate('/');
    };
    useEffect(() => {
        const fetchUserOrders = async () => {
            try {
                setOrderUpdate(false)
                const sessionjwt = sessionStorage.getItem('fixdukaan-jwt-token');
                if (sessionjwt) {
                    const getuserdetails = await userDetails(sessionjwt);
                    setloggedUserDetails(getuserdetails.data);
                    console.log(getuserdetails.data)

                    const userorders = await getOrders(getuserdetails.data._id);
                    // Map over userorders.data to extract products
                    const ordersData = userorders.data.map((order) => order.products);
                    // Flatten the array of arrays into a single array
                    const flattenedProducts = [].concat(...ordersData);
                    // Use Promise.all to wait for all promises to resolve
                    const updatedOrders = await Promise.all(
                        flattenedProducts.map(async (item) => {
                            let productname = await getProductDetails({ "Id": item.product });
                            return {
                                product: item.product,
                                quantity: item.quantity,
                                status: item.status,
                                totalprice: item.totalPrice,
                                productName: productname.data.data.productName
                            };
                        })
                    );
                    // Set the state with the updatedOrders array
                    setOrders(updatedOrders);
                    console.log(Orders);
                }
            } catch (error) {
                console.error("Error fetching user details or orders", error);
            }
        };

        fetchUserOrders();
    }, [OrderUpdate]); // Removed the dependency on setOrders

    // Log the Orders state when it changes
    useEffect(() => {
        console.log("Orders:", Orders);
    }, [Orders]);

    // Include setOrders as a dependency to avoid lint warnings
    const handleInventoryClick = (order) => {
        setSelectedOrder(order);
        setIsNewOrder(false);
    };

    const handleAddOrderClick = () => {
        setSelectedOrder(null);
        setIsNewOrder(true);
    };
    

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open} sx={{ backgroundColor: "#ff6017" }}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: 5,
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div" onClick={handleHome} style={{ cursor: "pointer" }}>
                        Fixdukaan
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '5px', paddingTop: 2 }}>
                    <Add sx={{ color: "#ff6017", cursor: "pointer" }} onClick={handleAddOrderClick} />

                </Box>
                <List sx={{ display: "flex", flexFlow: "column" }}>

                    {Orders.map((order) => (
                        <ListItem key={order.id} disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: 'center',
                                    px: 2.5,
                                }}
                                onClick={() => handleInventoryClick(order)}
                            >
                                <Inventory
                                    sx={{
                                        minWidth: 0,
                                        mr: 3,
                                        justifyContent: 'center',
                                        color: order.status === 'Pending' ? "#ff6017" : order.status === 'Shipped' ? '#0077cc' : order.status === 'Delivered' ? '#00b050' : order.status === 'Returned' ? '#ffa07a' : order.status === 'Request Cancell' ? '#f39c12' : order.status === 'Cancelled' ? '#ff8c00' : '#ff6017', // Set color based on status
                                        margin: "auto"
                                    }}
                                >
                                    {order.status === 'Pending' ? <InboxIcon /> : <MailIcon />}
                                </Inventory>
                                <ListItemText primary={open ? `${order.productName} ` : ""} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                    <ListItem disablePadding sx={{ display: 'block', justifyContent: 'center' }}>
                        <ListItemButton sx={{ minHeight: 48 }}>

                        </ListItemButton>
                    </ListItem>
                </List>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                <Box sx={{ display: "flex" }}>
                    {selectedOrder && <ProductInfo Orders={selectedOrder} />}
                    {isNewOrder && <PlaceOrder props = {lggedUserDetails} OrderUpdate ={setOrderUpdate} setOrderUpdate={setOrderUpdate}/>}
                </Box>
            </Box>
        </Box>
    );
}