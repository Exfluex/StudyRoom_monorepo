import { useState } from "react";


export interface useToggleProps{
  defaultOpen:boolean;
}
//isOpen,onClose,onOpen,onToggle
export function useToggle(props:useToggleProps={defaultOpen:false}){
  const [status,setStatus] = useState(props.defaultOpen);
  return {isOpen:status,onOpen:()=>setStatus(false),onClose:()=>setStatus(true),onToggle:()=>setStatus(c=>!c)};
}
