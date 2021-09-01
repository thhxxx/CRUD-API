import "../assets/css/AddProduct.scss"
import {useState} from "react";

const initState = {
    name: '',
    image: '',
    price: '',
    sale: '',
    quantity: ''
}

export const AddProduct = () => {
    const [isShow, setIsShow] = useState(false)

    function handleIsShow() {
        if (isShow === true) {
            setIsShow(false)
        } else {
            setIsShow(true)
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
                            <h1>add product</h1>
                            <p onClick={handleIsShow}><i className="far fa-times"/></p>
                        </div>
                        <div className="body">
                            <div className="form-input">
                                <input
                                    className="text-input"
                                    type="text"
                                    placeholder=" "
                                />
                                <label>Name</label>
                            </div>
                            <div className="form-input">
                                <input
                                    type="file"
                                />
                            </div>
                            <div className="form-input">
                                <input
                                    className="text-input"
                                    type="number"
                                    placeholder=" "
                                />
                                <label>Price</label>
                            </div>
                            <div className="form-input">
                                <input
                                    className="text-input"
                                    type="number"
                                    placeholder=" "
                                />
                                <label>Sale</label>
                            </div>
                            <div className="form-input">
                                <input
                                    className="text-input"
                                    type="number"
                                    placeholder=" "
                                />
                                <label>Quantity</label>
                            </div>
                        </div>
                        <div className="bottom">
                            <button className="btn">add new</button>
                        </div>
                    </div>
                </div> : null
            }
        </div>
    )
}