import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Header from './Header'
import Footer from './Footer'

function Shop() {

  const [products, setProducts] = useState([]);

  // Fetch paginated products whenever currentPage or limit changes
  useEffect(() => {
        axios.get(`http://localhost:5000/products`).then((response) => {
            setProducts(response.data.products)
        }).catch((error) => {
          console.error(error)
        })
    }, [])

  return (
    <>
      <Header />
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
      <Footer />
    </>
  )
}

export default Shop;