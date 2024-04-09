/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import 'bootstrap-icons/font/bootstrap-icons.css';
import "../style/login.css";

const Addproducts = ({ isLoggedIn1 }) => {
    const navigate = useNavigate();



    useEffect(() => {
        document.title = "Admin | Products";
        viewProduct();
    }, [navigate]);

    //--------------------add product---------------------------------------------
    const [addpcid, setAddpcid] = useState([]);
    const [addpscid, setAddpscid] = useState([]);
    const [addpname, setAddpname] = useState([]);
    const [addpprice, setAddpprice] = useState([]);
    const [addpqty, setAddpqty] = useState([]);
    const [addpdescription, setAddpdescription] = useState([]);
    const [addpimg, setAddpimg] = useState([]);
    const [addoverview, setAddoverview] = useState([]);
    const [addbrand, setAddbrand] = useState([]);
    const [discount, setDiscount] = useState([]);
    const [addtpprice, setAddtpprice] = useState([]);


    const addProduct = async (event) => {
        event.preventDefault();
        const formdata = new FormData();
        formdata.append('addpcid', addpcid);
        formdata.append('addpscid', addpscid);
        formdata.append('addpname', addpname);
        formdata.append('addpprice', addpprice);
        formdata.append('addpqty', addpqty);
        formdata.append('addpdescription', addpdescription);
        formdata.append('addpimg', addpimg);
        formdata.append('addoverview', addoverview);
        formdata.append('addbrand', addbrand);
        formdata.append('discount', discount);
        formdata.append('addtpprice', addtpprice);
        if ((document.getElementById("smpn").value !== "0") && (document.getElementById("smpn1").value !== "0")) {


            try {
                const result = await axios.post("http://localhost:8081/AddProduct", formdata);
                if (result.data === "failed") {
                    alert("Something went wrong!")
                }
                else {
                    document.getElementById("addproduct").reset();
                    //alert("Success")
                    viewProduct();
                    fnreset();
                }
            }
            catch (err) {
                console.log(err);
            }
        }
        else {
            alert("Choose Category");
        }
    }

    // ---------------------------get sub category details on click category name-------------------------
    const [getscdlfc, setGetscdlfc] = useState([]);
    const getscdl = async (cid) => {


        try {
            const result = await axios.post("http://localhost:8081/GetScdetails", { cid });
            setGetscdlfc(result.data);
        }
        catch (err) {
            console.log(err);
        }
    }

    // ------------------------view product-------------------------------------------
    const [viewproduct, setViewproduct] = useState([]);
    const viewProduct = async () => {
        try {
            const result = await axios("http://localhost:8081/ViewProduct");
            setViewproduct(result.data)
        }
        catch (err) {
            console.log(err)
        }
    }

    // ------------------------view category for select menu-------------------------------------------
    const [viewcategory, setViewcategory] = useState([]);
    const viewCategory = async () => {
        try {
            const result = await axios("http://localhost:8081/ViewCategory");
            setViewcategory(result.data)
        }
        catch (err) {
            console.log(err)
        }
    }


    // -------------update product-------------------------
    const [pid, setPid] = useState([]);
    const [medit, setMedit] = useState(true);
    function upaddprod(pid, name, description, quantity, price, overview, brand, discount, price1) {

        setMedit(false);
        document.getElementById("name").value = name;
        document.getElementById("price").value = price;
        document.getElementById("quantity").value = quantity;
        document.getElementById("description").value = description;
        document.getElementById("overview").value = overview;
        document.getElementById("brand").value = brand;
        document.getElementById("discount").value = discount;
        document.getElementById("tprice").value = price1;

        setAddpname(name);
        setAddpprice(price);
        setAddpqty(quantity);
        setAddpdescription(description);
        setAddoverview(overview);
        setAddbrand(brand);
        setPid(pid);
        setDiscount(discount);
        setAddtpprice(price1);

    }

    function fnreset() {
        document.getElementById("addproduct").reset();
        setAddpname("");
        setAddpprice("");
        setAddpqty("");
        setAddpdescription("");
        setPid("");
        setMedit(true);
        setAddpimg('');
        setAddoverview("");
        setAddbrand("");

        setDiscount(0);
        setAddtpprice(0);
    }

    // --update product---------
    const upprd = async (event) => {
        event.preventDefault();
        const formdata1 = new FormData();
        formdata1.append('pid', pid);
        formdata1.append('addpname', addpname);
        formdata1.append('addpprice', addpprice);
        formdata1.append('addpqty', addpqty);
        formdata1.append('addpdescription', addpdescription);
        formdata1.append('addpimg', addpimg);
        formdata1.append('addoverview', addoverview);
        formdata1.append('addbrand', addbrand);
        formdata1.append('discount', discount);
        formdata1.append('addtpprice', addtpprice);


        try {
            const result = await axios.post("http://localhost:8081/AddProductup", formdata1);
            if (result.data === "failed") {
                alert("Something went wrong!")
            }
            else {

                alert("updated")
                viewProduct();
                fnreset();
            }
        }
        catch (err) {
            console.log(err);
        }
    }


    function getdiscount() {
        setAddpprice(addtpprice - (addtpprice * (discount / 100)));
    }


    return (
        <div  style={{backgroundColor:'orangered'}}>
            <br/>
            <h4 style={{color:'white',textAlign:"center"}}>
Manage Products
            </h4>
            <br/>
        <div className="container-md">


            {isLoggedIn1 ? (<>

                <table className="table table-hover">
                    <thead className="table-dark">
                        <tr>
                            <th scope="col">Image</th>
                            <th scope="col">Brand</th>
                            <th scope="col">Product Details</th>
                            <th scope="col">Description</th>
                            <th scope="col">Overview</th>
                            <th scope="col">Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            viewproduct.map((result, index) => {
                                return (
                                    <tr key={index}>
                                        <th scope="row">
                                            <img className="img-fluid shadow" src={'http://localhost:8081/' + result.image} style={{ maxHeight: '80px', objectFit: 'cover' }} alt={result.title} />
                                        </th>
                                        <td>{result.brand}</td>
                                        <td style={{ textTransform: 'capitalize' }}>{result.name} (Pid : {result.pid})
                                            <br />Price : ₹ {result.price1}.00<br />
                                            Discount : {result.discount}%
                                            <br />Final Price : ₹ {result.price}.00
                                            <br />Quantity : {result.quantity}
                                            <br />Date Added : <td>{new Date(result.datep).toLocaleDateString('en-GB')}</td>
                                        </td>
                                        <td style={{ whiteSpace: 'pre-wrap' }}>{result.description}</td>
                                        <td style={{ whiteSpace: 'pre-wrap' }}>{result.overview}</td>
                                        <td> <span style={{ color: "red", cursor: 'pointer' }} onClick={() => { upaddprod(result.pid, result.name, result.description, result.quantity, result.price, result.overview, result.brand, result.discount, result.price1); }}>
                                            <i class="bi bi-pencil"></i>
                                        </span></td>
                                    </tr>
                                )
                            })}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={6} style={{ paddingLeft: "20px" }}>
                                <br />
                                <div className="shadow" style={{ margin: '0 auto', width: "90%", padding: '10px' }}>
                                    <form id='addproduct' onSubmit={medit ? addProduct : upprd}>
                                        {medit ? <>
                                            <label style={{ display: 'block', width: '100%', marginBottom: '1px' }}>Category Name :</label>
                                            <select onClick={viewCategory} style={{ width: '100%', color: 'gray' }} id="smpn"
                                                onChange={e => {
                                                    const selectedCid = e.target.value;
                                                    setAddpcid(selectedCid);
                                                    getscdl(selectedCid);
                                                }}>
                                                <option style={{ color: "green" }} value="0"> -- Select a Category -- </option>
                                                {viewcategory.map((result, index) => <option key={index} value={result.cid}>{result.cname}</option>)}
                                            </select><br /><br />

                                            <label style={{ display: 'block', width: '100%', marginBottom: '1px' }}>Sub Category Name :</label>
                                            <select style={{ width: '100%', color: 'gray' }} id="smpn1" onChange={e => setAddpscid(e.target.value)}>
                                                <option style={{ color: "green" }} value="0"> -- Select a Sub Category -- </option>
                                                {getscdlfc.map((result, index) => <option key={index} value={result.scid}>{result.scname}</option>)}
                                            </select><br /><br />
                                        </> : null
                                        }
                                        <label style={{ display: 'block', width: '100%', marginBottom: '1px' }}>Product Name :</label>
                                        <input type="text" placeholder="Product Name" required style={{ width: '100%' }}
                                            id="name" onChange={e => setAddpname(e.target.value)} />
                                        <br /><br />

                                        <label style={{ display: 'block', width: '100%', marginBottom: '1px' }}>Brand Name :</label>
                                        <input type="text" placeholder="Brand Name" required style={{ width: '100%' }}
                                            id="brand" onChange={e => setAddbrand(e.target.value)} />
                                        <br /><br />

                                        <label style={{ display: 'block', width: '100%', marginBottom: '1px' }}>Price : </label>
                                        <input id="tprice" type="number" placeholder="Price" required style={{ width: '100%' }}
                                            onChange={e => setAddtpprice(e.target.value)}
                                            onMouseOut={getdiscount}
                                        />
                                        <br /><br />

                                        <label style={{ display: 'block', width: '100%', marginBottom: '1px' }}>Discount :</label>
                                        <input id="discount" type="number" placeholder="Discount" style={{ width: '100%' }}
                                            onChange={e => setDiscount(e.target.value)}
                                            onMouseOut={getdiscount} />
                                        <br /><br />

                                        <label style={{ display: 'block', width: '100%', marginBottom: '1px' }}>Final Price : </label>
                                        <input type="number" placeholder="Price" required style={{ width: '100%' }}
                                            id="price" readOnly value={addpprice} />
                                        <br /><br />

                                        <label style={{ display: 'block', width: '100%', marginBottom: '1px' }}>Quantity :</label>
                                        <input type="number" placeholder="Quantity" required style={{ width: '100%' }}
                                            id="quantity" onChange={e => setAddpqty(e.target.value)} />
                                        <br /><br />

                                        <label style={{ display: 'block', width: '100%', marginBottom: '1px' }}>Description :</label>
                                        <textarea id="description" rows={4} required style={{ width: '100%' }} placeholder="Description" onChange={e => setAddpdescription(e.target.value)}>
                                        </textarea>
                                        <br /><br />

                                        <label style={{ display: 'block', width: '100%', marginBottom: '1px' }}>Overview :</label>
                                        <textarea id="overview" rows={4} required style={{ width: '100%' }} placeholder="Overview" onChange={e => setAddoverview(e.target.value)}>
                                        </textarea>
                                        <br /><br />



                                        <label style={{ display: 'block', width: '100%', marginBottom: '1px' }}>Image :</label>
                                        <input type="file" placeholder="Image" required style={{ width: '100%' }}

                                            name="addpimg" onChange={e => setAddpimg(e.target.files[0])} />
                                        <br /><br />
                                        {medit ?
                                            <div style={{ textAlign: 'center' }}>
                                                <button onMouseOver={getdiscount}  className='btn btn-danger'>
                                                    ADD
                                                </button>
                                            </div> :
                                            <>
                                                <button onMouseOver={getdiscount}  className='btn btn-success'>
                                                    UPDATE
                                                </button>
                                                <span style={{ float: "right" }} onClick={fnreset} className="btn btn-danger">
                                                    CANCEL
                                                </span>
                                            </>
                                        }
                                    </form>
                                </div>
                            </td>
                        </tr>
                    </tfoot>
                </table>







                <br />
            </>) : (
                <>
                    <h1 style={{ marginTop: '100px' }}>Login to Access Admin Page</h1>
                </>
            )
            }
        </div>
        </div>
    );
}

export default Addproducts;

