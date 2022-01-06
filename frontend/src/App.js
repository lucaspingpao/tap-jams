import './styles/App.css';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/app_components/Navbar';
import Sidebar from './components/app_components/Sidebar';
import GlobalControls from './components/app_components/GlobalControls';
import Explore from './components/app_components/Explore'
import Login from './components/app_components/Login';
import Signup from './components/app_components/Signup';
// import { useState, useEffect } from 'react';

function App() {

  // test the Flask API here
  // const [testapi, setTestapi] = useState({});
  // useEffect(() => {
  //   fetch('/api')
  //   .then(response => {
  //     if (response.status == 200) {
  //       return response.json()
  //     }
  //   })
  //   .then(data => setTestapi(data))
  //   .then(error => console.log(error))
  // }, [])
  // <div className='apitest'>{Object.keys(testapi)}</div>

  // return different comopnents
  return (
    <HashRouter>
    <div className="App">
      <Routes>
        <Route path='/' element={
          <div>
            <Navbar/><Sidebar/><GlobalControls/>
          </div>
        }/>
        <Route path='/explore' element={
          <div>
            <Navbar/><Explore/>
          </div>
        }/>
        <Route path='/login' element={
          <div>
            <br/>
            <Link to='/'>Back</Link>
            <Login/>
          </div>
        }/>
        <Route path='/signup' element={
          <div>
            <br/>
            <Link to='/'>Back</Link>
            <Signup/>
          </div>
        }/>
      </Routes>
    </div>
    </HashRouter>
  );
}

export default App;
