import React, { useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const ProductInfo = ({ Orders }) => {
  useEffect(() => {
    const { product, quantity, status, totalprice, productName } = Orders;
    console.log("inside function", product, quantity, status, totalprice, productName);
  }, [Orders]);

  const { product, quantity, status, totalprice, productName } = Orders;

  return (
    <Paper elevation={3} style={{ backgroundColor: '#ff6017', color: 'white', padding: '16px', borderRadius: '8px', marginBottom: '10px' }}>
      <Typography variant="h6" gutterBottom>
        Product Information
      </Typography>
      <Typography variant="subtitle1"><strong>Product Name:</strong> {productName}</Typography>
      <Typography variant="subtitle1"><strong>Quantity:</strong> {quantity}</Typography>
      <Typography variant="subtitle1"><strong>Status:</strong> {status}</Typography>
      <Typography variant="subtitle1"><strong>Total Price:</strong> ₹{totalprice}</Typography>
      <Button variant="outlined" style={{ color: 'white', borderColor: 'white', marginTop: '10px' }}>
        Cancel Order
      </Button>
    </Paper>
  );
};

export default ProductInfo;
