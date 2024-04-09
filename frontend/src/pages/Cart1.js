/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
const Cart1 = () => {






  // --------------check out---------------------
  const name="apple";
  const price=200;

  const addckout = async (token) => {
  
    const result = await axios.post("http://localhost:8081/fnckout1", { name,price,token});
  

  }
  return (
    <div className='plfontall'>
           <StripeCheckout
                      name="Pay Now"
                      amount={price * 100}
                      stripeKey="pk_test_51P0XTmSJuICMICmpw4hdLEmIlNytz08H9RnvUQWXS3zm9p1yOdqwrOsJUN4AMAKBMsSxd9frBlYMCdzMla34G6oX009z8J7Gwc"
                      currency='INR'
                      // description="Big Data Stuff" 
                      token={addckout}
                      panelLabel={`Pay`}


                    />
                    




    </div >
  );
}

export default Cart1;

