import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Men from './pages/Men/Men';
import Women from './pages/Women/Women';
import Boys from './pages/Boys/Boys';
import Girls from './pages/Girls/Girls';
import Sale from './pages/Sale/Sale';
import ProductDetails from './pages/ProductDetails/ProductDetails';
import Cart from './pages/Cart/Cart';
import Checkout from './pages/Checkout/Checkout';
import AdminRoute from './routes/AdminRoute';
import AdminLogin from './pages/Admin/AdminLogin';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminProducts from './pages/Admin/AdminProducts';
import AddProduct from './pages/Admin/AddProduct';
import EditProduct from './pages/Admin/EditProduct';
import OrderSuccess from './pages/Orders/OrderSuccess';
import Profile from './pages/Profile/Profile';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Payment from './pages/Payment/Payment';
import SearchResults from './pages/Search/SearchResults';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#111827] selection:bg-[#F5B942]/30 selection:text-[#071A2F]">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/men" element={<Men />} />
          <Route path="/woman" element={<Women />} />
          <Route path="/women" element={<Women />} />
          <Route path="/boys" element={<Boys />} />
          <Route path="/girls" element={<Girls />} />
          <Route path="/sale" element={<Sale />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment/:id" element={<Payment />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          <Route path="/admin/products" element={<AdminRoute><AdminProducts /></AdminRoute>} />
          <Route path="/admin/add-product" element={<AdminRoute><AddProduct /></AdminRoute>} />
          <Route path="/admin/edit-product/:id" element={<AdminRoute><EditProduct /></AdminRoute>} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
