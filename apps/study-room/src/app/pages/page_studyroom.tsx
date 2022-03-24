import { Box, Flex, VStack } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { BlackBoard } from '../components/room/room_blackboard';
import { Seat } from '../components/seat/seat';

export function StudyRoomPage() {
  let params = useParams<{ roomId: string }>();
  //fetch Data Here use Redux Buffer?

  return (
    <Flex h={'full'} flexDir={'column'} bg={'#94D2BD'}>
      <VStack>
        <Box mt={5}>
          <BlackBoard />
        </Box>
      </VStack>
      <VStack mt={'40px'} w={'full'} h={'full'} bg={'#E9D8A6'}>
      <Box w={'80%'} h={'90%'}>
        <Flex w={'auto'} flexWrap={'wrap'} justifyContent={'space-between'}>{Array.from({length:20}).map((v,i)=>{return <Seat seatId={i} key={i}/>})}</Flex>
      </Box>
      </VStack>
    </Flex>
  );
}

