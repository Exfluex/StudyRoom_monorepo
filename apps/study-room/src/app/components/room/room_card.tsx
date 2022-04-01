import {
  Box,
  Divider,
  Flex,
  Heading,
  Text,
  VStack,
  useColorModeValue,
  Button,
} from '@chakra-ui/react';
import { MotionBox } from 'apps/study-room/src/app/utils/motion';
import { useNavigate } from 'react-router-dom';
import { RoomMultiFunctionPanel } from './room_multifunc_panel';
import { RoomSeatsBrief } from './room_seat_brief';

export function RoomCard() {
  const navigate = useNavigate();
  const handleClickEnter =()=>{
    navigate(`/room/${0}`);
  }
  return (
    <MotionBox
      bg={useColorModeValue('white', 'gray.800')}
      boxShadow={'2xl'}
      rounded={'md'}
      overflow={'hidden'}
      userSelect={'none'}
      w={'360px'}
      h={'220px'}
    >
      <Flex  flexDir={'column'} h={'full'} w={'full'}>
        <Flex
          bg={"#0A9396"}
          pl={4}
          pb={1}
          h={'60px'}
          w={'full'}
          justifyContent={'space-between'}
          flexDir={'row'}
        >
          <Heading overflow={"hidden"} textOverflow={'ellipsis'} mt={2} color={'gray.800'}>数学研习室</Heading> <Box bg={"#EE9B00"} h={'35px'}  borderBottomLeftRadius={"lg"} p={1}><Text color="gray.600">Exfssssluex</Text></Box>
        </Flex>
        <Flex flex={1} flexDir={'row'} h={'100%'} w={'full'}>
          <Box h={'100%'} flex={1} p={1} pr={2}>
            <RoomSeatsBrief />
          </Box>
          <Divider orientation='vertical' />
          <RoomMultiFunctionPanel/>
        </Flex>
        <Flex bg={"#0A9396"} flexDir={'row'} h={'35px'} w={'full'}><Button onClick={()=>{handleClickEnter();}} alignSelf={'flex-end'} justifySelf={'flex-end'} h={'full'} rounded={'none'}>加入学习</Button></Flex>
      </Flex>
    </MotionBox>
  );
}
