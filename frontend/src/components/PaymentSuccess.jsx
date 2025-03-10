import { useEffect, useState } from "react";
import { getBaseUrl } from "../utils/baseUrl";

const PaymentSuccess = () => {
  const [order, setOrder] = useState(null);
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const sessionId = query.get("session_id");

    if (sessionId) {
      fetch(`${getBaseUrl()}/api/orders/confirm-payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ session_id: sessionId }),
      })
        .then((res) => res.json())
        .then((data) => setOrder(data.data))
        .catch((err) => console.error("Error confirming payment", err));
    }
  }, []);

  console.log("order", order);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      {/* {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>} */}
      {order && (
        <div>
          <h2>Payment Successful! 🎉</h2>
          <p>Order ID: {order.orderId}</p>
          <p>Total Amount: ${order.amount}</p>
          <p>Thank you for your purchase!</p>
        </div>
      )}
    </div>
  );
};

export default PaymentSuccess;
