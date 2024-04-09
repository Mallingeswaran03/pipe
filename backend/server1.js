const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')
const multer = require('multer')
const path = require('path')
const fs = require('fs')

app.use(cors())
app.use(express.json())
app.use(express.static("./images1"))


const db = mysql.createConnection({
  user: 'root',
  host: 'localhost',
  password: '',
  database: 'ambaalpipes',
})


// --------------date--------------------
function getdate() {
  const date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  return (`${year}-${month}-${day}`);
}


function getdate1() {
  const date1 = new Date();

  let day1 = date1.getDate();
  let month1 = date1.getMonth() + 1;
  let year1 = date1.getFullYear();
  let hours = date1.getHours();
  let minutes = date1.getMinutes();
  let seconds = date1.getSeconds();

  return (`${day1}${month1}${year1}${hours}${minutes}${seconds}`);
}

//-----------------image upload------------------------
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images1')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
  }
})

const upload = multer({
  storage: storage
})
// -----------------------------------------------------


// ------------------------image delete-----------------
// fs.unlink("images1/"+result[0].image, (err) => {
//     if (err) {
//       console.error(err);
//       return;
//     }
//     console.log('File deleted successfully');
//   });
// -----------------------------------------------------


// ------------User Register------------
app.post('/UserRegister', (req, res) => {
  db.query("select * from register where email= ? or phone = ?", [req.body.remail, req.body.rphone],
    (err, result) => {
      if (err) {
        console.log(err)
      }
      if (result.length > 0) {
        res.send("Alreadyexist")
      }
      else {
        db.query('INSERT INTO register (name,phone,email,password) VALUES (?,?,?,?)',
          [req.body.ruser, req.body.rphone, req.body.remail, req.body.rpassword],
          (err, result) => {
            if (err) {
              res.send('error')
              console.log(err)
            } else {
              res.send('Success')
            }
          }
        )
      }
    }
  )
})
// -------------------------------------


//-----------------------user login----------------------------------
app.post('/UserLogin', (req, res) => {
  db.query("select * from register where email= ? and password = ?", [req.body.lemail, req.body.lpassword],
    (err, result) => {
      if (err) {
        console.log(err)
      }
      else {
        if (result.length > 0) {
          res.send(["success",
            result[0].name,
            result[0].user_id,
            result[0].phone,
            result[0].email])
        }
        else {
          res.send("failed")
        }
      }
    }
  )
})
// ------------------------------------------------------------------


// ----------------------------------Update Password-----------------
//user change password
app.post('/UserPassword', (req, res) => {
  db.query("select * from register where email= ?", [req.body.upemail],
    (err, result) => {
      if (err) {
        console.log(err)
      }
      else {
        if (result.length > 0) {
          ////////////
          db.query("update register set password=? where email=?", [req.body.uppassword, req.body.upemail],
            (err, result) => {
              if (err) {
                console.log(err);
                res.send("failed")
              }
              else {
                res.send("success")
              }
            }
          )
          ////////////////
        }
        else {
          res.send("failed")
        }
      }
    }
  )
})
// ------------------------------------------------------------------


// ------------Admin Register------------
app.post('/AdminRegister', (req, res) => {
  db.query("select * from register1",
    (err, result) => {
      if (err) {
        console.log(err)
      }
      if (result.length > 0) {
        res.send("Alreadyexist")
      }
      else {
        db.query('INSERT INTO register1 (name,phone,email,password) VALUES (?,?,?,?)',
          [req.body.ruser, req.body.rphone, req.body.remail, req.body.rpassword],
          (err, result) => {
            if (err) {
              res.send('error')
              console.log(err)
            } else {
              res.send('Success')
            }
          }
        )
      }
    }
  )
})
// -------------------------------------


//-----------------------admin login----------------------------------
app.post('/AdminLogin', (req, res) => {
  db.query("select * from register1 where email= ? and password = ?", [req.body.lemail, req.body.lpassword],
    (err, result) => {
      if (err) {
        console.log(err)
      }
      else {
        if (result.length > 0) {
          res.send("success")
        }
        else {
          res.send("failed")
        }
      }
    }
  )
})
// ------------------------------------------------------------------


// ----------------------------------admin Password-----------------
//user change password
app.post('/AdminPassword', (req, res) => {
  db.query("select * from register1 where email= ?", [req.body.upemail],
    (err, result) => {
      if (err) {
        console.log(err)
      }
      else {
        if (result.length > 0) {
          ////////////
          db.query("update register1 set password=? where email=?", [req.body.uppassword, req.body.upemail],
            (err, result) => {
              if (err) {
                console.log(err);
                res.send("failed")
              }
              else {
                res.send("success")
              }
            }
          )
          ////////////////
        }
        else {
          res.send("failed")
        }
      }
    }
  )
})
// ------------------------------------------------------------------



  //-----------------------add category----------------------------------
  app.post('/AddCategory', (req, res) => {
    db.query("select * from category where cname= ?", [req.body.addcategoryname],
      (err, result) => {
        if (err) {
          console.log(err)
        } 
        if(result.length>0){
          res.send("Alreadyexist")
        }
        else
        {  
          db.query('INSERT INTO category (cname) VALUES (?)',
          [req.body.addcategoryname],
              (err, result) => {
                if (err) {
                  res.send('error')
                  console.log(err)
                } else {
                  res.send('Success')
                }
              }
            )
        }
      }
    )
  })
  
  // ----------------------view category---------------------------------
app.get("/ViewCategory", (req, res) => {
  db.query("select * from category", (err, result) => {
    if (err) {
      console.log(err);
    }
    else {
      res.send(result);
    }
  })
})


//-----------------------add subcategory----------------------------------
app.post('/AddSubcategory', (req, res) => {
  db.query("select * from subcategory where scname= ? and cid = ?", [req.body.addsubcategoryname,req.body.addcid],
    (err, result) => {
      if (err) {
        console.log(err)
      }
      if(result.length>0){
        res.send("Alreadyexist")
      }
      else
      {  
        db.query('INSERT INTO subcategory (cid,scname) VALUES (?,?)',
        [req.body.addcid,req.body.addsubcategoryname],
            (err, result) => {
              if (err) {
                res.send('error')
                console.log(err)
              } else {
                res.send('Success')
              }
            }
          )
      }
    }
  )
})

// ----------------------view subcategory---------------------------------
app.get("/ViewSubcategory", (req, res) => {
db.query("select category.cname, subcategory.* from category RIGHT JOIN subcategory ON category.cid = subcategory.cid order by subcategory.cid", (err, result) => {
  if (err) {
    console.log(err);
  }
  else {
    res.send(result);
  }
})
})



//-----------------------get sub category details on category home----------------------------------
app.post('/GetScdetails', (req, res) => {
  db.query("select * from subcategory where cid = ?", [req.body.cid],
    (err, result) => {
      if (err) {
        console.log(err)
      }
      else {
        res.send(result);
      }
    }
  )
  })
  // ------------------------------------------------------------------


//  --------------------add products-------------------------------
app.post('/AddProduct',upload.single('addpimg'),(req,res)=>{
  const addpimg=req.file.filename;
  const datep=getdate();
  db.query(
    'INSERT INTO product (cid,scid,name,price,quantity,description,image,datep,overview,brand) VALUES (?,?,?,?,?,?,?,?,?,?)',
    [req.body.addpcid,req.body.addpscid,req.body.addpname,req.body.addpprice,req.body.addpqty,req.body.addpdescription,addpimg,datep,
    req.body.addoverview,req.body.addbrand],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send("failed")
      }
      else {
        res.send("success")
      }
    }
  )
})

//  --------------------update products-------------------------------
app.post('/AddProductup',upload.single('addpimg'),(req,res)=>{
  const addpimg=req.file.filename;
  const datep=getdate();
  db.query(
    'update product set name=?,price=?,quantity=?,description=?,image=?,overview=?,brand=? where pid=?',
    [req.body.addpname,req.body.addpprice,req.body.addpqty,req.body.addpdescription,addpimg,req.body.addoverview,req.body.addbrand,req.body.pid],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send("failed")
      }
      else {
        res.send("success")
      }
    }
  )
})

// ----------------------view products---------------------------------
app.get("/ViewProduct", (req, res) => {
db.query("select * from product", (err, result) => {
  if (err) {
    console.log(err);
  }
  else {
    res.send(result);
  }
})
})


  // -----------------------product list-----------------------------------
  app.post('/ProductList', (req, res) => {
    db.query("select * from product where scid = ?", [req.body.scid],
      (err, result) => {
        if (err) {
          console.log(err)
        }
        else {
          res.send(result);
        }
      }
    )
    })

    // ----------------------view product details from product details---------------------------------
    app.post("/ViewProductdetailsone", (req, res) => {
      db.query("select * from product where pid=?",[req.body.pid], (err, result) => {
        if (err) {
          console.log(err);
        }
        else {
          db.query("SELECT AVG(rtst) AS rv FROM rating WHERE pid = ?", [req.body.pid], (err, result1) => {
            if (err) {
              console.log(err);
            }
            else {
    
              res.send([result, result1])
            }
          })
        }
      })
      })


      // ---------------------------get product search from navbar-------------------------

app.post('/GetProductsearch', (req, res) => {
  db.query("SELECT pid,name FROM product where name like CONCAT('%', ?, '%')", [req.body.pn],
    (err, result) => {
      if (err) {
        console.log(err)
      }
      else {
        res.send(result);
      }
    }
  )
})


// ----------------------productdetails js view comment---------------------------------
app.post("/productdetailsGetcomment", (req, res) => {
  db.query("select * from rating where pid=?", [req.body.pid], (err, result) => {
    if (err) {
      console.log(err);
    }
    else {
      res.send(result);
    }
  })
})


// ----------------------productdetails js addr---------------------------------
app.post("/addr", (req, res) => {
  const datep = getdate();
  db.query("insert into rating (uid,name,email,rtst,co,pid,datep) values (?,?,?,?,?,?,?)", [req.body.uid, req.body.name, req.body.email, req.body.rtst, req.body.co, req.body.pid, datep], (err, result) => {
    if (err) {
      console.log(err);
    }
    else {
      res.send("success");
    }
  })
})


// =======================================cart.js=============================================
// ----------------------add to cart---------------------------------
app.post("/addtocart", (req, res) => {
  db.query("select * from cart where pid=? and uid=?", [req.body.pid, req.body.uid], (err, result) => {
    if (err) {
      console.log(err);
    }
    if (result.length > 0) {
      res.send("exist");
    }
    else {
      db.query("insert into cart (pid,uid) values (?,?)", [req.body.pid, req.body.uid], (err, result) => {
        if (err) {
          console.log(err);
        }
        else {
          res.send("success");
        }
      })
    }
  })
})


// ----------------------view cart---------------------------------
app.post("/viewCart", (req, res) => {
  db.query("SELECT c.cart_id, c.uid, c.pid,c.cqty, p.name,p.price,p.quantity,p.image FROM cart c JOIN product p ON c.pid = p.pid where c.uid=?",
    [req.body.uid], (err, result) => {
      if (err) {
        console.log(err);
      }
      else {
        res.send(result);
      }
    })
})

// ----------------------up cart---------------------------------
app.post("/upcart", (req, res) => {
  db.query("update cart set cqty=? where uid=? and cart_id=?",
    [req.body.q, req.body.uid, req.body.cartid], (err, result) => {
      if (err) {
        console.log(err);
      }
      else {
        res.send("success");
      }
    })
})


// ----------------------dl cart---------------------------------
app.post("/dlcart", (req, res) => {
  db.query("delete from cart where uid=? and cart_id=?",
    [req.body.uid, req.body.cartid], (err, result) => {
      if (err) {
        console.log(err);
      }
      else {
        res.send("success");
      }
    })
})


// ------------------------------fnckout--------------------------
app.post("/fnckout", async (req, res) => {
  try {
    var billno = getdate1();
    billno = `${billno}${req.body.uid}`;
    const datep = getdate();

    // Insert into checkout table
    await db.query("INSERT INTO checkout (uid, billno, datep, pid, name, description,image, price, qty, totalprice,overview,brand) SELECT ?, ?, ?, c.pid AS pid, p.name AS name, p.description AS description,p.image AS image,p.price AS price, c.cqty AS qty, (p.price * c.cqty) AS totalprice,p.overview as overview,p.brand as brand FROM cart c JOIN product p ON c.pid = p.pid WHERE c.uid = ?", [req.body.uid, billno, datep, req.body.uid]);

    // Update product table
    await db.query("UPDATE product p JOIN (SELECT pid, SUM(cqty) AS total_qty FROM cart WHERE uid = ? GROUP BY pid) c ON p.pid = c.pid SET p.quantity = p.quantity - c.total_qty", [req.body.uid]);

    // Insert into billingstb table
    await db.query("INSERT INTO billingstb (uid, name, phone, email, address, billno) VALUES (?, ?, ?, ?, ?, ?)",
      [req.body.uid, req.body.name, req.body.phone, req.body.email, req.body.address, billno]);

    // Delete from cart table
    await db.query("DELETE FROM cart WHERE uid=?", [req.body.uid]);

    res.send("success");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error occurred");
  }
});




// ----------------------view my order---------------------------------
app.post("/vieworder", (req, res) => {
  db.query("SELECT billno,datep,status, COUNT(*) AS item, SUM(totalprice) AS tprice FROM checkout WHERE uid = ? GROUP BY billno order by status",
    [req.body.uid], (err, result) => {
      if (err) {
        console.log(err);
      }
      else {
        res.send(result);
      }
    })
})


// ----------------------product details---------------------------------
app.post("/pdtls", (req, res) => {
  db.query("SELECT * from checkout  WHERE uid = ? and billno=?",
    [req.body.uid, req.body.billno], (err, result) => {
      if (err) {
        console.log(err);
      }
      else {
        db.query("SELECT * from billingstb  WHERE uid = ? and billno=?",
          [req.body.uid, req.body.billno], (err, result1) => {
            if (err) {
              console.log(err);
            }
            else {
              res.send([result, result1]);
            }
          })
      }
    })
})


// ----------------------view order admin---------------------------------
app.get("/vieworderadmin", (req, res) => {
  db.query("SELECT billno,datep,status,uid, COUNT(*) AS item, SUM(totalprice) AS tprice FROM checkout GROUP BY billno order by status", (err, result) => {
    if (err) {
      console.log(err);
    }
    else {
      res.send(result);
    }
  })
})



// ------------------------view orders with status-------------------------------------------
app.post("/vieworderadminstatus", (req, res) => {
  db.query("SELECT billno,datep,status, COUNT(*) AS item, SUM(totalprice) AS tprice FROM checkout WHERE status=? GROUP BY billno",
    [req.body.status], (err, result) => {
      if (err) {
        console.log(err);
      }
      else {
        res.send(result);
      }
    })
})


// ----------------------product details admin---------------------------------
app.post("/pdtlsadmin", (req, res) => {
  db.query("SELECT * from checkout  WHERE billno=?",
    [req.body.billno], (err, result) => {
      if (err) {
        console.log(err);
      }
      else {
        db.query("SELECT * from billingstb  WHERE billno=?",
          [req.body.billno], (err, result1) => {
            if (err) {
              console.log(err);
            }
            else {
              res.send([result, result1]);
            }
          })
      }
    })
})



// ------------------------change to shipped if status is pending -------------------------------------------
app.post("/ctsadmin", (req, res) => {
  db.query("update checkout set status=? WHERE billno=?",
    [req.body.status, req.body.billno], (err, result) => {
      if (err) {
        console.log(err);
      }
      else {
        res.send("success");
      }
    })
})


// ------------------------search by bill no-------------------------------------------
app.post("/sbbn", (req, res) => {
  db.query("SELECT billno,datep,status, COUNT(*) AS item, SUM(totalprice) AS tprice FROM checkout WHERE billno=? GROUP BY billno",
    [req.body.billno], (err, result) => {
      if (err) {
        console.log(err);
      }
      else {
        res.send(result);
      }
    })
})


// ------------------------search by user id-------------------------------------------
app.post("/usid", (req, res) => {
  db.query("SELECT billno,datep,status, COUNT(*) AS item, SUM(totalprice) AS tprice FROM checkout WHERE uid=? GROUP BY billno",
    [req.body.uid], (err, result) => {
      if (err) {
        console.log(err);
      }
      else {
        res.send(result);
      }
    })
})


// ----------------------user details admin---------------------------------
app.get("/adtls1admin", (req, res) => {
  db.query("SELECT * from register", (err, result) => {
    if (err) {
      console.log(err);
    }
    else {
      res.send(result);
    }
  })
})



// ----------------------addcontact---------------------------------
app.post("/addcontact", (req, res) => {
  const datep = getdate();
  db.query("insert into contact (uid,name,phone,email,message,datep) values (?,?,?,?,?,?)", [req.body.uid, req.body.name,req.body.phone,req.body.email,req.body.message,datep], (err, result) => {
    if (err) {
      console.log(err);
    }
    else {
      res.send("success");
    }
  })
})


// ----------------------user details admin---------------------------------
app.get("/adtls1adminuf", (req, res) => {
  db.query("SELECT * from contact", (err, result) => {
    if (err) {
      console.log(err);
    }
    else {
      res.send(result);
    }
  })
})



app.listen(8081, () => {
  console.log('your server is running')
})