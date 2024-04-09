/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import 'bootstrap-icons/font/bootstrap-icons.css';
import "../style/navbar.css";

const Navbar = ({ isLoggedIn, setLoggedIn }) => {

  // ---------------navbar-2 scroll up down--------------
  // var prevScrollpos = window.scrollY;
  // window.onscroll = function () {
  //   var currentScrollPos = window.scrollY;
  //   if (prevScrollpos > currentScrollPos) {
  //     document.getElementById("navbar-2").style.top = "68px";
  //   } else {
  //     document.getElementById("navbar-2").style.top = "-68px";
  //   }
  //   prevScrollpos = currentScrollPos;
  // }

  function navtop() {
    document.getElementById("navbar-2").style.top = "-68px";
    document.getElementById("navbarnavbottom").style.display = "inline-block";
    document.getElementById("navbarnavtop").style.display = "none";
  }

  function navbottom() {
    document.getElementById("navbar-2").style.top = "68px";
    document.getElementById("navbarnavbottom").style.display = "none";
    document.getElementById("navbarnavtop").style.display = "inline-block";
  }
  // -------------------------------------------------------
  // --------------screen width-----------------------------

  function logout() {
    localStorage.removeItem("userData");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("userPhone");
    localStorage.removeItem("userEmail");
    alert("Loggedout");
    setLoggedIn(false);
    document.getElementById("offcanlogout").click();
  }


  useEffect(() => {
    viewMenu();
  }, [])

    // -----------------view menu-----------------
    const [viewmenu, setViewmenu] = useState([]);
    const viewMenu = async () => {
      try {
        const result = await axios("http://localhost:8081/ViewCategory");
        setViewmenu(result.data)
      }
      catch (err) {
        console.log(err)
      }
    }


      // --------------------live searh product-----------------
  const [getpdsr, setGetpdsr] = useState([]);
  const getpdsearch = async () => {
    var pn = document.getElementById("pdsearch").value;
    if (pn === "") {
      pn = 0;
    }
    try {
      const result = await axios.post("http://localhost:8081/GetProductsearch", { pn });
      setGetpdsr(result.data);
    }
    catch (err) {
      console.log(err);
    }
  }

      // ---------------------------get sub category details on click category name-------------------------
  const [getscdlfc1, setGetscdlfc1] = useState([]);
  const getscdl1 = async (cid) => {
    try {
      const result = await axios.post("http://localhost:8081/GetScdetails", { cid });
      setGetscdlfc1(result.data);
    }
    catch (err) {
      console.log(err);
    }
  }

  return (

    <div style={{ marginBottom: '68px' }}>
      {/* -------------nav bar----------------- */}
      <nav className="navbar navbar-expand-lg fixed-top shadow-sm">
        <div className="container-fluid">
          <NavLink to="/" className="navbar-brand" style={{ padding: '0' }}>
            <img src={require("../images/logo.jpg")} style={{ height: '52px' }} className="img-fluid" alt="slider2" />
          </NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav mx-auto calign-content">
              <li className="nav-item">
                <NavLink to="/" className="nav-link" aria-current="page">Home</NavLink>
              </li>

              {
                viewmenu.map((result, index) => {
                  return (
                    <li key={index} className="nav-item dropdown">
                      <span onClick={() => getscdl1(result.cid)} className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        {result.cname}
                      </span>
                      <ul className="dropdown-menu">

                        {
                          getscdlfc1.map((result1, index) => {
                            return (
                              <li><NavLink to={`/Productlist/${result1.scid}/${result.cname}/${result1.scname}`} className="dropdown-item" >{result1.scname}</NavLink></li>
                            )
                          })}

                      </ul>
                    </li>
                  )
                })}

              {/* <li className="nav-item dropdown">
                <span className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Electrical
                </span>
                <ul className="dropdown-menu">
                  <li><span className="dropdown-item">Switches</span></li>
                  <li><span className="dropdown-item">MCB & DB</span></li>
                  <li><span className="dropdown-item">Fans</span></li>
                  <li><span className="dropdown-item">Water Heaters & Geysers</span></li>
                  <li><span className="dropdown-item">Lighting</span></li>
                  <li><span className="dropdown-item">Wires & Cables</span></li>
                  <li><span className="dropdown-item">Electrical Accessories</span></li>
                </ul>
              </li>

              <li className="nav-item dropdown">
                <span className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Plumbing
                </span>
                <ul className="dropdown-menu">
                  <li><span className="dropdown-item" >Hardware & Accessories</span></li>
                  <li><span className="dropdown-item" >Pipes and Fittings</span></li>
                </ul>
              </li>

              <li className="nav-item dropdown">
                <span className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Sanitaryware
                </span>
                <ul className="dropdown-menu">
                  <li><span className="dropdown-item" >Wash Basin</span></li>
                  <li><span className="dropdown-item" >Floor Mounted Toilet</span></li>
                  <li><span className="dropdown-item" >Tanks & Cisterns</span></li>
                  <li><span className="dropdown-item" >EWC & Urinals</span></li>
                </ul>
              </li> */}




              <li className="nav-item">
                <NavLink to="/Contactus" className="nav-link">Contact</NavLink>
              </li>

              {/* --------------show on small screen---------------- */}

              {isLoggedIn ? (
                <>
                  <li className="nav-item nb1ac">
                    <span className="nav-link"
                      data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop" aria-controls="staticBackdrop"><i className="bi bi-person-fill"></i> My Account</span>
                  </li>
                </>) : (<>
                  <li className="nav-item nb1ac">
                    <NavLink to="/Login" className="nav-link" ><i className="bi bi-person-fill"></i>Login</NavLink>
                  </li>
                </>)}
              <li className="nav-item nb1ac">
                <span className="nav-link" ><i className="bi bi-bag-check-fill"></i> Cart</span>
              </li>
              {/* ---------------------------------------------------- */}
            </ul>


            <ul className="navbar-nav ralign-content">
              <li className="nav-item">
                    <NavLink to="/Admindashboard" target="_blank" className="nav-link" > Admin</NavLink>
              </li>
              {/* --------------show nav-------------- */}
              <li className="nav-item">
                <span id="navbarnavbottom" onClick={navbottom} className="nav-link">
                  <i className="bi bi-caret-down-fill"></i>
                </span>
                <span id="navbarnavtop" onClick={navtop} className="nav-link" style={{ display: 'none' }}>
                  <i className="bi bi-caret-up-fill"></i>
                </span>
              </li>
              {/* ----------------------------------- */}
            </ul>
          </div>
        </div>
      </nav>
      {/* ----------------navbar search,login,cart------------------------------ */}
      <div id="navbar-2" className="navbar-2 shadow">
        <div className="parent">
          <div>
            <input className="input" id="pdsearch" type="text" placeholder="Search Product" onInput={getpdsearch} />
            <span className="inputicon"><i className="bi bi-search"></i></span>
          </div>
          <div className="child">
            <div style={{position:'absolute',zIndex:"100000"}}>
          {
              getpdsr.map((result, index) => {
                return (<>
                  <NavLink to={`/Productdetails/${result.pid}`}
                    style={{ textDecoration: 'none' }}>
                    {result.name}</NavLink><br/>

                    </>
                )
              })}
              </div>
          </div>
        </div>

        <div className="parent1">

          {isLoggedIn ? (
            <>
              <span onClick={navtop} className="acnt-btn"
                data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop" aria-controls="staticBackdrop">
                <i className="bi bi-person-fill"></i> <span className="nb2ma">My Account</span>
              </span>
            </>
          ) : (
            <>
              <NavLink to="/Login" className="acnt-btn" onClick={navtop}>
                <i className="bi bi-person-fill"></i> <span className="nb2ma">Login</span>
              </NavLink>
            </>
          )}

        </div>


        <div className="parent1">
        <NavLink to="/Cart" className="cart-btn" onClick={navtop}>
            <i className="bi bi-bag-check-fill"></i> <span className="nb2ma">My Cart</span>
          </NavLink>
        </div>
      </div>


      {/* --------------off canvas---------------- */}

      <div className="offcanvas offcanvas-start  nvbr-offcanvas" data-bs-backdrop="static" tabIndex="-1" id="staticBackdrop" aria-labelledby="staticBackdropLabel">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="staticBackdropLabel">Welcome</h5>
          <button id="offcanlogout" type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          
          <div>
          <NavLink to="/Cart" style={{textDecoration:"none",color:'black'}}>My Cart</NavLink>
          </div>
          <div>
       <NavLink to="/Myorder" style={{textDecoration:"none",color:'black'}}>My Orders</NavLink>

          </div>
          <div>
            <span style={{ cursor: 'pointer' }} onClick={logout}>Logout</span>
          </div>
          <hr/>
          <div style={{color:"white",backgroundColor:"orangered",padding:"5px"}}>
            My Profile
          </div>
          User Id : {localStorage.getItem("userId")};<br/>
          
        User Name : {localStorage.getItem("userName")}<br/>
    Phone : {localStorage.getItem("userPhone")}<br/>
      Email : {localStorage.getItem("userEmail")}<br/>
        </div>
      </div>
      {/* ----------------------------------------- */}
    </div>
    // <div style={{ textAlign: "center" }}>
    //   <h4>
    //     <NavLink to="/">Home</NavLink>
    //   </h4>

    //   <h4>
    //     {isLoggedIn ? (
    //       <>
    //         <span onClick={logout}>Logout</span>
    //       </>
    //     ) : (
    //       <>
    //         <NavLink to="/Login">Login</NavLink>
    //       </>
    //     )}
    //   </h4>

    //   <h4>
    //     <NavLink to="/Cart">Cart</NavLink>
    //   </h4>
    // </div>
  );
};

export default Navbar;

