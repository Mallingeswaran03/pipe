import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Cart from './pages/Cart';
import Footer from './components/footer';
import Contactus from './pages/Contactus';
import Adminlogin from './admin/Adminlogin';
import Admindashboard from './admin/Admindashboard';
import Adminnavbar from './admin/Adminnavbar';
import Addsegments from './admin/Addsegments';
import Addproducts from './admin/Addproducts';
import Productlist from './pages/Productlist';
import Productdetails from './pages/Productdetails';
import Myorder from './pages/Myorder';
import Order from './admin/Order';
import Ud from './admin/Ud';
import Uc from './admin/Uc';

function App() {
  const [isLoggedIn, setLoggedIn] = useState(!!localStorage.getItem("userData"));
  const [isLoggedIn1, setLoggedIn1] = useState(!!localStorage.getItem("adminData"));
  return (
    <Router>
      {window.location.pathname === "/Admindashboard" || window.location.pathname === "/Adminlogin" 
        || window.location.pathname === "/Addsegments"
        || window.location.pathname === "/Addproducts"
        || window.location.pathname === "/Order"
        || window.location.pathname === "/Ud"
        || window.location.pathname === "/Addproducts"
        || window.location.pathname === "/Addproducts" ? (
        <Adminnavbar isLoggedIn1={isLoggedIn1} setLoggedIn1={setLoggedIn1}/>
      ) : (
        <Navbar isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />
      )}


      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login setLoggedIn={setLoggedIn} />} />
        <Route path="/Cart" element={<Cart isLoggedIn={isLoggedIn} />} />
        <Route path="/Myorder" element={<Myorder isLoggedIn={isLoggedIn} />} />
        <Route path="/Contactus" element={<Contactus isLoggedIn={isLoggedIn}/>} />
        <Route path='/Productlist/:scid/:cname/:scname' exact element={<Productlist/>} />
        <Route path="/Productdetails/:pid" element={<Productdetails isLoggedIn={isLoggedIn}/>} />


        <Route path="/Adminlogin" element={<Adminlogin setLoggedIn1={setLoggedIn1}/>} />
        <Route path="/Admindashboard" element={<Admindashboard isLoggedIn1={isLoggedIn1}/>} />
        <Route path="/Addsegments" element={<Addsegments isLoggedIn1={isLoggedIn1}/>} />
        <Route path="/Addproducts" element={<Addproducts isLoggedIn1={isLoggedIn1}/>} />
        <Route path="/Order" element={<Order isLoggedIn1={isLoggedIn1}/>} />
        <Route path="/Ud" element={<Ud isLoggedIn1={isLoggedIn1}/>} />
        <Route path="/Uc" element={<Uc isLoggedIn1={isLoggedIn1}/>} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

