import React, { useState } from 'react';
import { Img, HStack, VStack, Text, Wrap, Flex, WrapItem, Center, Box, Button, Stack, Container } from '@chakra-ui/react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useStateValue } from '../StateProvider/StateProvider';
import { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom'; // Import Link component from react-router-dom
import { Select } from '@chakra-ui/react'
import db from '../../data/firebase';
import { useNavigate } from "react-router-dom";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import { Timestamp, addDoc, collection } from 'firebase/firestore/lite';

const orderInfo = () => {

  const [{cart}, dispatch] = useStateValue();
  const [pincode, setPincode] = useState('');
  const [village, setVillage] = useState();
  const [jsonData, setJsonData]=useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const history = useNavigate();
  const [isDisabled, setIsDisabled]= useState(true);
  const [isDisabledForOrder, setIsDisabledForOrder]= useState(true);

  const [address, setAddress]=useState({
    name: '',
    email: '',
    contact: '',
    message: '',
    'flat':"",
    'area':"",
    landmark: '',
    village:'',
    time:''
  })

  const handleAddress = async (values,{resetForm})=>{
    setAddress({
      ...values,
      pincode:pincode,
      village: village, 
      time:dateTimeString
    });
    setIsDisabled(false);
  }

  // console.log(address);


  const formProps = [{
    title: 'Name',
    htmlFor: 'name',
    type: 'text',
  }, {
    title: 'Email',
    htmlFor: 'email',
    type: 'email',
  }, {
    title: 'Contact',
    htmlFor: 'contact',
    type: 'tel',
  }, {
    title: 'Message',
    htmlFor: 'message',
    type: 'textarea'
  },{
    title:'Flat, House no., Building',
    htmlFor:'flat',
    type:'text'
  },{
    title:'Area, street, sector, village',
    htmlFor:'area',
    type:'text'
  },{
    title:'landmark',
    htmlFor:'landmark',
    type:'text'
  }];

const currentDate = new Date();
const dateTimeString = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')} ${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}:${currentDate.getSeconds().toString().padStart(2, '0')}`;

  
  useEffect(()=>{
    
   const fetchAddress = async ()=>{
   
    try {
      const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
      if(!response.ok){
        throw new Error('Network Response was not OK');
      }
      const data = await response.json();
       setJsonData(data[0].PostOffice);
      
      // console.log(jsonData)
    } catch (error) {
      console.log(error)
      
    }
   }

   fetchAddress();

  },[pincode]);

  const getVillage = (e)=>{
    setVillage(e.target.value);
  }

  
  
 

  let totalPrice = cart.reduce((total,item)=> total + item.price,0);
  let deliveryCharge = 100;
  let orderTotal = totalPrice + deliveryCharge;

  return (
    <VStack  justifyContent={'center'} marginTop={100}>

                        {/* Order summary */}
      <VStack fontSize={[14,14,15]} p={2} border={'1px dotted gray'} borderRadius={10} spacing={3} position={'sticky'} top={2} w={['360px', '400px', '400px']} >
        <Text as='h1' px={2} fontWeight={800} fontSize={30}>Order Summary</Text>
        <Text>Delivery Charge: Rs. {deliveryCharge}</Text>
        <Text>Item Price: Rs. {totalPrice}</Text>
        <Text fontSize={18} fontWeight={600} color='red'>Order Total: Rs. {orderTotal}</Text>
        {/* <Button isDisabled={isDisabledForOrder} w={['150px','150px',"300px"]} fontSize={[15,17,20]} colorScheme='facebook' >Place Your order</Button> */}
      </VStack>
      <Box>

                                {/* form */}
<Flex w={['360px', '400px', '400px']} padding={2}  border={'1px dotted grey'} borderRadius={10} justifyContent={'space-between'}>
  <Text fontSize={20}>1. Delivery Address</Text>
  <Button onClick={onOpen}>Add</Button>
  
  <Modal isOpen = {isOpen} onClose={onClose}>
  <ModalOverlay/>
  <ModalContent>
  <ModalHeader><Text as='h1' fontWeight={800} fontSize={30}>Enter you details</Text>
  <ModalCloseButton/>
  </ModalHeader>

      <ModalBody>              
        <Formik
        initialValues={{
          name: '',
          email: '',
          contact: '',
          message: '',
          'flat':"",
          'area':"",
          landmark: '',
          village:'',
          time:''
      }}
        onSubmit={handleAddress}
          // async (values,{resetForm})=>{
          //     try {
          //       const orderData = collection(db,'orderDetails');
          //       await addDoc(orderData,{
          //         name: values.name,
          //         email: values.email,
          //         contact: values.contact,
          //         message: values.message,
          //         'flat':values.flat,
          //         'area':values.area,
          //         landmark: values.landmark,
          //         pincode:pincode,
          //         village: village, // Use jsonData if available, otherwise use values.village
          //         time:dateTimeString

          //       });
          //       resetForm();
                
          //     } catch (error) {
          //       console.log(error);
          //     }

        // }
      // } 
        >
          <Form>
            <VStack spacing={2}>
              {formProps.map((item, i) => (
                <Box key={i}>
                  <label htmlFor={item.htmlFor} style={{ position: 'relative', top: '12px', background: 'white', left: '6px', padding: '2px' }}>{item.title} </label>
                  <Box borderRadius={2} >
                    {
                      !(item.type === 'tel') ? <Box> <Box border='1px solid gray'><Field
                        type={item.type}
                        name={item.htmlFor}
                        component="input"
                        style={{ padding: '7px', minWidth: '350px' }}
                      /> </Box><ErrorMessage name={item.htmlFor} style={{ color: 'red' }} component="div" />
                      </Box>

                        : <Box><Box border='1px solid gray'> <Field
                          type={item.type}
                          name={item.htmlFor}
                          pattern="[0-9]{10}"
                          component="input"
                          style={{ padding: '7px', minWidth: '350px' }} // Add padding here
                        /></Box> <ErrorMessage name={item.htmlFor} style={{ color: 'red' }} component="div" />
                        </Box>
                    }
                    
                  
                  </Box>
                </Box>
              ))}

                                              {/* Address */}

             {/* <Text as='h1' fontWeight={800} fontSize={30} mt='40px'>Address</Text> */}
             <Box>
                  <label htmlFor='pincode' style={{ position: 'relative', top: '12px', background: 'white', left: '6px', padding: '2px' }}>Pincode </label>
              <Box borderRadius={2} ></Box>
                <HStack>
                  <Box border='1px solid gray'>
                    <Field
                      type='number'
                      name='pincode'
                      pattern="[0-9]{6}"
                      component="input"
                      onChange = {(e)=>setPincode(e.target.value)}
                      style={{ padding: '7px', minWidth: '350px' }}/>
                     </Box> 
                     </HStack>
                     </Box>
                    <Select 
                    onChange={(e)=>getVillage(e)}
                    width={'350px'}
                    name='village'
                    placeholder='Select city/village/town'>
                      {
                          jsonData?.map((item,i)=>(
                            <option key={i}
                            style={{ padding: '7px', minWidth: '300px' }}
                             value={item.Name}  name={item.Name} color='white'>{item.Name}</option>
                          ))
                      }
                  </Select>

                                        {/* bottom buttons In the Modal */}
       <Button type={'submit'} w={['150px','150px',"300px"]} onClick={onClose} fontSize={[15,17,20]} colorScheme='facebook' >Done</Button>
               
            </VStack>
          </Form>
        </Formik>
        </ModalBody> 
        </ModalContent>
        </Modal>
        </Flex>
      </Box>
                                          {/* Payments Method  */}
     <Flex w={['360px', '400px', '400px']} padding={2}  border={'1px dotted grey'} borderRadius={10} justifyContent={'space-between'}>
              <Text fontSize={20}>2. Payments Method</Text>
              <Button isDisabled={isDisabled} onClick={(e)=>{ 
                history('/payment');
                dispatch({
                  type:'ADD_ADDRESS',
                  address: address
                })

              }

                } >select</Button>
      </Flex>

    </VStack>

  )
}

export default orderInfo
