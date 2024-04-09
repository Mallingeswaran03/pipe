/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "../style/login.css";

const Login = ({ setLoggedIn }) => {
  const navigate = useNavigate();

    // ----------show/hide password--------------
    const [showPassword, setShowPassword] = useState(false);
    const handleTogglePassword = () => {
      setShowPassword(!showPassword);
    };


  useEffect(() => {
    document.title = "Register";
    // Check if the user is already logged in, then redirect to home
    if (localStorage.getItem("userData")) {
      navigate('/');
    }
  }, [navigate]);


  function hasUpperCase(str) {
    for (let i = 0; i < str.length; i++) {
        if (str[i] >= 'A' && str[i] <= 'Z') {
            return true; // Found uppercase letter
        }
    }
    return false; // No uppercase letter found
}


  // --------------user register-----------------------
  const [ruser, setRuser] = useState([]);
  const [rphone, setRphone] = useState([]);
  const [remail, setRemail] = useState([]);
  const [rpassword, setRpassword] = useState([]);
  const [rcpassword, setRcpassword] = useState([]);
  const userRegister = async (event) => {
    event.preventDefault();
    if ((rphone.toString().length !== 10) || (rphone < 6000000000)) {
      alert("Phone Number is Invalid");
    }
    else {
      if (!(rpassword.length >= 8)) {
        alert("password should 8 and above 8 characters");
      }
      else if(!(hasUpperCase(rpassword)))
      {
alert("password must have atleast one upper case")
      }
      else {
        if (rpassword !== rcpassword) {
          alert("Password not match");
        }
        else {
          try {
            const result = await axios.post("http://localhost:8081/UserRegister", { ruser, rphone, remail, rpassword });
            if (result.data === "Alreadyexist") {
              alert("Phone Number or Email-Id already exist"); 
            }
            else {
              document.getElementById("registerform").reset();
              alert("successfully registered");
              rtol();
            }
          }
          catch (err) {
            console.log(err);
          }
        }
      }
    }
  }
  // ---------------------------------------------------------------------------------


   //--------------------User Login---------------------------------------------
   const [lemail, setLemail] = useState([]);
   const [lpassword, setLpassword] = useState([]);
   const userLogin = async (event) => {
     event.preventDefault();
     try {
       const result = await axios.post("http://localhost:8081/Userlogin",{lemail,lpassword });
       if (result.data[0] === "success") {
         // localStorage.setItem("userName", result.data[1]);
         localStorage.setItem("userName", result.data[1]);
         localStorage.setItem("userId", result.data[2]);
         localStorage.setItem("userPhone", result.data[3]);
         localStorage.setItem("userEmail", result.data[4]);
         document.getElementById("loginform").reset();
        alert("Welcome, " + result.data[1]);
         localStorage.setItem("userData","0");
         setLoggedIn(true);
        //  alert("Welcome");
         navigate(-1);
       }
       else {
         alert("Invalid Email or Password");
       }
     }
     catch (err) {
       console.log(err);
     }
   }
   // ---------------------------------------------------------------------------------
 
   // -------------------------Update Password-----------------------------------------
  const [upemail, setUpemail] = useState([]);
  const [uppassword, setUppassword] = useState([]);
  const [upcpassword, setUpcpassword] = useState([]);
  const userUpdatepassword = async (event) => {
    event.preventDefault();
    if (!(uppassword.length >= 8 && uppassword.length <= 16)) {
      alert("Password Length should between 8 to 20 characters");
    }
    else {
      if (uppassword !== upcpassword) {
        alert("Password not match");
      }
      else {


      try {
        const result = await axios.post("http://localhost:8081/UserPassword", { upemail, uppassword });
        if (result.data === "success") {
          document.getElementById("updatepasswordform").reset();
          alert("Password Changed");
          uptol();
        }
        else {
          alert("Wrong Email-Id");
        }
      }
      catch (err) {
        console.log(err);
      }
    }
    }
  }



  function ltor()
  {
    document.getElementById("login").style.display="none";
    document.getElementById("register").style.display="block";
    document.title = "Register";
  }

  function ltoup()
  {
    document.getElementById("login").style.display="none";
    document.getElementById("updatepassword").style.display="block";
    document.title = "Forget Password";
  }

  function rtol()
  {
    document.getElementById("login").style.display="block";
    document.getElementById("register").style.display="none";
    document.title = "Login";
  }

  function uptol()
  {
    document.getElementById("login").style.display="block";
    document.getElementById("updatepassword").style.display="none";
    document.title = "Login";
  }


  return (
    <div className='login-root container-md'>
      {/* ---------register---------------- */}
      <div id="register">
         
        <div className='row justify-content-center'>
        <div style={{ margin: '40px 0 10px 0', fontSize: '36px', fontWeight: 800, textAlign: 'center',color:'#ffc800' }}>Customer Register</div>
     
           <div className='col-lg-6 col-md-8 col-sm-8 col-12 shadow-sm' style={{ padding: '20px 20px 40px 20px' }}>
            <form id='registerform' onSubmit={userRegister}>

              <label><i className="bi bi-person"></i> Name</label>
              <input className="input" type="text" placeholder="Name" required 
              onChange={e => setRuser(e.target.value)}/>

              <label><i className="bi bi-phone"></i> Phone</label>
              <input className="input" type="number" placeholder="Mobile Number" required
              onChange={e => setRphone(e.target.value)} />

              <label><i className="bi bi-envelope-at"></i> Email</label>
              <input className="input" type="email" placeholder="Email" required 
              onChange={e => setRemail(e.target.value)}/>

              <label><i className="bi bi-shield-lock-fill"></i> Password</label>
              <input className="input" type={showPassword ? 'text' : 'password'} placeholder="Password" required 
               onChange={e => setRpassword(e.target.value)}/>

              <label><i className="bi bi-shield-lock"></i> Confirm Password</label>
              <input className="input" type={showPassword ? 'text' : 'password'} placeholder="Confirm Password" required 
              onChange={e => setRcpassword(e.target.value)} />

              <label style={{fontSize:'14px',fontWeight:'400'}}>            
              <span onClick={handleTogglePassword} >
                    {showPassword ?
                      <i className="bi bi-check-square"></i> :
                      <i className="bi bi-square"></i>}
                  </span> Show Password  
                  </label>
              <div style={{ marginTop: '20px' }}>
                <button className="login-btn">Register</button>
                <span onClick={rtol} style={{ float: 'right', color: '#8B008B',fontWeight:'bold', cursor: 'pointer' }}>Have an Account? LOGIN!</span>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* --------------login------------------ */}
      <div id="login" style={{display:'none'}}>
        <div className='row justify-content-center shadow-sm'>
        <div style={{ margin: '40px 0 10px 0', fontSize: '36px', fontWeight: 800, textAlign: 'center',color:'#ffc800' }}>Customer Login</div>
      
          <div className='col-md-6 col-sm-12' style={{ padding: '20px 20px 40px 20px' }}>
            <div style={{ fontWeight: '600',fontSize:'24px',color:'#8B008B',marginBottom:"10px" }}>Registered Customers</div>

            <p style={{ fontWeight: '600' }}>If you have an account, sign in with your email address.</p>
            <form onSubmit={userLogin} id='loginform'>
              <label><i className="bi bi-envelope-at"></i> Email</label>
              <input className="input" type="email" placeholder="Email" required 
              onChange={e => setLemail(e.target.value)}/>

              <label><i className="bi bi-shield-lock-fill"></i> Password</label>
              <input className="input" type={showPassword ? 'text' : 'password'} placeholder="Password" required 
              onChange={(e) => setLpassword(e.target.value)}/>

              <label style={{fontSize:'14px',fontWeight:'400'}}>            
              <span onClick={handleTogglePassword} >
                    {showPassword ?
                      <i className="bi bi-check-square"></i> :
                      <i className="bi bi-square"></i>}
                  </span> Show Password  
                  </label>
              <div style={{ marginTop: '20px'}}>
                <button className="login-btn">Login</button>
                <span onClick={ltoup} style={{ float: 'right', color: '#8B008B',fontWeight:'bold', cursor: 'pointer'}}>Forgot Your Password?</span>
              </div>
            </form>
          </div>
          <div className='col-md-6 col-sm-12' style={{ padding: '20px 20px 40px 20px' }}>
            <div style={{ fontWeight: '600',fontSize:'24px',color:'#8B008B',marginBottom:"10px" }}>New Customers</div>

            <p style={{ fontWeight: '600' }}>Creating an account has many benefits: check out faster,
              keep more than one address, track orders and more.</p>
            <div style={{ marginTop: '20px' }}>
              <span onClick={ltor} className="login-btn">Create an Account</span>

            </div>
          </div>
        </div>
      </div>

  {/* --------------Update Password------------------ */}
  <div id="updatepassword" style={{display:'none'}}>
         
        <div className='row justify-content-center'>
        <div style={{ margin: '40px 0 10px 0', fontSize: '36px', fontWeight: 800, textAlign: 'center',color:'#ffc800' }}>Update Password</div>
  
          <div className='col-lg-6 col-md-8 col-sm-8 col-12 shadow-sm' style={{ padding: '20px 20px 40px 20px' }}>
            <form id='updatepasswordform' onSubmit={userUpdatepassword}>

             <label><i className="bi bi-envelope-at"></i> Email</label>
              <input className="input" type="email" placeholder="Email" required 
               onChange={e => setUpemail(e.target.value)} />

              <label><i className="bi bi-shield-lock-fill"></i> Password</label>
              <input className="input" type={showPassword ? 'text' : 'password'} placeholder="Password" required 
              onChange={e => setUppassword(e.target.value)}/>

              <label><i className="bi bi-shield-lock"></i> Confirm Password</label>
              <input className="input" type={showPassword ? 'text' : 'password'} placeholder="Confirm Password" required 
              onChange={e => setUpcpassword(e.target.value)}/>

              <label style={{fontSize:'14px',fontWeight:'400'}}>            
              <span onClick={handleTogglePassword} >
                    {showPassword ?
                      <i className="bi bi-check-square"></i> :
                      <i className="bi bi-square"></i>}
                  </span> Show Password  
                  </label>
              <div style={{ marginTop: '20px' }}>
                <button className="login-btn">Update</button>
                <span onClick={uptol} style={{ float: 'right', color: '#8B008B',fontWeight:'bold', cursor: 'pointer' }}>Bact to Login!</span>
              </div>
            </form>
          </div>
        </div>
      </div>






      <br />
    </div>
  );
}

export default Login;

