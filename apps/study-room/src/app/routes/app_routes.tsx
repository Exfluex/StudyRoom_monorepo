import { Route, Routes } from "react-router-dom";
import { ManipulateLayout } from "../components/layout/manipulate_layer";
import { LoginPage } from "../pages/page_login";
import { LobbyPage } from "../pages/page_rooms";
import { StudyRoomPage } from "../pages/page_studyroom";
import { withAuthentication } from "./route_constraints/withAuthentication";

export function ApplicationRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/*" element={withAuthentication(<ManipulateLayout/>)} >
        <Route path="lobby" element={<LobbyPage />} />
        <Route path="room/:roomId" element={<StudyRoomPage />} />
      </Route>
    </Routes>
  );
}
