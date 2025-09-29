import Footer from "./Footer";
import Header from "./Header";
import { useState, useEffect } from 'react';

function Checkout() {
    const [cartdata, SetCartData] = useState([]);
    const [subtotal, SetSubTotal] = useState(0);
    const [shipping, SetShipping] = useState(30);
    const [total, SetTotal] = useState(0);


    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        company: "",
        address: "",
        city: "",
        country: "",
        postcode: "",
        mobile: "",
        email: "",
        payment: ""
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        let furniture_data = JSON.parse(localStorage.getItem('furniture_data')) || [];
        SetCartData(furniture_data);

        let sub_total = 0;
        furniture_data.forEach((item) => {
            sub_total += parseFloat(item.price) * parseFloat(item.quantity);
        });

        sub_total = parseFloat(sub_total.toFixed(2));
        let totalValue = sub_total + shipping;

        SetSubTotal(sub_total);
        SetTotal(totalValue);
    }, []);

    // placeorder form validation
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const validateForm = () => {
        let newErrors = {};

        if (!formData.firstName.trim()) newErrors.firstName = "First Name is required";
        if (!formData.lastName.trim()) newErrors.lastName = "Last Name is required";
        if (!formData.address.trim()) newErrors.address = "Address is required";
        if (!formData.city.trim()) newErrors.city = "City is required";
        if (!formData.postcode.trim()) newErrors.postcode = "Postcode is required";
        if (!formData.payment) {
            newErrors.payment = "Please select a payment method";
        }

        if (!/^[0-9]{10}$/.test(formData.mobile)) {
            newErrors.mobile = "Enter valid 10-digit Mobile number";
        }

        // ✅ Email regex
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Enter a valid Email address";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const PlaceOrder = () => {
        if (validateForm()) {
            const orderDetails = {
                customer: formData,
                items: cartdata,
                subtotal: subtotal,
                shipping: shipping,
                total: total
            };

            // Save order details in localStorage
            localStorage.setItem("orderDetails", JSON.stringify(orderDetails));
            localStorage.removeItem("furniture_data");

            // Redirect to Thankyou page
            window.location.href = "/thankyou";
        } else {
            alert("Please fill all the details.");
            return;
        }
    };

    return (
        <>
            <Header />
            {/* Checkout Container */}
            <div className="checkout-container">
                <h2>Checkout</h2>
                <div className="checkout-grid">
                    <div className="order-summary">
                        <h3>Order Products</h3>
                        <table className="cart-table">
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Title</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>

                                {cartdata.length > 0 ? (
                                    cartdata.map((item) => (
                                        <tr key={item.id}>
                                            <td>
                                                <img src={item.image} alt={item.title} />
                                            </td>
                                            <td>{item.title}</td>
                                            <td>₹{parseFloat(item.price).toFixed(2)}</td>
                                            <td>{item.quantity}</td>
                                            <td>₹{(parseFloat(item.price) * parseFloat(item.quantity)).toFixed(2)}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5">No items in cart</td>
                                    </tr>
                                )}


                            </tbody>
                        </table>
                    </div>

                    {/* Left: Billing Form */}
                    <div className="billing-form">
                        <h3>Billing Details</h3>
                        <form id="checkoutForm">
                            <input
                                type="text"
                                name="firstName"
                                placeholder="First Name"
                                value={formData.firstName}
                                onChange={handleChange}
                            />
                            {errors.firstName && <p className="text-danger">{errors.firstName}</p>}
                            <input
                                type="text"
                                name="lastName"
                                placeholder="Last Name"
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                            {errors.lastName && <p className="text-danger">{errors.lastName}</p>}
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            {errors.email && <p className="text-danger">{errors.email}</p>}
                            <input
                                type="tel"
                                name="mobile"
                                placeholder="Mobile Number"
                                value={formData.mobile}
                                onChange={handleChange}
                            />
                            {errors.mobile && <p className="text-danger">{errors.mobile}</p>}
                            <input
                                type="text"
                                name="address"
                                placeholder="Address"
                                value={formData.address}
                                onChange={handleChange}
                            />
                            {errors.address && <p className="text-danger">{errors.address}</p>}
                            <input
                                type="text"
                                name="city"
                                placeholder="City"
                                value={formData.city}
                                onChange={handleChange}
                            />
                            {errors.city && <p className="text-danger">{errors.city}</p>}
                            <input
                                type="text"
                                name="postcode"
                                placeholder="Postal Code"
                                value={formData.postcode}
                                onChange={handleChange}
                            />
                            {errors.postcode && <p className="text-danger">{errors.postcode}</p>}

                            {/* Right: Order Summary */}
                            <div className="order-summary">
                                <h3>Order Summary</h3>
                                <div className="summary-item">
                                    <span>Subtotal</span>
                                    <span>₹{subtotal}</span>
                                </div>
                                <div className="summary-item">
                                    <span>Shipping</span>
                                    <span>₹{shipping}</span>
                                </div>
                                <hr />
                                <div className="summary-item total">
                                    <span>Total</span>
                                    <span>₹{total}</span>
                                </div>
                            </div>

                            <h3>Payment Method</h3>
                            <label>
                                <input
                                    type="radio"
                                    name="payment"
                                    value="Credit Card"
                                    checked={formData.payment === "Credit Card"}
                                    onChange={handleChange}
                                /> Credit Card
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="payment"
                                    value="PayPal"
                                    checked={formData.payment === "PayPal"}
                                    onChange={handleChange}
                                /> PayPal
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="payment"
                                    value="Cash on Delivery"
                                    checked={formData.payment === "Cash on Delivery"}
                                    onChange={handleChange}
                                /> Cash on Delivery
                            </label>

                            {errors.payment && <p className="text-danger">{errors.payment}</p>}


                            <button onClick={PlaceOrder}
                                type="button"
                                className="btn border-secondary py-3 px-4 text-uppercase w-100 text-primary"
                            >
                                Place Order
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Checkout;