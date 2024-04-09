/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import '../style/ud.css'; // Import your custom CSS file for styling

const Uc = ({ isLoggedIn1 }) => {
  useEffect(() => {
    document.title = "Admin | User Fedback";
    adtls1();
  }, []);

  // ------------------------user details -------------------------------------------
  const [ad1, setAd1] = useState([]);

  const adtls1 = async () => {
    try {
      const result = await axios("http://localhost:8081/adtls1adminuf");
      setAd1(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      {isLoggedIn1 ? (
        <>
        <br/>
          <div className="table-container">
            <table className="table table-striped align-middle table-3d">
        
                <tr>
                  <th scope="col">S.No</th>
                  <th scope="col">User-Id</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Date</th>
                  <th scope="col">feedback</th>
                </tr>
            
              <tbody>
                {ad1.map((result, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{result.uid}</td>
                    <td>{result.name}</td>
                    <td>{result.email}</td>
                    <td>{result.phone}</td>
                    <td>{new Date(result.datep).toLocaleDateString('en-GB')}</td>
                    <td style={{whiteSpace: 'pre-wrap'}}>{result.message}</td>
                  </tr>
                ))}
                {ad1.length === 0 ? (
                  <tr>
                    <td colSpan={5} style={{ textAlign: 'center' }}>
                      No Items
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <>
          <h1>Login to access admin options</h1>
        </>
      )}
    </div>
  );
};

export default Uc;
