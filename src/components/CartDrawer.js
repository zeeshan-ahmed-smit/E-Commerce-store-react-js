import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import CartBox from './CartBox'
import Button from '@mui/material/Button';
import { useContext } from 'react';
import CartContext from '../context/cart';

export default function CartDrawer({ deleteCart, open, setOpen, cartData }) {

    const { cart } = useContext(CartContext)

    return (
        <div>
            <React.Fragment>
                <Drawer
                    PaperProps={{ style: { width: 350 } }}
                    anchor='right'
                    open={open}
                    onClose={() => { setOpen(false); }}
                >
                    <Button onClick={() => setOpen(false)}>Close</Button>
                    {cart.length > 0 ?
                        (<CartBox deleteCart={deleteCart} cartData={cartData} />) :
                        (<div
                            style={{ height: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <p>Empty</p>
                        </div>)
                    }
                </Drawer>
            </React.Fragment>

        </div >
    );
}


