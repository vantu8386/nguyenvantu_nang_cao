import { Route, Routes } from "react-router-dom";
import Admin from "./pages/Admin";
import LogIn from "./pages/LogIn";
import Todolist from "./pages/Todolist";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Admin />} />
        <Route path="/todolist" element={<Todolist/>} />
        <Route path="/login" element={<LogIn />} />
      </Routes>
    </>
  );
}

export default App;
