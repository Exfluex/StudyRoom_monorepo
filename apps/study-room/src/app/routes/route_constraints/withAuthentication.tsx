import { ReactElement, ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";



//withXXXX imply this is a enchanment for this elment.It's a kind of wrapper.
export function withAuthentication(Element:ReactElement){
  const navigate = useNavigate();
  useEffect(()=>{
    // navigate("/login");
  },[]);
  return Element;
}
