function Footer() {
    return(
        <>
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

export default Footer;