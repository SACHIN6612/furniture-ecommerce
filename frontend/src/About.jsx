import Footer from "./Footer";
import Header from "./Header";

function About() {
    return (
        <>
            <Header />
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
            <Footer />
        </>

    )
}

export default About;