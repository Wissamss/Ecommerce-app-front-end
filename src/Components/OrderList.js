import React, { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import OrderService from '../Services/OrderService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faFilePdf, faBox, faClipboardList, faUserCircle, faSignOutAlt, faUsers, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import userImage from '../images/profile.png'; // Adjust the path accordingly

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
    await OrderService.UpdateStatus(editingOrder.id, editingOrder.status);
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
      body: orderItems.map((item) => [item.productId, item.quantity, item.totalPrice]),
    });
    const totalAmountY = pdf.autoTable.previous.finalY + 10;
    const totalAmountX = pdf.internal.pageSize.getWidth() - 10;
    pdf.text(`Total Amount: ${orderTotalAmount.toFixed(2)} DH`, totalAmountX, totalAmountY, { align: 'right' });

    pdf.save('order_details.pdf');
  };

  const userName = isAdmin ? 'Fatima Zahra' : 'Wissam Saidi';

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <img src={userImage} alt="User" style={styles.userImage} />
        <p style={styles.userName}>{userName}</p>
        <ul style={styles.menu}>
          {isAdmin ? (
            <>
              <li style={styles.menuItem}>
                <FontAwesomeIcon icon={faUsers} style={styles.menuIcon} />
                <Link to="/users">Users</Link>
              </li>
              <li style={styles.menuItem}>
                <FontAwesomeIcon icon={faBox} style={styles.menuIcon} />
                <Link to="/products">Products</Link>
              </li>
              <li style={styles.menuItem}>
                <FontAwesomeIcon icon={faClipboardList} style={styles.menuIcon} />
                <Link to="/orders">Orders</Link>
              </li>
            </>
          ) : (
            <>
              <li style={styles.menuItem}>
                <FontAwesomeIcon icon={faBox} style={styles.menuIcon} />
                <Link to="/products">Products</Link>
              </li>
              <li style={styles.menuItem}>
                <FontAwesomeIcon icon={faShoppingCart} style={styles.menuIcon} />
                <Link to="/cart">Cart</Link>
              </li>
              <li style={styles.menuItem}>
                <FontAwesomeIcon icon={faClipboardList} style={styles.menuIcon} />
                <Link to="/orders">Orders</Link>
              </li>
            </>
          )}
          <li style={styles.menuItem}>
            <FontAwesomeIcon icon={faUserCircle} style={styles.menuIcon} />
            <Link to="/profile">Profile</Link>
          </li>
          <li style={styles.menuItem}>
            <FontAwesomeIcon icon={faSignOutAlt} style={styles.menuIcon} />
            <Link to="/logout">Logout</Link>
          </li>
        </ul>
      </div>
      <div style={styles.content}>
        <h2 style={styles.title}>{isAdmin ? 'All Orders' : 'Your Orders'}</h2>
        {Array.isArray(orders) && orders.length > 0 ? (
          <table style={styles.table}>
            <thead>
              <tr>
                {isAdmin && <th style={styles.header}>By Customer</th>}
                <th style={styles.header}>Ordered at</th>
                <th style={styles.header}>Status</th>
                <th style={styles.header}>Total Amount</th>
                {isAdmin && <th style={styles.header}>Edit</th>}
                {isAdmin && <th style={styles.header}>Delete</th>}
                <th style={styles.header}>Bill</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  {isAdmin && <td style={styles.cell}>{order.customerId}</td>}
                  <td style={styles.cell}>{formatDateTime(order.createdAt)}</td>
                  {editingOrder?.id === order.id ? (
                    <td style={styles.cell}>
                      <select
                        style={styles.select}
                        value={editingOrder.status}
                        onChange={(e) => setEditingOrder({ ...editingOrder, status: e.target.value })}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </td>
                  ) : (
                    <td style={styles.cell}>{order.status}</td>
                  )}
                  <td style={styles.cell}>{order.totalAmount}DH</td>
                  {isAdmin && (
                    <>
                      <td style={styles.cell}>
                        {editingOrder?.id === order.id ? (
                          <button style={{ ...styles.button, ...styles.pdfButton }} onClick={() => handleUpdateOrder(editingOrder)}>
                            <FontAwesomeIcon icon={faEdit} />
                          </button>
                        ) : (
                          <button style={{ ...styles.button, ...styles.pdfButton }} onClick={() => handleEdit(order)}>
                            <FontAwesomeIcon icon={faEdit} />
                          </button>
                        )}
                      </td>
                      <td style={styles.cell}>
                        <button style={{ ...styles.button, ...styles.deleteButton }} onClick={() => handleDelete(order.id)}>
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </td>
                    </>
                  )}
                  <td style={styles.cell}>
                    <button style={{ ...styles.button, ...styles.pdfButton }} onClick={() => handleDownloadPDF(order.id)}>
                      <FontAwesomeIcon icon={faFilePdf} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p style={styles.message}>{isAdmin ? 'No orders available' : 'You have no orders'}</p>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
  },

  sidebar: {
    width: '200px',
    backgroundColor: '#f4f4f4',
    padding: '20px',
    boxShadow: '2px 0px 5px rgba(0, 0, 0, 0.1)',
    height: '650px',
  },

  userImage: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
  },

  userName: {
    fontSize: '18px',
    fontWeight: 'bold',
    margin: '10px 0',
    color: '#333',
  },

  menu: {
    listStyle: 'none',
    padding: '0',
    margin: '0',
  },

  menuItem: {
    marginBottom: '10px',
  },

  menuIcon: {
    marginRight: '10px',
  },

  content: {
    flex: '1',
  },

  title: {
    fontSize: '1.5rem',
    marginBottom: '10px',
    marginLeft: '30px',
    marginTop: '30px',
  },

  table: {
    width: '70%',
    margin: '0 auto',
    borderCollapse: 'collapse',
  },

  header: {
    border: '1px solid #ddd',
    padding: '8px',
    backgroundColor: '#D7DCDE',
    textAlign: 'left',
  },

  cell: {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'left',
  },

  button: {
    padding: '5px 10px',
    cursor: 'pointer',
    border: 'none',
    color: '#fff',
    borderRadius: '3px',
    marginRight: '5px',
  },

  deleteButton: {
    backgroundColor: '#ff0000',
    color: '#fff',
    border: 'none',
    padding: '5px 10px',
    cursor: 'pointer',
  },

  pdfButton: {
    backgroundColor: '#28a745',
  },

  select: {
    padding: '5px',
  },

  editButtons: {
    display: 'flex',
    gap: '5px',
  },

  message: {
    fontSize: '1.2rem',
    marginTop: '20px',
  },
};

export default OrderList;
