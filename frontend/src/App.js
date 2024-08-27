import './styles/App.css';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/app_components/Navbar';
import GlobalControls from './components/app_components/GlobalControls';
import Explore from './components/app_components/Explore'
import Login from './components/app_components/Login';
import Signup from './components/app_components/Signup';
// import { useState, useEffect } from 'react';

function App() {

  // return different comopnents
  return (
    <HashRouter>
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path='/' element={<GlobalControls/>}/>
        <Route path='/explore' element={<Explore />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/signup' element={<Signup />}/>
      </Routes>
    </div>
    </HashRouter>
  );
}

export default App;
