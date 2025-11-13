import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Landing.css'

export default function Landing() {
    const [userName, setUserName] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        // Get user name from localStorage
        const storedUserName = localStorage.getItem('userName')
        const token = localStorage.getItem('token')

        // If no token or user name, redirect to login
        if (!token || !storedUserName) {
            navigate('/login')
            return
        }

        setUserName(storedUserName)
    }, [navigate])

    const handleLogout = () => {
        // Clear localStorage
        localStorage.removeItem('token')
        localStorage.removeItem('userName')
        
        // Redirect to login
        navigate('/login')
    }

    return (
        <div className="landing-container">
            <div className="landing-content">
                <h1 className="landing-title">Welcome {userName}</h1>
                <button onClick={handleLogout} className="logout-button">
                    Logout
                </button>
            </div>
        </div>
    )
}

