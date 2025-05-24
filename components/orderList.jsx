import  { useEffect, useState } from 'react';
import OrderDetail from './orderDetail';
import { cancelOrder, completeOrder } from '../api/orderApi';
import { toast } from '../untils/toast';

function OrderList({ orders, refresh }) {
    const [selectedOrderId, setSelectedOrderId] = useState(null);
  
    return (
      <div>
        <h2>Danh sách đơn hàng</h2>
        {orders.map((order) => (
          <div key={order.id} className="order-card">
            <p><strong>Khách:</strong> {order.customerName}</p>
            <p><strong>Trạng thái:</strong> {order.status}</p>
            <div className="order-actions">
              <button onClick={() => setSelectedOrderId(order.id)}>Xem</button>
              <button onClick={() => completeOrder(order.id).then(refresh)}>Hoàn tất</button>
              <button onClick={() => cancelOrder(order.id).then(refresh)}>Huỷ</button>
            </div>
          </div>
        ))}
  
        {selectedOrderId && (
          <OrderDetail
            orderId={selectedOrderId}
            onClose={() => setSelectedOrderId(null)}
            onUpdated={refresh}
          />
        )}
      </div>
    );
  }

export default OrderList;


// src/components/OrderList.jsx
