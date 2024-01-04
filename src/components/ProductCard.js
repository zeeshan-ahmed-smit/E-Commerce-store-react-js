import React, { useContext, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ReactStars from 'react-stars';
import "../App.css";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CartContext from '../context/cart';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ProductCard({ product, viewDetails }) {
    const { setCart } = useContext(CartContext)
    const [open, setOpen] = useState(false);

    const addToCart = () => {
        const cartData = JSON.parse(localStorage.getItem('cart')) || [];
        const index = cartData.findIndex(v => v.id === product.id);
        if (index !== -1) {
            cartData.splice(index, 1, { ...cartData[index], qty: cartData[index].qty + 1 });
        } else {
            cartData.push({ ...product, qty: 1 });
        }
        localStorage.setItem('cart', JSON.stringify(cartData));
        setCart(cartData)
        setOpen(true);
    }


    return (
        <Card className='product-box'>
            <div className="product-card-img">
                <img src={product.image} alt='sd' />
            </div>
            <Snackbar open={open} autoHideDuration={2000} onClose={() => { setOpen(false) }}>
                <Alert onClose={() => { setOpen(false) }} severity="success" sx={{ width: '100%', boxShadow: 0 }}>
                    Product add successfully:
                </Alert>
            </Snackbar>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {product.title.slice(0, 18)}...
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                    Rs  {product.price}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {product.description.slice(0, 97)}...
                </Typography>
                <ReactStars
                    edit={false}
                    value={product.rating.rate}
                    count={5}
                    size={24}
                    color2={'#ffd700'} />
            </CardContent>
            <Stack spacing={2} direction="row">
                <Button variant="contained" onClick={() => { addToCart() }}>Add to Cart</Button>
                <Button variant="outlined" onClick={() => { viewDetails(product.id) }}>View Details</Button>
            </Stack>
        </Card >
    );
}