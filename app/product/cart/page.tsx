"use client"
import { useCart } from '@/context/cartContext'
import React from 'react'

const page = () => {

   const {cartData} = useCart()
  //  console.log(cartData)

  return (
    <div>
      <div className='flex items-center justify-center mt-10'> 
        <div className='space-y-10 w-[70vw]'>
          <h1 className='text-4xl font-semibold'>Your <span className='text-orange-500'>Cart</span></h1>
          <div className='flex gap-30 mt-5'>
            <span>Product Details</span>
            <span>Price</span>
            <span>Quantity</span>
            <span>Subtotal</span>
          </div>
          <div>
           {
            cartData.map((item , index)=> <div key={index}>
                <img src={item.image[0]} alt={item.name} className='w-[100px]' />
                <span>{item.offerPrice}</span>
                <span>{}</span>
                <span>{item.offerPrice}</span>
            </div> )
           }
          </div>
        </div>
        <div>
          <h1>Order Summary</h1>
          <p>SELECT ADDRESS</p>
          <p>PROMO CODE</p>
        </div>
      </div>
    </div>
  )
}

export default page
