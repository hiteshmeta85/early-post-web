import Header from './components/Header';
import {Form, Formik} from 'formik';
import * as Yup from 'yup';
import {Box, Button, Flex, FormLabel, Heading, Text} from '@chakra-ui/react';
import CustomInput from '../../components/CustomInput';
import {useEffect, useState} from "react";
import httpClient from "../../utilities/httpClient";
import {Loading} from "../../components/Loading";
import {Error} from "../../components/Error";

const UserAccount = ({isLoggedIn, setIsLoggedIn}) => {

    const [userInfo, setUserInfo] = useState()
    const [didWeGetInfo, setDidWeGetInfo] = useState('loading')
    const [msg, setMsg] = useState('')

    useEffect(() => {
        const getAccountDetails = async () => {
            try {
                const res = await httpClient({
                    method: 'GET',
                    url: `${process.env.REACT_APP_API_HOST}/user`,
                })
                setUserInfo(res.data.data)
                setDidWeGetInfo('true')
            } catch (err) {
                setDidWeGetInfo('false')
            }
        }
        getAccountDetails()
    }, [])

    const conditionalRendering = () => {
        if (didWeGetInfo === 'loading') {
            return <Loading/>
        }
        if (didWeGetInfo === 'true') {
            return (<>
                <Formik
                    initialValues={{
                        name: userInfo.name,
                        email: userInfo.email,
                        password: userInfo.password,
                        address: userInfo.address,
                        pincode: userInfo.pincode,
                        phone: userInfo.phone,
                    }}
                    validationSchema={Yup.object({
                        name: Yup.string().required('Full Name Required.'),
                        email: Yup.string().email().required('Email Required.'),
                        password: Yup.string().required('Password Required.'),
                        address: Yup.string().required('Address Required.').min('20', 'Too short.'),
                        pincode: Yup.number().required('Pincode Required.').min(100000, 'Not Valid.').max(999999, 'Not Valid.'),
                        phone: Yup.number().required('Phone Number Required.').positive().integer(),
                    })}
                    onSubmit={async (values, {setSubmitting}) => {
                        setSubmitting(false);
                        const payload = {
                            name: values.name,
                            password: values.password,
                            address: values.address,
                            pincode: values.pincode,
                            phone: values.phone
                        }
                        try {
                            const res = await httpClient({
                                method: 'PUT',
                                url: `${process.env.REACT_APP_API_HOST}/user`,
                                data: payload
                            })
                            setMsg(res.data.data)
                        } catch (err) {
                            setMsg(err.response.data.errors)
                        }
                    }}
                >{({
                       handleSubmit,
                       dirty,
                       isValid
                   }) => (
                    <>
                        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
                        <Box py='3rem'>
                            <Box bgColor='white' py={{md: '1.5rem', lg: '2rem'}} px={{md: '2rem'}}
                                 mx={{base: '1rem', md: '15%', lg: '20%'}} maxW='900px' borderRadius={{md: '1rem'}}
                                 boxShadow={{md: 'rgba(14, 30, 37, 0.10) 0px 2px 4px 0px, rgba(14, 30, 37, 0.10) 0px 2px 16px 0px'}}>
                                <Heading fontWeight='800' fontSize={{base: '1.25rem', md: '2rem'}} mb='1.5rem'
                                         textAlign='center' fontFamily='Raleway'>Edit Profile</Heading>
                                <Form onSubmit={handleSubmit}>
                                    <Flex justifyContent='space-between' flexDirection={{base: 'column', md: 'row'}}>
                                        <Box w={{base: '100%', md: '49%'}}>
                                            <FormLabel htmlFor='name' width='100%' mb='0'>Name</FormLabel>
                                            <CustomInput type='text' name='name' placeholder='Harvey Specter'/>
                                        </Box>
                                        <Box w={{base: '100%', md: '49%'}}>
                                            <FormLabel htmlFor='email' width='100%' mb='0' mt={[1, 0]}>Email</FormLabel>
                                            <CustomInput type='email' name='email' placeholder='harvey.specter@gmail.com'
                                                         isDisabled={true}/>
                                        </Box>
                                    </Flex>
                                    <Box>
                                        <FormLabel htmlFor='password' width='100%' mb='0' mt='1rem'>Current
                                            Password</FormLabel>
                                        <CustomInput type='text' name='password' placeholder='@qwrz4mxn7!'/>
                                    </Box>
                                    <Box>
                                        <FormLabel htmlFor='address' width='100%' mb='0' mt='1rem'>Address</FormLabel>
                                        <CustomInput type='text' name='address'
                                                     placeholder='601 East 54th Street, New York City, New York'/>
                                    </Box>
                                    <Flex justifyContent='space-between' flexDirection={{base: 'column', md: 'row'}}>
                                        <Box w={{base: '100%', md: '49%'}}>
                                            <FormLabel htmlFor='pincode' width='100%' mb='0' mt='1rem'>Pincode</FormLabel>
                                            <CustomInput type='number' name='pincode' placeholder='100001'/>
                                        </Box>
                                        <Box w={{base: '100%', md: '49%'}}>
                                            <FormLabel htmlFor='number' width='100%' mb='0' mt='1rem'>
                                                Contact Number</FormLabel>
                                            <CustomInput type='number' name='phone' placeholder='9876543210'/>
                                        </Box>
                                    </Flex>
                                    <Button w='100%' mt='1rem' bgColor='red.500' color='white'
                                            boxShadow='rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px'
                                            _hover={{bg: 'red.400'}} disabled={!(dirty && isValid)}
                                            type='submit'>Save</Button>
                                </Form>
                                <Text textAlign='center' mt='1rem' color='gray'>{msg}</Text>
                            </Box>
                        </Box>
                    </>
                )}
                </Formik>
            </>)
        }
        if (didWeGetInfo === 'false') {
            return <Error/>
        }
    }

    return (
        <>{conditionalRendering()}</>
    );
};

export default UserAccount;