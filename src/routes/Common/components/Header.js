import {
    Button,
    Center,
    IconButton,
    Img,
    Menu,
    MenuButton,
    MenuGroup,
    MenuItem,
    MenuList,
    Text,
    useMediaQuery,
} from '@chakra-ui/react';
import {HamburgerIcon} from '@chakra-ui/icons';
import {Link} from 'react-router-dom';
import logo from "../assets/logo.png";

const Header = () => {
    const [isLargerThan540] = useMediaQuery('(min-width: 540px)');

    return (
        <Center fontFamily='Avenir Next' fontWeight='500' bgColor='white' mx='auto'
                boxShadow='0px 6px 4px -7px rgba(0,0,0,.5)' position='sticky' top={0}
                justifyContent='space-between' py='0.5rem'
                px={{base: '1rem', md: '2rem'}} mb={{base:'1rem',md:'3rem'}} zIndex='1'>
                <Link to='/'>
                    <Center>
                        <Text fontSize='1.25rem' pos='relative' top='4px'>Early Post</Text>
                        <Img src={logo} alt="" w='50px' h='50px' ms='1rem'/>
                    </Center>
                </Link>
            {
                isLargerThan540 ?

                    <Center>
                        <Text mr={{md: '1rem', lg: '1.5rem'}}>
                            <Link to='/admin/login'>Admin</Link>
                        </Text>
                        <Text mr={{md: '1rem', lg: '1.5rem'}}>
                            <Link to='/user/login'>Login</Link>
                        </Text>
                        <Link to='/user/signup'>
                            <Button bgColor='red.500' color='white' _hover={{bgColor: 'red.400'}}>
                                Sign Up
                            </Button>
                        </Link>
                    </Center>

                    :

                    <Menu>
                        <MenuButton bgColor='white' as={IconButton} aria-label='Options' icon={<HamburgerIcon/>}/>
                        <MenuList>
                            <MenuGroup>
                                <Link to='/'><MenuItem>Home</MenuItem></Link>
                                <Link to='/admin/login'><MenuItem>Admin</MenuItem></Link>
                                <Link to='/user/login'><MenuItem>Login</MenuItem></Link>
                                <Link to='/user/signup'><MenuItem>Sign Up</MenuItem></Link>
                            </MenuGroup>
                        </MenuList>
                    </Menu>
            }
        </Center>
    );
};

export default Header;
