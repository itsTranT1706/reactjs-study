// src/components/OrderDetail.jsx
import React, { useEffect, useState } from 'react';
import { getOrderById, updateOrder } from '../api/orderApi';
import { toast } from '../untils/toast';

function OrderDetail({ orderId, onClose, onUpdated }) {
  const [order, setOrder] = useState(null);
  const [form, setForm] = useState({ customerName: '', status: '' });

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getOrderById(orderId);
        setOrder(data);
        setForm({ customerName: data.customerName, status: data.status });
      } catch (err) {
        toast.fire({ icon: 'error', title: 'Không tải được chi tiết!' });
        onClose();
      }
    }
    fetchData();
  }, [orderId, onClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateOrder(orderId, form);
      toast.fire({ icon: 'success', title: 'Cập nhật thành công!' });
      onUpdated();
      onClose();
    } catch {
      toast.fire({ icon: 'error', title: 'Cập nhật thất bại!' });
    }
  };

  if (!order) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Chi tiết đơn hàng #{order.id}</h2>
        <form onSubmit={handleSubmit}>
          <label>Tên khách hàng:</label>
          <input
            type="text"
            value={form.customerName}
            onChange={(e) => setForm({ ...form, customerName: e.target.value })}
          />
          <label>Trạng thái:</label>
          <select
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
          >
            <option value="Pending">Chờ xử lý</option>
            <option value="Completed">Hoàn tất</option>
            <option value="Cancelled">Đã huỷ</option>
          </select>
          <div className="modal-actions">
            <button type="submit">Lưu</button>
            <button type="button" onClick={onClose}>Đóng</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default OrderDetail;
