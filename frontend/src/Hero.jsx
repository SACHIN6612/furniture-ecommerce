
function Hero() {
  return (
    <>
      {/* Home */}
      <section className="home" id="home" style={{ backgroundImage: `url(${bg})` }}>
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
    </>

  )
}

export default Hero;