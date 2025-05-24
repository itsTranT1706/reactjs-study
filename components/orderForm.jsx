// src/components/OrderForm.jsx
import React, { useState } from 'react';
import { createOrder } from '../api/orderApi';
import { toast } from '../untils/toast';

function OrderForm({ onCreated }) {
  const [customerName, setCustomerName] = useState('');
  const [status, setStatus] = useState('Pending');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!customerName) {
      toast.fire({ icon: 'warning', title: 'Vui lòng nhập tên khách hàng!' });
      return;
    }

    try {
      await createOrder({ customerName, status });
      setCustomerName('');
      setStatus('Pending');
      onCreated();
      toast.fire({ icon: 'success', title: 'Tạo đơn hàng thành công!' });
    } catch (error) {
      toast.fire({ icon: 'error', title: 'Lỗi khi tạo đơn!' });
    }
  };

  return (
    <div className="order-form">
      <h2>Tạo đơn hàng mới</h2>
      <form onSubmit={handleSubmit}>
        <label>Tên khách hàng:</label>
        <input
          type="text"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          placeholder="Nhập tên khách hàng"
        />
        <label>Trạng thái:</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Pending">Chờ xử lý</option>
          <option value="Completed">Hoàn tất</option>
          <option value="Cancelled">Đã huỷ</option>
        </select>
        <button type="submit">Tạo đơn</button>
      </form>
    </div>
  );
}

export default OrderForm;
