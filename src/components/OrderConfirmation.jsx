import React from "react";
import styles from "./styles/OrderConfirmation.module.css";

function OrderConfirmation({ order, items }) {
  return (
    <div className={styles.form}>
      <div className={styles.form2}>
        <h2>
          Thank you for your order,
          {` ${order.name}`}!
        </h2>
      </div>
      <div className={styles.form3}>
        <div className={styles.leftBar}>
          <h3>Order ID: &nbsp;&nbsp;&nbsp;&nbsp;{order.id}</h3>
          <h3>
            Name: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{order.name}
          </h3>
          <h3>Address: &nbsp;&nbsp;&nbsp;&nbsp;{order.address}</h3>
          <h3>Contact: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{order.phone}</h3>
          {/* <h3>Contact: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{items[0].quantity}</h3> */}
          {
            // console.log(order.items[1].item.name)
          }
        </div>
        <div className={styles.rightBar}>
          <div className={styles.rightBarHeadings}>
            <h3>Item</h3>
            <h3>Price</h3>
            <h3>Qty</h3>
          </div>
          <ul>
            {items?.map((item, i) => (
              <li>
                <h3 style={{ paddingLeft: "7%" }}>{`${i + 1}. ${
                  item.item.name
                }`}</h3>
                <h3 style={{ textAlign: "center" }}>{`$${item.item.price}`}</h3>
                <h3 style={{ textAlign: "center" }}>{`${item.quantity}`}</h3>
              </li>
            ))}
          </ul>
          <div className={styles.total}>
            {" "}
            <h3>
              Total: $
              {items !== undefined
                ? (
                    items.reduce(
                      (total, item) => total + item.item.price * item.quantity,
                      0
                    ) * 1.05
                  ).toFixed(2)
                : ""}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderConfirmation;
