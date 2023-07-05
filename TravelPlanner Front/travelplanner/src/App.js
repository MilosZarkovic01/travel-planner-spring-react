import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Home'
import Login from './Login'
import Register from './Register'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import MyProfil from './components/MyProfil'
import Destinations from './components/Destinations'
import DestinationsDetails from './components/DestinationDetails'
import AllReservations from './components/AllReservations'

function App() {
  return (
    <div className="App">
      <ToastContainer></ToastContainer>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/my-profil' element={<MyProfil />}></Route>
          <Route path='/destinations' element={<Destinations />}></Route>
          <Route path='/destinations/:id' element={<DestinationsDetails />}></Route>
          <Route path='/all-reservations' element={<AllReservations />}></Route>    
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
