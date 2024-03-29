import { Img, HStack, VStack, Text, Wrap, Flex, WrapItem, Center, Box, Button, Stack, Container } from '@chakra-ui/react';
import { useState, useEffect, useReducer } from 'react';
import { defineStyle, defineStyleConfig } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react';
import { useStateValue } from '../StateProvider/StateProvider';
import { useToast } from '@chakra-ui/react'


export const Data =()=>{
const [{cart}, dispatch] = useStateValue();
const toast = useToast();

    // const API_URL = "http://localhost:3000/items";
    const API_URL = `/data/db.json`;
    

    const [data, setData] = useState([]);
    const [FilteredData, setFilteredData] = useState([]);
    const [cat, setCat] = useState('ALL');


    const addToCart = (item) => {
        toast({
          title: 'Item Added to the cart',
          description: "Checkout the cart",
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
      
      dispatch({
          type: 'ADD_TO_CART',
          item : item 
      });
  };
  



    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch(API_URL);
                if (!response.ok) throw new Error("Did not receive the data");
                const json = await response.json();
                setData(json.items);
                setFilteredData(json.items);
            } catch (error) {
                console.error(error);
            }
        }
        fetchItems();   
    },[]);
    console.log(cart);


  const buttons =[{
    title:"All", variant:cat,
    category:"ALL"
  },
 {
    title:"Couch", variant:cat, category:"COUCH"

  },{
    title:"Bed", variant:cat, category:"BED"

  },{
    title:"Almirah", variant:cat, category:"ALMIRAH"

  },]

  

    
        const filterItems = (cat)=>{
            let newData = [...data];
            const type = cat
             setCat(type);
            if(type==="ALL"){
              setFilteredData(data);
              return;
            }
            const filter = newData?.filter((data)=>
              data.category.includes(type)
              );
              setFilteredData(filter);
            
            }




    return(<Container maxW={{base:'400px',md:"1280px"}} mx='auto' mt="50px"  pb="10px">
        <Stack spacing={{base:2, md:10}} direction='row' align='center' justifyContent={"center"}>
        {
          buttons.map((button,i)=>(
            <Button  onClick={()=>filterItems(button.category)} key={i} colorScheme='blue' size='md'  variant={button.category === cat ? "solid" :"outline"}>
            {button.title}
          </Button>
          
          ))
        }
   </Stack>
        <Wrap spacing='5px'>
{
    FilteredData.map((item, i) => (
       
        <WrapItem  key={item.id} boxShadow={'xl'} mx="auto" bgColor={"white"} mt="20px" borderRadius={"0 0 10px 10px"} >
             <Flex mx="5px" my="5px">
            <VStack w={{md:"250px",base:'150px'}}  h='auto' pb={{base:"3px"}} key={i} overflow={"hidden"}  >
                <Box w="100%"   bgColor='#d6cbcb'><Img src={item.image}
                    objectFit='cover'
                    mx="auto"
                    mixBlendMode={"multiply"}
                    maxH="250px"
                    w="100%"
                /> </Box>
                <Box><Text w="100px" fontWeight={'800'} mx="auto" color={'red'}>Rs.{item.price}</Text>
                    <Text px="7px" fontWeight="600"
                        noOfLines={2}
                    >{item.description}</Text></Box>
                    <Box>{
                     <Box><Button onClick={()=>addToCart(item)}
                      colorScheme= 'teal'
                      size='md'>
                       Add item 
                       </Button></Box> 
                      
                      }
                      
                    </Box>

            </VStack>
            </Flex>
        </WrapItem>

    ))
}

</Wrap>


</Container>
    )
}