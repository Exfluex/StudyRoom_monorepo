import {
  Box,
  Center,
  Divider,
  Flex,
  Heading,
  HStack,
  VStack,
} from '@chakra-ui/react';
import { MotionBox } from 'apps/study-room/src/utils/motion';

export function EventPlugin() {
  return (
    <Box pt={1} h={'full'}>
      <Flex h={'full'} flexDir={'column'} justifyContent={'flex-start'}>
        <Center>
          <Heading size={'md'}>数学测验!</Heading>
        </Center>
        <Box px={1} maxW={'160px'} h={'60px'} fontSize={"sm"} whiteSpace={'pre-wrap'} overflow={"hidden"} textOverflow={'ellipsis'}>
          3月27日上午8点~11将进行自习室数学模拟测验。
        </Box>
        <Box px={2} pt={1}>
          <DateSlider />
        </Box>
      </Flex>
    </Box>
  );
}

function DateSlider() {
  return (
    <>
      <Box >

        <HStack>
          {[24, 25, 26, 27, 28].map((date) => {
            return <Block key={date} val={`${date}`} color={date===28?"#005F73":'#94D2BD'}/>;
          })}
        </HStack>
      </Box>
    </>
  );
}
function Block({ val,color='#94D2BD' }: { val: string,color?:string }) {
  return (
    <MotionBox
      rounded={'full'}
      bg={color}
      whileHover={{ backgroundColor: '#44A282' }}
      h={'full'}
      w={'20px'}
      fontSize={'sm'}
      color={'gray.600'}
      userSelect={'none'}
      textAlign={'center'}
    >
      {val}
    </MotionBox>
  );
}
