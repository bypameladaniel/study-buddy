import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';

import SignIn from "./pages/SignIn";
import SignUp from './pages/SignUp';
import RandomPage from './pages/randompage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path ="/" element ={<SignIn/>}/>
        <Route path = "/signup" element = {<SignUp/>}/>
        <Route path = "/rp" element = {<RandomPage/>}/>
      </Routes>
    </Router>
  )
}

export default App;