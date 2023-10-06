import React, { useEffect, useState } from "react";
import OrderConfirmation from "./OrderConfirmation";

function ConfirmationPage() {
  const [order, setOrder] = useState([]);
  const [items, setItems] = useState([]);
  useEffect(() => {
    const path = window.location.pathname;
    const id = path.split(":").pop();

    const getOrder = async () => {
      const response = await fetch(`/api/orders/${id}`);
      const data = await response.json();
      setOrder(data);
      setItems(data.items);
    };
    getOrder();
  }, []);

  return (
    <div>
      <OrderConfirmation order={order} items={items} />
    </div>
  );
}

export default ConfirmationPage;
