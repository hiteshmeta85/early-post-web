import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import httpClient from "../../utilities/httpClient";
import {Box, Button, Flex, FormLabel, Heading, Text, VStack} from "@chakra-ui/react";
import {Loading} from "../../components/Loading";
import Header from "./components/Header";
import * as Yup from "yup";
import axios from "axios";
import {Form, Formik} from "formik";

const IndividualOrder = () => {

    const {id} = useParams()

    const [orderInfo, setOrderInfo] = useState([])
    const [didWeGetTheInfo, setDidWeGetTheInfo] = useState('loading')
    const [msg, setMsg] = useState(null)

    useEffect(() => {
        const getOrder = async () => {
            try {
                const res = await httpClient({
                    method: 'GET',
                    url: `${process.env.REACT_APP_API_HOST}/admin/pending-orders/${id}`,
                })
                if (res.data.data.length !== 0) {
                    setOrderInfo(res.data.data[0])
                    setDidWeGetTheInfo('true')
                } else {
                    setDidWeGetTheInfo('null')
                }
            } catch (err) {
                setDidWeGetTheInfo('false')
            }
        }
        getOrder()
    }, [id])

    const conditionalRendering = () => {
        if (didWeGetTheInfo === 'loading') {
            return <Loading/>
        }
        if (didWeGetTheInfo === 'null') {
            return (<>
                <Header/>
                <Heading p={8} fontFamily='Raleway'>Already assigned the delivery service.</Heading>
            </>)
        }
        if (didWeGetTheInfo === 'true') {

            const {order_id, user_address, user_pincode, order_orderItems} = orderInfo
            const info = JSON.parse(order_orderItems)

            return (<>
                <Header/>
                <VStack bg='gray.100' px={[5, 10, 14]} py={[4,6,8]} alignItems='flex-start' spacing={[2, 4, 4]} fontFamily='Raleway'>
                    <Heading fontWeight='800' textAlign='center' fontFamily='Raleway' mt='1rem'>Assign Delivery Service.</Heading>
                    <Text>Order Id: {order_id}</Text>
                    <Text>Delivery Address: {user_address}</Text>
                    <Text>Delivery Pincode: {user_pincode}</Text>
                    <Flex>
                        <Text>Delivery Items: </Text>
                        <Box display='inline-block' px={2}>
                            {info[1] ? <Text>Times of India x{info[1]} </Text> : ''}
                            {info[2] ? <Text>The Indian Express x{info[2]}</Text> : ''}
                            {info[3] ? <Text>Bombay Times x{info[3]}</Text> : ''}
                            {info[4] ? <Text>New York Times x{info[4]}</Text> : ''}
                        </Box>
                    </Flex>
                    <Formik
                        initialValues={{
                            deliveryService: '',
                        }}
                        validationSchema={Yup.object({
                            deliveryService: Yup.string().required('Select a delivery service'),
                        })}
                        onSubmit={async (values, {setSubmitting}) => {
                            setSubmitting(false);
                            try {
                                const result = await axios.put(`${process.env.REACT_APP_API_HOST}/admin/pending-orders/${id}`, {
                                        deliveryService: values.deliveryService,
                                    }
                                )
                                if (result.status === 200) {
                                    setMsg('Successfully assigned a delivery service.')
                                }
                            } catch (err) {
                                console.log(err)
                            }
                        }}
                    >{({
                           handleSubmit,
                           isSubmitting,
                           handleBlur,
                           handleChange,
                           values,
                           errors,
                           touched
                       }) => (
                        <Box>
                            <Form onSubmit={handleSubmit}>
                                <Box>
                                    <FormLabel fontWeight='light' htmlFor='deliveryService' width='100%' mb='1rem'
                                               mt={{base: '1rem', md: '0'}}>Delivery Service:</FormLabel>
                                    <select
                                        name="deliveryService"
                                        value={values.color}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        style={{ display: 'block',padding:'1rem',borderRadius:'1rem'}}
                                    >
                                        <option value="" label="Select a delivery service" />
                                        <option value="DHL" label="DHL" />
                                        <option value="FedEx" label="FedEx" />
                                        <option value="BlueDart" label="BlueDart" />
                                        <option value="Express" label="Express" />
                                        <option value="UPS" label="UPS" />
                                    </select>
                                    {errors.deliveryService && touched.deliveryService && errors.deliveryService}
                                </Box>
                                <Button mt='1rem' bgColor='red.500' size='md' color='white'
                                        _hover={{bgColor: 'red.400'}} mr='1rem'
                                        isLoading={isSubmitting}
                                        type='submit'>Submit</Button>
                                {msg === null ? true :
                                    <Link to='/admin/pending-orders'>
                                        <Button mt='1rem' bgColor='red.500' size='md' color='white' _hover={{bgColor: 'red.400'}}>
                                            Back
                                        </Button>
                                    </Link>
                                }
                                <Text mt='1rem'>{msg}</Text>
                            </Form>
                        </Box>
                    )}
                    </Formik>
                </VStack>
            </>)
        }
        if (didWeGetTheInfo === 'false') {
            return (<>
                <Header/>
                <Text pt='2rem' fontSize='2rem' mx={{base: '1rem', md: '2rem'}} fontFamily='Raleway'>
                    Something went wrong.
                </Text>
            </>)
        }
    }

    return (<>{conditionalRendering()}</>)
}

export default IndividualOrder
