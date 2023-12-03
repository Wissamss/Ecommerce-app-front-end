import './App.css';
import './styles.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login';
import Home from './Components/Home';
import Registration from './Components/Registration';
import Profile from './Components/Profile';
import CustomerList from "./Components/CustomerList";
import AddProduct from "./Components/AddProduct";
import ProductList from './Components/ProductList';
import EditProduct from './Components/EditProduct';
import AdminDashBoard from './Components/AdminDashBoard';
import Logout from './Components/Logout';
import Cart from './Components/Cart';
import OrderList from './Components/OrderList';

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/home" element={<Home />}/>
        <Route path="/profile" element={<Profile />}/>
        <Route path="/customers" element={<CustomerList />}/>
        <Route path="/admindashboard" element={<AdminDashBoard />}/>
        <Route path="/edit/:id" element={<EditProduct />} />
        <Route path="/products" element={<ProductList />}/>
        <Route path="/product" element={<AddProduct />}/>
        <Route path="/logout" element={<Logout />}/>
        <Route path="/orders" element={<OrderList />}/>
        <Route path="/cart/:id" element={<Cart />}/>
      </Routes>
    </Router>
  );
}

export default App;
