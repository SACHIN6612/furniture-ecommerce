import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Header from './Header'
import Footer from './Footer'

function Shop() {

  const [products, setProducts] = useState([]);
  const [limit, setLimit] = useState(5);
  const [skip, setSkip] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0); // Track current page

  // Fetch paginated products whenever currentPage or limit changes
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/products?limit=${limit}&page=${currentPage + 1}`);
        setProducts(response.data.products || []);
        if (response.data.total !== undefined) {
          setTotalPages(Math.ceil(response.data.total / limit));
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [currentPage, limit]);

  // Pagination handlers
  const pageChange = (page) => setCurrentPage(page);
  const goToPreviousPage = () => currentPage > 0 && setCurrentPage(currentPage - 1);
  const goToNextPage = () =>
    currentPage < totalPages - 1 && setCurrentPage(currentPage + 1);


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

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="col-12">
            <div className="pagination d-flex justify-content-center mt-5">
              <button
                className={`rounded me-2 ${currentPage === 0 ? "btn-secondary" : "btn-outline-primary"
                  }`}
                onClick={goToPreviousPage}
                disabled={currentPage === 0}
              >
                «
              </button>

              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => pageChange(index)}
                  className={`rounded me-1 ${currentPage === index ? "btn-primary" : "btn-outline-primary"
                    }`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                className={`rounded ms-2 ${currentPage === totalPages - 1
                  ? ""
                  : ""
                  }`}
                onClick={goToNextPage}
                disabled={currentPage === totalPages - 1}
              >
                »
              </button>
            </div>
          </div>
        )}


      </section>
      <Footer />
    </>
  )
}

export default Shop;