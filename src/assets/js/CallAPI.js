import axios from "axios";

export async function fetchProduct() {
    try {
        let {data} = await axios.get('http://localhost:2210/adidas')
        return data
    } catch (e) {
        console.log(e)
    }
}