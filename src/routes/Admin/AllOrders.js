import Header from './components/Header';
import {Box, Heading, Table, Tbody, Td, Text, Th, Thead, Tr} from '@chakra-ui/react';
import {useEffect, useState} from "react";
import httpClient from "../../utilities/httpClient";
import {Loading} from "../../components/Loading";

const AllOrders = () => {
    const [ordersInfo, setOrdersInfo] = useState([])
    const [didWeGetTheInfo, setDidWeGetTheInfo] = useState('loading')

    useEffect(() => {
        const getAllOrder = async () => {
            try {
                const res = await httpClient({
                    method: 'GET',
                    url: `${process.env.REACT_APP_API_HOST}/admin/all-orders`,
                })
                if (res.data.data.length !== 0) {
                    setOrdersInfo(res.data.data)
                    setDidWeGetTheInfo('true')
                } else {
                    setDidWeGetTheInfo('null')
                }
            } catch (err) {
                setDidWeGetTheInfo('false')
            }
        }
        getAllOrder()
    }, [])

    const IndividualOrder = () => {
        return (
            <>
                {ordersInfo.map(order => {
                    return <OrderList key={order.id} list={order}/>
                })}
            </>
        )
    }

    const OrderList = (props) => {
        const {id, orderItems, status, deliveryService} = props.list
        const info = JSON.parse(orderItems)

        return (
            <Tr>
                <Td>{id}</Td>
                <Td>{info[1] ? <Text>Times of India x{info[1]} </Text> : ''}
                    {info[2] ? <Text>The Indian Express x{info[2]}</Text> : ''}
                    {info[3] ? <Text>Bombay Times x{info[3]}</Text> : ''}
                    {info[4] ? <Text>New York Times x{info[4]}</Text> : ''}</Td>
                <Td>{props.list.user.address}</Td>
                <Td isNumeric>{status}</Td>
                <Td isNumeric>{deliveryService?deliveryService:<Text>--</Text>}</Td>
            </Tr>
        )
    }

    const conditionalRendering = () => {
        if (didWeGetTheInfo === 'loading') {
            return <Loading/>
        }
        if (didWeGetTheInfo === 'true') {
            return (<>
                <Header/>
                <Box py={{base: '2rem', md: '3rem'}} mx={{base: '1rem', lg: '2rem'}} fontFamily='Monospace' fontSize={{lg:'1rem'}}>
                    <Heading fontWeight='800' textAlign='center' fontFamily='Raleway'>All Orders</Heading>
                    <Table size="sm" mt='2rem' bgColor='white' color='blue.500'>
                        <Thead>
                            <Tr>
                                <Th>Order Id</Th>
                                <Th>Order Items</Th>
                                <Th>Address</Th>
                                <Th isNumeric>Order Status</Th>
                                <Th isNumeric>Delivery Agent</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <IndividualOrder/>
                        </Tbody>
                    </Table>
                </Box>
            </>)
        }
        if (didWeGetTheInfo === 'null') {
            return (
                <>
                    <Header/>
                    <Box py={{base: '2rem', md: '3rem'}} mx={{base: '1rem', lg: '2rem'}} fontFamily='Monospace'
                         fontSize={{lg: '1rem'}}>
                        <Heading fontWeight='800' textAlign='center' fontFamily='Raleway'>All Orders</Heading>
                        <Text fontSize='2rem' mx={{base: '1rem', md: '1.5rem'}} textAlign='center' mt='2rem'
                              fontFamily='Raleway'>
                            No orders.</Text>
                    </Box>
                </>
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
        <>{conditionalRendering()}</>
    )
}

export default AllOrders
