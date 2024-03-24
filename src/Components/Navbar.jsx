import React from 'react';
import { Link as RouterLink } from 'react-router-dom'; // Import Link component from react-router-dom
import { navLinks } from '../Navlinks/Navlinks';
import { Box, Flex, InputGroup, InputLeftAddon, Input, Text, Button } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  return (
    <Flex boxShadow={'xl'} minW={{md:780, base:200, lg: 1000, xl:1280, "2xl":1400}}  h='90px' mx={'auto'} gap={{md:2, base:1}} alignItems={'center'} justifyContent={'space-around'}  >
      <Box className='logo'>
        <RouterLink to='/' style={{ textDecoration: 'none' }}>
          <Text as='h2' fontWeight={800} fontSize={{md:30, base:20}}>Wood<span style={{color:"red", fontWeight:800}}>Zone</span></Text>
        </RouterLink>
      </Box>
      <Box borderRadius={10}>
        <InputGroup>
          <InputLeftAddon  border="1px solid #D0CCCC">
            <FaSearch  />
          </InputLeftAddon>
          <Input type='text' width={{md:"220px",base:"150px", lg:"350px"}} placeholder='Search Product' border="1px solid #D0CCCC" _hover={{borderColor:"#D0CCCC"}} />
        </InputGroup>
      </Box>
      <Flex display={{base:"none", md:'flex'}} gap={{md:5,base:1}} justifyContent={'space-around'} alignItems={'center'} fontWeight={600}>
        {navLinks.map((link,i) => (
          <RouterLink key={i} to={link.href}>{link.title}</RouterLink>
        ))}
      </Flex>
      <Box display={{lg:'none',md:'none',base:"block"}}>
        <Menu>
          <Flex> 
            <MenuButton as={Button} fontSize={20} rightIcon={<GiHamburgerMenu />} /> 
          </Flex>
          <MenuList>
            {navLinks.map((link,i) => (
              <MenuItem _hover={{bg:"gray.100"}} key={i} as={RouterLink} to={link.href}>{link.title}</MenuItem>
            ))}
          </MenuList>
        </Menu>
      </Box>
    </Flex>
  );
}

export default Navbar;
