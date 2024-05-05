import React, { useState } from 'react'
import Navbar from './Components/Navbar'
import { Container, Flex, VStack, Text, Stack, Button, Box } from '@chakra-ui/react'
import { Data } from './Components/Data'
import { Route, Routes } from 'react-router-dom'
import PageLayout from '../Layouts/pagelayout/PageLayout'
import Contact from './Components/Contact'
import MyOrders from './Components/MyOrders'
import OrderInfo from './Components/orderInfo'
import Payment from './Components/Payment'
import {loadStripe} from '@stripe/stripe-js'
import {Elements} from '@stripe/react-stripe-js'

const promise = loadStripe('pk_test_51PCOnGSF0RAghyHwXRncBsm7OLODiIAZunmWskKTBw9Sq78Kytp24S2H8ug5zSULJLHaCORZay9S6Qw93sI5ztl000jgqK18Oy');



const App = () => {
  



  return (
    <PageLayout>
    <Routes>
      {/* <Route path='/' element={<Navbar/>}/> */}
      <Route path='/proceed-to-buy' element={
         <OrderInfo/>
      }/> 
      
      <Route path='/' element={<Data/>}/> 
      <Route path='/contact' element={<Contact/>}/> 

      <Route path='/payment' element={
       <Elements stripe={promise}>
            <Payment/>
      </Elements>
         }/> 


      <Route path='/my-orders' element={<MyOrders/>}/> 
    </Routes>
    </PageLayout>
  //   <>
  //  <Box w="100%"><Navbar/></Box> 
  //   <Data/>
    
  //   </>
   
    
  )
}

export default App
