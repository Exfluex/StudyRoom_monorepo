import { Box, Center, Flex } from '@chakra-ui/react';
import { ReactChild } from 'react';
import { AiFillPlusCircle } from 'react-icons/ai';
import { MotionCenter } from '../../utils/motion';
import { RoomCard } from './room_card';

export function RoomPlaygrond() {
  return (
    <Flex flexDir={'row'} w={'full'} h={'full'}>
      <Flex flexDir={'column'}>
        <RoomPlaygrondContentWrapper>
          <RoomCard />
        </RoomPlaygrondContentWrapper>
      </Flex>
      <RoomPlaygrondContentWrapper>
        <MotionCenter w={'full'} whileHover={{scale:1.05}} whileTap={{scale:1.0}} h={"full"} bg={'gray'} rounded={"md"} boxShadow={"xl"}><AiFillPlusCircle size={"32px"} /></MotionCenter>
      </RoomPlaygrondContentWrapper>
    </Flex>
  );
}
function RoomPlaygrondContentWrapper({ children }: { children: ReactChild }) {
  return <Box w={'360px'} h={'220px'} mx={'1.5'}>
    {children}
  </Box>
}
