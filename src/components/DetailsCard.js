import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import '../App.css';
import ReactStars from 'react-stars';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import CartContext from '../context/cart';
import { useContext } from 'react';

export default function DetailsCard({ details }) {
    let { image, title, price, description, rating, category } = details;

    const {setCart } = useContext(CartContext)

    const addToCart = () => {
        const cartData = JSON.parse(localStorage.getItem('cart')) || [];
        const index = cartData.findIndex(v => v.id === details.id);
        if (index !== -1) {
            cartData.splice(index, 1, { ...cartData[index], qty: cartData[index].qty + 1 });
        } else {
            cartData.push({ ...details, qty: 1 });
        }
        localStorage.setItem('cart', JSON.stringify(cartData));
        setCart(cartData)
    }

    return (
        <Card>
            <CardActionArea className='modalCard'>
                <div className='detailCardImg'>
                    <img src={image} alt='' />
                </div>
                <CardContent style={{width: '150%'}}>
                    <Typography className='modalTitle' gutterBottom variant="h5" component="div">
                        {title}
                    </Typography>
                    <Typography className='detailCarsDes' variant="body2" color="text.secondary">
                        {description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <ReactStars
                            edit={false}
                            value={rating.rate}
                            count={5}
                            size={24}
                            color2={'#ffd700'} />
                    </Typography>
                    <Chip sx={{ marginTop: .5, marginBottom: 1 }} label={category} />
                    <Typography sx={{ fontSize: 20, fontWeight: 'bold' }}>
                        Rs {price}
                    </Typography>
                    <Stack sx={{ marginTop: 3 }} spacing={2} direction="row">
                        <Button variant="contained" onClick={() => { addToCart() }}>Add to Cart</Button>
                        <Button variant="outlined">Buy Now</Button>
                    </Stack>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}