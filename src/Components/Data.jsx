import { Img, HStack, VStack, Text, Wrap, Flex, WrapItem, Center, Box, Button, Stack, Container } from '@chakra-ui/react';
import { useState, useEffect, useReducer } from 'react';
import { defineStyle, defineStyleConfig } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react';
import { useStateValue } from '../StateProvider/StateProvider';
import { useToast } from '@chakra-ui/react'
import db from '../../data/firebase';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';



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
            // console.log(db);
            const Items = collection(db, 'Items');
            const ItemsSnapshot = await getDocs(Items);
            const itemsData = ItemsSnapshot.docs.map(doc  =>( {id: doc.id, ...doc.data()}));
            setData(itemsData);
            setFilteredData(itemsData);
        } catch (error) {
                console.error(error);
            }
        }

      //   const fetchItems = () => {
      //     db.collection("data").get().then((querySnapshot) => {
   
      //         // Loop through the data and store
      //         // it in array to display
      //         querySnapshot.forEach(element => {
      //             var data = element.data();
      //             setInfo(arr => [...arr, data]);
   
      //         });
      //     })
      // }

        fetchItems();   
    },[]);
    // console.log(cart);
    

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
       
        <WrapItem  key={i} boxShadow={'xl'} mx="auto" bgColor={"white"} mt="20px" borderRadius={"0 0 10px 10px"} >
             <Flex mx="5px" my="5px">
            <VStack w={{md:"250px",base:'150px'}}  h='auto' pb={{base:"3px"}}  overflow={"hidden"}  >
                <Box w="100%"   bgColor='#d6cbcb'><Img src={item.image}
                    objectFit='cover'
                    mx="auto"
                    mixBlendMode={"multiply"}
                    maxH={{md:250, base:100}}
                    w="100%"
                /> </Box>
                <Box><Text w="100px" fontWeight={'800'} mx="auto" color={'red'}>Rs.{item.price}</Text>
                 <Flex fontSize={20} justifyContent={'center'}> <Text fontWeight={'800'} color={'black'}>{item.name}</Text></Flex> 
                    <Text px="7px" fontWeight="400"
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