import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import About from '../About/About'
import ContactUs from '../ContactUs/ContactUs'
import { selectUser, login, logout } from '../features/userSlice'
import Footer from '../Footer/Footer'
import Landing from '../Landing/Landing'

function HomePage() {
    const user = useSelector(selectUser);
    let navigate = useNavigate();
    let dispatch = useDispatch();
    if (user) {

        localStorage.getItem('user') ? navigate('/beginner') : navigate('/association');
    }

    useEffect(() => {

        if (localStorage.getItem('user')) {
            dispatch(login(
                JSON.parse(localStorage.getItem('user'))
            ))
        } else if (localStorage.getItem('association')) {
            dispatch(login(
                JSON.parse(localStorage.getItem('association'))
            ))
        } else {
            dispatch(logout())
        }
    }, [])
    return (
        <>
            <Landing />
            <About />
            <ContactUs />
            <Footer />
        </>
    )
}

export default HomePage
