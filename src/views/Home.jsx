import '../assets/css/Home.scss'
import {useEffect, useState} from "react";
import {fetchProduct} from "../assets/js/CallAPI";

export const Home = () => {

    const [product, setProduct] = useState()

    useEffect(function () {
        fetchProduct().then(function (data) {
            setProduct(data)
        })
    }, [])

    console.log(product)

    return (
        <div className="Home">
            mount
            update
            destroy
        </div>
    )
}