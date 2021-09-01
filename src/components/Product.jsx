import "../assets/css/Product.scss"


export const Product = (props) => {
    const product = props.setProduct


    function formatPrice(input) {
        return input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    }
    /*const [quantity, setQuantity] = useState("")
    function handleQuantity(num) {
        setQuantity(num)
    }*/

    return (
        <div className="list-product">
            {
                product.map((value) => {
                    return <div className="item" key={value.id}>
                        <div className="image">
                            <img src={'https://thhxxx.github.io/image/adidas/' + value.image} alt={value.name}/>
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
                    </div>
                })
            }
        </div>
    )
}