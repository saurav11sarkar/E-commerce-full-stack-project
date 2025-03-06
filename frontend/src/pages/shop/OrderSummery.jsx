import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../redux/features/cart/cartSlice";

const OrderSummery = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.cart.products);
  const { tax, taxRate, totalPrice, grandTotal, selectedItems } = useSelector(
    (store) => store.cart
  );

  const handleClear = () => {
    dispatch(clearCart());
  };
  return (
    <div className="bg-primary-light rounded text-base">
      <div style={{ padding: "16px 24px" }} className="space-y-5">
        <h2 className="text-xl text-text-dark">Order Summery</h2>
        <p style={{ marginTop: "8px" }} className="text-text-dark">
          Selected Item: {selectedItems}
        </p>
        <p style={{ marginTop: "8px" }} className="text-text-dark">
          Total Price: {totalPrice.toFixed(2)}
        </p>
        <p style={{ marginTop: "8px" }} className="text-text-dark">
          Tax ({taxRate * 100}%): ${tax.toFixed(2)}
        </p>
        <h3 style={{ marginTop: "8px" }} className="font-bold">
          GrandTotal : ${grandTotal.toFixed(2)}
        </h3>

        <div style={{ padding: "0px 16px", marginBottom: "24px" }} className="">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleClear();
            }}
            style={{
              padding: "6px 12px",
              marginBottom: "16px",
              marginTop: "20px",
            }}
            className="bg-red-500 text-white rounded-md flex justify-between items-center"
          >
            <span>Clear cart</span>{" "}
            <i
              style={{ marginLeft: "8px" }}
              className="ri-delete-bin-6-line"
            ></i>{" "}
          </button>
          <button
            style={{ padding: "6px 12px", marginTop: "20px" }}
            className="bg-green-500 text-white rounded-md flex justify-between items-center"
          >
            <span>Proced Checkout</span>{" "}
            <i style={{ marginLeft: "8px" }} className="ri-bank-card-line"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummery;
