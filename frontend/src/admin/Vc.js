/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import '../style/ud.css';


const Vc = ({ isLoggedIn1 }) => {

  useEffect(() => {
    document.title = "Admin | Visitors Count";
    addcount1();
  }, []);


  // ------------------------user details -------------------------------------------
  const [viewvc, setViewvc] = useState([]);
  const addcount1 = async () => {
    try {
      const result = await axios("http://localhost:8081/viewcountadmin");
      setViewvc(result.data);
    }
    catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="container">
      {isLoggedIn1 ? (
        <>
          <br />
          <div className="table-container">
            <table className="table table-striped align-middle table-3d">

              <tr>
                <th scope="col">Date</th>
                <th scope="col">Count</th>
              </tr>

              <tbody>
                {
                  viewvc.map((result, index) => {
                    return (
                      <tr key={index}>
                        <th scope="row">{new Date(result.datep).toLocaleDateString('en-GB')}</th>

                        <th scope="row">{result.count}</th>
                      </tr>
                    )
                  })}
                   {viewvc.length === 0 ? (
                  <tr>
                    <td colSpan={2} style={{ textAlign: 'center' }}>
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
}
export default Vc;