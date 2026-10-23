import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import LoginPopup from '../components/LoginPopup/LoginPopup'
import './MainLayout.css'

const MainLayout = ({ showLogin, setShowLogin }) => {
    return (
        <>
            {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
            <div className="app">
                <Navbar setShowLogin={setShowLogin} />
                <main className="main-content">
                    <Outlet />
                </main>
            </div>
            <Footer />
        </>
    )
}

export default MainLayout