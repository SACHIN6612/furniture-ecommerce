import Header from './Header';
import Footer from './Footer';
import { useState, useEffect } from 'react';

function ThankYou() {
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const storedOrder = localStorage.getItem("orderDetails");
    if (storedOrder) {
      setOrderDetails(JSON.parse(storedOrder));
    }
  }, []);

  return (
    <>
      <Header />
      <div className="container-thankyou">
        <h1 className="text-thankyou">🎉 Thank You!</h1>
        <p className="text-placed">Your order has been placed successfully.</p>

        {orderDetails && (
          <div className="customer-details">
            <h3>Customer Details</h3>
            <ul>
              <li><strong>Name:</strong> {orderDetails.customer.firstName} {orderDetails.customer.lastName}</li>
              <li><strong>Email:</strong> {orderDetails.customer.email}</li>
              <li><strong>Mobile:</strong> {orderDetails.customer.mobile}</li>
              <li><strong>Address:</strong> {orderDetails.customer.address}, {orderDetails.customer.city}, {orderDetails.customer.country} - {orderDetails.customer.postcode}</li>
            </ul>

            <h3 className="order-table">Order Summary</h3>
            <table className="table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {orderDetails.items.map((item, i) => (
                  <tr key={i}>
                    <td>{item.title}</td>
                    <td>₹{item.price}</td>
                    <td>{item.quantity}</td>
                    <td>₹{(item.price * item.quantity).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="3" className="text-end"><strong>Subtotal:</strong></td>
                  <td>₹{orderDetails.subtotal}</td>
                </tr>
                <tr>
                  <td colSpan="3" className="text-end"><strong>Shipping:</strong></td>
                  <td>₹{orderDetails.shipping}</td>
                </tr>
                <tr>
                  <td colSpan="3" className="text-end"><strong>Grand Total:</strong></td>
                  <td>₹{orderDetails.total.toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}

        <div className="button-redirecthome">
          <a href="/" className="btn btn-primary">Go to Home</a>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ThankYou;
