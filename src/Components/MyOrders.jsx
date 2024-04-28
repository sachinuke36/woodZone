import React from 'react';
import { useStateValue } from '../StateProvider/StateProvider';
import {Img, Box, VStack, HStack, Flex, Button, Text, Container} from '@chakra-ui/react'



const MyOrders = () => {
    const [{cart}, dispatch] = useStateValue();
    // console.log(cart);

    const removeItem = (item) =>{
            dispatch({
                type:"DELETE",
                item:item,
            })
    }

    let totalPrice = cart.reduce((total,item)=> total + item.price,0);

  return (
   <VStack mt='40px' w={"98%"} spacing={7} pb={10}>
    <VStack p='30px' h={['125px','150px','150px']} border={'1px solid gray'} borderRadius={'10px'}>
        <Text as='h1'fontSize={'1.6rem'} fontWeight={'600'}>{cart.length} iteams Selected</Text>
        <Text>{` Gross Total : Rs.${totalPrice}`}</Text>
       { totalPrice === 0 ? null : <Button p={'5px'}>Proceed To buy</Button>}
    </VStack>
    
      {cart.length === 0 ? <Text as='h1' fontSize={'50px'} fontWeight={600}>Cart is empty.......</Text> :
      
        cart.map((item,i)=>(
            
           <HStack key={i} overflow={'hidden'} borderRadius={'10px'} border='1px solid gray' h={['125px','150px','150px']} justifyContent={'space-between'}> 
           <Box bg={'#d6cbcb'} >
                <Img  mixBlendMode={"multiply"} src={item.image} objectFit={'contain'}  h={['140px', '170px', '170px']}  w={['140px', '170px', '170px']} ></Img>
           </Box>

           <VStack >
           <Box w={['200px', '300px', '500px']}>
           <Text noOfLines={{md:2, base:2}}> {item.description} </Text>
           <Box alignItems={'center'} justifyContent={'center'} color={'black'} fontWeight={800}>
            {`Rs.${item.price}`}
           </Box>
           </Box> 
           <Button onClick={()=>removeItem(item)}>Remove Item</Button>
           </VStack>
           
              </HStack>
        ))
      
      }
   </VStack>
  )
}

export default MyOrders
