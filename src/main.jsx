import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Hero from './Hero.jsx'
import About from './About.jsx'
import Shop from './Shop.jsx'
import Contact from './Contact.jsx'
import Cart from './Cart.jsx'
import Shopdetails from './Shopdetails.jsx'
import Checkout from './Checkout.jsx'
import ThankYou from './Thankyoupage.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/">
        <Route index element={<App />} />
        <Route path="hero" element={<Hero />} />
        <Route path="shop" element={<Shop />} />
        <Route path="product/:id" element={<Shopdetails />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="thankyou" element={<ThankYou />} />
      </Route>
    </Routes>
  </BrowserRouter>,
)
