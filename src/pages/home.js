import React from "react";
import DrawerAppBar from "../components/navBar";
import ProductCard from "../components/ProductCard";
import "../App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import BasicModal from "../components/Modal";
import { useSearchParams } from "react-router-dom";

function HomePage() {
    const [products, setProducts] = useState([]);
    const [open, setOpen] = useState(false);
    const [details, setDetails] = useState({});
    let [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        axios('https://fakestoreapi.com/products')
            .then(res => setProducts(res.data))
            .catch(err => console.log(err))

    }, []);


    useEffect(() => {
        const category = searchParams.get('category');
        if (category === 'all') {
            axios('https://fakestoreapi.com/products')
                .then(res => setProducts(res.data))
                .catch(err => console.log(err))
        } else {
            if (category) {
                axios(`https://fakestoreapi.com/products/category/${category}`)
                    .then(res => setProducts(res.data))
                    .catch(err => console.log(err))
            }
        }
    }, [searchParams])


    const viewDetails = (id) => {
        axios(`https://fakestoreapi.com/products/${id}`)
            .then(res => {
                setDetails(res.data)
                setOpen(true);
            })
            .catch(err => console.log(err))

    }

    return (
        <div className="container">
            <DrawerAppBar />
            <BasicModal details={details} open={open} handleClose={() => { setOpen(false) }} />
            <div className="box-container">
                {products.map((v, i) => {
                    return <ProductCard viewDetails={viewDetails} product={v} key={i} />
                })}
            </div>
        </div>
    )
}

export default HomePage;