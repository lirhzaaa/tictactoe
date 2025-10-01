import {Route, Routes} from "react-router-dom";
import Start1 from "./assets/pages/start/start1";
import Start2 from "./assets/pages/start/start2";
import Login from "./assets/auth/login";
import Game from "./assets/pages";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Start1 />} />
      <Route path="/start" element={<Start2 />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Game />} />
      <Route path="*" />
    </Routes>
  )
}

export default App;