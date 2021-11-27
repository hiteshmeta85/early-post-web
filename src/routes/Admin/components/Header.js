import {
    Button, Center, Flex,
    IconButton, Img, Menu,
    MenuButton,
    MenuGroup,
    MenuItem,
    MenuList,
    Text,
    useMediaQuery,
} from '@chakra-ui/react';
import {Link} from 'react-router-dom';
import {HamburgerIcon} from '@chakra-ui/icons';
import logo from "../../Common/assets/logo.png";

const Header = () => {
    const [isLargerThan540] = useMediaQuery('(min-width: 540px)');

    return (
        <>
            <Flex fontFamily='Avenir Next' fontWeight='500'
                  boxShadow='0px 6px 4px -7px rgba(0,0,0,.5)' position='sticky' top='0'
                  justifyContent='space-between' py='0.5rem' zIndex='1'
                  px={{base: '1rem', md: '2rem'}} alignItems='center'>
                <Link to='/admin/home'>
                    <Center>
                        <Text fontSize='1.25rem' pos='relative' top='4px'>Early Post</Text>
                        <Img src={logo} alt="" w='50px' h='50px' ms='1rem'/>
                    </Center>
                </Link>
                {isLargerThan540 ?
                    <Flex alignItems='center'>
                        <Text mr='1rem'><Link to='/admin/home'>Home</Link></Text>
                        <Text mr='1rem'><Link to='/admin/all-orders'>All orders</Link></Text>
                        <Text mr='1rem'><Link to='/admin/pending-orders'>Pending orders</Link></Text>
                        <Text mr='1rem'><Link to='/admin/queries'>Queries</Link></Text>
                        <Link to='/'>
                            <Button bgColor='red.500' color='white'
                                    _hover={{bgColor: 'red.400'}}>
                                Logout
                            </Button>
                        </Link>
                    </Flex> :
                    <Menu>
                        <MenuButton bgColor='white' as={IconButton}
                                    aria-label='Options'
                                    icon={<HamburgerIcon/>} />
                        <MenuList>
                            <MenuGroup>
                                <MenuItem><Link to='/admin/home'>Home</Link></MenuItem>
                                <MenuItem><Link to='/admin/all-orders'>All orders</Link></MenuItem>
                                <MenuItem><Link to='/admin/pending-orders'>Pending orders</Link></MenuItem>
                                <MenuItem><Link to='/admin/queries'>Queries</Link></MenuItem>
                                <MenuItem><Link to='/'>Logout</Link></MenuItem>
                            </MenuGroup>
                        </MenuList>
                    </Menu>
                }
            </Flex>
        </>
    );
};

export default Header;
