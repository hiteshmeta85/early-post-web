import Header from './components/Header';
import {Box, Button, FormLabel, Heading, Text} from '@chakra-ui/react';
import * as Yup from 'yup';
import CustomInput from '../../components/CustomInput';
import {Formik, Form} from 'formik';
import {useState} from "react";
import axios from "axios";
import {Redirect} from "react-router-dom";

const UserLogin = (props) => {
    const [errors, setErrors] = useState('')

    return (
        <>
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                }}
                validationSchema={Yup.object({
                    email: Yup.string().email('Enter a valid Email.').required('Email Required.'),
                    password: Yup.string().required('Password Required.'),
                })}
                onSubmit={async (values, {setSubmitting}) => {
                    setSubmitting(false);
                    try {
                        const result = await axios.put('http://localhost:3030/api/user/session', {
                                email: values.email,
                                password: values.password
                            }, {withCredentials: true}
                        )
                        if (result) {
                            props.setIsLoggedIn(true)
                        }
                    } catch (err) {
                        setErrors(err.response.data.errors)
                    }
                }}
            >{({
                   handleSubmit,
                   isSubmitting,
               }) => (
                <Box bg={{md:'#FEF5F5'}} h='100vh'>
                    {props.isLoggedIn ? <Redirect to='/user/home'/> : false}
                    <Header/>
                    <Box bgColor='#FFFFFF' boxShadow={{md: 'rgba(149, 157, 165, 0.5) 0px 8px 24px'}}
                         px={{sm: '1rem', md: '1.5rem'}} py={{sm:'1rem',md:'2rem'}} borderRadius={{md: '1rem'}}
                         mx={{base: '1rem', md: '15%', lg: 'auto'}} maxW='600px'>
                        <Heading fontSize={{base: '1.25rem', md: '2rem'}} fontFamily="Raleway"
                              mb={{base: '1rem', lg: '3rem'}} textAlign='center'>User Login</Heading>
                        <Form onSubmit={handleSubmit}>
                            <Box mb='0.75rem'>
                                <FormLabel htmlFor='email' width='100%' mb='0'
                                           mt={{base: '1rem', md: '0'}}>Email</FormLabel>
                                <CustomInput type='email' name='email' placeholder='captain.jacksparrow@gmail.com'/>
                            </Box>
                            <Box>
                                <FormLabel htmlFor='password' width='100%' mb='0'>Password</FormLabel>
                                <CustomInput type='password' name='password' placeholder='@qwrz5mxn1!'/>
                            </Box>
                            <Button mt='1rem' bgColor='red.500' w='100%' color='white'
                                    boxShadow='rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px'
                                    _hover={{bgColor: 'red.400'}}
                                    isLoading={isSubmitting}
                                    type='submit'>Login</Button>
                        </Form>
                        {errors ? <Text textAlign='center' mt='2rem' color='gray'>{errors}</Text> : ''}
                    </Box>
                </Box>
            )}
            </Formik>
        </>
    );
};

export default UserLogin;