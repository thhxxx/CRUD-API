import "../assets/css/AddProduct.scss"
import {useState} from "react";

const initState = {
    name: '',
    image: '',
    price: '',
    sale: '',
    quantity: {
        size38: "",
        size40: "",
        size42: ""
    }
}

export const AddProduct = () => {
    const [isShow, setIsShow] = useState(false)
    const [product, setProduct] = useState(initState)
    const [imageName, setImageName] = useState('')
    const [errorText, setErrorText] = useState('')

    function handleIsShow() {
        if (isShow === true) {
            setIsShow(false)
        } else {
            setIsShow(true)
        }
    }

    function handleInput(event) {
        const {name, value} = event.target
        setProduct({
            ...product,
            [name]: value
        })

    }

    if (imageName) {
        const startIndex = (imageName.indexOf('\\') >= 0 ? imageName.lastIndexOf('\\') : imageName.lastIndexOf('/'));
        let filename = imageName.substring(startIndex);
        if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
            filename = filename.substring(1);
        }
        product.image = filename
        product.name = filename.split(".").slice(0, 1).join().replace(/-/g, " ")
    }

    async function addNewProduct() {
        if (!product.name || !product.image) {
            setErrorText('Please enter name and photo')
        } else if (!product.price || product.price < 0) {
            setErrorText('Please enter price greater than or equal to 0')
        } else if (!product.sale || product.sale < 0) {
            setErrorText('Please enter sale greater than or equal to 0')
        } else if (!product.quantity || product.quantity < 0) {
            setErrorText('Please enter quantity greater than or equal to 0')
        } else {

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
                                add product
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
                                        name="name"
                                        value={product.name}
                                        onChange={handleInput}
                                    />
                                    <label>Name</label>
                                </div>
                                <div className="form-input">
                                    <input
                                        type="file"
                                        value={imageName}
                                        onChange={event => setImageName(event.target.value)}
                                    />
                                </div>
                                <div className="form-input">
                                    <input
                                        className="text-input"
                                        type="number"
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
                                        name="quantity"
                                        value={product.quantity}
                                        onChange={handleInput}
                                    />
                                    <label>Size 38</label>
                                </div>
                                <div className="form-input">
                                    <input
                                        className="text-input"
                                        type="number"
                                        placeholder=" "
                                        name="quantity"
                                        value={product.quantity}
                                        onChange={handleInput}
                                    />
                                    <label>Size 40</label>
                                </div>
                                <div className="form-input">
                                    <input
                                        className="text-input"
                                        type="number"
                                        placeholder=" "
                                        name="quantity"
                                        value={product.quantity}
                                        onChange={handleInput}
                                    />
                                    <label>Size 42</label>
                                </div>
                            </div>
                        </div>
                        <div className="bottom">
                            <button onClick={addNewProduct} className="btn">add new</button>
                        </div>
                    </div>
                </div> : null
            }
        </div>
    )
}