import "./style.css"; // Adjust the path as needed
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

function App() {

    const [products, setProducts] = useState([]);
    const [limit, setLimit] = useState(9);
    const [skip, setSkip] = useState(0);

    useEffect(() => {
        axios.get(`http://localhost:5000/all-products`).then((response) => {
            setProducts(response.data)
        }).catch((error) => {

        })
    }, [])

    return (
        <>
            {/* Header Start */}
            <header className="header">
                <a href="#" className="logo">
                    Brand <span>X.</span>
                </a>
                <div className="bx bx-menu" id="menu-icon" />
                <ul className="navbar">
                    <li>
                        <a href="/">Home</a>
                    </li>
                    <li>
                        <a href="/shop">Shop</a>
                    </li>
                    <li>
                        <a href="/shopdetails">Shopdetails</a>
                    </li>
                    <li>
                        <a href="/about">About</a>
                    </li>
                    <li>
                        <a href="/contact">Contact</a>
                    </li>
                    <li>
                        <a href="/cart"><i className="fa-solid fa-cart-shopping"></i></a>
                    </li>
                </ul>

            </header>
            {/* Header End */}

            {/* Home */}
            <section className="home" id="home">
                <div className="home-text">
                    <h1>
                        <span>Make</span>Your Confort <br /> Is Our <span>Happiness</span>
                    </h1>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, <br /> sed do
                        eiusmod tempor incididunt dolore magna aliqua.
                    </p>
                    <a href="shop" className="btn">
                        Shop Now
                    </a>
                </div>
            </section>

            {/* Shop */}
            <section className="shop" id="shop">
                <div className="heading">
                    <span>New Arrival</span>
                    <h2>Shop Now</h2>
                </div>
                <div className="shop-container">
                    {/* Box 1 */}

                    {
                        (products) ?

                            products.map((prod) => (

                                <div className="box">
                                    <img src={prod.thumbnail_image} alt="Gray Chair" />
                                    <div className="title-price">
                                        <h3>{prod.name}</h3>
                                        <p className="description">{prod.description}</p>

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

                                        <div className="price-cart">
                                            <span className="price">₹{prod.price}</span>
                                            <a href={"/product/" + prod.id} className="cart-btn">{" "}
                                                Add to Cart
                                            </a>
                                        </div>
                                    </div>
                                </div>

                            ))
                            : ''
                    }


                </div>
            </section>

            {/* About */}
            <section className="about" id="about">
                <div className="about-img">
                    <img src="/img/about.jpg" alt="about" />
                </div>
                <div className="about-text">
                    <span>About Us</span>
                    <h2>
                        Furniture is important part <br />
                        for confort
                    </h2>
                    <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting
                        industry. Lorem Ipsum has been the industry's standard dummy text ever
                        since the 1500s, when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book. It has survived not only five
                        centuries, but also the leap into electronic typesetting, remaining
                        essentially unchanged. It was popularised in the 1960s with the release
                        of Letraset sheets containing Lorem Ipsum passages, and more recently
                        with desktop publishing software like Aldus PageMaker including versions
                        of Lorem Ipsum.
                    </p>
                    <p>
                        Lorem ipsum is a dummy or placeholder text commonly used in graphic
                        design, publishing, and web development.
                    </p>
                    <a href="#shop" className="btn1">
                        Learn More.
                    </a>
                </div>
            </section>

            {/* New Arrival */}
            <section className="new" id="new">
                <div className="heading">
                    <span>New Collection</span>
                    <h2>Best Sellings</h2>
                </div>
                {/* Content */}
                <div className="new-container">


                    {/* Box 1 */}

                    {
                        (products) ?

                            products.map((prod) => (

                                <div className="box">
                                    <img src={prod.thumbnail_image} alt="Gray Chair" />
                                    <div className="title-price">
                                        <h3>{prod.name}</h3>
                                        <p className="description">{prod.description}</p>

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

                                        <div className="price-cart">
                                            <span className="price">₹{prod.price}</span>
                                            <a href={"/product/" + prod.id} className="cart-btn">
                                                Add to Cart
                                            </a>
                                        </div>
                                    </div>
                                </div>

                            ))
                            : ''
                    }


                </div>
            </section>

            {/* Contact Form */}
            <section className="contact" id="contact">
                <div className="heading">
                    <span>Contact Us</span>
                    <h2>Contact Now For Any Information!</h2>
                </div>
                <form className="contact-form">
                    <input type="text" name="name" placeholder="Enter Your Name" required="" />
                    <input type="email" name="email" placeholder="Enter Your Email" required="" />
                    <textarea
                        name="message"
                        placeholder="Enter Your Message"
                        rows={5}
                    />
                    <button type="submit">Send Message</button>
                </form>
            </section>

            {/* Footer Start */}
            <footer className="footer">
                <div className="footer-container">
                    {/* Brand */}
                    <div className="footer-box">
                        <h3>
                            Brand <span>X.</span>
                        </h3>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt amet
                            minus mollitia impedit qui asperiores!
                        </p>
                        <div className="social-icons">
                            <a href="#">
                                <i className="fab fa-facebook-f" />
                            </a>
                            <a href="#">
                                <i className="fab fa-twitter" />
                            </a>
                            <a href="#">
                                <i className="fab fa-instagram" />
                            </a>
                        </div>
                    </div>
                    {/* Services */}
                    <div className="footer-box">
                        <h3>Services</h3>
                        <ul>
                            <li>
                                <a href="#">Product</a>
                            </li>
                            <li>
                                <a href="#">Help &amp; Support</a>
                            </li>
                            <li>
                                <a href="#">Pricing</a>
                            </li>
                            <li>
                                <a href="#">FAQ</a>
                            </li>
                        </ul>
                    </div>
                    {/* Product */}
                    <div className="footer-box">
                        <h3>Product</h3>
                        <ul>
                            <li>
                                <a href="#">Sofa's</a>
                            </li>
                            <li>
                                <a href="#">Chair's</a>
                            </li>
                            <li>
                                <a href="#">Living Room</a>
                            </li>
                            <li>
                                <a href="#">Office</a>
                            </li>
                        </ul>
                    </div>
                    {/* Contact */}
                    <div className="footer-box">
                        <h3>Contact</h3>
                        <p>New York City, USA 10004 +1</p>
                        <p>100 1004 0001</p>
                        <p>brian@brandx.com</p>
                    </div>
                </div>
            </footer>
            {/* Footer End */}
        </>
    )
}

export default App;