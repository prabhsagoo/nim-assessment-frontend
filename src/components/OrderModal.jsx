import React, { useState } from "react";
import { useNavigate } from "react-router";
import styles from "./styles/OrderModal.module.css";

function OrderModal({ order, setOrderModal }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const placeOrder = async () => {
    if (!name) {
      const el = document.getElementById("name");
      const error = document.getElementById("nameError");

      el.style.border = "2px solid red";
      error.style.visibility = "visible";
    } else if (phone.length !== 14) {
      const el = document.getElementById("phone");
      const error = document.getElementById("phoneError");

      el.style.border = "2px solid red";
      error.style.visibility = "visible";
    }
    // else if (phone.length === 10) {
    //   const el = document.getElementById("phone");
    //   el.value = `(${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(
    //     6
    //   )}`
    // }
    else if (!address) {
      const el = document.getElementById("address");
      const error = document.getElementById("addressError");

      el.style.border = "2px solid red";
      error.style.visibility = "visible";
    } else {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          phone,
          address,
          items: order
        })
      });
      await response.json().then((res) => {
        navigate(`/order-confirmation/:${res.id}`);
      });
    }
  };

  const checkInputs = (fieldName, errorName) => {
    const el = document.getElementById(fieldName);
    const error = document.getElementById(errorName);

    el.style.border = "1px solid #c1afcc";
    error.style.visibility = "hidden";
  };
  return (
    <>
      <div
        label="Close"
        className={styles.orderModal}
        onKeyPress={(e) => {
          if (e.key === "Escape") {
            setOrderModal(false);
          }
        }}
        onClick={() => setOrderModal(false)}
        role="menuitem"
        tabIndex={0}
      />
      <div className={styles.orderModalContent}>
        <h2>Place Order</h2>
        <form className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name">
              Name
              <input
                onChange={(e) => {
                  e.preventDefault();
                  checkInputs("name", "nameError");
                  setName(e.target.value);
                }}
                type="text"
                id="name"
              />
              <h6 id="nameError">*Required field, Please enter your name!</h6>
            </label>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="phone">
              Phone
              <input
                onChange={(e) => {
                  e.preventDefault();
                  checkInputs("phone", "phoneError");
                  if (e.target.value.length === 10) {
                    setPhone(
                      `(${e.target.value.substring(
                        0,
                        3
                      )}) ${e.target.value.substring(
                        3,
                        6
                      )}-${e.target.value.substring(6)}`
                    );
                  } else {
                    setPhone(e.target.value);
                  }

                  // setPhone(e.target.value);
                }}
                type="phone"
                id="phone"
                value={phone}
              />
              <h6 id="phoneError">
                *Required field, Please enter valid 10 digit phone number!
              </h6>
            </label>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="address">
              Address
              <input
                onChange={(e) => {
                  e.preventDefault();
                  checkInputs("address", "addressError");
                  setAddress(e.target.value);
                }}
                type="phone"
                id="address"
              />
              <h6 id="addressError">
                *Required field, Please enter your address!
              </h6>
            </label>
          </div>
        </form>

        <div className={styles.orderModalButtons}>
          <button
            className={styles.orderModalClose}
            onClick={() => setOrderModal(false)}
          >
            Close
          </button>
          <button
            onClick={() => {
              placeOrder();
            }}
            className={styles.orderModalPlaceOrder}
          >
            Place Order
          </button>
        </div>
      </div>
    </>
  );
}

export default OrderModal;
