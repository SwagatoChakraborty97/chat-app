import "./App.css";
import {SignUp} from "./SignUp/SignUp";
import {UserList} from "./UserList/UserList";
import { Login } from "./Login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Chatpage } from "./ChatPage/Chatpage";


function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUp/>}></Route>
        <Route path="chatpage" element={<Chatpage/>}></Route>
        <Route path="login" element={<Login/>}></Route>
        <Route path="userlist" element={<UserList/>}></Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;

