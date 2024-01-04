import React, { useContext } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import IndeterminateCheckBoxOutlinedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined';
import CartContext from '../context/cart';
import { Button } from '@mui/material';

export default function CartBox({ deleteCart }) {

    const { cart, setCart } = useContext(CartContext);

    const updateQty = (type, id) => {
        const cartData = JSON.parse(localStorage.getItem('cart')) || [];
        const index = cartData.findIndex(v => v.id === id);
        if (type === '+') {
            cartData.splice(index, 1, { ...cartData[index], qty: cartData[index].qty + 1 });
        }else{
            cartData.splice(index, 1, { ...cartData[index], qty: cartData[index].qty - 1 });
        }
        localStorage.setItem('cart', JSON.stringify(cartData));
        setCart(cartData)
    };

    return (
        <>
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {cart.map((v, i) => {
                return (
                    <div key={i}>
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar sx={{ objectFit: 'cover', width: 50, height: 50 }} alt="" src={v.image} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={`${v?.title}`}
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary">
                                            Rs {(v?.price *v.qty).toFixed(2)}
                                        </Typography>
                                        <Typography sx={{ display: 'flex', gap: '10px' }}>
                                            {'— QTY:'}<IndeterminateCheckBoxOutlinedIcon sx={{ cursor: 'pointer' }} onClick={() =>{v.qty >1 && updateQty('-', v.id)}} />
                                            {v.qty}<AddBoxOutlinedIcon sx={{ cursor: 'pointer' }} onClick={() => updateQty('+', v.id)} />
                                        </Typography>
                                    </React.Fragment>
                                }
                            />
                            <DeleteOutlinedIcon onClick={() => deleteCart(v.id)} sx={{ cursor: 'pointer', marginTop: 1 }} />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                    </div>
                )
            })}
        </List>
            <div style={{width:'100%',position:'absolute',bottom:0}}>
            <Button variant="contained" sx={{width:'100%'}}>Checkout</Button>
            </div>
            </>
    );
}