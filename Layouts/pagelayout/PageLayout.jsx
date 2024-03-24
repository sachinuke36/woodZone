import React from 'react';
import {useLocation} from 'react-router-dom';
import {Box , Flex, VStack,Container} from '@chakra-ui/react';
import Navbar from '../../src/Components/Navbar'

const PageLayout = ({children}) => {
    const {pathname} = useLocation();
  return (
   <VStack>
   <Box><Navbar/></Box> 
   <Container maxW={{md:1280,base:1200}}>
    {children}
  </Container>
  </VStack>

   
  )
}

export default PageLayout
