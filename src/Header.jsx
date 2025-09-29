function Header() {
  return (
    <>
      {/* Header Start */}
      <header className="header">
        <a href="/" className="logo">
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
    </>

  )
}

export default Header;