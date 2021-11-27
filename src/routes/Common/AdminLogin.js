import {Box, Button, FormLabel, Heading, Text} from '@chakra-ui/react';
import Header from './components/Header';
import * as Yup from 'yup';
import {Form, Formik} from 'formik';
import CustomInput from '../../components/CustomInput';
import {useState} from "react";
import {Redirect} from "react-router-dom";

const AdminLogin = () => {

    const [errors, setErrors] = useState('')
    const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false)
    const adminUserName = 'admin'
    const adminPassword = '123'

    return (
        <>
            <Formik
                initialValues={{
                    username: '',
                    password: '',
                }}
                validationSchema={Yup.object({
                    username: Yup.string().required('Username Required.'),
                    password: Yup.string().required('Password Required.'),
                })}
                onSubmit={(values, {setSubmitting, resetForm}) => {
                    setSubmitting(false);
                    if (values.username !== adminUserName) {
                        return setErrors('Invalid Username.')
                    }
                    if (values.password !== adminPassword) {
                        return setErrors('Invalid Password.')
                    }
                    resetForm();
                    setIsAdminLoggedIn(true)
                }}
            >
                {({
                      handleSubmit,
                      isSubmitting
                  }) => (
                    <Box bg={{md:'#FEF5F5'}} h='100vh'>
                        {isAdminLoggedIn ? <Redirect to='/admin/home'/> : false}
                        <Header/>
                        <Box bgColor='#FFFFFF' boxShadow={{md: 'rgba(149, 157, 165, 0.5) 0px 8px 24px'}}
                             px={{sm: '1rem', md: '1.5rem'}} py={{sm: '1rem', md: '2rem'}} borderRadius={{md: '1rem'}}
                             mx={{base: '1rem', md: '15%', lg: 'auto'}} maxW='600px'>
                            <Heading fontSize={{base: '1.25rem', md: '2rem'}} mb={{base: '1rem', lg: '3rem'}}
                                  textAlign='center' fontFamily="Raleway">Admin Login</Heading>
                            <Form onSubmit={handleSubmit}>
                                <Box mb='0.75rem'>
                                    <FormLabel htmlFor='username' width='100%' mb='0'
                                               mt={{base: '1rem', md: '0'}}>Username</FormLabel>
                                    <CustomInput type='username' name='username' placeholder='Admin'/>
                                </Box>
                                <Box>
                                    <FormLabel htmlFor='password' width='100%' mb='0'>Password</FormLabel>
                                    <CustomInput type='password' name='password' placeholder='Password'/>
                                </Box>
                                <Button w='100%' mt='1rem' bgColor='red.500' color='white'
                                        boxShadow='rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px'
                                        _hover={{color: 'white', bgColor: 'red.400'}}
                                        type='submit' isLoading={isSubmitting}
                                >Login</Button>
                            </Form>
                            {errors ? <Text textAlign='center' mt='2rem' color='gray'>{errors}</Text> : ''}
                        </Box>
                    </Box>
                )}
            </Formik>
        </>
    );
};

export default AdminLogin;