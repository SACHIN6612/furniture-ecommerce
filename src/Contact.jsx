import Header from "./Header";
import Footer from "./Footer";

function Contact() {
    return (
        <>
            {/* Contact Form */}
            <Header/>
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
             <Footer/>
        </>
    )
}

export default Contact;