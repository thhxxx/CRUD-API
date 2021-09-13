import {useEffect, useState} from "react";
import {fetchProduct} from "../assets/js/CallAPI";
import {Product} from "../components/Product";
import {AddProduct} from "../components/AddProduct";

export const Home = () => {

    const [product, setProduct] = useState([])
    const isLogin = true

    useEffect(function () {
        let isMounted = true;
        fetchProduct().then(function (data) {
            if (isMounted) {
                setProduct(data)
            }
        })
        return () => {
            isMounted = false
        }
    }, [product])

    return (
        <div className="Home">
            {
                isLogin ? <AddProduct/> : null
            }
            <Product setProduct={product}/>
        </div>
    )
}