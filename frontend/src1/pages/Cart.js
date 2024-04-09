/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import 'bootstrap-icons/font/bootstrap-icons.css';
import "../style/cart.css"; 
const Cart = ({ isLoggedIn }) => {

  const navigate = useNavigate();

  useEffect(() => {
    document.title = `Ambaal Pipes | Mycart`;
    if (!(isLoggedIn)) {
      navigate('/');
    }
    else {
      viewCart();
    }
  }, [navigate, isLoggedIn]);


  // ------------------------view cart -------------------------------------------
  const [viewcart, setViewcart] = useState([]);
  const viewCart = async () => {

    var uid = localStorage.getItem("userId");
    try {
      const result = await axios.post("http://localhost:8081/viewCart", { uid });
      setViewcart(result.data);
    }
    catch (err) {
      console.log(err)
    }
  }


  // --------------upcrat---------------------
  const upcart = async (q, q1, cartid) => {
    var uid = localStorage.getItem("userId");
    if ((q >= 1) && (q <= q1)) {
      try {

        const result = await axios.post("http://localhost:8081/upcart", { q, uid, cartid });
        if (result.data === "success") {
          qtyz = 0;
          otsc = 0;
          st = 0;
          qtyz1 = 0;
          viewCart();
        }
      }
      catch (err) {
        console.log(err)
      }
    }

  }



  // --------------dlcrat---------------------
  const dlct = async (cartid) => {
    var uid = localStorage.getItem("userId");

    try {

      const result = await axios.post("http://localhost:8081/dlcart", { uid, cartid });
      if (result.data === "success") {
        qtyz = 0;
        otsc = 0;
        st = 0;
        qtyz1 = 0;
        viewCart();
      }
    }
    catch (err) {
      console.log(err)
    }
  }



  //   ----------------get total-----------------
  var st = 0;
  function getst(a) {
    st += a;
  }

  var otsc = 0;
  function addots() {
    otsc++;
  }

  var qtyz = 0;
  function addqtyz() {
    qtyz++;
  }

  var qtyz1 = 0;
  function addqtyz1() {
    qtyz1++;
  }

  // ----------------------------------------------


  function ck() {
    viewCart();
    if (otsc > 0) {
      alert("out of stock");

    }
    else if (qtyz > 0) {
      alert("invalid quantity");

    }
    else if (qtyz1 > 0) {
      alert("quantity greater than available quantity");
    }
    else {
      setPhone(localStorage.getItem("userPhone"));
      document.getElementById("phone").value = localStorage.getItem("userPhone");
      document.getElementById("btncart").click();
    }
  }



  // --------------check out---------------------
  const [address, setAddress] = useState([]);
  const [phone, setPhone] = useState([]);
  const addckout = async (event) => {
    event.preventDefault();
    var uid = localStorage.getItem("userId");
    var email = localStorage.getItem("userEmail");
    var name = localStorage.getItem("userName");



    if ((phone.toString().length !== 10) || (phone < 6000000000)) {

      alert("The phone number you entered is invalid.");
      return;
    }
    try {


      const result = await axios.post("http://localhost:8081/fnckout", { uid, name, phone, email,address});
      if (result.data === "success") {
        alert("Order Placed");
        qtyz = 0;
        otsc = 0;
        st = 0;
        qtyz1 = 0;
        document.getElementById("closepy").click();
        document.getElementById("addckout").reset();
        viewCart();
      }
    }
    catch (err) {
      console.log(err)
    }
  }


  return (
    <div className='plfontall'>
    <div style={{ fontSize: "18px", backgroundColor: "orangered", color: "white", padding: "5px", fontWeight: "600" }}>Home | My Cart</div>

        <div class="container mt-5">
          <div class="table-responsive">
            <table class="table custom-table align-middle">

              <tr style={{ backgroundColor: "green", color: 'white' }}>
                <th scope="col" style={{ width: '120px' }}>Image</th>
                <th scope="col">Product</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                <th scope="col">Total</th>
                <th scope="col">Delete</th>
              </tr>

              <tbody>
                {
                  viewcart.map((result, index) => {
                    return (
                      <tr>
                        <td><img className="img-fluid" src={'http://localhost:8081/' + result.image} style={{ height: '100px', width: '100px', objectFit: 'cover' }} alt="image1" /></td>

                        <td style={{ color: '#333333', cursor: 'pointer' }}>{result.name}</td>



                        {result.quantity > 0 ?
                          <>
                            <td style={{ color: '#777777' }}>Rs : {result.price}.00</td>
                            <td>
                              <span style={{ cursor: "pointer", fontWeight: "600", fontSize: "20px" }} onClick={() => { upcart(result.cqty - 1, result.quantity, result.cart_id); }}>-</span>
                              &nbsp;&nbsp;{result.cqty}&nbsp;&nbsp;
                              <span style={{ cursor: "pointer", fontWeight: "600", fontSize: "20px" }} onClick={() => { upcart(result.cqty + 1, result.quantity, result.cart_id); }}>+</span>
                              <br />(available qty : {result.quantity})
                              {result.cqty === 0 ? addqtyz() : null}
                              {result.cqty > result.quantity ? addqtyz1() : null}

                            </td>
                            <td style={{ fontSize: '16px', color: '#195505', fontWeight: "600" }}>Rs : {result.price * result.cqty}.00
                              {getst(result.price * result.cqty)}
                            </td>
                          </> :

                          <td colSpan={3} style={{ textAlign: "center", color: "gray", fontWeight: "900", fontSize: "16px" }}>
                            OUT OF STOCK
                            {addots()}
                          </td>
                        }

                        <td><i className="bi bi-x-square-fill"
                          onClick={() => { dlct(result.cart_id); }}
                          style={{
                            color: 'red',
                            cursor: 'pointer',
                            fontSize: '16px',
                            fontWeight: "400"
                          }}></i></td>

                      </tr>
                    )
                  })}

                {viewcart.length === 0 ?
                  <tr>
                    <td colSpan={6} style={{ textAlign: 'center' }}>No items in cart</td>
                  </tr>
                  :
                  <tr>
                    <td colSpan="6" style={{ padding: "20px 20px" }}>
                      <span style={{ float: 'left', fontWeight: "600", fontSize: "18px" }}>Total Amount : <span style={{ color: '#195505' }}>Rs. {st}.00</span></span>
                      <button onClick={ck} style={{ float: "right" }} className='btn btn-sm btn-secondary'>CHECK OUT</button>
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </div>
   


      {/* --------------------checkout-------------------------- */}
      <span id="btncart" style={{ visibility: "hidden" }} data-bs-toggle="modal" data-bs-target="#checkout"></span>
      <div className="modal fade" id="checkout" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="checkoutLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-scrollable modal-xl modal-fullscreen-lg-down">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="checkoutLabel" style={{ fontSize: '25px', color: 'green', fontWeight: '600' }}>Product & Shipping Details</h1>
              <button id="closepy" type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">

              <form id='addckout' onSubmit={addckout}>
                <div className='row'>
                  <div className='col-md-6 col-sm-12' style={{ padding: '20px', textAlign: "center" }}>

                  </div>
                  <div className='col-md-6 col-sm-12' style={{ padding: '20px' }}>

                    <span style={{ width: '50%', display: 'inline-block', marginBottom: '5px' }}>
                      <b>Total</b>
                    </span>
                    <span style={{ width: '50%', display: 'inline-block', textAlign: 'right', color: '#777777' }}>
                      <b>Rs . {st}.00</b>
                    </span> <div style={{ marginBottom: '5px' }}></div>

                    <span style={{ width: '80%', display: 'inline-block', marginBottom: '5px' }}>
                      <b>No of Items</b>
                    </span>
                    <span style={{ width: '20%', display: 'inline-block', textAlign: 'right', color: '#777777' }}>
                      <b>{viewcart.length}</b>
                    </span>

                    <div style={{ marginBottom: '5px' }}></div>

                    <span style={{ width: '50%', display: 'inline-block', marginBottom: '5px' }}>
                      <b>Name</b>
                    </span>
                    <span style={{ width: '50%', display: 'inline-block', textAlign: 'right', color: '#777777' }}>
                      <b>{localStorage.getItem("userName")}</b>
                    </span>

                    <div style={{ marginBottom: '5px' }}></div>

                    <span style={{ width: '50%', display: 'inline-block', marginBottom: '5px' }}>
                      <b>Email</b>
                    </span>
                    <span style={{ width: '50%', display: 'inline-block', textAlign: 'right', color: '#777777' }}>
                      <b>{localStorage.getItem("userEmail")}</b>
                    </span>




                    <label style={{ marginBottom: '5px', marginTop: '12px' }}><b>Phone *</b></label>
                    <br />
                    <input type="number" id="phone" required style={{ width: "100%" }}
                      onChange={e => setPhone(e.target.value)} />

                    <br />


                    <label style={{ marginBottom: '5px', marginTop: '12px' }}><b>Address *</b></label><br />
                    <textarea rows="4" required style={{ width: "100%" }} onChange={e => setAddress(e.target.value)}></textarea>




                  </div>

                  <div className='col-sm-12' style={{ padding: '5px', textAlign: 'center' }}>
                    <button className='btn btn-sm btn-secondary'>
                      CHECKOUT
                    </button>
                  </div>
                </div>
              </form>
              {/* ------------------------------------------------- */}
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------ */}

    </div >
  );
}

export default Cart;

