import { Box, Flex } from '@chakra-ui/react';
import { RoomCard } from './room_card';

export function RoomPlaygrond() {
  return (
    <Flex flexDir={'row'} w={'full'} h={'full'}>
      <Flex flexDir={'column'}><RoomCard /></Flex>
    </Flex>
  );
}
