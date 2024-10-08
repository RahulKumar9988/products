import './App.css'
import Products from './components/Products'
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Cart from './components/Cart';
function App() {

  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Products/>} />
        {/* <Route path='/cart' element={<Cart/>} /> */}
      </Routes>
    </Router>
    
  )
}

export default App
