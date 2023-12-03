import React, { useState, useEffect } from 'react';
import { jsPDF } from "jspdf";
import 'jspdf-autotable';
import OrderService from '../Services/OrderService';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const userID = localStorage.getItem('userID');
  const isAdmin = localStorage.getItem('role') === 'ADMIN';
  const [editingOrder, setEditingOrder] = useState(null); 


  useEffect(() => {
    const fetchOrders = async () => {
        const response = isAdmin ? await OrderService.GetAllOrders() : await OrderService.GetByCustomer(userID);
        setOrders(response);
    };

    fetchOrders();
  }, [isAdmin, userID]);

  const handleDelete = async (orderID) => {
    await OrderService.DeleteOrder(orderID);
    setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderID));
  };

  const handleEdit = (order) => {
    setEditingOrder(order);
  };

  const handleUpdateOrder = async (editingOrder) => {
    const res = await OrderService.UpdateStatus(editingOrder.id, editingOrder.status);
    console.log(res)
    setEditingOrder(null);
    const response = await OrderService.GetAllOrders();
    setOrders(response);
  };


  const formatDateTime = (dateTimeString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
    const createdAt = new Date(dateTimeString);
    return createdAt.toLocaleString('en-US', options);
  };

  const handleDownloadPDF = async (orderID) => {
    const orderItems = await OrderService.GetOrderItems(orderID);
    const orderTotalAmount = orderItems.reduce((total, item) => total + item.totalPrice, 0);
    createPDF(orderItems, orderTotalAmount);
  };

  const createPDF = (orderItems, orderTotalAmount) => {
    const pdf = new jsPDF();
    pdf.setFontSize(18);
    pdf.text('Order Details', pdf.internal.pageSize.getWidth() / 2, 10, { align: 'center' });
    pdf.setProperties({
      title: 'Order Details',
      subject: 'Items Ordered',
      keywords: 'order, items, pdf',
    });

    pdf.autoTable({
      startY: 20,
      head: [['Product ID', 'Quantity', 'Total Price per product']],
      body: orderItems.map(item => [item.productId, item.quantity, item.totalPrice]),
    });
    const totalAmountY = pdf.autoTable.previous.finalY + 10;
    const totalAmountX = pdf.internal.pageSize.getWidth() - 10;
    pdf.text(`Total Amount: ${orderTotalAmount.toFixed(2)} $`, totalAmountX, totalAmountY, { align: 'right' });

    pdf.save('order_details.pdf');
  };

  return (
    <div>
      <h1>{isAdmin ? 'All Orders' : 'Your Orders'}</h1>
      {Array.isArray(orders) && orders.length > 0 ?(
      <table>
        <thead>
          <tr>
            {isAdmin && <th>By Customer</th>}
            <th>Ordered at</th>
            <th>Status</th>
            <th>Total Amount</th>
            {isAdmin && <th>Edit</th>}
            {isAdmin && <th>Delete</th>}
            <th>Bill</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
            {isAdmin && <td>{order.customerId}</td>}    
            <td>{formatDateTime(order.createdAt)}</td>
            {editingOrder?.id === order.id ? (
                  <td>
                    <select value={editingOrder.status} onChange={(e) => setEditingOrder({ ...editingOrder, status: e.target.value })}>
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </td>
                ) : (
                  <td>{order.status}</td>
                )}
            <td>{order.totalAmount}$</td>
            {isAdmin && (
                  <>
                    <td>
                      {editingOrder?.id === order.id ? (
                        <button onClick={() => handleUpdateOrder(editingOrder)}>Update</button>
                      ) : (
                        <button onClick={() => handleEdit(order)}>Edit</button>
                      )}
                    </td>
                    <td>
                      <button onClick={() => handleDelete(order.id)}>Delete</button>
                    </td>
                  </>
                )}
                <td>
                      <button onClick={() => handleDownloadPDF(order.id)}>Download PDF</button>
                </td>
            </tr>
          ))}
        </tbody>
      </table>  
      ) : ( <p>{isAdmin ? 'No orders available' : 'You have no orders'}</p>
    )}
    </div>
  );
};

export default OrderList;
