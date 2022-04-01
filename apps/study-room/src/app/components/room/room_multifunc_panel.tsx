import { Box, Center, Flex } from '@chakra-ui/react';
import { MotionBox, MotionCenter } from 'apps/study-room/src/app/utils/motion';
import { ReactComponentElement, ReactElement, ReactNode, useState } from 'react';
import { BsFillCalendarDateFill } from 'react-icons/bs';
import {FiMoreHorizontal} from 'react-icons/fi'
import { EventPlugin } from './room_panel_plugins/event_plugin';



export interface RoomFeaturePlugin{
  plugin:()=>ReactElement;
  name:string;
  color:string;
}
const plugins:RoomFeaturePlugin[]=[{plugin:EventPlugin,name:"EventPlugin",color:'#3C9074'}];
export function RoomMultiFunctionPanel() {
  const [plugin,setPlugin]=useState(plugins[0].name);
  return (
    <Flex top={0}  w={'full'} h={'full'} >
      <Box w={'full'} h={'full'}>
        <PluginManager plugin={plugin}/>
      </Box>
      <Box
        bg={'#0A9396'}
        w={'40px'}
        h={'full'}
        display={'flex'}
        flexDir={'column'}
        justifyContent={'flex-start'}
        alignItems={'center'}
        overflow={'hidden'}
      >
        {
          plugins.map(item=>{
            return <PluginButton color={item.color}/>;
          })
        }
        <MotionCenter flex={1} h={'auto'} w={'full'} bg={'#92A5D1'}>
          <FiMoreHorizontal/>
        </MotionCenter>
      </Box>
    </Flex>
  );
}

function PluginButton({color}:{color:string}) {
  return (
    <MotionCenter
      h={'25px'}
      w={'full'}

      whileHover={{ backgroundColor: 'black' }}
      bg={color}
    >
      <BsFillCalendarDateFill />
    </MotionCenter>
  );
}
//Badge
//Mainuser
//TimeCount
//Activity
//
function PluginManager({plugin}:{plugin:string}) {
  const pluginMeta = plugins.find(item=>item.name===plugin);
  return pluginMeta?<pluginMeta.plugin/>:<Box>Nope</Box>;
}
