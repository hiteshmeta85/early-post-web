import Header from './components/Header';
import {Box, Text} from "@chakra-ui/react";

const Home = () => {

    const currentDate = new Date();
    const hours = currentDate.getHours();

    let greeting;

    if (hours < 12)
        greeting = 'Good Morning';
    else if (hours >= 12 && hours <= 17)
        greeting = 'Good Afternoon';
    else if (hours >= 17 && hours <= 24)
        greeting = 'Good Evening';

    return (
        <>
            <Header/>
            <Box mx={{base: '1rem', lg: '2rem'}} py={{base: '1rem', md: '1.5rem'}} fontFamily='Raleway'>
                <Text fontSize='2rem'>{greeting} Admin!</Text>
            </Box>
        </>
    )
}
export default Home