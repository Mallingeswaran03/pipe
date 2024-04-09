/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

const Myorder = ({ isLoggedIn }) => {

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Ambaal Pipes| Myorders";
    if (!(isLoggedIn)) {
      navigate('/');
    }
    else {
      viewOrders();
    }
  }, [navigate, isLoggedIn]);



  // ------------------------view orders -------------------------------------------
  const [vieworders, setVieworders] = useState([]);
  const viewOrders = async () => {

    var uid = localStorage.getItem("userId");
    try {
      const result = await axios.post("http://localhost:8081/vieworder", { uid });
      setVieworders(result.data);
    }
    catch (err) {
      console.log(err)
    }
  }


  // ------------------------product details -------------------------------------------
  const [pd, setPd] = useState([]);
  const [ad, setAd] = useState([]);
  const pdtls = async (billno) => {

    var uid = localStorage.getItem("userId");
    try {
      const result = await axios.post("http://localhost:8081/pdtls", { uid, billno });
      setPd(result.data[0]);
      setAd(result.data[1]);
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
            <table class="table table-striped align-middle">

              <tr style={{ backgroundColor: "green", color: 'white' }}>
                <th scope="col">S.No</th>
                <th scope="col">Bill.No</th>
                <th scope="col">Date</th>
                <th scope="col">No.of Item's</th>
                <th scope="col">Total Price</th>
                <th scope="col" style={{ textAlign: "center" }}>Status</th>
                <th scope="col">Details</th>
              </tr>

              <tbody>
                {
                  vieworders.map((result, index) => {
                    return (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{result.billno}</td>
                        <td>{new Date(result.datep).toLocaleDateString('en-GB')}</td>
                        <td>{result.item}</td>
                        <td>Rs : {result.tprice}</td>
                        <td style={{ textAlign: "center" }}>{result.status === 0 ?
                          <p style={{ color: 'red' }}>pending</p>
                          :
                          result.status === 1 ?
                            <p style={{ color: 'blue' }}>shipped</p>
                            :
                            <p style={{ color: 'green' }}>delivered</p>}</td>
                        <td><span onClick={() => { pdtls(result.billno) }}
                          data-bs-toggle="modal" data-bs-target="#staticBackdropmopd"
                          className="btn btn-secondary btn-sm">View more</span>
                        </td>
                      </tr>
                    )
                  })}
                {vieworders.length === 0 ?
                  <tr>
                    <td colSpan={7} style={{ textAlign: 'center' }}>No Items</td>
                  </tr>
                  : null}
              </tbody>
            </table>
          </div>
        </div>
    

      {/* /---------------modal---------------------------------- */}


      <div class="modal fade" id="staticBackdropmopd" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabelmopd" aria-hidden="true">

        <div class="modal-dialog modal-xl">

          <div class="modal-content">

            <div class="modal-body">
              <h5 style={{ color:"gray"}}>Shipping Details</h5>
              <div class="table-responsive">

                <table class="table table-striped align-middle">
                  <tr style={{ backgroundColor: "green", color: 'white' }}>
                    <th scope="col">Product</th>
                    <th scope="col">Description</th>
                    <th scope="col">Price</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Total</th>
                    <th scope="col">Image</th>

                  </tr>

                  <tbody>
                    {
                      pd.map((result, index) => {
                        return (
                          <tr key={index}>
                            <td>{result.name}
                            <br/>Brand : {result.brand}
                            </td>
                            <td style={{ whiteSpace: 'pre-wrap' }}>{result.description}</td>

                            <td>Rs : {result.price}</td>
                            <td>{result.qty}</td>
                            <td>Rs : {result.totalprice}</td>
                            <td><img className="img-fluid" src={'http://localhost:8081/' + result.image} style={{ height: '100px', width: '100px', objectFit: 'cover' }} alt="image1" /></td>


                          </tr>
                        )
                      })}
                  </tbody>
                </table>
              </div>
              <div class="table-responsive">

                <table class="table table-striped align-middle">
                  <tr style={{ backgroundColor: "green", color: 'white' }}>
                    <th scope="col">User-Id</th>
                    <th scope="col">details</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Address</th>

                  </tr>

                  <tbody>
                    {
                      ad.map((result, index) => {
                        return (
                          <tr key={index}>
                            <td>{result.uid}</td>
                            <td>Name : {result.name}<br />
                              Email : {result.email}</td>
                            <td>Phone : {result.phone}</td>
                            <td style={{ whiteSpace: 'pre-wrap' }}>{result.address}</td>
                          </tr>
                        )
                      })}
                  </tbody>
                </table>
              </div>

            </div>




            <button style={{ width: "200px", margin: "auto" }} type="button" class="btn btn-sm btn-secondary" data-bs-dismiss="modal">Close</button>
            <br />

          </div>

        </div>

      </div>

    </div >


  );
}

export default Myorder;

