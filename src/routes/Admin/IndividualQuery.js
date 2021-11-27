import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import httpClient from "../../utilities/httpClient";
import {Loading} from "../../components/Loading";
import Header from "./components/Header";
import {Box, Button, FormLabel, Heading, Text, Textarea} from "@chakra-ui/react";
import * as Yup from "yup";
import axios from "axios";
import {Form, Formik} from "formik";

const IndividualQuery = () => {

    const {id} = useParams()
    const [queryInfo, setQueryInfo] = useState([])
    const [didWeGetTheInfo, setDidWeGetTheInfo] = useState('loading')
    const [msg, setMsg] = useState(null)

    useEffect(() => {
        const getAllQueries = async () => {
            try {
                const res = await httpClient({
                    method: 'GET',
                    url: `${process.env.REACT_APP_API_HOST}/admin/query/${id}`,
                })
                if (res.data.data.length !== 0) {
                    console.log(res.data.data)
                    setQueryInfo(res.data.data)
                    setDidWeGetTheInfo('true')
                } else {
                    setDidWeGetTheInfo('null')
                }
            } catch (err) {
                setDidWeGetTheInfo('false')
            }
        }
        getAllQueries()
    }, [id])

    const conditionalRendering = () => {
        if (didWeGetTheInfo === 'loading') {
            return <Loading/>
        }
        if (didWeGetTheInfo === 'null') {
            return (<>
                <Header/>
                <Heading fontFamily='Raleway' p={8}>Already answered the query.</Heading>
            </>)
        }
        if (didWeGetTheInfo === 'true') {
            return (<>
                <Header/>
                <Box py={{base: '2rem', md: '3rem'}} mx={{base: '1rem', lg: '2rem'}}
                     fontSize={{lg: '1rem'}}>
                    <Heading fontWeight='800' textAlign='center' fontFamily='Raleway' mt='1rem'>Query Reply</Heading>
                    <Box bg='gray.50' px={[4, 6, 8]} py={[2, 4, 6]} borderRadius='1rem' mt='1rem'>
                        <Text fontWeight='light'>Title: {queryInfo[0].title}</Text>
                        <Text fontWeight='light'>Description: {queryInfo[0].description}</Text>
                        <Formik
                            initialValues={{
                                reply: '',
                            }}
                            validationSchema={Yup.object({
                                reply: Yup.string().required('Reply Required.'),
                            })}
                            onSubmit={async (values, {setSubmitting}) => {
                                setSubmitting(false);
                                try {
                                    const result = await axios.put(`${process.env.REACT_APP_API_HOST}/admin/query/${id}`, {
                                            reply: values.reply,
                                        }
                                    )
                                    if (result.status === 200) {
                                        setMsg('Successfully answered the query')
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
                                        <FormLabel fontWeight='light' htmlFor='reply' width='100%' mb='1rem'
                                                   mt={{base: '1rem', md: '0'}}>Reply:</FormLabel>
                                        <Textarea rows='8' name='reply' onChange={handleChange}
                                                  onBlur={handleBlur}
                                                  value={values.description}
                                                  placeholder='Message'/>
                                        {errors.reply && touched.reply && errors.reply}
                                    </Box>
                                    <Button mt='1rem' bgColor='red.500' size='md' color='white'
                                            _hover={{bgColor: 'red.400'}} mr='1rem'
                                            isLoading={isSubmitting}
                                            type='submit'>Submit</Button>
                                    {msg === null ? true :
                                        <Link to='/admin/queries'>
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
                    </Box>
                </Box>
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

export default IndividualQuery