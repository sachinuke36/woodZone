import React,{useEffect, useState} from 'react';
import {Box, Container,Button, Flex, Text,VStack} from '@chakra-ui/react'
import { useStateValue } from '../StateProvider/StateProvider';
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js'
import { Form, Formik } from 'formik';
import axios from './../axios';
import {useNavigate} from 'react-router-dom'
import db from '../../data/firebase';
import { Timestamp, addDoc, collection } from 'firebase/firestore/lite';



const Payment = () => {
    const [{cart,address}, dispatch] = useStateValue();
    const stripe = useStripe();
    const elements = useElements();

    const [error, setError]= useState(null);
    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing]= useState('');
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState(true);

    const  totalPrice = cart.reduce((total,item)=> total + item.price,0);
    const history = useNavigate();


    useEffect(() => {
        const getClientSecret = async () => {
            try {
                const response = await axios.post('/payment/create', {
                    total: totalPrice * 100 // Ensure the server expects 'total' as a parameter
                });
                setClientSecret(response.data.clientSecret);
            } catch (error) {
                console.error('Error fetching client secret:', error);
            }
        };
    
        getClientSecret();
    }, [cart]);
    console.log("the client-secret>>",clientSecret)
    console.log(totalPrice)

    // Handle Submit
    const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    try {
        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        });
        if (payload.error) {
            setError(`Payment failed: ${payload.error.message}`);
            setProcessing(false);
        } else {
            const paymentIntent = payload.paymentIntent;
            console.log(paymentIntent.amount_capturable);
            try {
                const orderData = collection(db, 'orderDetails');
                await addDoc(orderData, {
                    ...address,
                    payment: {
                        cart: cart,
                        amount: paymentIntent.amount_capturable,
                        created: paymentIntent.created
                    }
                });
                setSucceeded(true);
                setError(null);
                setProcessing(false);
                dispatch({
                    type: "EMPTY_BASKET"
                });
                history('/', { replace: true });
            } catch (error) {
                console.error("Error adding order details:", error);
                setError("Error processing payment. Please try again.");
                setProcessing(false);
            }
        }
    } catch (error) {
        console.error("Error confirming card payment:", error);
        setError("Error processing payment. Please try again.");
        setProcessing(false);
    }
};


    const handleChange =(e)=>{
            setDisabled(e.empty);
            setError(e.error ? e.error.message : "");
    }

    console.log(address[0]);
  return (
    <Container border={'1px solid red'} mt='100px' justifyContent={'center'} alignItems={'center'}>
        <Flex> <Text mx='auto' mb='30px' fontWeight={800} fontSize={20}>Add Your Payment Details</Text></Flex>
        <Formik>
             <Form onSubmit={(e)=>handleSubmit(e)}>
                
                   <CardElement onChange={handleChange}/>
                   <Flex>
                   <Button type='submit'  mt='20px' mx='auto' colorScheme='facebook' isDisabled={processing || disabled || succeeded}>
                            <Text>{processing ? 'Processing' : "Buy Now"}</Text>
                    </Button>
                   </Flex>
                   
              
                    
                     {/* total price */}
                     
                     <Box>{error && <Text color='red'>{error}</Text> }</Box>
                </Form>
        </Formik>
        
       
    </Container>
  )
}

export default Payment
