import { Container, Heading, VStack, Box, Button, HStack, Image, Flex } from '@chakra-ui/react'
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { useToast } from '@chakra-ui/react';
import * as Yup from "yup";
import db from '../../data/firebase';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { addDoc, updateDoc, doc } from 'firebase/firestore/lite';


const contactSchemaValidation = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid Email").required("Email ID is required"),
    contact: Yup.string()
        .matches(/^[0-9]{10}$/, "Invalid Phone Number")
        .required("Phone number is required"),
});



const Contact = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [imageHeight, setImageHeight] = useState(0);
    const toast = useToast()

    const imageRef = useRef(null);

    const currentDate = new Date();
    const dateTimeString = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')} ${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}:${currentDate.getSeconds().toString().padStart(2, '0')}`;

    useEffect(() => {
        if (imageRef.current) {
            const height = imageRef.current.clientHeight;
            setImageHeight(height);
        }
    }, [imageRef.current]);

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
    }];

    return (
        <Flex alignItems={'center'} justifyContent={'center'}>
            <Container m={0} p={0}  display={{base:'none', lg:'flex'}}>
                <Image src='./images/contact.jpg' height='70vh' />
            </Container>
            <Container height={'70vh'}  mx={0} px={0} borderRadius={2} pb={10} my='40px'>
                <VStack>
                    <Heading>Contact Us</Heading>
                    <Formik
                    validationSchema={contactSchemaValidation}
                        initialValues={{
                            name: '',
                            email: '',
                            contact: '',
                            message: '',
                            time:''
                        }}
                        onSubmit={async (values, { resetForm }) => {
                            try {
                                const formData = collection(db, 'contact-form');
                                await addDoc(formData, {
                                    name: values.name,
                                    email: values.email,
                                    contact: values.contact,
                                    message: values.message,
                                    time: dateTimeString
                                });
                        
                                toast({
                                    title: 'Successfully submitted.',
                                    description: "We will reach out to you soon",
                                    status: 'success',
                                    duration: 3000,
                                    isClosable: true,
                                    position: 'bottom'
                                });
                                resetForm();
                                setIsSubmitted(true);
                            } catch (error) {
                                console.error("Error submitting form:", error);
                                toast({
                                    title: 'Submission failed.',
                                    description: "Please try again later.",
                                    status: 'error',
                                    duration: 3000,
                                    isClosable: true,
                                    position: 'bottom'
                                });
                            }
                        }}
                        >
                        <Form>
                            <VStack spacing={3}>
                                {formProps.map((item, i) => (
                                    <Box key={i}>
                                        <label htmlFor={item.htmlFor} style={{ position: 'relative', top: '12px', background: 'white', left: '6px', padding: '2px' }}>{item.title} </label>
                                        <Box  borderRadius={2} >
                                            {
                                                !(item.type === 'tel') ? <Box> <Box border='1px solid gray'><Field
                                                    type={item.type}
                                                    name={item.htmlFor}
                                                    component="input"
                                                    style={ {padding: '7px', minWidth: '350px'} }
                                                /> </Box><ErrorMessage name={item.htmlFor} style={{color:'red'}} component="div" />
                                                </Box>
                                                
                                                :<Box><Box border='1px solid gray'> <Field
                                                    type={item.type}
                                                    name={item.htmlFor}
                                                    pattern="[0-9]{10}"
                                                    component="input"
                                                    style={{ padding: '7px', minWidth: '350px'}} // Add padding here
                                                /></Box> <ErrorMessage name={item.htmlFor} style={{color:'red'}} component="div" />
                                                </Box>
                                            }
                                        </Box>
                                    </Box>
                                ))}
                                <Button colorScheme='facebook' type='submit'>Submit</Button>
                            </VStack>
                        </Form>
                    </Formik>
                </VStack>

               
            </Container>
        </Flex>
    );
}

export default Contact;
