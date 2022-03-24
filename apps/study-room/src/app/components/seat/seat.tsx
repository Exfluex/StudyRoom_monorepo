import { Box, Button, Center, Flex, HStack, Image } from '@chakra-ui/react';
import { MotionBox, MotionCenter } from 'apps/study-room/src/utils/motion';
import { useState } from 'react';
import Avatar, { AvatarStyle, Piece } from 'avataaars';
import React from 'react';
import { TableSVG } from '../table_svg';
export function Seat({ seatId }: { seatId: number }) {
  const [ifree, setFree] = useState(true);
  return (
    <MotionBox
      pos={'relative'}
      whileHover={{ scale: 1.1 }}
      boxShadow={'xl'}
      rounded={'sm'}
      w={'180px'}
      m={8}
      h={'100px'}
      bg={ifree ? '#ced4da' : 'white'}
      onClick={() => {
        setFree((c) => !c);
      }}
    >
      <DesktopLayer free={ifree}/>
      <MotionCenter
        pos={'absolute'}
        w={'full'}
        top={0}
        pointerEvents={'none'}
        h={'full'}
        zIndex={5}
      >
        {/* <HStack  pointerEvents={'all'}><Button>Hello</Button></HStack> */}
      </MotionCenter>
    </MotionBox>
  );
}

export function DesktopLayer({free}:{free:boolean}) {
  return (
    <Flex w={'full'} h={'full'} flexDir={'row'} alignItems={'flex-end'}>
      {/* <Center h={'full'} w={'50px'}>
        <Box border={'solid 1px white'} rounded={'full'} overflow={'hidden'}>
          <Box>

          </Box>
        </Box>
      </Center> */}
      <Box w={'full'} h={'full'}>
        <Box w={'150px'} h={'full'}>
          {!free &&<Box pos={'absolute'} top={0} left={0}>
            <Avatar
              style={{ height: '100px', width: '100px' }}
              avatarStyle="Transparent"
              topType="ShortHairDreads02"
              accessoriesType="Blank"
              hairColor="BrownDark"
              facialHairType="Blank"
              clotheType="BlazerShirt"
              eyeType="Happy"
              eyebrowType="Default"
              mouthType="Default"
              skinColor="DarkBrown"
            />
          </Box>}
          <Flex overflow={'hidden'} justifyContent={"flex-end"} flexDir={'column'} w={'full'} height={'full'} pos={'absolute'} top={0} left={0}><TableSVG style={{width:'130px'}} /></Flex>
        </Box>
      </Box>
    </Flex>
  );
}
