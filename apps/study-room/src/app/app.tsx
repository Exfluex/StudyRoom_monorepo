// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Box, ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import styles from './app.module.scss';
import { ManipulateLayout } from './components/layout/manipulate_layer';
import NxWelcome from './nx-welcome';
import { LoginPage } from './pages/page_login';
import { LobbyPage } from './pages/page_rooms';
import { StudyRoomPage } from './pages/page_studyroom';
import { ApplicationRoutes } from './routes/app_routes';

export function App() {
  return (
    <>
      <BrowserRouter>
        <ChakraProvider>
          <Box pos={'fixed'} w={'100%'} h={'100%'} bg={'#f8edeb'}>
            <ApplicationRoutes/>
          </Box>
        </ChakraProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
