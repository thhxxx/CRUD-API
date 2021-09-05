import "../assets/css/AddProduct.scss"
import {useState} from "react";
import axios from "axios";

export const AddProduct = () => {
    const [image, setImage] = useState('')
    const [price, setPrice] = useState('0')
    const [sale, setSale] = useState('0')
    const [size38, setSize38] = useState('0')
    const [size40, setSize40] = useState('0')
    const [size42, setSize42] = useState('0')

    const [isShow, setIsShow] = useState(false)
    const [errorText, setErrorText] = useState('')

    function handleIsShow() {
        if (isShow === true) {
            setIsShow(false)
        } else {
            setIsShow(true)
        }
    }

    function resetForm() {
        setPrice("0")
        setImage("")
        setSale("0")
        setSize38("0")
        setSize40("0")
        setSize42("0")
        setErrorText("")
    }

    async function addNewProduct() {
        if (!image) {
            setErrorText("Please choose image")
        } else if (price < 0) {
            setErrorText("Price must be greater than or equal to 0")
        } else if (sale < 0 || sale > 100) {
            setErrorText("Sale price ranges from 0 to 100")
        } else if ((size38 || size40 || size42) < 0) {
            setErrorText("Quantity must be greater than or equal to 0")
        } else {
            try {
                await axios.post('http://localhost:2210/nike', {
                    name: image.split(/(\\|\/)/g).pop().split(".").slice(0, 1).join().replace(/-/g, " "),
                    image: image.split(/(\\|\/)/g).pop(),
                    price: price,
                    sale: sale,
                    quantity: {
                        size38: size38,
                        size40: size40,
                        size42: size42
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
                                        value={image.split(/(\\|\/)/g).pop().split(".").slice(0, 1).join().replace(/-/g, " ")}
                                        readOnly={true}
                                    />
                                    <label>Name</label>
                                </div>
                                <div className="form-input">
                                    <input
                                        type="file"
                                        value={image}
                                        onChange={event => setImage(event.target.value)}
                                    />
                                </div>


                                <div className="form-input">
                                    <input
                                        className="text-input"
                                        type="text"
                                        placeholder=" "
                                        value={price}
                                        onChange={event => setPrice(event.target.value)}
                                    />
                                    <label>Price (VND)</label>
                                </div>
                                <div className="form-input">
                                    <input
                                        className="text-input"
                                        type="number"
                                        placeholder=" "
                                        value={sale}
                                        onChange={event => setSale(event.target.value)}
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
                                        value={size38}
                                        onChange={event => setSize38(event.target.value)}
                                    />
                                    <label>Size 38</label>
                                </div>
                                <div className="form-input">
                                    <input
                                        className="text-input"
                                        type="number"
                                        placeholder=" "
                                        value={size40}
                                        onChange={event => setSize40(event.target.value)}
                                    />
                                    <label>Size 40</label>
                                </div>
                                <div className="form-input">
                                    <input
                                        className="text-input"
                                        type="number"
                                        placeholder=" "
                                        value={size42}
                                        onChange={event => setSize42(event.target.value)}
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