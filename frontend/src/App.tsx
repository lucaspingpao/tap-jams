import './styles/App.css';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/app_components/Navbar';
import Sidebar from './components/app_components/Sidebar';
import Explore from './components/app_components/Explore'
import Login from './components/app_components/Login';
import Signup from './components/app_components/Signup';
import Copyright from './components/app_components/Copyright';

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Sidebar />}/>
          <Route path='/explore' element={<Explore />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/signup' element={<Signup />}/>
        </Routes>
        <Copyright />
      </HashRouter>
    </div>
  );
}

export default App;
