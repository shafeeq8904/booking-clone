import './App.css'
import {Routes,Route} from 'react-router-dom'
import IndexPages from './pages/IndexPages'
import Login from './pages/Login'
import Layout from './Layout'
import Register from './pages/Register'
import axios from 'axios'
import { UserContextProvider } from './UserContext'
import Account from './pages/Account'
import PlacesPage from './pages/PlacesPage'
import PLacesFormPage from './pages/PlacesFormPage'
import IndividualPage from './pages/IndividualPage'
import BookingsPage from './pages/BookingsPage'
import BookingPage from './pages/BookingPage'


axios.defaults.baseURL= 'http://localhost:3000';
axios.defaults.withCredentials ='true';

function App() {
  return (
    <UserContextProvider>
        <Routes>
          <Route path='/' element={<Layout/>}>
              <Route index element={<IndexPages/>}/> 
              <Route path='/login' element={<Login/>}/>
              <Route path='/register' element={<Register/>}/>
              <Route path='/account' element={<Account/>}/>
              <Route path='/account/places' element={<PlacesPage/>}/>
              <Route path='/account/places/new' element={<PLacesFormPage/>}/>
              <Route path='/account/places/:id' element={<PLacesFormPage/>}/>
              <Route path='/place/:id' element={<IndividualPage/>}/>
              <Route path='/account/bookings' element={<BookingsPage/>}/>
              <Route path='/account/bookings/:id' element={<BookingPage/>}/>
          </Route>
        </Routes>
    </UserContextProvider>
  )
}

export default App
