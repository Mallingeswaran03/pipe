/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import 'bootstrap-icons/font/bootstrap-icons.css';
import "../style/home.css";

const Home = () => {

  // -----brands-------------------
  const brands = [1, 2, 3, 4, 5, 6, 7,8,10,11,12,13,14,15];



  useEffect(() => {
    document.title = "Pipe | Home"
  }, [])

  return (
    <div>
       {/* --------------------Slider----------------------------- */}
       <div className='container-md home-root'  style={{marginTop:'100px'}}>
       <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={require("../images/slider/s1.webp")} style={{ maxHeight: '500px', width: '100%', objectFit: 'fill' }} className="img-fluid" alt="slider2" />
          </div>
          <div className="carousel-item">
            <img src={require("../images/slider/s1.webp")} style={{ maxHeight: '500px', width: '100%', objectFit: 'fill' }} className="img-fluid" alt="slider2" />
          </div>
          <div className="carousel-item">
            <img src={require("../images/slider/s1.webp")} style={{ maxHeight: '500px', width: '100%', objectFit: 'fill' }} className="img-fluid" alt="slider2" />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

  {/* --------------------categories-------------------- */}
  <div className='heading'>Categories</div>
  <div className="row justify-content-center">
              <div className="col-lg-4 col-sm-4 col-4 cat-col">
                <div className='cat-col1'>
                  <img src={require("../images/categories/c1.jpg")} className="img-fluid" alt="slider2" />
                  <div>Electrical</div>
                </div>
              </div>
              <div className="col-lg-4 col-sm-4 col-4 cat-col">
                <div className='cat-col1'>
                  <img src={require("../images/categories/c2.jpg")} className="img-fluid" alt="slider2" />
                  <div>Plumbing</div>
                </div>
              </div>
              <div className="col-lg-4 col-sm-4 col-4 cat-col">
                <div className='cat-col1'>
                  <img src={require("../images/categories/c3.jpg")} className="img-fluid" alt="slider2" />
                  <div>Sanitaryware</div>
                </div>
              </div>
        </div>

{/* -------------------brands------------------ */}
<div className='heading'>Brands</div>
<div
  className="row justify-content-center align-items-center g-2"
> {
            brands.map((season, index) => (
  <div className="col-md-3 col-sm-4 col-6" key={index}>
    <img src={require(`../images/brands/b${index+1}.jpg`)} style={{objectFit: 'fill' }} className="img-fluid" alt="slider2" />
  </div>
))}
</div>
{/* ----------------our stories----------------- */}
<div className='heading'>Our Stoty</div>
<div className="row justify-content-center align-items-center g-2">
  <div className="col-md-6 col-sm-12" style={{textAlign:'center'}}>
  <img src={require("../images/ourstory.jpg")} style={{objectFit: 'fill',maxHeight:'300px' }} className="img-fluid" alt="slider2" />

  </div>
  <div className="col-md-6 col-sm-12">
    <p>
  Established in 1998, Ambaal Pipes has been a pioneering force in the online sale of sanitaryware, plumbing,
   and electrical items. With a steadfast commitment to quality, reliability, and customer satisfaction, 
   we have evolved into a trusted name in the industry. Our relentless dedication to innovation,
    coupled with a passion for excellence, drives us to continually enhance our offerings and provide 
    unparalleled service to our valued customers.</p>
    <p> At Ambaal Pipes, we pride ourselves on building enduring 
    relationships based on trust, integrity, and mutual respect.   Join us on our journey as we continue 
    to set new standards of excellence in the ever-evolving landscape of e-commerce.
    </p>
  </div>
</div>

</div>

















<br/>
    </div>
  );
}
export default Home;