/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";


const Order = ({ isLoggedIn1 }) => {


    useEffect(() => {
        document.title = "Admin | Manage Orders";
        viewOrders();
    }, [])



    // ------------------------view orders -------------------------------------------
    const [vieworders, setVieworders] = useState([]);
    const viewOrders = async () => {


        try {
            const result = await axios("http://localhost:8081/vieworderadmin");
            setVieworders(result.data);
        }
        catch (err) {
            console.log(err)
        }
    }


    // ------------------------view orders with status-------------------------------------------
    const viewOrdersstatus = async (status) => {
        try {
            const result = await axios.post("http://localhost:8081/vieworderadminstatus", { status });
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
        try {
            const result = await axios.post("http://localhost:8081/pdtlsadmin", { billno });
            setPd(result.data[0]);
            setAd(result.data[1]);
        }
        catch (err) {
            console.log(err)
        }
    }



    // ------------------------change to shipped if status is pending -------------------------------------------
    const cts = async (billno, status) => {
        try {
            const result = await axios.post("http://localhost:8081/ctsadmin", { billno, status });
            if (result.data === "success") {
                viewOrders();
            }
        }
        catch (err) {
            console.log(err)
        }
    }


    // ------------------------search by bill no-------------------------------------------
    const sbbn = async () => {
        var billno = document.getElementById("sbbn").value;
        try {
            const result = await axios.post("http://localhost:8081/sbbn", { billno });
            setVieworders(result.data);
        }
        catch (err) {
            console.log(err)
        }
    }



    // ------------------------search byuser id-------------------------------------------
    const usid = async () => {
        var uid = document.getElementById("usid").value;
        try {
            const result = await axios.post("http://localhost:8081/usid", { uid });
            setVieworders(result.data);
        }
        catch (err) {
            console.log(err)
        }
    }


    return (
        <div>
            {isLoggedIn1 ? (
                <>

                    <div className='container' style={{ marginTop: '110px' }}>
                        <div class="container mt-5">
                            <div class="table-responsive">
                                <table class="table table-striped align-middle">
                                    <thead className="table-dark">
                                        <tr>
                                            <th scope="col">S.No</th>
                                            <th scope="col">Bill.No</th>
                                            <th scope="col">Date</th>
                                            <th scope="col">No.of Item's</th>
                                            <th scope="col">Total Price</th>
                                            <th scope="col" style={{ textAlign: "center" }}>Status</th>
                                            <th scope="col">Details</th>
                                            <th scope="col">Manage</th>
                                        </tr>
                                    </thead>
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
                                                            data-bs-toggle="modal" data-bs-target="#staticBackdropmopdadmin"
                                                            className="btn btn-secondary btn-sm">View more</span>
                                                        </td>

                                                        <td style={{ textAlign: "center" }}>{result.status === 0 ?
                                                            <>

                                                                <span onClick={() => { cts(result.billno, 1); }} className='btn btn-sm btn-secondary'>Make as Shipped</span>
                                                            </>
                                                            :
                                                            result.status === 1 ?
                                                                <>

                                                                    <span onClick={() => { cts(result.billno, 2); }} className='btn btn-sm btn-info'>Make as Delevered</span>
                                                                </>
                                                                :
                                                                <p style={{ color: 'green' }}>Delivered</p>
                                                        }</td>


                                                    </tr>
                                                )
                                            })}
                                        {vieworders.length === 0 ?
                                            <tr>
                                                <td colSpan={8} style={{ textAlign: 'center' }}>No Items</td>
                                            </tr>
                                            : null}
                                    </tbody>
                                </table>
                                <br />
                                <hr />
                                <div style={{ textAlign: "center" }}>
                                    <span onClick={viewOrders} className='btn btn-sm btn-danger'>All Orders</span>
                                    &nbsp;
                                    <span onClick={() => { viewOrdersstatus(0) }} className='btn btn-sm btn-danger'>Pending</span>
                                    &nbsp;
                                    <span onClick={() => { viewOrdersstatus(1) }} className='btn btn-sm btn-danger'>Shipped</span>
                                    &nbsp;
                                    <span onClick={() => { viewOrdersstatus(2) }} className='btn btn-sm btn-danger'>Delivered</span>
                                    <br /><br />
                                    Billno : <input type="text" id="sbbn" />&nbsp;
                                    <span onClick={sbbn} className='btn btn-sm btn-primary'>search</span>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    User-Id : <input type="number" id="usid" />&nbsp;
                                    <span onClick={usid} className='btn btn-sm btn-primary'>search</span>

                                </div>
                            </div>
                        </div>


                    </div>


                    {/* /---------------modal---------------------------------- */}


                    <div class="modal fade" id="staticBackdropmopdadmin" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabelmopdadmin" aria-hidden="true">

                        <div class="modal-dialog modal-xl">

                            <div class="modal-content">

                                <div class="modal-body">
                                    <h5 style={{ textAlign: "center" }}>Product Details</h5>
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
                                                                <th scope="row">{result.name}</th>
                                                                <th style={{ whiteSpace: 'pre-wrap' }} scope="row">{result.description}</th>

                                                                <th scope="row">Rs : {result.price}</th>
                                                                <th scope="row">{result.qty}</th>
                                                                <th scope="row">Rs : {result.totalprice}</th>
                                                                <td><img className="img-fluid" src={'http://localhost:8081/' + result.image} style={{ height: '100px', width: '100px', objectFit: 'cover' }} alt="image1" /></td>


                                                            </tr>
                                                        )
                                                    })}
                                            </tbody>
                                        </table>
                                    </div>


                                    <h5 style={{ textAlign: "center" }}>Billing Details</h5>
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
                                                                <th scope="row">{result.uid}</th>
                                                                <th scope="row">Name : {result.name}<br />
                                                                    Email : {result.email}</th>
                                                                <th scope="row">Phone : {result.phone}</th>
                                                                <th scope="row" style={{ whiteSpace: 'pre-wrap' }}>{result.address}</th>
                                                            </tr>
                                                        )
                                                    })}
                                            </tbody>
                                        </table>
                                    </div>

                                </div>




                                <button style={{ width: "200px", margin: "auto" }} type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                                <br />

                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <h1 style={{ marginTop: '100px' }}>Login to Access Admin Page</h1>
                </>
            )}
            <br /><br />
        </div>
    );
};

export default Order;

