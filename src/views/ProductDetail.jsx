import {useLocation} from "react-router-dom";
import "../assets/css/ProductDetail.scss"
import {useDispatch} from "react-redux";
import {addToCart} from "../reducers/CartReducer";
import {useState} from "react";

export const ProductDetail = () => {
    const location = useLocation()
    const productDetail = location.state
    const [quantity, setQuantity] = useState("")
    const dispatch = useDispatch()


    function formatPrice(input) {
        return input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    }

    function addCart() {
        if (quantity === "") {
            alert("Please choose your shoe size!")
        } else {
            let product = {
                name: productDetail.name,
                price: productDetail.price,
                sale: productDetail.price / 100 * (100 - productDetail.sale),
                image: productDetail.image,
                size: quantity,
                id: productDetail.id
            }
            setQuantity("")
            dispatch(addToCart({product, quantity}))
        }
    }

    return (
        <div className="product-detail">
            <div className="info">
                <h1>{productDetail.name}</h1>
                <p className="price">
                    {
                        (productDetail.sale === "0")
                            ? <>{formatPrice(productDetail.price)}</>
                            :
                            <><s>{formatPrice(productDetail.price)}</s>
                                <span>{formatPrice(productDetail.price / 100 * (100 - productDetail.sale))}</span>
                            </>
                    }
                </p>
                <div className="quantity">
                    <div className="input-quantity">
                        <input type="radio"
                               checked={quantity === "38"}
                               value="38"
                               onChange={event => setQuantity(event.target.value)}
                        />
                        <label>38</label>
                    </div>
                    <div className="input-quantity">
                        <input type="radio"
                               checked={quantity === "40"}
                               value="40"
                               onChange={event => setQuantity(event.target.value)}
                        />
                        <label>40</label>
                    </div>
                    <div className="input-quantity">
                        <input type="radio"
                               checked={quantity === "42"}
                               value="42"
                               onChange={event => setQuantity(event.target.value)}
                        />
                        <label>42</label>
                    </div>
                    <div className="notification-quantity">
                        {
                            quantity === ""
                                ? ""
                                : <><span>{productDetail.size[quantity]}</span> products left in stock.</>
                        }
                    </div>
                </div>

                <button disabled={productDetail.size[quantity] === "0"}
                        onClick={() => addCart()} className="btn">
                    {
                        productDetail.size[quantity] === "0" ? "Please choose another shoe size!" : "add to cart"
                    }
                </button>
            </div>
            <div className="image">
                <img src={'https://thhxxx.github.io/image/nike/' + productDetail.image + '.jpg'}
                     alt={productDetail.name}/>
            </div>
        </div>
    )
}