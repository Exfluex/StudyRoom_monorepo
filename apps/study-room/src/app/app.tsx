// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Box, ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import styles from './app.module.scss';
import NxWelcome from './nx-welcome';
import { LoginPage } from './pages/page_login';
import { LobbyPage } from './pages/page_rooms';
import { StudyRoomPage } from './pages/page_studyroom';

export function App() {
  return (
    <>
      <BrowserRouter>
        <ChakraProvider>
          <Box pos={'fixed'} w={'100%'} h={'100%'} bg={'#f8edeb'}>
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/rooms" element={<LobbyPage />} />
              <Route path="/room/:roomId" element={<StudyRoomPage />} />
            </Routes>
          </Box>
        </ChakraProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
