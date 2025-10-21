import { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
        ...formData,
        [name]: value
    });
  };

  // Validate Inputs
  const validate = () => {
    const newErrors = [];
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }
    if (!formData.message.trim()) {
      newErrors.message = "Message cannot be empty";
    }
    return newErrors;
  };

  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log("Form Data Submitted:", formData);
      setSubmitted(true);

      // Reset form
      setFormData({
        name: "",
        email: "",
        message: ""
    });

      // Hide message after 3 seconds
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <>
      <Header />
      <section className="contact" id="contact">
        <div className="heading">
          <span>Contact Us</span>
          <h2>Contact Now For Any Information!</h2>
        </div>

        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          <input
            type="text"
            name="name"
            placeholder="Enter Your Name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <small className="error">{errors.name}</small>}

          <input
            type="email"
            name="email"
            placeholder="Enter Your Email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <small className="error">{errors.email}</small>}

          <textarea
            name="message"
            rows="5"
            placeholder="Write Your Message"
            value={formData.message}
            onChange={handleChange}
          ></textarea>
          {errors.message && <small className="error">{errors.message}</small>}

          <button type="submit" className="btn">
            Send Message
          </button>

          {submitted && (
            <p className="success">✅ Message Sent Successfully!</p>
          )}
        </form>
      </section>
      <Footer />
    </>
  );
}

export default Contact;
