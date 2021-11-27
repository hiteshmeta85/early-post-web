import Header from './components/Header';
import {Box, Button, Divider, Flex, FormLabel, Heading, Text, Textarea} from '@chakra-ui/react';
import {Form, Formik} from "formik";
import * as Yup from "yup";
import CustomInput from "../../components/CustomInput";
import httpClient from "../../utilities/httpClient";
import {useEffect, useState} from "react";
import {Loading} from "../../components/Loading";
import {Error} from "../../components/Error";

//*********************************** Navbar *********************************************//

const Query = ({isLoggedIn, setIsLoggedIn}) => {
    const [selectedOption, setSelectedOption] = useState('A')
    const [isAuthenticated, setIsAuthenticated] = useState('loading')

    const selectOption = () => {
        if (selectedOption === 'A') {
            return <FAQ/>
        }
        if (selectedOption === 'B') {
            return <AskQuery/>
        }
        if (selectedOption === 'C') {
            return <PostedQueries/>
        }
    }

    useEffect(() => {
        const checkSession = async () => {
            try {
                await httpClient({
                    method: 'GET',
                    url: `${process.env.REACT_APP_API_HOST}/user/session`,
                })
                setIsAuthenticated('true')
            } catch (err) {
                setIsAuthenticated('false')
            }
        }
        checkSession()
    }, [])

    const conditionalRendering = () => {
        if (isAuthenticated === 'loading') {
            return <Loading/>
        }
        if (isAuthenticated === 'true') {
            return (<>
                <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
                <Flex py='0.75rem' mx={{base: '1rem', md: '2rem'}}  justifyContent={{base: 'space-around', md: 'flex-start'}}>
                    <Button mr={{base: '1rem'}} onClick={() => {
                        setSelectedOption('A')
                    }} bgColor='red.500' color='white' _hover={{bgColor: 'red.400'}}>
                        FAQs
                    </Button>
                    <Button mr={{base: '1rem'}} onClick={() => {
                        setSelectedOption('B')
                    }} bgColor='red.500' color='white' _hover={{bgColor: 'red.400'}}>
                        Ask New Query
                    </Button>
                    <Button onClick={() => {
                        setSelectedOption('C')
                    }} bgColor='red.500' color='white' _hover={{bgColor: 'red.400'}}>
                        Previous Queries
                    </Button>
                </Flex>
                {selectOption()}
            </>)
        }
        if (isAuthenticated === 'false') {
            return <Error/>
        }
    }

    return (
        <>
            {conditionalRendering()}
        </>
    )
}
export default Query

//*********************************** FAQ *********************************************//
const FAQ = () => {

    const query = [
        {
            id: 1,
            question: 'What information do I need to provide to place an order?',
            answer: 'Information like Mobile Number, Email ID, Address, Pincode.',
        },
        {
            id: 2,
            question: 'What are the payment methods available?',
            answer: 'Currently we deal only in cash.'
        },
        {
            id: 3,
            question: 'How do I know if Early Post has received my order?',
            answer: 'You can view the updates at the Order History Page.'
        },
        {
            id: 4,
            question: 'How much does the shipping cost?',
            answer: 'It will vary on the basis of the location entered.'
        }
    ]


    return (
        <Box mx={{base: '1rem', md: '2rem'}} py='2rem' fontFamily='Raleway'>
            <Heading fontWeight='800' fontFamily='Raleway' mb='1.5rem'>FAQs</Heading>
            {query.map((item) => {
                return (
                    <Box key={item.id}>
                        <Divider/>
                        <Box py='0.75rem'>
                            <Text fontWeight='700'>
                                {item.question}
                            </Text>
                            <Text pt='0.25rem'>
                                {item.answer}
                            </Text>
                        </Box>
                    </Box>
                )
            })}
        </Box>
    )
}

//*********************************** Ask Queries *********************************************//

const AskQuery = () => {
    const [serverResponse, setServerResponse] = useState('')

    return (
        <>
            <Formik
                initialValues={{
                    title: '',
                    description: '',
                }}
                validationSchema={Yup.object({
                    title: Yup.string().required('Title Required.'),
                    description: Yup.string().required('Description Required.'),
                })}
                onSubmit={async (values, {setSubmitting, resetForm}) => {
                    setSubmitting(false);
                    const payload = {title: values.title, description: values.description}
                    try {
                        const response = await httpClient({
                            method: 'POST',
                            url: `${process.env.REACT_APP_API_HOST}/user/query`,
                            data: payload
                        })
                        if (response.status === 200) {
                            console.log(response)
                            setServerResponse(response.data.data)
                            resetForm();
                        }
                    } catch (err) {
                        console.log(err)
                        setServerResponse(err.response.data.errors)
                    }
                }}
            >{({
                   handleSubmit,
                   handleChange,
                   handleBlur,
                   values,
                   errors,
                   touched
               }) => (
                <Box py='2rem'>
                    <Box bgColor='white'
                         mx={{base: '1rem', md: '15%', lg: '20%'}} maxW='900px' borderRadius={{md: '1rem'}}
                         py={{md: '1.5rem', lg: '2rem'}} px={{md: '2rem'}}
                         boxShadow={{md: 'rgba(14, 30, 37, 0.10) 0px 2px 4px 0px, rgba(14, 30, 37, 0.10) 0px 2px 16px 0px'}}>
                        <Heading fontWeight='800' fontSize={{base: '1.5rem', md: '2rem'}}
                                 textAlign='center' mb='1.5rem' fontFamily='Raleway'>Submit your query.</Heading>
                        <Form onSubmit={handleSubmit}>
                            <Box mb='1rem'>
                                <FormLabel marginBottom='0.25rem' htmlFor='shortDescription' width='100%'
                                           mb='0'>Title</FormLabel>
                                <CustomInput type='text' name='title' placeholder='Subject'/>
                            </Box>
                            <Box>
                                <FormLabel marginBottom='0.25rem' htmlFor='description' width='100%' mb='0'>
                                    Description
                                </FormLabel>
                                <Textarea rows='8' name='description' onChange={handleChange}
                                          onBlur={handleBlur}
                                          value={values.description}
                                          placeholder='Message'/>
                                {errors.description && touched.description && errors.description}
                            </Box>
                            <Button w='100%' mt='1rem' bgColor='red.500' color='white'
                                    boxShadow='rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px'
                                    _hover={{bg: 'red.400'}}
                                    type='submit'>Send</Button>
                        </Form>
                        {serverResponse ?
                            <Text textAlign='center' mt='2rem' color='gray'>{serverResponse}</Text> : ''}
                    </Box>
                </Box>
            )}
            </Formik>
        </>
    )
}

//*********************************** Previous Queries *********************************************//

const PostedQueries = () => {
    const [prevQueries, setPrevQueries] = useState([])
    const [didWeGetTheInfo, setDidWeGetTheInfo] = useState('loading');

    useEffect(() => {
        const getQuery = async () => {
            try {
                const res = await httpClient({
                    method: 'GET',
                    url: `${process.env.REACT_APP_API_HOST}/user/query`
                })
                if (res.data.data.length !== 0) {
                    setPrevQueries(res.data.data)
                    setDidWeGetTheInfo('true')
                } else {
                    setDidWeGetTheInfo('null')
                }
            } catch (err) {
                setDidWeGetTheInfo('false')
            }
        }
        getQuery()
    }, [])

    const IndividualQuery = () => {
        return (
            <>
                {prevQueries.map((query) => {
                    return <QueryList key={query.id} list={query}/>
                })}
            </>
        )
    }

    const QueryList = (props) => {
        const {title, description, status, reply} = props.list
        return (
            <Box mx={{base: '1rem', md: '15%', lg: '20%'}} p={{base: '0.5rem', md: '1rem'}}
                 borderRadius='0.5rem' bgColor='#F6F6F6' mb='1rem'>
                <Flex>
                    <Text mr='0.5rem' color='blue.700'>Title:</Text>
                    <Text>{title}</Text>
                </Flex>
                <Box flexDirection={{base: 'column', md: 'row'}} my='1rem'>
                    <Text mr='0.5rem' color='blue.700'>Query:</Text>
                    <Text>{description}</Text>
                </Box>
                {status ? <>
                        <Text mr='0.5rem' color='blue.700'>Reply:</Text>
                        <Text>{reply}</Text>
                    </> :
                    <>
                        <Text mr='0.5rem' color='blue.700'>Reply:</Text>
                        <Text>Awaiting Response</Text>
                    </>}
            </Box>
        )
    }

    const conditionalRendering = () => {
        if (didWeGetTheInfo === 'loading') {
            return <Loading/>
        }
        if (didWeGetTheInfo === 'true') {
            return (
                <Box py='2rem'>
                    <Heading mx={{base: '1rem', md: '15%', lg: '20%'}} fontWeight='800' fontFamily='Raleway'
                             mb='1rem'>
                        Queries
                    </Heading>
                    <IndividualQuery/>
                </Box>
            )
        }
        if (didWeGetTheInfo === 'null') {
            return (
                <Box py={{base: '2rem', md: '3rem'}} mx={{base: '1rem', lg: '2rem'}} fontFamily='Monospace'
                     fontSize={{lg: '1rem'}}>
                    <Heading fontWeight='800' textAlign='center' fontFamily='Raleway'>Queries</Heading>
                    <Text fontSize='2rem' mx={{base: '1rem', md: '1.5rem'}} textAlign='center' mt='2rem'
                          fontFamily='Raleway'>No queries asked yet.</Text>
                </Box>
            )
        }
        if (didWeGetTheInfo === 'false') {
            return (
                <>
                    <Header/>
                    <Text pt='2rem' fontSize='2rem' mx={{base: '1rem', md: '2rem'}} fontFamily='Raleway'>
                        Something went wrong.
                    </Text>
                </>
            )
        }
    }

    return (
        <>
            {conditionalRendering()}
        </>
    )
}