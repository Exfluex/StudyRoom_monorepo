import { Box, BoxProps, Flex, Tooltip } from '@chakra-ui/react';
import { checkPrimeSync } from 'crypto';
import { Variants } from 'framer-motion';
import { createContext, ReactChild, ReactChildren, ReactElement, ReactNode, useContext } from 'react';
import { MotionBox, MotionBoxProps, MotionCenter } from '../utils/motion';
import { useToggle } from '../hooks/useToggle';

export interface BubbleContext {
  isOpen: boolean;
  onOpen: () => void;
  onToggle: () => void;
  onClose: () => void;
  stepLength:number;
}
const BubbleMenuContext = createContext(undefined as unknown as BubbleContext);
const useBubbleContext = ()=>{ return useContext(BubbleMenuContext);}
export function useBubbleMenu() {
  const bubbleCtx = useBubbleContext();
  return [
    bubbleCtx.isOpen,
    bubbleCtx.onOpen,
    bubbleCtx.onClose,
    bubbleCtx.onToggle,
  ] as const;
}

export interface BubbleButtonProps extends MotionBoxProps {
  name: string;
  icon: ReactNode;
  color?:string;
  order:number;
}
const bubbleVariant:Variants  = {
  hidden:{
    opacity:0,
    top:0,
    rotate:0,
    transition: {
      duration:1
    },
  },
  show:({order,step}:{order:number,step:number})=>({
    opacity:1,
    top:(order*step),
    rotate:360,
    transition: {
      delay:order*0.1
    },
  })
}
export function BubbleButton({ name, icon,order,color="#005F73",...props}: BubbleButtonProps) {
  const bubbleCtx = useBubbleContext();

  return (
    <Tooltip placement={'left-start'} label={name}>
      <MotionBox {...props} animate={bubbleCtx.isOpen?"show":"hidden"} custom={{order,step:bubbleCtx.stepLength}} variants={bubbleVariant} p={2} rounded={'full'} bg={color} pointerEvents={'all'} top={0} pos={'absolute'} whileHover={{ scale: 1.1 }} whileTap={{ scale: 1 }}>
        {icon}
      </MotionBox>
    </Tooltip>
  );
}
export interface BubbleMenuProps extends BoxProps {
  head: ReactNode;
  children: ReactElement<Omit<BubbleButtonProps,"id">,typeof BubbleButton>[];
}
export function BubbleMenu({  head,children ,...props}: BubbleMenuProps) {
  const {isOpen,onOpen,onClose,onToggle} = useToggle();
  return (
    <BubbleMenuContext.Provider value={{isOpen,onOpen,onClose,onToggle,stepLength:40}}>
      <Flex {...props} flexDir={'column'} justifyContent={"flex-start"} alignItems={'center'}>
        <Box h={'120px'} w={'120px'}>{head}</Box>
        <Flex flexDir={'column'} justifyContent={'flex-start'} alignItems={'center'} h={'full'} w={'full'} pos={'relative'}>
          {children}
        </Flex>
      </Flex>
    </BubbleMenuContext.Provider>
  );
}
