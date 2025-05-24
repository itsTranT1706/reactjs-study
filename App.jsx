// src/App.jsx
import React, { useEffect, useState } from 'react';
import './index.css';
import { getAllOrders } from './api/orderApi';
import OrderList from './components/orderList';
import OrderForm from './components/orderForm';

function App() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const res = await getAllOrders();
    setOrders(res.data);
    // console.log(res);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (

    <div className="container">
      <h1>Quản lý đơn hàng</h1>
      <OrderForm onCreated={fetchOrders} />
      <OrderList orders={orders} refresh={fetchOrders} />
    </div>
  );
}

export default App;
