/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import 'bootstrap-icons/font/bootstrap-icons.css';
import "../style/login.css";

const Addsegments = ({ isLoggedIn1}) => {
    const navigate = useNavigate();



    useEffect(() => {
        document.title = "Admin | Segments";
        viewCategory();
        viewSubcategory();
    }, [navigate]);

    //--------------------add Category---------------------------------------------
    const [addcategoryname, setAddcategoryname] = useState([]);

    const addCategory = async (event) => {
        event.preventDefault();
        try {
            const result = await axios.post("http://localhost:8081/AddCategory", { addcategoryname });
            if (result.data === "Alreadyexist") {
                alert("This Category Already Exist")
            }
            else {
                document.getElementById("addcategory").reset();
                //alert("Success")
                viewCategory();
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    // ------------------------view category-------------------------------------------
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


       //--------------------add SubCategory---------------------------------------------
       const [addsubcategoryname, setAddsubcategoryname] = useState([]);
       const [addcid, setAddcid] = useState([]);
   
       const addSubcategory = async (event) => {
        alert(addcid+" "+addsubcategoryname)
           event.preventDefault();
           if(document.getElementById("smcn").value!=="0"){
   
           
           try {
               const result = await axios.post("http://localhost:8081/AddSubcategory", { addcid, addsubcategoryname });
               if (result.data === "Alreadyexist") {
                   alert("This Sub Category Already Exist")
               }
               else {
                   document.getElementById("addsubcategory").reset();
                   //alert("Success")
                   viewSubcategory();
               }
           }
           catch (err) {
               console.log(err);
           }
       }
       else{
           alert("Choose Category");
       }
       }
   
       // ------------------------view subcategory-------------------------------------------
       const [viewsubcategory, setViewsubcategory] = useState([]);
       const viewSubcategory = async () => {
           try {
               const result = await axios("http://localhost:8081/ViewSubcategory");
               setViewsubcategory(result.data)
           }
           catch (err) {
               console.log(err)
           }
       }


    return (
        <div  style={{backgroundColor:'orangered'}}>
        <br/>
        <h4 style={{color:'white',textAlign:"center"}}>
Add Segments
        </h4>
        <br/>
        <div className="container-md">


{isLoggedIn1 ? (<>

            <table className="table table-hover">
                <thead className="table-dark">
                    <tr>
                        <th scope="col">S.No</th>
                        <th scope="col">Category Name</th>
                        <th scope="col">Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        viewcategory.map((result, index) => {
                            return (
                                <tr key={index}>
                                    <th scope="row">{result.cid}</th>
                                    <td style={{ textTransform: 'capitalize' }}>{result.cname}</td>
                                    <td><i className="bi bi-pencil-square"></i></td>
                                </tr>
                            )
                        })}
                </tbody>
                <tfoot>
                    <tr className="shadow">
                        <td colSpan={3} style={{ paddingLeft:"20px"}}>
                            <br />
                            <form id='addcategory' onSubmit={addCategory}>

                                <label>Segment Name</label><br/>
                                <input className="input" type="text" placeholder="Segment Name"
                                    required
                                    style={{ textTransform: 'lowercase'}}
                                    onChange={e => setAddcategoryname(e.target.value)} />
                                &nbsp;
                                <button style={{border:"none",backgroundColor:"unset"}}><i class="bi bi-plus-square-fill" style={{fontSize:"22px"}}></i></button>
                            </form>
                        </td>
                    </tr>
                </tfoot>
            </table>

<br/><br/>
<hr/>
<table className="table table-hover">
                <thead className="table-dark">
                    <tr>
                        <th scope="col">S.No</th>
                        <th scope="col">Category</th>
                        <th scope="col">Sub Category</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        viewsubcategory.map((result, index) => {
                            return (
                                <tr key={index}>
                                    <th scope="row">{index+1}</th>
                                    <td style={{ textTransform: 'capitalize' }}>{result.cname}</td>
                                    <td style={{ textTransform: 'capitalize' }}>{result.scname}</td>
                                    <td><i className="bi bi-pencil-square"></i></td>
                                </tr>
                            )
                        })}
                </tbody>
                <tfoot className="shadow">
                    <tr>
                        <td colSpan={4} style={{ paddingLeft:"20px"}}>
                            <br/>
                            <form id='addsubcategory' onSubmit={addSubcategory}>
                            <label>Choose Segment Type</label><br/>
                                    <select onClick={viewCategory} id="smcn" onChange={e => setAddcid(e.target.value)}>
                                    <option style={{ color: "gray" }} value="0"> -- Select a Segment -- </option>
                                    {viewcategory.map((result, index) => <option key={index} value={result.cid}>{result.cname}</option>)}
                                </select>
                                <br/><br/>
                                <label>Sub-Segment Name</label><br/>
                                <input type="text" placeholder="Sub Category Name" required 
                                    onChange={e => setAddsubcategoryname(e.target.value)} /> 

                                &nbsp;
                                <button style={{border:"none",backgroundColor:"unset"}}><i class="bi bi-plus-square-fill" style={{fontSize:"22px"}}></i></button>
                            </form>
                        </td>
                    </tr>
                </tfoot>
            </table>






            <br />
            </>):(
                <>
                <h1 style={{marginTop:'100px'}}>Login to Access Admin Page</h1>
                </>
            )
}
        </div>
        </div>
    );
}

export default Addsegments;

