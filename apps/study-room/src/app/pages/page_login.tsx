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
  Tooltip,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import {
  useNavigate,
} from "react-router-dom";
import { useEffect, useState } from 'react';
import { Login_API, Register_API } from '../apis/api_entry';
const validations: {
  [property: string]: {
    errors: { [type: string]: string; default: string };
    regex: RegExp;
    hint?: string;
    scope: string[];
  };
} = {
  password: {
    scope: ['register'],
    regex: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
    errors: { default: '请输入正确格式的密码' },
    hint: '密码需至少包含大写字母、小写字母、数字、特殊字符（@$%等）最小长度为8',
  },
  comfirmPassword: {
    scope: ['register'],
    regex: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
    errors: { default: '请输入正确格式的密码', not_match: '与密码不匹配' },
    hint: '密码需至少包含大写字母、小写字母、数字、特殊字符（@$%等）最小长度为8',
  },
  email: {
    scope: ['register', 'login'],
    regex: /^.+@.+$/,
    errors: { default: '请输入正确格式的邮箱' },
  },
  username: {
    scope: ['register'],
    regex: /^[\w\d]{4,}$/,
    errors: { default: '请输入正确格式的用户名' },
    hint: '用户名最短4个字符',
  },
};
export function LoginPage() {
  const [scope, setScope] = useState('login');
  const [form, setForm] = useState<{
    username: string;
    email: string;
    password: string;
    comfirmPassword: string;
  }>({ email: '', password: '', comfirmPassword: '', username: '' });
  const [formValidation, setFormValidation] = useState<{
    username: string;
    email: string;
    password: string;
    comfirmPassword: string;
  }>({ email: '', password: '', comfirmPassword: '', username: '' });
  const [isShowPass, setShowPass] = useState(false);
  const formValidationFn = () => {
    let validation = {
      email: '',
      password: '',
      comfirmPassword: '',
      username: '',
      valid: true,
    };
    for (const key in validations) {
      if (
        Object.prototype.hasOwnProperty.call(validations, key) &&
        validations[key].scope.includes(scope)
      ) {
        const element = validations[key];
        //@ts-ignore
        if (!element.regex.test(form[key])) {
          //@ts-ignore
          validation[key] = element.errors.default;
          validation.valid=false;
        } else {
          //@ts-ignore
          validation[key] = '';
        }
      }
    }
    if (validations['comfirmPassword'].scope.includes(scope) && form.password != '' && form.comfirmPassword != form.password) {
      validation['comfirmPassword'] =
        validations['comfirmPassword'].errors['not_match'];
    }
    return validation;
  };
  useEffect(() => {
    setFormValidation(formValidationFn());
  }, [form, scope]);
  const navigate =useNavigate();
  const handleLogin = () => {
    const res = formValidationFn();
    if(res.valid){
      Login_API({email:form.email,password:form.password}).then(data=>{
        // console.log(data);
        navigate("/lobby")
      }).catch(data=>{
        console.log(data);
      });
    }
  };
  const handleRegister = () => {
    const res = formValidationFn();
    if(res.valid){
      Register_API(res).then(data=>{
        console.log(data);
      }).catch(data=>{
        console.log(data);
      });
    }
  };
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
          {scope === 'login' && (
            <>
              <Text mb={1}>邮箱</Text>
              <Tooltip
                hasArrow
                isOpen={formValidation.email != ''}
                placement="right-start"
                label={formValidation.email}
                bg="red.600"
              >
                <Input
                  isInvalid={formValidation.email != ''}
                  variant="outline"
                  defaultValue={form.email}
                  type={'email'}
                  onChange={(ev) => {
                    setForm((f) => ({ ...f, email: ev.target.value }));
                  }}
                  placeholder="请输入邮箱..."
                />
              </Tooltip>
              <Text mb={1}>密码</Text>
              <Tooltip
                hasArrow
                isOpen={formValidation.password != ''}
                placement="right-start"
                label={formValidation.password}
                bg="red.600"
              >
                <Input
                  isInvalid={formValidation.password != ''}
                  variant="outline"
                  defaultValue={form.password}
                  type={isShowPass ? 'text' : 'password'}
                  onChange={(ev) => {
                    setForm((f) => ({ ...f, password: ev.target.value }));
                  }}
                  placeholder="请输入密码..."
                />
              </Tooltip>
            </>
          )}
          {scope === 'register' && (
            <>
              <Text mb={1}>用户名</Text>
              <Tooltip
                hasArrow
                isOpen={formValidation.username != ''}
                placement="right-start"
                label={formValidation.username}
                bg="red.600"
              >
                <Input
                  isInvalid={formValidation.username != ''}
                  variant="outline"
                  defaultValue={form.username}
                  onChange={(ev) => {
                    setForm((f) => ({ ...f, username: ev.target.value }));
                  }}
                  placeholder="请输入用户名..."
                />
              </Tooltip>
              <Text mb={1}>邮箱</Text>
              <Tooltip
                hasArrow
                isOpen={formValidation.email != ''}
                placement="right-start"
                label={formValidation.email}
                bg="red.600"
              >
                <Input
                  isInvalid={formValidation.email != ''}
                  variant="outline"
                  defaultValue={form.email}
                  type={'email'}
                  onChange={(ev) => {
                    setForm((f) => ({ ...f, email: ev.target.value }));
                  }}
                  placeholder="请输入邮箱..."
                />
              </Tooltip>
              <Text mb={1}>密码</Text>
              <Tooltip
                hasArrow
                isOpen={formValidation.password != ''}
                placement="right-start"
                label={formValidation.password}
                bg="red.600"
              >
                <InputGroup size="md">
                  <Input
                    pr="4.5rem"
                    isInvalid={formValidation.password != ''}
                    variant="outline"
                    defaultValue={form.password}
                    type={isShowPass ? 'text' : 'password'}
                    onChange={(ev) => {
                      setForm((f) => ({ ...f, password: ev.target.value }));
                    }}
                    placeholder="请输入密码..."
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      h="1.75rem"
                      size="sm"
                      onMouseDown={() => setShowPass((c) => true)}
                      onMouseOut={() => setShowPass((c) => false)}
                      onMouseUp={() => setShowPass((c) => false)}
                    >
                      {isShowPass ? '隐藏' : '显示'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </Tooltip>
              <Text mb={1}>确认密码</Text>
              <Tooltip
                hasArrow
                isOpen={formValidation.comfirmPassword != ''}
                placement="right-start"
                label={formValidation.comfirmPassword}
                bg="red.600"
              >
                <Input
                  isInvalid={formValidation.comfirmPassword != ''}
                  variant="outline"
                  type={isShowPass ? 'text' : 'password'}
                  onChange={(ev) => {
                    setForm((f) => ({
                      ...f,
                      comfirmPassword: ev.target.value,
                    }));
                  }}
                  placeholder="请输入密码..."
                />
              </Tooltip>
            </>
          )}
          <ButtonGroup w={'full'} mt={8} isAttached variant="outline">
            <Button
              w={'full'}
              bg={useColorModeValue('#151f21', 'gray.900')}
              color={'white'}
              rounded={'md'}
              onClick={() => {
                scope === 'login' ? handleLogin() : setScope('login');
              }}
            >
              登录
            </Button>

            <Button
              w={'full'}
              bg={useColorModeValue('#151f21', 'gray.900')}
              color={'white'}
              rounded={'md'}
              onClick={() => {
                scope === 'register' ? handleRegister() : setScope('register');
              }}
            >
              注册
            </Button>
          </ButtonGroup>
        </Box>
      </Box>
    </Center>
  );
}
