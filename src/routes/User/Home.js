import Header from "./components/Header";
import {
    Box,
    Button,
    Flex,
    Heading,
    Table,
    TableCaption,
    Tbody,
    Td,
    Tfoot,
    Th,
    Thead,
    Tr,
} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import httpClient from "../../utilities/httpClient";
import {Loading} from "../../components/Loading";
import {Error} from "../../components/Error";

const Home = ({isLoggedIn, setIsLoggedIn}) => {

    const [isAuthenticated, setIsAuthenticated] = useState('loading')

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


    const Newspapers = [{id: '1', name: 'Times of India', price: '5'},
        {id: '2', name: 'The Indian Express', price: '5'},
        {id: '3', name: 'Bombay Times', price: '5'},
        {id: '4', name: 'New York Times', price: '10'}]

    const [cartItems, setCartItems] = useState([]);
    const [responseMsg, setResponseMsg] = useState('')

    const handleClick = (e) => {
        e.preventDefault()
        setCartItems(cartItems => [...cartItems, e.target.id])
    }

    let counts = {}

    function duplicate_items(cartItems) {

        for (let i = 0; i < cartItems.length; i++) {
            if (counts[cartItems[i]]) {
                counts[cartItems[i]] += 1
            } else {
                counts[cartItems[i]] = 1
            }
        }
    }

    duplicate_items(cartItems)

    const NewspaperList = () => {
        return (
            Newspapers.map((newspaper) =>
                <Tr key={newspaper.id} color='gray.600'>
                    <Td>{newspaper.name}</Td>
                    <Td>{newspaper.price} Rs.</Td>
                    <Td isNumeric mr='1rem'>{counts[newspaper.id] ? <>{counts[newspaper.id]}</> : '0'}</Td>
                    <Td isNumeric>
                        <Button bgColor='red.500' color='white' _hover={{bgColor: 'red.400'}}
                                id={newspaper.id} onClick={handleClick}>
                            Add to Cart
                        </Button>
                    </Td>
                </Tr>
            )
        )
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        JSON.stringify(counts)
        let payload = {orderItems: counts}
        try {
            const response = await httpClient({
                method: 'POST',
                url: `${process.env.REACT_APP_API_HOST}/user/order`,
                data: payload
            })
            console.log(response)
            if (response.status === 200) {
                counts = {}
                setCartItems([])
                setResponseMsg('Order Placed.')
            }
            if(response.status === 400) {
                setResponseMsg('Empty Cart, please fill the cart to place your order.')
            }
        } catch (err) {
            setResponseMsg('Something went wrong.')
        }
    }

    const conditionalRendering = () => {
        if (isAuthenticated === 'loading') {
            return <Loading/>
        }
        if (isAuthenticated === 'true') {
            return (<>
                <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
                <Box py={{base: '2rem', md: '3rem'}} mx={{base: '1rem', lg: '2rem'}} fontFamily='Monospace'
                     fontSize={{lg: '1rem'}}>
                    <Heading fontWeight='800' textAlign='center' fontFamily='Raleway'>Place Order</Heading>
                    <Table mt='2rem'>
                        <TableCaption fontSize='1.5rem' color='gray.600'>
                            {responseMsg ? 'Purchase Complete.' : ''}
                        </TableCaption>
                        <Thead>
                            <Tr>
                                <Th>Newspaper</Th>
                                <Th>Price</Th>
                                <Th isNumeric>Total Items</Th>
                                <Th isNumeric>Buy now!</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <NewspaperList/>
                        </Tbody>
                        <Tfoot>
                            <Tr>
                                <Th>Total Items in Cart: {cartItems.length}</Th>
                                <Th>{null}</Th>
                                <Th isNumeric>{null}</Th>
                                <Th color='white'>
                                    <Flex justifyContent='flex-end'>
                                        <Button onClick={() => {
                                            setCartItems([])
                                        }}
                                                bgColor='red.500' mr={{base: '0.5rem', md: '1rem'}}
                                                isDisabled={cartItems.length === 0}
                                        >
                                            Reset
                                        </Button>
                                        <Button type='submit' onClick={handleSubmit} bgColor='green.500'
                                                _hover={{bgColor: 'green.400'}}
                                                isDisabled={cartItems.length === 0}
                                        >
                                            Buy
                                        </Button>
                                    </Flex>
                                </Th>
                            </Tr>
                        </Tfoot>
                    </Table>
                </Box>
            </>)
        }
        if (isAuthenticated === 'false') {
            return <Error/>
        }
    }

    return (
        <>
            {conditionalRendering()}
        </>)
};

export default Home;
