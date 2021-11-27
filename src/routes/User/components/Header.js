import {
    Button, Center,
    Flex,
    IconButton, Img, Menu,
    MenuButton,
    MenuGroup,
    MenuItem,
    MenuList,
    Text,
    useMediaQuery,
} from '@chakra-ui/react';
import {Link, Redirect} from 'react-router-dom';
import {HamburgerIcon} from '@chakra-ui/icons';
import httpClient from "../../../utilities/httpClient";
import logo from "../../Common/assets/logo.png";

const Header = ({isLoggedIn, setIsLoggedIn}) => {
    const [isLargerThan540] = useMediaQuery('(min-width: 540px)');

    const logout = async () => {
        try {
            let result = await httpClient({
                method: 'DELETE',
                url: `${process.env.REACT_APP_API_HOST}/user/session`,
            });
            if (result) {
                setIsLoggedIn(false)
                return true;
            }
        } catch (err) {
            return false;
        }
    };

    return (
        <>
            {isLoggedIn ? true : <Redirect to='/'/>}
            <Flex fontFamily='Avenir Next' fontWeight='500' bgColor='white'
                  position='sticky' top='0' justifyContent='space-between'
                  boxShadow='0px 6px 4px -7px rgba(0,0,0,.5)' zIndex='1'
                  py='0.5rem' px={{base: '1rem', md: '2rem'}}
                  alignItems='center'>
                <Link to='/user/home'>
                    <Center>
                        <Text fontSize='1.25rem' pos='relative' top='4px'>Early Post</Text>
                        <Img src={logo} alt="" w='50px' h='50px' ms='1rem'/>
                    </Center>
                </Link>
                {isLargerThan540 ?
                        <Flex alignItems='center'>
                            <Text mr='1.5rem'><Link to='/user/home'>Home</Link></Text>
                            <Text mr='1.5rem'><Link to='/user/orders'>Order History</Link></Text>
                            <Text mr='1.5rem'><Link to='/user/query'>Query</Link></Text>
                            <Text mr='1.5rem'><Link to='/user/account'>Account</Link></Text>
                            <Button onClick={logout} mr={{md: '1rem', lg: '1.5rem'}} bgColor='red.500' color='white'
                                    _hover={{bgColor: 'red.400'}}>
                                Logout
                            </Button>
                        </Flex>
                        :
                        <Menu>
                            <MenuButton bgColor='white' as={IconButton}
                                        aria-label='Options'
                                        icon={<HamburgerIcon/>}>
                            </MenuButton>
                            <MenuList>
                                <MenuGroup>
                                    <Link to='/user/home'><MenuItem>Home</MenuItem></Link>
                                    <Link to='/user/orders'><MenuItem>Order History</MenuItem></Link>
                                    <Link to='/user/query'><MenuItem>Query</MenuItem></Link>
                                    <Link to='/user/account'><MenuItem>Account</MenuItem></Link>
                                    <MenuItem onClick={logout}>Logout</MenuItem>
                                </MenuGroup>
                            </MenuList>
                        </Menu>
                }
            </Flex>
        </>
    );
};

export default Header;
