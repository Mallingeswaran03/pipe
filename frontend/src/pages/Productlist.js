/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState,useEffect,useCallback  } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "../style/productlist.css";


const Productlist = () => {
  var {scid,cname,scname} = useParams();


      // ------------------------viwe products-----------------------
      const [getscdlfcpl, setGetscdlfcpl] = useState([]);
      const getScdlpl = useCallback(async () => {
          try {
              const result = await axios.post("http://localhost:8081/ProductList", { scid });
              setGetscdlfcpl(result.data);
          }
          catch (err) {
              console.log(err);
          }
      },[scid])


      useEffect(() => {
        document.title = `${cname} | ${scname}`;
          getScdlpl();
        },[cname, scname,getScdlpl])
  
        


  return (
   <div className='plfontall'>
    <div style={{fontSize:"18px",backgroundColor:"orangered",color:"white",padding:"5px",fontWeight:"600"}}>Home | {cname} | {scname}</div>


    <div className="container">
        <div className="row justify-content-center text-center">
        {
        getscdlfcpl.map((result,index) => (
          <div key={index} className="col-lg-3 col-md-4 col-sm-6 rent-furni">


            <div className='rent-furni1'>
            <img  src={'http://localhost:8081/' + result.image} style={{width:"100%",height:'200px',objectFit:"fill"}} className="img-fluid" alt="slider2" />
                        
            <span>{result.name}
            <br />
                      {result.discount===0?<>
                      <br/>
                       <div style={{ color: 'orangered',fontSize:"18px",fontWeight:'bold',marginBottom:"18px" }}>Price ₹ {result.price}.00</div>
                       </>
                      
                       :
                       <>
                      ({result.discount}%)&nbsp;
                       <span style={{ color: 'gray',textDecoration:"line-through" }}>{result.price1}.00</span>
                       <br/>
                       <span style={{ color: 'orangered'}}>Price : Rs {result.price}.00</span>
                       <br/>
                       </>
                    }
            <NavLink to={`/Productdetails/${result.pid}`} className='btn'>
                          View Details</NavLink>
            </span>
            </div> 
            
          </div>
         ))}
        </div>
      </div>
      {/* --------------------------------------------------------------------------------- */}
   </div>
   
  );
}
export default  Productlist;