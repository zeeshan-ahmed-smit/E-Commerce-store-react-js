import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ReactStars from 'react-stars';
import "../App.css";

export default function ProductCard({ product, setOpen }) {

    
    return (
        <Card className='product-box'>
            <div className="product-card-img">
                <img src={product.image} alt='sd' />
            </div>
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
            <div className='btns'>
                <button className='addToCartBtn'>Add To Cart</button>
                <button className='viewDetailBtn' onClick={() => { setOpen(true) }}>View Details</button>
            </div>
        </Card >
    );
}