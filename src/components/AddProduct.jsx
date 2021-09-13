import "../assets/css/AddProduct.scss"
import {useEffect, useState} from "react";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {resetProduct} from "../reducers/ProductReducer";

let initState = {
    name: "",
    image: "",
    price: "0",
    sale: "0",
    size: {
        "38": "0",
        "40": "0",
        "42": "0"
    }
}

export const AddProduct = () => {
    const [product, setProduct] = useState(initState)
    const [isShow, setIsShow] = useState(false)
    const [errorText, setErrorText] = useState('')
    const selectedProduct = useSelector(state => state.ProductReducer.product)
    const dispatch = useDispatch()

    useEffect(() => {
        if (selectedProduct) {
            setIsShow(true)
            setProduct(selectedProduct)
        }
    }, [selectedProduct])

    function handleIsShow() {
        if (isShow === true) {
            setIsShow(false)
            dispatch(resetProduct())
        } else {
            setIsShow(true)
        }
    }

    function handleInputQuantity(event) {
        const {name, value} = event.target;
        const getQuantity = {
            ...product, size: {
                ...product.size
            }
        }
        getQuantity.size[name] = value
        setProduct(getQuantity)
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
        } else if (product.size["38"] < 0 || product.size["40"] < 0 || product.size["42"] < 0) {
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
                    size: {
                        "38": product.size["38"],
                        "40": product.size["40"],
                        "42": product.size["42"]
                    }
                })
                resetForm()
                setIsShow(false)
            } catch (e) {
                console.log(e)
            }
        }
    }

    async function updateProduct(id, callback) {
        if (validateForm()) {
            try {
                await axios.put('http://localhost:2210/nike/' + id, {
                    name: product.name,
                    image: product.image,
                    price: product.price,
                    sale: product.sale,
                    size: {
                        "38": product.size["38"],
                        "40": product.size["40"],
                        "42": product.size["42"]
                    }
                })
                resetForm()
                setIsShow(false)
                callback()
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
                                        value={product.name}
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
                                        name="38"
                                        value={product.size["38"]}
                                        onChange={handleInputQuantity}
                                    />
                                    <label>Size 38</label>
                                </div>
                                <div className="form-input">
                                    <input
                                        className="text-input"
                                        type="number"
                                        placeholder=" "
                                        name="40"
                                        value={product.size["40"]}
                                        onChange={handleInputQuantity}
                                    />
                                    <label>Size 40</label>
                                </div>
                                <div className="form-input">
                                    <input
                                        className="text-input"
                                        type="number"
                                        placeholder=" "
                                        name="42"
                                        value={product.size["42"]}
                                        onChange={handleInputQuantity}
                                    />
                                    <label>Size 42</label>
                                </div>
                            </div>
                        </div>
                        <div className="bottom">
                            {
                                selectedProduct
                                    ?
                                    <button onClick={() => updateProduct(selectedProduct.id, dispatch(resetProduct()))}
                                            className="btn">update
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