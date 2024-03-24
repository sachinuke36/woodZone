import React, { useState } from 'react'
import Navbar from './Components/Navbar'
import { Container, Flex, VStack, Text, Stack, Button, Box } from '@chakra-ui/react'
import { Data } from './Components/Data'
import { Route, Routes } from 'react-router-dom'
import PageLayout from '../Layouts/pagelayout/PageLayout'
import Contact from './Components/Contact'
import MyOrders from './Components/MyOrders'


const App = () => {
  



  return (
    <PageLayout>
    <Routes>
      {/* <Route path='/' element={<Navbar/>}/> */}
      <Route path='/' element={<Data/>}/> 
      <Route path='/contact' element={<Contact/>}/> 
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
