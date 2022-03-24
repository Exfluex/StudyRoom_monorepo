import {
  Avatar,
  Box,
  Button,
  Input,
  Center,
  Flex,
  Heading,
  Image,
  Text,
  ButtonGroup,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import { useState } from 'react';

export function LoginPage() {
  const [isLogin, setLogin] = useState(true);
  const [form,setForm] = useState<{username?:string;email:string;password:string}>({email:"",password:""});
  const handleLogin = ()=>{
    console.log(form);
  }
  return (
    <Center py={6} h={'100%'} w={'100%'}>
      <Box
        maxW={'360px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'2xl'}
        rounded={'md'}
        overflow={'hidden'}
      >
        <Image
          h={'120px'}
          w={'full'}
          src={
            'https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
          }
          objectFit={'cover'}
        />
        <Box p={6}>
          {isLogin && (
            <>
              <Text mb={1}>邮箱</Text>
              <Input variant="outline" onInput={(ev)=>{console.log(ev.currentTarget.value);setForm(f=>({...f,email:ev.currentTarget.value}))}} placeholder="请输入邮箱..." />
              <Text mb={1}>密码</Text>
              <Input variant="outline"  placeholder="请输入密码..." />
            </>
          )}
          {!isLogin && (
            <>
              <Text mb={1}>用户名</Text>
              <Input variant="outline" placeholder="请输入用户名..." />
              <Text mb={1}>邮箱</Text>
              <Input variant="outline" placeholder="请输入邮箱..." />
              <Text mb={1}>密码</Text>
              <Input variant="outline" placeholder="请输入密码..." />
            </>
          )}
          <ButtonGroup w={'full'} mt={8} isAttached variant="outline">
            <Button
              w={'full'}
              bg={useColorModeValue('#151f21', 'gray.900')}
              color={'white'}
              rounded={'md'}
              onClick={() => setLogin((s) => true)}
            >
              Login
            </Button>

            <Button
              w={'full'}
              bg={useColorModeValue('#151f21', 'gray.900')}
              color={'white'}
              rounded={'md'}
              onClick={() => {isLogin?handleLogin():setLogin((s) => false)}}
            >
              Register
            </Button>
          </ButtonGroup>
        </Box>
      </Box>
    </Center>
  );
}
