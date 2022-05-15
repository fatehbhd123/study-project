import React from 'react'
import Navbar from "../Navbar/Navbar"
import Welcome from '../Welcome/Welcome'
function Landing() {
    return (
        <div className='landing'>
            <div className='overlay'></div>
            <Navbar />
            <Welcome />
        </div>
    )
}

export default Landing
