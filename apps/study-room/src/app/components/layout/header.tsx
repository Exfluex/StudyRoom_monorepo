import { Box, Flex, VStack } from '@chakra-ui/react';
import { MotionBox, MotionCenter } from 'apps/study-room/src/app/utils/motion';
import Avatar from 'avataaars';
import { BubbleButton, BubbleMenu, useBubbleMenu } from '../bubble_menu';
import {GrConfigure} from 'react-icons/gr'
import {FaUserFriends} from 'react-icons/fa'
import { AiOutlineAppstoreAdd,AiOutlineLogout} from 'react-icons/ai'

export function Header() {
  return (
    <Box pos={'fixed'} h={'200px'} w={'full'}>
      <Box pointerEvents={'none'} pos={'fixed'} w={'full'} h={'full'}>
        <VStack w={'full'} h={'full'}>
          <Flex
            mt={2}
            mx={4}
            w={'full'}
            h={'full'}
            justifyContent={'flex-end'}
          >
            <AvatarMenu/>
          </Flex>
        </VStack>
      </Box>
    </Box>
  );
}

export function AvatarButton(){
  const [isOpen,onOpen,onClose,onToggle] = useBubbleMenu();
  return<MotionCenter
  pointerEvents={'all'}
  whileTap={{ scale: 1 }}
  whileHover={{ scale: 1.1 }}
  justifySelf={'flex-end'}
  mx={'auto'}
  h={'100px'}
  w={'100px'}
  onClick={()=>{onToggle()}}
>
  <Avatar
    style={{ height: '100px', width: '100px' }}
    avatarStyle="Circle"
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
</MotionCenter>
}

export function AvatarMenu() {

  return (
    <BubbleMenu head={<AvatarButton/>} >
      <BubbleButton onClick={()=>{console.log('HelloWorld!')}} order={0} name={'Configuration'} icon={<GrConfigure color='white'/>}/>
      <BubbleButton order={1} name={'Firends'} icon={<FaUserFriends color='white'/>}/>
      <BubbleButton order={2} name={'PluginStore'} icon={<AiOutlineAppstoreAdd color='white'/>}/>
      <BubbleButton order={3} onClick={(ev)=>{console.log('Logout')}} name={'Logout'} icon={<AiOutlineLogout color='white'/>}/>
      <BubbleButton order={4} name={'PluginStore'} icon={<AiOutlineAppstoreAdd color='white'/>}/>
      <BubbleButton order={5} name={'PluginStore'} icon={<AiOutlineAppstoreAdd color='white'/>}/>
      <BubbleButton order={6} name={'PluginStore'} icon={<AiOutlineAppstoreAdd color='white'/>}/>
      <BubbleButton order={7} name={'PluginStore'} icon={<AiOutlineAppstoreAdd color='white'/>}/>
      <BubbleButton order={8} name={'PluginStore'} icon={<AiOutlineAppstoreAdd color='white'/>}/>
      <BubbleButton order={9} name={'PluginStore'} icon={<AiOutlineAppstoreAdd color='white'/>}/>

    </BubbleMenu>
  );
}
