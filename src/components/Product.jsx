import "../assets/css/Product.scss"
import {useDispatch} from "react-redux";
import {editProduct} from "../reducers/ProductReducer";
import axios from "axios";
import {useHistory} from "react-router-dom";

export const Product = (props) => {
    const product = props.setProduct
    const isLogin = true
    const dispatch = useDispatch()
    const history = useHistory()


    function formatPrice(input) {
        return input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    }


    async function deleteProduct(id, name) {
        try {
            // eslint-disable-next-line no-restricted-globals
            if (confirm("Are you sure want to delete: " + name + "?")) {
                await axios.delete("http://localhost:2210/nike/" + id)
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
                            <p className="price">
                            {
                                (value.sale === "0")
                                    ? <>{formatPrice(value.price)}</>
                                    :
                                    <><s>{formatPrice(value.price)}</s>
                                        <span>{formatPrice(value.price / 100 * (100 - value.sale))}</span>
                                    </>
                            }
                            </p>
                            <button onClick={() => {
                                history.push({
                                    pathname: "product-detail/" + value.name,
                                    state: value
                                })
                            }} className="btn">view more
                            </button>
                        </div>
                        {
                            isLogin ? <div className="action">
                                <button onClick={() => dispatch(editProduct({value}))}>
                                    <i className="fas fa-pencil"/>
                                </button>
                                <button onClick={() => deleteProduct(value.id, value.name)}><i
                                    className="fas fa-trash"/></button>
                            </div> : null
                        }
                    </div>
                }).reverse()
            }
        </div>
    )
}