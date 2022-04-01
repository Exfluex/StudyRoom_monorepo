import { Box, Flex, VStack } from '@chakra-ui/react';

import { ReactChildren, ReactNode, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Header } from './header';

export interface ManipulateLayoutProps {
  children?: ReactNode;
}
export function ManipulateLayout({ children }: ManipulateLayoutProps) {
  return (
    <>
      <Header></Header>
      <Outlet/>
    </>
  );
}
