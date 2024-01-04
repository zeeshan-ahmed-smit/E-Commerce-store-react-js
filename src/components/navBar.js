import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useSearchParams } from "react-router-dom";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import CartContext from '../context/cart';
import CartDrawer from './CartDrawer';

const drawerWidth = 240;
const navItems = ['all', "men's clothing", "women's clothing", 'electronics', 'jewelery'];

function DrawerAppBar(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = useState(false);
    let [setSearchParams] = useSearchParams();
    const [open, setOpen] = useState(false);
    const { cart, setCart } = useContext(CartContext)



    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);

    };


    const deleteCart = (id) => {
        const cartData = JSON.parse(localStorage.getItem('cart')) || [];
        const index = cartData.findIndex(v => v.id === id);
        cartData.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cartData));
        setCart(cartData)
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                My_Store
            </Typography>
            <Divider />
            <List>
                {navItems.map((item) => (
                    <ListItem onClick={() => setSearchParams({ category: item })} key={item} disablePadding>
                        <ListItemButton sx={{ textAlign: 'center' }}>
                            <ListItemText primary={item} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar style={{ backgroundColor: '#1976d2' }} component="nav">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                    >
                        My_Store
                    </Typography>
                    <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
                        {navItems.map((item) => (
                            <Button onClick={() => setSearchParams({ category: item })} key={item} sx={{ color: '#fff' }}>
                                {item}
                            </Button>
                        ))}
                    </Box>
                    <Box sx={{ display: { sm: 'block' } }}>
                        <IconButton
                            size="large"
                            aria-label="show 17 new notifications"
                            color="inherit"
                        >
                            <Badge badgeContent={cart.length} color="error">
                                <ShoppingCartIcon onClick={() => { setOpen(true) }} />
                            </Badge>
                        </IconButton>
                    </Box>
                    <CartDrawer deleteCart={deleteCart} cartData={cart} open={open} setOpen={setOpen} />
                </Toolbar>
            </AppBar>
            <nav>
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
            </nav>
            <Box component="main" sx={{ p: 3 }}>

            </Box>
        </Box>
    );
}

DrawerAppBar.propTypes = {
    window: PropTypes.func,
};

export default DrawerAppBar;
