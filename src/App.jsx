import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import MainLayout from './layouts/MainLayout'

const App = () => {

  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      <Routes>
        <Route element={<MainLayout showLogin={showLogin} setShowLogin={setShowLogin} />}>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
        </Route>
      </Routes>
    </>
  )
}

export default App