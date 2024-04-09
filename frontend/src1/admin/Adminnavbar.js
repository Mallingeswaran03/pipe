/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useNavigate ,NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import 'bootstrap-icons/font/bootstrap-icons.css';
import "../style/navbar.css";

const Adminnavbar = ({ isLoggedIn1, setLoggedIn1 }) => {
  const navigate = useNavigate();


  function logout() {
    localStorage.removeItem("adminData");
    setLoggedIn1(false);
    navigate('/Adminlogin');
  }

  return (

    <div style={{ marginBottom: '68px' }}>
      {/* -------------nav bar----------------- */}
      <nav className="navbar navbar-expand-lg fixed-top shadow-sm">
        <div className="container-fluid">
          <NavLink to="/" className="navbar-brand" style={{ padding: '0' }}>
            <img src={require("../images/logo.jpg")} style={{ height: '52px' }} className="img-fluid" alt="slider2" />
          </NavLink>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav mx-auto calign-content">
              <li className="nav-item">
                <NavLink to="/Admindashboard" className="nav-link" aria-current="page">Dashboard</NavLink>
              </li>

              <li className="nav-item">
                <NavLink to="/Addsegments" className="nav-link" aria-current="page">Segments</NavLink>
              </li>

              <li className="nav-item">
                <NavLink to="/Addproducts" className="nav-link" aria-current="page">Products</NavLink>
              </li>

              <li className="nav-item">
                <NavLink to="/Order" className="nav-link" aria-current="page">Orders</NavLink>
              </li>

              <li className="nav-item">
                <NavLink to="/Ud" className="nav-link" aria-current="page">Users</NavLink>
              </li>

              <li className="nav-item">
                <NavLink to="/Uc" className="nav-link" aria-current="page">Users Feedback</NavLink>
              </li>
      
            </ul>




            <ul className="navbar-nav ralign-content">
            {isLoggedIn1 ? (
            <>
               <li className="nav-item">
                <span onClick={logout} className="nav-link">Logout</span>
              </li>
            </>
          ) : (
            <>
             <li className="nav-item">
             <NavLink to="/Adminlogin" className="nav-link">Login</NavLink>
              </li>
            </>
          )}


           
             
            </ul>

          </div>
        </div>
      </nav>
  

    </div>
   
   
  );
};

export default Adminnavbar;

