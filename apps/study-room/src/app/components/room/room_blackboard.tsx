import { Box, Center } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

//show time/   tomato date? /
export function BlackBoard() {
  const [clock, setClock] = useState({ date:new Date()});
  useEffect(()=>{
    const timerId = setInterval(()=>{setClock({date:new Date()})},1000)
    return ()=>{
      clearInterval(timerId);
    }
  },[]);
  return (
    <Center userSelect={'none'} w={'520px'} h={'240px'} bg={'orange'} boxShadow={'2xl'}>
      <Box w={'480px'} h={'200px'} bg={'gray.900'} boxShadow={'inner'}>
        <Center w={'full'} h={'full'} color={'gray.300'} fontSize={'80px'}>
          {clock.date.toLocaleTimeString()}
        </Center>
      </Box>
    </Center>
  );
}
