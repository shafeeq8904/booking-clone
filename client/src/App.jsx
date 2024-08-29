import './App.css'
import {Routes,Route} from 'react-router-dom'
import IndexPages from './pages/IndexPages'
import Login from './pages/Login'
import Layout from './Layout'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout/>}>
          <Route index element={<IndexPages/>}/> 
          <Route path='/login' element={<Login/>}/>
      </Route>
      
      
    </Routes>
  )
}

export default App
