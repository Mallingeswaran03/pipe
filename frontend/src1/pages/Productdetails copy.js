/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import 'bootstrap-icons/font/bootstrap-icons.css';
import "../style/home.css";

const Productdetails = ({ isLoggedIn }) => {


  var { pid } = useParams();


  const [rt, setRt] = useState([]);
  const [cavg, setCavg] = useState([]);
  const [viewproductdetails, setViewproductdetails] = useState([]);
  const [pdname, setPdname] = useState([]);
  useEffect(() => {

    document.title = `Ambaal Pipes | ${pdname}`;

    const viewProductdetails = async () => {
      try {
        const result = await axios.post("http://localhost:8081/ViewProductdetailsone", { pid });
        setViewproductdetails(result.data[0]);
        setPdname(result.data[0][0].name);
        setCavg(result.data[1][0].rv);
      } catch (err) {
        console.log(err);
      }
    };

    viewProductdetails();


    //   -----------------view rating----------------------------
    const viewRating = async () => {
      try {
        const result = await axios.post("http://localhost:8081/productdetailsGetcomment", { pid });
        setRt(result.data);
      } catch (err) {
        console.log(err);
      }
    };
    viewRating();

  }, [pid, pdname]);


  const viewProductdetails = async () => {
    try {
      const result = await axios.post("http://localhost:8081/ViewProductdetailsone", { pid });
      setViewproductdetails(result.data[0]);
      setCavg(result.data[1][0].rv);
    } catch (err) {
      console.log(err);
    }
  }


  // -----------------review---------------------
  const [co, setCo] = useState([]);
  const [rtst, setRtst] = useState([]);
  const addr = async (event) => {
    var uid = localStorage.getItem("userId");
    var name = localStorage.getItem("userName");
    var email = localStorage.getItem("userEmail");
    event.preventDefault();
    if (document.getElementById("rtst").value !== "0") {


      try {
        const result = await axios.post("http://localhost:8081/addr", { uid, name, email, rtst, co, pid });
        if (result.data === "success") {
          document.getElementById("addr").reset();
          //alert("Success")
          viewRating();
          viewProductdetails();
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


  //   -----------------view rating----------------------------
  const viewRating = async () => {
    try {
      const result = await axios.post("http://localhost:8081/productdetailsGetcomment", { pid });
      setRt(result.data);
    } catch (err) {
      console.log(err);
    }
  }


  function getrastar(rtst) {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} style={{ color: 'orangered' }} className={i <= rtst ? "bi bi-star-fill" : "bi bi-star"}></span>
      );
    }
    return stars;
  }


  // ------------------cart--------------------
  const cart = async () => {
    const uid = localStorage.getItem("userId");
    try {
      const result = await axios.post("http://localhost:8081/addtocart", { pid, uid });
      if (result.data === "success") {
        alert("added to cart");
      }
      if (result.data === "exist") {
        alert("Already added to cart");
      }
    } catch (err) {
      console.log(err);
    }
  }





  function lnad() {
    alert("Please login to add this product to cart")
  }

  return (
    <div className='plfontall'>
      <div style={{ fontSize: "18px", backgroundColor: "orangered", color: "white", padding: "5px", fontWeight: "600" }}>{pdname}</div>


      <div className='container-md' style={{ marginTop: "10px", marginBottom: '50px' }}>
        <div className='row'>

          {
            viewproductdetails.map((result, index) => {
              return (
                <>
                  <div className='col-xl-5 col-md-6 col-sm-6' style={{ textAlign: 'center', margin: 'auto' }}>
                    <img className="img-fluid shadow" src={'http://localhost:8081/' + result.image} style={{ height: '300px', objectFit: "cover" }} alt="image1" />
                  </div>

                  <div className='col-xl-5 col-md-6 col-sm-6' style={{ padding: '20px', margin: "auto" }}>


                    <h5 style={{ color: 'gray' }}>{result.name}</h5>
                    {getrastar(cavg)}
                    <br/>
                    <b>Price : Rs.{result.price}.00</b> <br />
                    <b>Brand : {result.brand}</b>


                    <br />

                    <div style={{ border: "1px solid gray", borderRadius: "10px", padding: "10px" }}>
                      <h5 style={{ padding: '5px', color: 'white', background: "blue" }}>Description :</h5>
                      <p style={{ padding: "0 10px 10px 10px", whiteSpace: 'pre-wrap' }}>{result.description}</p>
                    </div>

                    <br />
                    <br />
                    {
                      result.quantity === 0 ?
                        <span className='btn btn-secondary'>
                          Out of Stock
                        </span>
                        :
                        isLoggedIn ? (
                          <>
                            <span onClick={cart} className='btn btn-info'>
                              Add to Cart
                            </span>
                          </>) : (
                          <>
                            <span onClick={lnad} className='btn btn-info'>
                              Add to cart
                            </span>
                          </>)
                    }
                  </div>
                  <div className='col-md-12 col-sm-12' style={{ padding: '20px', margin: "10px 0 0 0", border: "1px solid gray", borderRadius: "10px" }}>
                    <h5 style={{ padding: '5px', color: 'white', background: "blue" }}>Overview :</h5>
                    <p style={{ padding: "0 10px 10px 10px", whiteSpace: 'pre-wrap' }}>{result.overview}</p>
                  </div>
                </>
              )
            })}
        </div>
      </div>


      <hr />
      {/* ------------------add review--------------------------- */}

      <div className='container-md'>
        {isLoggedIn ?
          <div className='row'>
            <div className='col-sm-12'>
              <h4>Review</h4>
            </div>

            <form id='addr' onSubmit={addr} style={{ border: '1px solid rgb(218, 208, 208)', borderRadius: "10px" }} className='shadow-sm'>
              <div className='row'>
                <div className='col-md-6 col-sm-12' style={{ padding: "20px" }}>
                  <label style={{ marginBottom: '5px' }}>User Name *</label>
                  <input style={{ width: "100%" }} type="text" readOnly value={localStorage.getItem("userName")} />

                  <label style={{ margin: '15px 0 5px 0' }}>Email *</label>
                  <input style={{ width: "100%" }} type="email"
                    readOnly value={localStorage.getItem("userEmail")}
                  />
                  <br /><br />
                  <select style={{ color: 'brown' }} id="rtst"
                    onChange={e => setRtst(e.target.value)}>
                    <option style={{ color: 'gray' }} value="0">Rating</option>
                    <option value="1"> 1 </option>
                    <option value="2"> 2 </option>
                    <option value="3"> 3 </option>
                    <option value="4"> 4 </option>
                    <option value="5"> 5 </option>
                  </select>

                </div>
                <div className='col-md-6 col-sm-12' style={{ padding: "20px" }}>
                  <label style={{ marginBottom: '5px' }}>Message *</label>
                  <textarea rows="4" required style={{ width: "100%" }}
                    onChange={e => setCo(e.target.value)}></textarea>


                  <div style={{ marginTop: '15px', textAlign: 'center' }}>
                    <button className="btn btn-danger btn-sm">Send</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
          : null
        }
      </div>
      <br /><hr />
      {/* ---------reviews------------ */}
      <div className='container-md'>
       
        <h4>Feedback
        </h4>
     

        <div className='row justify-content-center align-items-center g-2' style={{ marginTop: '20px' }}>
          {rt.map((result, index) => (
            <div className='col-md-12 col-sm-12' style={{ padding: '0 20px 0 20px', border: "1px solid rgb(218, 208, 208)", borderRadius: "10px" }}>


              <div className='row' style={{ marginBottom: '8px', marginTop: '20px' }}>
                <div className='col-sm-6'>
                  <b><i style={{ color: 'black' }} class="bi bi-person-fill"></i> {result.name}</b>
                 &nbsp; ({new Date(result.datep).toLocaleDateString('en-GB')}
)
                </div>
       
              </div>

              {/* -------rating-------- */}
              <div style={{ marginTop: '10px', marginBottom: '10px' }}>
                Rating : {getrastar(result.rtst)}
              </div>
              {/* -------------------- */}

              <p style={{ marginBottom: '20px', whiteSpace: 'pre-wrap', color: 'gray' }}>
                {result.co}
              </p>





            </div>
          ))}


        </div>
      </div>
      {/* ---------------------------- */}


<br/><br/>
    </div>
  );
}
export default Productdetails;