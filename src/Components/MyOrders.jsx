import React from 'react';
import { useStateValue } from '../StateProvider/StateProvider';
import {Img, Box, VStack, HStack, Flex, Button, Text, Container} from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'; // Import Link component from react-router-dom



const MyOrders = () => {
    const [{cart}, dispatch] = useStateValue();
    const toast = useToast();

    // console.log(cart);

    const removeItem = (item) =>{
      toast({
        title: 'Item Removed from the cart',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
            dispatch({
                type:"DELETE",
                item:item,
            })
    }


     const  totalPrice = cart.reduce((total,item)=> total + item.price,0);

  return (
   <Box  display={['block','block','block','block','flex']} justifyContent={['center','center','space-between']} mt='40px' minW={{md:780, base:205, lg: 1000, xl:1280, "2xl":1400}} >
    <VStack mb={3} p='30px' h={['130px','150px','250px']}  border={'1px dotted grey'} >
        <Text as='h1'fontSize={'1.6rem'} fontWeight={'600'}>{cart.length} iteams Selected</Text>
        <Text color='#a20f0f' fontWeight={600}> Gross Total : Rs.{totalPrice}</Text>
       { totalPrice === 0 ? null : <Button p={'5px'} colorScheme='facebook'><RouterLink to='/proceed-to-buy'>Proceed To buy</RouterLink></Button>}
    </VStack>
    <VStack  p={2} minW={{md:"600px", base:20, lg: 190, xl:'1200px', "2xl":'1436px'}} >
    {/* w={[330,400,750]} */}
    
      {cart.length === 0 ? <Text mx='auto' as='h1' fontSize={[20,30,35]} fontWeight={600}>Your cart is empty</Text> :
      
        cart.map((item,i)=>(
            
           <HStack key={i} spacing={5} overflow={'hidden'}  border='1px solid black' h={['160px','160px','160px']} minW={{md:70, base:70, lg: 100, xl:120, "2xl":1400}} justifyContent={'space-between'}> 
           <Box bg={'#d6cbcb'} >
                <Img  mixBlendMode={"multiply"} src={item.image} objectFit={'contain'}  h={['140px', '170px', '170px']}  w={['140px', '170px', '170px']} ></Img>
           </Box>

           <VStack >
           <Box w={['200px', '300px', '500px']}>
           <Flex fontSize={20} justifyContent={'center'}> <Text fontWeight={'800'} color={'black'}>{item.name}</Text></Flex> 
           <Text noOfLines={{md:2, base:2}}> {item.description} </Text>
           <Box alignItems={'center'} justifyContent={'center'} color={'black'} fontWeight={800}>
            {`Rs.${item.price}`}
           </Box>
           </Box> 
           <Button colorScheme='facebook' onClick={()=>removeItem(item)}>Remove Item</Button>
           </VStack>
           
              </HStack>
        ))
      
      }
      </VStack>
   </Box>
  )
}

export default MyOrders
