import { Box, Text, Center, Stack, VStack, Heading, Flex } from '@chakra-ui/react';
import { RoomPlaygrond } from '../components/room/room_playground';

export function RoomPage() {
  return (
    <Box h={'full'} w={'full'}>
      <Center h={'full'} w={'full'}>
        <Box>
          <Flex justify={"start"} flexDir={"column"} minW={'600px'} minH={'800px'}>
            <Heading mt={4} as="h2" size="4xl" isTruncated>
              自习室
            </Heading>
            <Box flex={1} mt={8} h={'full'}>
              <RoomPlaygrond />
            </Box>
          </Flex>
        </Box>
      </Center>
    </Box>
  );
}
