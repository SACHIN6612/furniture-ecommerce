
import "./style.css";
import { useState } from "react";
import { useEffect } from "react";
import Footer from "./Footer";
import Header from "./Header";

function Cart() {

    const [cartdata, SetCartData] = useState([]);
    const [subtotal, SetSubTotal] = useState(0);
    const [shipping, SetShipping] = useState(30);
    const [total, SetTotal] = useState(0);

    useEffect(() => {
        let furniture_data = JSON.parse(localStorage.getItem('furniture_data') || '[]');
        SetCartData(furniture_data)

        let sub_total = 0
        let total = 0

        {
            furniture_data.map((item) => {
                sub_total = sub_total + parseFloat(item.price) * parseFloat(item.quantity)
            })
        }

        sub_total = sub_total.toFixed(2)

        total = parseFloat(sub_total) + parseFloat(shipping)

        SetSubTotal(sub_total)
        SetTotal(total)

    }, [cartdata])

    const deleteProduct = (id) => {
        let furn_data = JSON.parse(localStorage.getItem('furniture_data'));

        // Remove the clicked item
        const furniture_data = furn_data.filter(item => item.id !== id);

        // Save new data in localStorage
        localStorage.setItem('furniture_data', JSON.stringify(furniture_data));

        // Update state
        SetCartData(furniture_data);
    };

    const increase = (id) => {
        let flag = 0

        cartdata.map((item) => {
            if (item.id == id) {
                item.quantity = parseInt(item.quantity) + 1

                if (item.quantity > item.stock) {
                    alert("Only " + item.stock + " in Stock")
                    flag = 1
                }
            }
        })

        if (flag == 0) {
            localStorage.setItem('furniture_data', JSON.stringify(cartdata))
            SetCartData(furniture_data)
        }
    }

    const decrease = (id) => {
        let flag = 0

        cartdata.map((item) => {
            if (item.id == id) {
                item.quantity = parseInt(item.quantity) - 1

                if (item.quantity > item.stock) {
                    alert("Only " + item.stock + " in stock")
                    flag = 1
                }
            }
        })

        if (flag == 0) {
            localStorage.setItem('furniture_data', JSON.stringify(cartdata))
            SetCartData(furniture_data)
        }
    }

    return (
        <>
            <Header />

            <div className="cart-container">
                <h2>Shopping Cart</h2>

                {(cartdata) ? cartdata.map((item) => (

                    <div className="cart-item">
                        <img src={item.image} alt="Product Image" />
                        <div className="item-details">
                            <h4>{item.title}</h4>
                            <p>₹{item.price}</p>
                            <div className="quantity-control">
                                <button onClick={() => decrease(item.id)}><i className="fa fa-minus" /></button>
                                <input type="text" value={item.quantity} />
                                <button onClick={() => increase(item.id)}><i className="fa fa-plus" /></button>
                                <p className="mb-0 mt-4"><span className="bold">₹{(parseFloat(item.price) * parseFloat(item.quantity)).toFixed(2)}</span></p>
                                <button onClick={() => deleteProduct(item.id)} className="deleteproduct">
                                    <i className="fa fa-times" />
                                </button>
                            </div>
                        </div>
                        <div className="item-total">{item.total}</div>
                    </div>

                )) : 'No Cart Data'}

                <div className="cart-summary">
                    <p className="bold">₹{subtotal}</p>
                    <p>₹{shipping}</p>
                    <hr />
                    <h3>₹{total}</h3>
                    <a href="/checkout" className="checkout-btn">Proceed to Checkout</a>
                </div>
            </div>
            <Footer />

        </>

    )
}

export default Cart;