/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import 'bootstrap-icons/font/bootstrap-icons.css';
import "../style/contactus.css";
const Contactus = ({ isLoggedIn }) => {

    
    useEffect(() => {
        document.title = "Ambaal Pipes | Contactus";
if(isLoggedIn)
{
    document.getElementById("name").value=localStorage.getItem("userName");
    document.getElementById("phone").value=localStorage.getItem("userPhone");
    document.getElementById("email").value=localStorage.getItem("userEmail");
}
else{
    document.getElementById("name").value="";
    document.getElementById("phone").value="";
    document.getElementById("email").value="";
}
    }, [isLoggedIn]);

       // ------------------------view category-------------------------------------------
       const viewCategory = async (event) => {
        event.preventDefault();
        var uid=localStorage.getItem("userId");
        var name=localStorage.getItem("userName");
        var phone=localStorage.getItem("userPhone");
        var email=localStorage.getItem("userEmail");
        var message=document.getElementById("message").value;
           try {
               const result = await axios.post("http://localhost:8081/addcontact",{uid,name,phone,email,message});
               if(result.data==="success")
               {
                alert("your feedback sended successfully");
                document.getElementById("message").value="";
               }
           }
           catch (err) {
               console.log(err)
           }
       }

    return (
        <div className="container-md contactus-root">
            <div className="row justify-content-center align-items-center g-2">
                <div className="col-md-6 col-sm-12" style={{ textAlign: 'center' }}>
                    <img src={require("../images/contactus.jpg")} style={{ objectFit: 'fill' }} className="img-fluid" alt="slider2" />
                </div>
                <div className="col-md-6 col-sm-12" style={{padding:'10px'}}>
                    <form onSubmit={viewCategory}>
                        <div className="heading1">Write Us</div>
                        <div className="row">
                            <div className="col-6">
                                <label><i className="bi bi-person"></i> Name</label>
                                <input className="input" type="text" placeholder="Name" id="name" readOnly required/>
                            </div>
                            <div className="col-6">
                                <label><i className="bi bi-phone"></i> Phone</label>
                                <input className="input" type="number" id="phone" readOnly
                                placeholder="Mobile Number"/>
                            </div>
                        </div>
                        <label><i className="bi bi-envelope-at"></i> Email</label>
                        <input className="input" type="email" placeholder="Email"
                       id="email" readOnly required/>
                        <label><i className="bi bi-chat-left-text"></i> Message</label>
                        <textarea id="message" className="input" rows="4" placeholder="Message" required>
                        </textarea>
                        <div style={{textAlign:'center',marginTop:'20px'}}>
                            {isLoggedIn? <button className="contactus-btn">Submit</button>:
                            <span className="contactus-btn">Login to contact us</span>
                            }
                            
                        </div>
                    </form>
                </div>



            </div>
        </div>
    );
};

export default Contactus;

