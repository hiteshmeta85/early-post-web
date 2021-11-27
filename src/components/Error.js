import {Box, Text} from "@chakra-ui/react";
import {Link} from "react-router-dom";

export const Error = () => {
    return (
        <Box textAlign='center' mt='5rem' px='0.5rem'>
            <Text fontSize='2rem'>401 - Unauthorized Access 🤨</Text>
            <Text color='blue' fontSize='1.25rem'><Link to='/user/login'><span
                style={{borderBottom: '1px solid'}}>Login</span></Link></Text>
        </Box>
    )
}
