/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "../style/myorder.css"; // Import your custom CSS file for styling

const Myorder = ({ isLoggedIn }) => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Ambaal Pipes | Myorders";
    if (!isLoggedIn) {
      navigate('/');
    } else {
      viewOrders();
    }
  }, [navigate, isLoggedIn]);

  // State variables
  const [vieworders, setVieworders] = useState([]);
  const [pd, setPd] = useState([]);
  const [ad, setAd] = useState([]);

  // Fetch orders from the server
  const viewOrders = async () => {
    const uid = localStorage.getItem("userId");
    try {
      const result = await axios.post("http://localhost:8081/vieworder", { uid });
      setVieworders(result.data);
    } catch (err) {
      console.log(err);
    }
  }

  // Fetch product details for a specific order
  const pdtls = async (billno) => {
    const uid = localStorage.getItem("userId");
    try {
      const result = await axios.post("http://localhost:8081/pdtls", { uid, billno });
      setPd(result.data[0]);
      setAd(result.data[1]);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className='plfontall'>
      <div style={{ fontSize: "18px", backgroundColor: "orangered", color: "white", padding: "5px", fontWeight: "600" }}>
        Home | My Orders
      </div>
      <div className="container mt-5">
        <div className="table-responsive">
          <table className="table table-striped align-middle custom-table">
            {/* Table headers */}
            <thead>
              <tr>
                <th>S.No</th>
                <th>Order-Id</th>
                <th>Date</th>
                <th>No.of Items</th>
                <th>Total Price</th>
                <th>Status</th>
                <th>Details</th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody>
              {vieworders.map((result, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{result.billno}</td>
                  <td>{new Date(result.datep).toLocaleDateString('en-GB')}</td>
                  <td>{result.item}</td>
                  <td>Rs: {result.tprice}</td>
                  <td className={result.status === 0 ? "pending-status" : ""}>
                    {result.status === 0 ? 'Pending' : result.status === 1 ? 'Shipped' : 'Delivered'}
                  </td>
                  <td>
                    <button
                      onClick={() => pdtls(result.billno)}
                      data-bs-toggle="modal" data-bs-target="#staticBackdropmopd"
                      className="btn btn-secondary btn-sm custom-btn"
                    >
                      View more
                    </button>
                  </td>
                </tr>
              ))}
              {vieworders.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center">No Items</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <div className="modal fade" id="staticBackdropmopd" tabIndex="-1" aria-labelledby="staticBackdropLabelmopd" aria-hidden="true">
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-body">
              {/* Shipping Details */}
              <h5 className="text-center mb-4">Shipping Details</h5>
              {/* Product details */}
              <div className="table-responsive">
                <table className="table table-striped align-middle custom-table">
                  {/* Product table headers */}
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Description</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total</th>
                      <th>Image</th>
                    </tr>
                  </thead>
                  {/* Product table body */}
                  <tbody>
                    {pd.map((result, index) => (
                      <tr key={index}>
                        <td>{result.name}<br />Brand: {result.brand}</td>
                        <td>{result.description}</td>
                        <td>Rs: {result.price}</td>
                        <td>{result.qty}</td>
                        <td>Rs: {result.totalprice}</td>
                        <td>
                          <img
                            className="img-fluid"
                            src={'http://localhost:8081/' + result.image}
                            style={{ height: '100px', width: '100px', objectFit: 'cover' }}
                            alt="product"
                          />
                        </td>
                      </tr>
                    ))}
                       {
                            ad.map((result, index) => {
                                return (
                                    <tr key={index}>
                                        <th>USER ID : {result.uid}</th>
                                        <th>Name : {result.name}<br />
                                            Email : {result.email}</th>
                                        <th>Phone : {result.phone}</th>
                                        <th colSpan={3} style={{ whiteSpace: 'pre-wrap' }}>ADDRESS : <br/>
                                        {result.address}</th>
                                    </tr>
                                )
                            })}
                  </tbody>
                </table>
              </div>

              <div className="text-center">
                <button type="button" className="btn btn-secondary custom-btn" data-bs-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Myorder;
