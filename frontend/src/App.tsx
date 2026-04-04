import { Routes, Route } from 'react-router-dom';
import './index.css';
import "./styles/loading.css";

import SignIn from "./pages/SignIn";
import SignUp from './pages/SignUp';
import MyLibrary from './pages/MyLibrary';
import Profile from './pages/Profile';
import StudyWorkspace from './pages/StudyWorkspace';
import StudySession from './pages/StudySession';

function App() {
  return (
    <Routes>
      <Route path ="/" element ={<SignIn/>}/>
      <Route path = "/signup" element = {<SignUp/>}/>
      <Route path = "/studysession" element = {<StudySession/>}/>
      <Route path = "/mylibrary" element = {<MyLibrary/>}/>
      <Route path = "/profile" element = {<Profile/>}/>
      <Route path="/study-workspace" element={<StudyWorkspace />} />
    </Routes>
  )
}

export default App;