import './App.css'
import { BrowserRouter, Routes, Route  } from "react-router-dom";
 
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Roompage from './pages/Roompage';
import Bookingpage from './pages/Bookingpage';
import Errorpage from './pages/Errorpage';

import Admin from './pages/Admin';
import Navbar from './components/Navbar'
import Contact from './pages/Contact';
import Signup from './pages/Signup';


function App() {
  

  return (
    <>
    <BrowserRouter>
    
    
    <main>
        
          <Navbar></Navbar>
          <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/roompage" element={<Roompage/>} />
          {/* <Route path="/rooms/:id" element={<Roompage/>} /> */}
          <Route path="/bookingpage/:roomId" element={<Bookingpage/>} />
          <Route path="/errorpage" element={<Errorpage/>} />

          <Route path="/admin" element={<Admin/>} />
          <Route path="/contact" element={<Contact/>} />
          </Routes>
    </main>
        
    </BrowserRouter>
    </>
  )
}

export default App
