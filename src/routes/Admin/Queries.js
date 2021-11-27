import Header from './components/Header';
import {useEffect, useState} from "react";
import httpClient from "../../utilities/httpClient";
import {Box, Button, Heading, Table, Tbody, Td, Text, Th, Thead, Tr} from "@chakra-ui/react";
import {Loading} from "../../components/Loading";
import {Link} from "react-router-dom";

const Queries = () => {

    const [queryInfo, setQueryInfo] = useState([])
    const [didWeGetTheInfo, setDidWeGetTheInfo] = useState('loading')

    useEffect(() => {
        const getAllQueries = async () => {
            try {
                const res = await httpClient({
                    method: 'GET',
                    url: `${process.env.REACT_APP_API_HOST}/admin/query`,
                })
                if (res.data.data.length !== 0) {
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
    }, [])

    const conditionalRendering = () => {
        if (didWeGetTheInfo === 'loading') {
            return <Loading/>
        }
        if (didWeGetTheInfo === 'null') {
            return (<>
                <Header/>
                <Box py={{base: '2rem', md: '3rem'}} mx={{base: '1rem', lg: '2rem'}} fontFamily='Monospace'
                     fontSize={{lg: '1rem'}}>
                    <Heading fontWeight='800' textAlign='center' fontFamily='Raleway'>All Queries</Heading>
                    <Text fontSize='2rem' mx={{base: '1rem', md: '1.5rem'}} textAlign='center' mt='2rem'
                          fontFamily='Raleway'>
                        No pending queries to be answered.</Text>
                </Box>
            </>)
        }
        if (didWeGetTheInfo === 'true') {
            return (<>
                <Header/>
                <Box py={{base: '2rem', md: '3rem'}} mx={{base: '1rem', lg: '2rem'}} fontFamily='Monospace'
                     fontSize={{lg: '1rem'}}>
                    <Heading fontWeight='800' textAlign='center' fontFamily='Raleway' pt='1rem'>All Queries</Heading>
                    <Table variant="simple" mt='2rem'>
                        <Thead>
                            <Tr>
                                <Th>ID</Th>
                                <Th>Title</Th>
                                <Th>Description</Th>
                                <Th isNumeric>Answer</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {queryInfo.map((query) => {
                                const {id, title, description} = query

                                return (
                                    <Tr key={id}>
                                        <Td>{id}</Td>
                                        <Td>{title}</Td>
                                        <Td>{description}</Td>
                                        <Td isNumeric><Link to={`/admin/query/${id}`}><Button bg='green.500'
                                                                                              color='white'>
                                            Reply</Button></Link></Td>
                                    </Tr>
                                )
                            })}
                        </Tbody>
                    </Table>
                </Box>
            </>)
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

    return (<>{conditionalRendering()}</>)
}

export default Queries