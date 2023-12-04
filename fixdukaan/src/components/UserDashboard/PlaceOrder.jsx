import React, { useEffect, useState } from 'react';
import { Autocomplete, TextField, Button, Alert, AlertTitle,Stack } from '@mui/material';
import { getAllProduct } from '../../service/api';
import { Box } from '@mui/material';
import styled from '@emotion/styled';
import { placeOrder } from '../../service/api';

const Container = styled(Box)`
display:flex;
flex-flow:column;
&>*{
    margin:10px;
}
`
const AlertBox = styled(Box)`
  width: 100%;
  position: fixed;
  z-index: 10000;
  top:0px;
`;

const OrderDetails = ({ props, OrderUpdate, setOrderUpdate }) => {
    const [Products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [alertvisibility, setalertVisibility] = useState(false);
    const [alert, setAlert] = useState({ message: '', title: '', errorTitle: '' });

    useEffect(() => {
        const getallproduct = async () => {
            try {
                const response = await getAllProduct();
                setProducts(response.data);
                console.log(props.City, props.State, props.Country, props.Address, props.Phone_Number, props.First_name, props.Zipcode)
            } catch (error) {
                console.log("error occurred", error);
            }

            // console.log(props);
        };

        getallproduct();
    }, []);
    useEffect(() => {
        const timeout = setTimeout(() => {
            setalertVisibility(false);
        }, 3000);
        return () => {
            clearTimeout(timeout);
        };
    
}, [alertvisibility]);

    const handleProductChange = (event, newValue) => {
        setSelectedProduct(newValue);
        console.log(newValue);
    };

    const isOptionEqualToValue = (option, value) => {
        // Customize this function based on your requirements
        return option.productName === value.productName;
    };
    const handleQuantityChange = (event) => {
        // Ensure that the quantity is a non-negative integer
        const newQuantity = Math.max(1, Math.floor(Number(event.target.value)));
        setQuantity(newQuantity);
    };
    const handlePlaceOrder = async () => {
        // setOrderUpdate(!OrderUpdate);
        if(selectedProduct){
        const OrderJson = {
            "userId": props._id,
            "productId": selectedProduct._id,
            "quantityNo":quantity,
            "TotalPrice":0,
        }
        const result = await placeOrder(OrderJson);
        if(result.success){
            setAlert({ message: "Order Placed", title: "success", errorTitle: "success" });
            setalertVisibility(true);
            setOrderUpdate(true);
        }
        console.log('buttonn pressed', result)
    }else{
        setAlert({ message: "Please select Product", title: "error", errorTitle: "error" });
            setalertVisibility(true);
    }

    }
    return (
        <Container style={{ width: '400px' }}>
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
            <Autocomplete
                options={Products}
                getOptionLabel={(product) => product.productName}
                renderOption={(props, product) => (
                    <li {...props}>
                        <img src={product.image} alt={product.productName} style={{ width: 24, marginRight: 8 }} />
                        {product.productName}
                    </li>
                )}
                onChange={handleProductChange}
                value={selectedProduct}
                renderInput={(params) => <TextField {...params} label="Select a product" />}
                isOptionEqualToValue={isOptionEqualToValue}
            />
            <TextField
                label="Enter Quantity"
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                InputLabelProps={{
                    shrink: true,
                }}
                required={true}
                sx={{ width: '100px' }}
            />
            <TextField
                label="Country"
                value={props.Country}
                InputProps={{ readOnly: true }}
                fullWidth
                margin="normal"
                variant="outlined"
            />
            <TextField
                label="State"
                value={props.State}
                InputProps={{ readOnly: true }}
                fullWidth
                margin="normal"
                variant="outlined"
            />
            <TextField
                label="City"
                value={props.City}
                InputProps={{ readOnly: true }}
                fullWidth
                margin="normal"
                variant="outlined"
            />
            <TextField
                label="Address"
                value={props.Address}
                InputProps={{ readOnly: true }}
                fullWidth
                margin="normal"
                variant="outlined"
            />
            <TextField
                label="Zipcode"
                value={props.Zipcode}
                InputProps={{ readOnly: true }}
                fullWidth
                margin="normal"
                variant="outlined"
            />
            <TextField
                label="Zipcode"
                value={props.Phone_Number}
                InputProps={{ readOnly: true }}
                fullWidth
                margin="normal"
                variant="outlined"
            />
            <Button variant="contained" style={{ backgroundColor: '#ff6017', color: '#fff' }} onClick={handlePlaceOrder}>
                Place Order
            </Button>
        </Container>
    );
};

export default OrderDetails;
