import "../assets/css/AddProduct.scss"
import {useEffect, useState} from "react";
import axios from "axios";
import {useSelector} from "react-redux";

let initState = {
    name: "",
    image: "",
    price: "0",
    sale: "0",
    quantity: {
        size38: "0",
        size40: "0",
        size42: "0"
    }
}

export const AddProduct = () => {
    const [product, setProduct] = useState(initState)
    const [isShow, setIsShow] = useState(false)
    const [errorText, setErrorText] = useState('')
    const selectedProduct = useSelector(state => state.ProductReducer.product)

    useEffect(() => {
        if (selectedProduct) {
            setIsShow(true)
            setProduct(selectedProduct)
        }
    }, [selectedProduct])

    function handleIsShow() {
        if (isShow === true) {
            setIsShow(false)
        } else {
            setIsShow(true)
        }
    }

    function handleInputQuantity(event) {
        const {name, value} = event.target;
        const quantity = Object.assign({}, product.quantity);
        quantity[name] = value;

        setProduct({
            ...product,
            quantity,
        });
    }

    function handleInput(event) {
        const {name, value} = event.target
        setProduct({
            ...product,
            [name]: value
        })
    }

    function resetForm() {
        setProduct(initState)
        setErrorText("")
    }

    function validateForm() {
        if (!product.name || !product.image) {
            setErrorText("Please choose name and image")
        } else if (product.price < 0) {
            setErrorText("Price must be greater than or equal to 0")
        } else if (product.sale < 0 || product.sale > 100) {
            setErrorText("Sale price ranges from 0 to 100")
        } else if (product.quantity.size38 < 0 || product.quantity.size40 < 0 || product.quantity.size42 < 0) {
            setErrorText("Quantity must be greater than or equal to 0")
        } else {
            return true
        }
    }

    async function addNewProduct() {
        if (validateForm()) {
            try {
                await axios.post('http://localhost:2210/nike', {
                    name: product.name.replace(/-/g, " "),
                    image: product.image,
                    price: product.price,
                    sale: product.sale,
                    quantity: {
                        size38: product.quantity.size38,
                        size40: product.quantity.size40,
                        size42: product.quantity.size42
                    }
                })
                resetForm()
                setIsShow(false)
            } catch (e) {
                console.log(e)
            }
        }
    }

    async function updateProduct(id) {
        if (validateForm()) {
            try {
                await axios.put('http://localhost:2210/nike/' + id, {
                    name: product.name,
                    image: product.image,
                    price: product.price,
                    sale: product.sale,
                    quantity: {
                        size38: product.quantity.size38,
                        size40: product.quantity.size40,
                        size42: product.quantity.size42
                    }
                })
                resetForm()
                setIsShow(false)
            } catch (e) {
                console.log(e)
            }
        }
    }

    return (
        <div className="add-product">
            <button className="btn" onClick={handleIsShow}>add product</button>
            {
                isShow
                    ? document.querySelector("body").classList.add("overflow-hidden")
                    : document.querySelector("body").classList.remove("overflow-hidden")
            }
            {
                isShow ? <div className="modal">
                    <div className="box">
                        <div className="top">
                            <h1>
                                {
                                    selectedProduct ? "edit product" : "add product"
                                }
                            </h1>
                            <p onClick={handleIsShow}><i className="far fa-times"/></p>
                        </div>
                        <div className="body">
                            {
                                errorText === '' ? null :
                                    <p className="error-notification"><span>Error:</span> {errorText}</p>
                            }
                            <div className="form">
                                <div className="form-input">
                                    <input
                                        className="text-input"
                                        type="text"
                                        placeholder=" "
                                        onChange={handleInput}
                                        name="name"
                                        value={product.name.replace(/-/g, " ")}
                                    />
                                    <label>Name</label>
                                </div>
                                <div className="form-input">
                                    <input
                                        className="text-input"
                                        type="text"
                                        placeholder=" "
                                        onChange={handleInput}
                                        name="image"
                                        value={product.image}
                                    />
                                    <label>Image</label>
                                </div>
                                <div className="form-input">
                                    <input
                                        className="text-input"
                                        type="text"
                                        placeholder=" "
                                        name="price"
                                        value={product.price}
                                        onChange={handleInput}
                                    />
                                    <label>Price (VND)</label>
                                </div>
                                <div className="form-input">
                                    <input
                                        className="text-input"
                                        type="number"
                                        placeholder=" "
                                        name="sale"
                                        value={product.sale}
                                        onChange={handleInput}
                                    />
                                    <label>Sale %</label>
                                </div>
                                <div className="form-input">
                                    Quantity:
                                </div>
                                <div className="form-input">
                                    <input
                                        className="text-input"
                                        type="number"
                                        placeholder=" "
                                        name="size38"
                                        value={product.quantity.size38}
                                        onChange={handleInputQuantity}
                                    />
                                    <label>Size 38</label>
                                </div>
                                <div className="form-input">
                                    <input
                                        className="text-input"
                                        type="number"
                                        placeholder=" "
                                        name="size40"
                                        value={product.quantity.size40}
                                        onChange={handleInputQuantity}
                                    />
                                    <label>Size 40</label>
                                </div>
                                <div className="form-input">
                                    <input
                                        className="text-input"
                                        type="number"
                                        placeholder=" "
                                        name="size42"
                                        value={product.quantity.size42}
                                        onChange={handleInputQuantity}
                                    />
                                    <label>Size 42</label>
                                </div>
                            </div>
                        </div>
                        <div className="bottom">
                            {
                                selectedProduct
                                    ? <button onClick={() => updateProduct(selectedProduct.id)} className="btn">update
                                        product</button>
                                    : <button onClick={addNewProduct} className="btn">add new</button>
                            }
                        </div>
                    </div>
                </div> : null
            }
        </div>
    )
}