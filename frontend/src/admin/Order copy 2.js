// /* eslint-disable jsx-a11y/anchor-is-valid */
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min";
// import "../style/order.css"; 

// const Order = ({ isLoggedIn1 }) => {
//     useEffect(() => {
//         document.title = "Admin | Manage Orders";
//         viewOrders();
//     }, []);

//     // State variables
//     const [vieworders, setVieworders] = useState([]);
//     const [pd, setPd] = useState([]);
//     const [ad, setAd] = useState([]);

//     // Fetch all orders
//     const viewOrders = async () => {
//         try {
//             const result = await axios("http://localhost:8081/vieworderadmin");
//             setVieworders(result.data);
//         } catch (err) {
//             console.log(err);
//         }
//     }

//     // View orders with specific status
//     const viewOrdersstatus = async (status) => {
//         try {
//             const result = await axios.post("http://localhost:8081/vieworderadminstatus", { status });
//             setVieworders(result.data);
//         } catch (err) {
//             console.log(err);
//         }
//     }

//     // Fetch product details
//     const pdtls = async (billno) => {
//         try {
//             const result = await axios.post("http://localhost:8081/pdtlsadmin", { billno });
//             setPd(result.data[0]);
//             setAd(result.data[1]);
//         } catch (err) {
//             console.log(err);
//         }
//     }

//     // Change status to shipped or delivered
//     const cts = async (billno, status) => {
//         try {
//             const result = await axios.post("http://localhost:8081/ctsadmin", { billno, status });
//             if (result.data === "success") {
//                 viewOrders();
//             }
//         } catch (err) {
//             console.log(err);
//         }
//     }

//     // Search by bill number
//     const sbbn = async () => {
//         const billno = document.getElementById("sbbn").value;
//         try {
//             const result = await axios.post("http://localhost:8081/sbbn", { billno });
//             setVieworders(result.data);
//         } catch (err) {
//             console.log(err);
//         }
//     }

//     // Search by user ID
//     const usid = async () => {
//         const uid = document.getElementById("usid").value;
//         try {
//             const result = await axios.post("http://localhost:8081/usid", { uid });
//             setVieworders(result.data);
//         } catch (err) {
//             console.log(err);
//         }
//     }

//     return (
//         <div>
//             {isLoggedIn1 ? (
//                 <div className='container mt-4'>
//                     <div className="table-responsive">
//                         <table className="table table-striped table-bordered custom-table">
//                             <thead className="table-dark">
//                                 <tr>
//                                     <th>S.No</th>
//                                     <th>Order-Id</th>
//                                     <th>Date</th>
//                                     <th>No. of Items</th>
//                                     <th>Total Price</th>
//                                     <th>Status</th>
//                                     <th>Details</th>
//                                     <th>Manage</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {vieworders.map((result, index) => (
//                                     <tr key={index}>
//                                         <td>{index + 1}</td>
//                                         <td>{result.billno}</td>
//                                         <td>{new Date(result.datep).toLocaleDateString('en-GB')}</td>
//                                         <td>{result.item}</td>
//                                         <td>Rs: {result.tprice}</td>
//                                         <td className={`status-${result.status}`}>
//                                             {result.status === 0 ? 'Pending' : result.status === 1 ? 'Shipped' : 'Delivered'}
//                                         </td>
//                                         <td>
//                                             <button onClick={() => pdtls(result.billno)} 
//                                               data-bs-toggle="modal" data-bs-target="#staticBackdropmopdadmin">details</button>
//                                         </td>
//                                         <td>
//                                             {result.status === 0 ? (
//                                                 <button onClick={() => cts(result.billno, 1)} className='btn btn-sm btn-secondary'>Make as Shipped</button>
//                                             ) : result.status === 1 ? (
//                                                 <button onClick={() => cts(result.billno, 2)} className='btn btn-sm btn-info'>Make as Delivered</button>
//                                             ) : (
//                                                 <p>Delivered</p>
//                                             )}
//                                         </td>
//                                     </tr>
//                                 ))}
//                                 {vieworders.length === 0 && (
//                                     <tr>
//                                         <td colSpan={8} className="text-center">No Items</td>
//                                     </tr>
//                                 )}
//                             </tbody>
//                         </table>
//                     </div>
//                     <div className="text-center mt-4">
//                         <button onClick={viewOrders} className='btn btn-danger btn-3d'>All Orders</button>&nbsp;
//                         <button onClick={() => viewOrdersstatus(0)} className='btn btn-danger btn-3d'>Pending</button>&nbsp;
//                         <button onClick={() => viewOrdersstatus(1)} className='btn btn-danger btn-3d'>Shipped</button>&nbsp;
//                         <button onClick={() => viewOrdersstatus(2)} className='btn btn-danger btn-3d'>Delivered</button>
//                         <br /><br />
//                         <input type="text" id="sbbn" placeholder="Bill No" className="form-control w-25 d-inline" />&nbsp;
//                         <button onClick={sbbn} className='btn btn-primary btn-3d'>Search by Bill No</button><br/><br/>
//                         <input type="number" id="usid" placeholder="User ID" className="form-control w-25 d-inline" />&nbsp;
//                         <button onClick={usid} className='btn btn-primary btn-3d'>Search by User ID</button>
//                     </div>
//                 </div>
//             ) : (
//                 <h1 className="text-center mt-5">Login to Access Admin Page</h1>
//             )}

            
// <div class="modal fade" id="staticBackdropmopdadmin" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabelmopdadmin" aria-hidden="true">

// <div class="modal-dialog modal-xl">

//     <div class="modal-content">

//         <div class="modal-body">
//             <h5 style={{ textAlign: "center" }}>Product Details</h5>
//             <div class="table-responsive">

//                 <table class="table table-striped align-middle">
//                     <tr style={{ backgroundColor: "green", color: 'white' }}>
//                         <th scope="col">Product</th>
//                         <th scope="col">Description</th>
//                         <th scope="col">Price</th>
//                         <th scope="col">Quantity</th>
//                         <th scope="col">Total</th>
//                         <th scope="col">Image</th>

//                     </tr>

//                     <tbody>
//                         {
//                             pd.map((result, index) => {
//                                 return (
//                                     <tr key={index}>
//                                         <td>{result.name}</td>
//                                         <td style={{ whiteSpace: 'pre-wrap' }}>{result.description}</td>

//                                         <td>Rs : {result.price}</td>
//                                         <td>{result.qty}</td>
//                                         <td>Rs : {result.totalprice}</td>
//                                         <td><img className="img-fluid" src={'http://localhost:8081/' + result.image} style={{ height: '100px', width: '100px', objectFit: 'cover' }} alt="image1" /></td>


//                                     </tr>
                                    
//                                 )
//                             })}
//                               {
//                             ad.map((result, index) => {
//                                 return (
//                                     <tr key={index}>
//                                         <th>USER ID : {result.uid}</th>
//                                         <th>Name : {result.name}<br />
//                                             Email : {result.email}</th>
//                                         <th>Phone : {result.phone}</th>
//                                         <th colSpan={3} style={{ whiteSpace: 'pre-wrap' }}>ADDRESS : <br/>
//                                         {result.address}</th>
//                                     </tr>
//                                 )
//                             })}
//                     </tbody>
//                 </table>
//             </div>


//         </div>




//         <button style={{ width: "200px", margin: "auto" }} type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
//         <br />

//     </div>
// </div>
// </div>
// <br/><br/>
//         </div>
//     );
// };
// export default Order;




import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "../style/order.css";
import * as XLSX from 'xlsx';
import { jsPDF } from "jspdf";
import 'jspdf-autotable';

const Order = ({ isLoggedIn1 }) => {
    useEffect(() => {
        document.title = "Admin | Manage Orders";
        viewOrders();
    }, []);

    const [vieworders, setVieworders] = useState([]);
    const [pd, setPd] = useState([]);
    const [ad, setAd] = useState([]);

    const viewOrders = async () => {
        try {
            const result = await axios("http://localhost:8081/vieworderadmin");
            setVieworders(result.data);
        } catch (err) {
            console.log(err);
        }
    }

    const viewOrdersstatus = async (status) => {
        try {
            const result = await axios.post("http://localhost:8081/vieworderadminstatus", { status });
            setVieworders(result.data);
        } catch (err) {
            console.log(err);
        }
    }

    const pdtls = async (billno) => {
        try {
            const result = await axios.post("http://localhost:8081/pdtlsadmin", { billno });
            setPd(result.data[0]);
            setAd(result.data[1]);
        } catch (err) {
            console.log(err);
        }
    }

    const cts = async (billno, status) => {
        try {
            const result = await axios.post("http://localhost:8081/ctsadmin", { billno, status });
            if (result.data === "success") {
                viewOrders();
            }
        } catch (err) {
            console.log(err);
        }
    }

    const sbbn = async () => {
        const billno = document.getElementById("sbbn").value;
        try {
            const result = await axios.post("http://localhost:8081/sbbn", { billno });
            setVieworders(result.data);
        } catch (err) {
            console.log(err);
        }
    }

    const usid = async () => {
        const uid = document.getElementById("usid").value;
        try {
            const result = await axios.post("http://localhost:8081/usid", { uid });
            setVieworders(result.data);
        } catch (err) {
            console.log(err);
        }
    }

    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(vieworders.map((order, index) => ({
            "S.No": index + 1,
            "OrderId": order.billno,
            "Date": new Date(order.datep).toLocaleDateString('en-GB'),
            "No. of Items": order.item,
            "Total Price": `Rs: ${order.tprice}`,
            "Status": order.status === 0 ? 'Pending' : order.status === 1 ? 'Shipped' : 'Delivered',
        })));

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Orders");

        // Generate Excel file and trigger download
        XLSX.writeFile(wb, "Orders.xlsx");
    };

    const exportToPDF = () => {
        const doc = new jsPDF();

        doc.autoTable({
            head: [['S.No', 'OrderId', 'Date', 'No. of Items', 'Total Price', 'Status']],
            body: vieworders.map((order, index) => ([
                index + 1,
                order.billno,
                new Date(order.datep).toLocaleDateString('en-GB'),
                order.item,
                `Rs: ${order.tprice}`,
                order.status === 0 ? 'Pending' : order.status === 1 ? 'Shipped' : 'Delivered',
            ])),
            margin: { top: 20 },
            theme: 'striped',
        });

        doc.save("Orders.pdf");
    };

    return (
        <div>
            {isLoggedIn1 ? (
                <div className='container mt-4'>
                    <div className="table-responsive">
                        <table className="table table-striped table-bordered custom-table">
                            <thead className="table-dark">
                                <tr>
                                    <th>S.No</th>
                                    <th>Order-Id</th>
                                    <th>Date</th>
                                    <th>No. of Items</th>
                                    <th>Total Price</th>
                                    <th>Status</th>
                                    <th>Details</th>
                                    <th>Manage</th>
                                </tr>
                            </thead>
                            <tbody>
                                {vieworders.map((result, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{result.billno}</td>
                                        <td>{new Date(result.datep).toLocaleDateString('en-GB')}</td>
                                        <td>{result.item}</td>
                                        <td>Rs: {result.tprice}</td>
                                        <td className={`status-${result.status}`}>
                                            {result.status === 0 ? 'Pending' : result.status === 1 ? 'Shipped' : 'Delivered'}
                                        </td>
                                        <td>
                                            <button onClick={() => pdtls(result.billno)} 
                                              data-bs-toggle="modal" data-bs-target="#staticBackdropmopdadmin">Details</button>
                                        </td>
                                        <td>
                                            {result.status === 0 ? (
                                                <button onClick={() => cts(result.billno, 1)} className='btn btn-sm btn-secondary'>Make as Shipped</button>
                                            ) : result.status === 1 ? (
                                                <button onClick={() => cts(result.billno, 2)} className='btn btn-sm btn-info'>Make as Delivered</button>
                                            ) : (
                                                <p>Delivered</p>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="text-center mt-4">
                        <button onClick={exportToExcel} className='btn btn-success'>Download as Excel</button>&nbsp;
                        <button onClick={exportToPDF} className='btn btn-warning'>Download as PDF</button>
                    </div>
                </div>
            ) : (
                <h1 className="text-center mt-5">Login to Access Admin Page</h1>
            )}
           

{/* ------------------------------------------------------------------------------------------- */}


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
                                         <td>{result.name}</td>
                                         <td style={{ whiteSpace: 'pre-wrap' }}>{result.description}</td>

                                         <td>Rs : {result.price}</td>
                                         <td>{result.qty}</td>
                                         <td>Rs : {result.totalprice}</td>
                                         <td><img className="img-fluid" src={'http://localhost:8081/' + result.image} style={{ height: '100px', width: '100px', objectFit: 'cover' }} alt="image1" /></td>


                                     </tr>
                                    
                                 )
                             })}
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

         </div>




         <button style={{ width: "200px", margin: "auto" }} type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
         <br />

     </div>
 </div>
 </div>
 

{/* ------------------------------------------------------------------------------------------- */}
        </div>
    );
};

export default Order;
