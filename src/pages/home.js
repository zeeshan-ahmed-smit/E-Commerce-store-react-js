import React from "react";
import DrawerAppBar from "../components/navBar";
import ProductCard from "../components/ProductCard";
import "../App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import BasicModal from "../components/Modal";

function HomePage() {
    const [products, setProducts] = useState([]);
    const [open, setOpen] = useState(false);


    useEffect(() => {
        axios('https://fakestoreapi.com/products')
            .then(res => setProducts(res.data))
            .catch(err => console.log(err))
    },[])


    return (
        <div className="container">
            <DrawerAppBar />
                <BasicModal open={open} setOpen={setOpen}/>
            <div className="box-container">
                {products.map((v, i) => {
                    return <ProductCard setOpen={setOpen} product={v} key={i} />
                })}
            </div>
        </div>
    )
}

export default HomePage;