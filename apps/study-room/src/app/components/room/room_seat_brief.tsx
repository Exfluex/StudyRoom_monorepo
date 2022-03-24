import { Box, Flex } from '@chakra-ui/react';
import { MotionBox } from 'apps/study-room/src/utils/motion';
import { useState } from 'react';

interface MiniSetProps {
  free: boolean;
}
function MiniSeat({ free = false }: MiniSetProps) {
  const [ifree, setFree] = useState(true);
  return (
    <MotionBox
      whileHover={{ scale: 1.1}}
      whileTap={{ scale: 0.9 }}
      onClick={() => setFree((c) => !c)}
      rounded={'md'}
      pb={1}
      h={'18px'}
      w={'30px'}
      bg={ifree ? '#e5e5e5' : '#94D2BD'}
    ></MotionBox>
  );
}
export function RoomSeatsBrief() {
  return (
    <Box h={'full'} w={'full'}>
      <Flex h={'full'} w={'full'} flexDir={'row'}>
        {[10, 20, 30, 40].map((cascade) => {
          return (
            <Flex
              ml={2}
              h={'full'}
              key={cascade}
              justifyContent={'space-around'}
              flexDir={'column'}
            >
              {[1, 2, 3, 4, 5].map((id) => {
                return <MiniSeat key={cascade + id} free={true} />;
              })}
            </Flex>
          );
        })}
      </Flex>
    </Box>
  );
}
