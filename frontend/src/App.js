import './styles/App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/app_components/Navbar';
import Sidebar from './components/app_components/Sidebar';
import Login from './components/app_components/Login';
import Signup from './components/app_components/Signup';
import GlobalControls from './components/app_components/GlobalControls';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route path='/' element={
          <div>
            <Navbar/><Sidebar/><GlobalControls/>
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
    </BrowserRouter>
  );
}

export default App;
