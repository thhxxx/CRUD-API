import "../assets/css/Product.scss"
import {useDispatch} from "react-redux";
import {editProduct} from "../reducers/ProductReducer";
import axios from "axios";


export const Product = (props) => {
    const product = props.setProduct
    const isLogin = true
    const dispatch = useDispatch()

    function formatPrice(input) {
        return input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    }

    /*const [quantity, setQuantity] = useState("")
    function handleQuantity(num) {
        setQuantity(num)
    }*/

    async function deleteProduct(id) {
        try {
            // eslint-disable-next-line no-restricted-globals
            if (confirm("Are you sure?")) {
                await axios.delete("http://localhost:2210/nike" + "/" + id)
            }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className="list-product">
            {
                product.map((value) => {
                    return <div className="item" key={value.id}>
                        <div className="image">
                            <img src={'https://thhxxx.github.io/image/nike/' + value.image + '.jpg'} alt={value.name}/>
                            {
                                (value.sale === "0")
                                    ? '' : <span>-{value.sale}%</span>
                            }
                        </div>
                        <div className="info">
                            <h1>{value.name}</h1>
                            {
                                (value.sale === "0")
                                    ? <p className="price">{formatPrice(value.price)}</p>
                                    :
                                    <p className="price"><s>{formatPrice(value.price)}</s>
                                        <span>{formatPrice(value.price / 100 * (100 - value.sale))}</span>
                                    </p>
                            }
                            {/*<div className="quantity">
                                {
                                    Object.entries(value.quantity).map(([key, value]) => {
                                        return <div key={key}>
                                            <button onClick={() => handleQuantity(value)}>
                                                {key}: {value}
                                            </button>
                                        </div>
                                    })
                                }
                                <p>
                                    {
                                        quantity === "0" ? 'none' : quantity
                                    }
                                </p>
                            </div>
                            <button disabled={quantity === "0"} className="btn">add to cart</button>*/}
                            <button className="btn">view more</button>
                        </div>
                        {
                            isLogin ? <div className="action">
                                <button onClick={() => dispatch(editProduct({value}))}>
                                    <i className="fas fa-pencil"/>
                                </button>
                                <button onClick={() => deleteProduct(value.id)}><i className="fas fa-trash"/></button>
                            </div> : null
                        }
                    </div>
                }).reverse()
            }
        </div>
    )
}