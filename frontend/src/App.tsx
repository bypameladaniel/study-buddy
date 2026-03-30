import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './index.css';
import "./styles/loading.css";

import SignIn from "./pages/SignIn";
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import MyLibrary from './pages/MyLibrary';
import Profile from './pages/Profile';
import TestPage from './pages/TestPage';

function App() {
  return (
    <Routes>
      <Route path ="/" element ={<SignIn/>}/>
      <Route path = "/signup" element = {<SignUp/>}/>
      <Route path = "/dashboard" element = {<Dashboard/>}/>
      <Route path = "/mylibrary" element = {<MyLibrary/>}/>
      <Route path = "/profile" element = {<Profile/>}/>
      <Route path = "/test" element = {<TestPage/>}/>
    </Routes>
  )
}

export default App;