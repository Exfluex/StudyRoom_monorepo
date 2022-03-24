import {
  Box,
  Divider,
  Flex,
  Heading,
  Text,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';

export function RoomCard() {
  return (
    <Box

      bg={useColorModeValue('white', 'gray.800')}
      boxShadow={'2xl'}
      rounded={'md'}
      overflow={'hidden'}
      w={'360px'}
      h={'180px'}
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
          <Heading overflow={"hidden"} textOverflow={'ellipsis'} mt={2} color={'gray.800'}>数学研习室</Heading> <Box bg={"#EE9B00"} h={'35px'} borderBottomLeftRadius={"lg"} p={1}><Text color="gray.600">Exfssssluex</Text></Box>
        </Flex>
        <Divider />
        <Flex flex={1} flexDir={'row'} h={'100%'} w={'full'}>
          <Box h={'100%'} flex={1} p={1}>
            Brief
          </Box>
          <VStack flex={1}>
            <Text>Description</Text>
            <Text>HelloWorld</Text>
          </VStack>
        </Flex>
      </Flex>
    </Box>
  );
}
