/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import 'bootstrap-icons/font/bootstrap-icons.css';
import "../style/footer.css";
const Footer = () => {


    return (
        <div className="container-fluid footer-root">
            <div className="row justify-content-center" style={{ padding: '20px' }}>
                <div className="col-lg-3 col-md-4 col-sm-5 col-6">
                    <div className="heading1">Need Help</div>
                    <br />
                    <h5><i className="bi bi-geo-alt-fill"></i> Address</h5>
                    <p className="content">134,sathy road,
                    <br/>VNM complex,
                    <br/>Erode-638001
                    <br/>Tamil Nadu
                    </p>
                </div>
                <div className="col-lg-3 col-md-4 col-sm-5 col-6">
                    <div className="heading1">Contact</div>
                    <br/>
                    <h5><i className="bi bi-telephone-fill"></i> Phone</h5>
                    <p className="content">ambalupvc@gmail.com</p>
                    <h5><i className="bi bi-envelope-at-fill"></i> Email</h5>
                    <p className="content">+91 9894010424</p>
                    <br />
                </div>
                <div className="col-lg-3 col-md-4 col-sm-7 col-7">
                    <div className="heading1">Our Products</div>
                    <br />
                    <span style={{cursor:'pointer'}}>
                    <p className="content">Electrical</p>
                    <p className="content">Plumbing</p>
                    <p className="content">Sanitaryware</p>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Footer;

