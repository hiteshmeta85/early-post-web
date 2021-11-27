import {Box, Button, Flex, Heading,Img, Stack, Text} from '@chakra-ui/react';
import Header from './components/Header';
import {Link, Redirect} from "react-router-dom";
import deliveryBoy from './assets/delivery-man.png';
import earth from './assets/earth.png';
import tag from './assets/tag.png';
import logo from './assets/logo.png';

const LandingPage = (props) => {
    return (
        <Box>
            {props.isLoggedIn ? <Redirect to='/user/home'/> : false}
            <Header/>
            <Box mx={{base: '1rem', md: '2rem'}} fontFamily='Raleway'>
                <Flex flexDirection={{base: 'column', md: 'row'}}>
                    <Box my='auto' py='1rem'>
                        <Heading fontWeight='500' fontSize='4rem' mb='0.5rem' color='red.500'>Early Post</Heading>
                        <Heading fontWeight='500' fontSize='2rem' mb='0.5rem' color='gray.700'>Newspaper Delivery
                            Services</Heading>
                        <Text fontSize='1.25rem' mb='0.75rem' textAlign='justify'>
                            Early Post is India’s best online newspaper delivery app. Choose from variety of newspapers,
                            enjoy a hassle-free, convenient, easy experience.
                            Early Post provides - reasonable pricing, easy subscription, 5 - 9:30
                            am delivery, free delivery at MRP makes for a budget-friendly, delightful experience.</Text>
                        <Link to='/signup' fontSize='1.25rem'>
                            <Button _hover={{bgColor: 'red.400'}} bgColor='red.500' color='white'>Get Started</Button>
                        </Link>
                    </Box>
                    <Img src={logo} alt='logo' maxWidth='400px' m={{base: '1rem', lg: '3.5rem'}}/>
                </Flex>

                <Box textAlign='center' my='3rem' fontSize='1.25rem'>
                    <Heading fontWeight='300' fontSize='3rem'>What do we sell?</Heading>
                    <Text mb='2.5rem'>
                        We sell nation wide demanded newspapers with door to door delivery service.
                    </Text>
                    <Stack spacing='1rem' direction={["column","column", "row"]}>
                        <Box p='1rem' borderRadius='0.5rem' bgColor='#fff3f3'
                             _hover={{transition: '0.25s', boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'}}>
                            <Text fontSize='2rem'>The Indian Express</Text>
                            <Text p='1rem'>A 75 year old multi-edition paper, influencing thought and policy across the
                                country. Read by those who have their own unique point of view of looking things.</Text>
                        </Box>
                        <Box p='1rem' borderRadius='0.5rem'
                             _hover={{transition: '0.35s', boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'}}
                             bgColor='#fff3f3'>
                            <Text fontSize='2rem'>Times Of India</Text>
                            <Text p='1rem'>Oldest English-language newspaper of India and the second oldest Indian still
                                in curriculum. Times of India was rated as one of the most trusted English
                                newspaper.</Text>
                        </Box>
                        <Box p='1rem' borderRadius='0.5rem'
                             _hover={{transition: '0.25s', boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'}}
                             bgColor='#fff3f3'>
                            <Text fontSize='2rem'>New York Times</Text>
                            <Text p='1rem'>The New York Times, morning daily newspaper published in New York City, long
                                the newspaper of record in the United States and one of the world's great
                                newspapers.
                            </Text>
                        </Box>
                    </Stack>
                </Box>

                <Box textAlign='center' my='3rem' bg='#FEF5F5' py='3rem' fontSize='1.25rem' borderRadius='0.5rem'>
                    <Heading fontWeight='300' fontSize='3rem'>Our working.</Heading>
                    <Text mb='2.5rem' maxW={{lg: '50%'}} mx='auto'>
                        It facilitates the timely production of newspapers through effective management of team members
                        and work schedules.
                    </Text>
                    <Flex flexDirection={{base: 'column', lg: 'row'}} justifyContent={{lg: 'space-around'}}>
                        <Box p='1rem' m='1rem'>
                            <Img src={deliveryBoy} mx='auto' alt="" maxW='15rem' backgroundSize='cover'/>
                            <Text mt='1rem'>Express Delivery</Text>
                        </Box>
                        <Box p='1rem' m='1rem'>
                            <Img src={earth} alt="" mx='auto' maxW='15rem' backgroundSize='cover'/>
                            <Text mt='1rem'>Distant Availability</Text>
                        </Box>
                        <Box p='1rem' m='1rem'>
                            <Img src={tag} alt="" mx='auto' maxW='15rem' backgroundSize='cover'/>
                            <Text mt='1rem'>Reasonable Price</Text>
                        </Box>
                    </Flex>
                </Box>

                <Box textAlign='center' my='6rem'>
                    <Heading fontWeight='300' fontSize='3rem'>We're here to help.</Heading>
                    <Text mb='1rem' fontSize='2rem' color='blue.500'>Contact Us</Text>
                    <Box mb='1rem' maxW={{lg: '70%'}} mx='auto' fontSize='1.25rem'>
                        <Text>
                            If you have any questions or are experiencing any difficulties, then we are here to help.
                            We can be contacted by telephone, email or via our online chat portal. You can write us your
                            queries, and we'll respond to them as soon as possible.
                        </Text>
                        <Text>Feel free to contact us. Early post has one of the best customer services.</Text>
                    </Box>
                </Box>
            </Box>


            <Box textAlign='center' mt='3rem' py='2rem'  bg='#FEF5F5' fontFamily='Raleway'>
                <Heading fontWeight='300' fontSize='3rem'>About.</Heading>
                <Box maxW={{lg: '70%'}} mx='auto' my='1rem' px='1rem' fontSize='1.25rem'>
                    <Text>
                        We believe in the power of technology to reduce the complexity of our jobs.
                    </Text>
                    <Text>
                        At Early Post we hire experienced employees who will let the system work smoothly.
                    </Text>
                    <Text mt='1rem' fontWeight='bold'>Created by:</Text>
                    <Text fontWeight='bold' mt='0.25rem'>@Hitesh Meta @Aaryan Anil @Anshita Viralkar @Sanskruti
                        Salve</Text>
                </Box>
            </Box>
        </Box>
    );
};

export default LandingPage;