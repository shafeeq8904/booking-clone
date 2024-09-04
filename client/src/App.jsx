import './App.css'
import {Routes,Route} from 'react-router-dom'
import IndexPages from './pages/IndexPages'
import Login from './pages/Login'
import Layout from './Layout'
import Register from './pages/Register'
import axios from 'axios'
import { UserContextProvider } from './UserContext'


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
          </Route>
        </Routes>
    </UserContextProvider>
  )
}

export default App
