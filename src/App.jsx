import './App.css'
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Api from './components/Api';
function App() {

  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Api/>} />
       
      </Routes>
    </Router>
    
  )
}

export default App

