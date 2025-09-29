import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react'
import axios from "axios";
import "./style.css";
import Header from "./Header";
import Footer from "./Footer";

function Shopdetails() {

    let params = useParams();

    const [product, setProduct] = useState([]);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {

        axios.get(`http://localhost:5000/products/${params.id}`).then((response) => {
            setProduct(response.data)
        }).catch((error) => {
            console.log(error);
        })

    }, [])

    const formatDate = (reviewdate) => {
        const date = new Date(reviewdate);

        reviewdate = date.toLocaleString('en-IN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });

        return reviewdate;
    }

    const increase = () => {
        if (quantity < product.stock) {
            let qty = quantity;
            qty = qty + 1;
            setQuantity(qty)
        } else {
            alert("Only " + product.stock + " in stock");
        }
    }

    const decrease = () => {
        if (quantity > 1) {
            let qty = quantity;
            qty = qty - 1;
            setQuantity(qty)
        }
    }

    const updateCart = () => {
        let id = product.id
        let name = product.name
        let price = product.price
        let qty = quantity
        let img = product.thumbnail_image
        let stock = product.stock
        let flag = 0

        let product_data = { 'id': id, 'title': name, 'price': price, 'quantity': qty, 'stock': stock, 'image': img }

        let furniture_data = localStorage.getItem('furniture_data') ? JSON.parse(localStorage.getItem('furniture_data')) : []

        furniture_data.map((item) => {
            if (item.id == id) {
                item.quantity = qty
                flag = 1
            }
        })

        if (flag == 0) {
            furniture_data.push(product_data)
        }

        localStorage.setItem('furniture_data', JSON.stringify(furniture_data));

        window.location.href = "/cart"
    }

    return (
        <>
            <Header />
            <div className="shop-details-container">
                <div className="product-image">
                    <img src={product.thumbnail_image} alt="Product Image" />
                </div>
                <div className="product-info">
                    <h2>{product.name}</h2>

                    <div className="d-flex left-rating">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <i
                                key={star}
                                className={
                                    product.rating >= star
                                        ? "fa fa-star text-warning me-1"
                                        : "fa fa-star text-secondary me-1"
                                }
                            ></i>
                        ))}
                    </div>

                    <p className="price">₹{product.price}</p>
                    <p className="description">
                        {product.description}
                    </p>
                    <div className="info-item">
                        <strong>{product.warrantyInformation}</strong>
                    </div>
                    <div className="info-item">
                        <strong>{product.shippingInformation}</strong>
                    </div>
                    <div className="info-item">
                        <strong className="available" style={{ fontSize: 20, color: "green" }}>{product.availabilityStatus}</strong>
                    </div>

                    <div className="quantity-wrapper">
                        <label htmlFor="quantity">{product.quantity}</label>
                        <div className="quantity-control">
                            <button onClick={decrease} className="qty-btn">-</button>
                            <input type="text" id="quantity" value={quantity} />
                            <button onClick={increase} className="qty-btn">+</button>
                        </div>
                    </div>

                    <a href="/cart" onClick={updateCart} className="add-to-cart">Add to Cart</a>
                </div>
            </div>

            <section className="reviews">
                <h2>Customer Reviews</h2>

                {/* {(product != '') ? product.map((review) => (

                    <div className="review-card">
                        <img src="https://i.pravatar.cc/80?img=1" alt="User photo" />
                        <div className="review-content">
                            <p className="dateset">
                                {formatDate(review.date)}
                            </p>
                            <h4>{review.reviewerName}</h4>
                            <div className="d-flex left-rating">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <i
                                        key={star}
                                        className={
                                            prod.rating >= star
                                                ? "fa fa-star text-warning me-1"
                                                : "fa fa-star text-secondary me-1"
                                        }
                                    ></i>
                                ))}
                            </div>
                            <p>{review.comment}</p>
                            <p>{review.reviewerEmail}</p>
                        </div>
                    </div>

                )) : ""} */}

            </section>
            <Footer />
        </>

    )
}

export default Shopdetails;